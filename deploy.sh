#!/usr/bin/env bash
set -euo pipefail

# 用法: ./deploy.sh --mode test|prod [-rsync] [-skip-build]
#   test  测试环境 (build:stage) → user@<host>:<deploy-path>
#   prod  正式环境 (build:prod)  → user@<host>:<deploy-path>
#   -rsync       使用 rsync 同步，否则使用 scp
#   -skip-build  跳过打包，直接上传本地 dist 目录
#
# 部署目标通过环境变量配置（请勿将真实 IP/域名提交到仓库）:
#   DEPLOY_TEST_HOST / DEPLOY_TEST_PATH
#   DEPLOY_PROD_HOST / DEPLOY_PROD_PATH

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
cd "$ROOT_DIR"

BUILD_DIR="dist"
SSH_USER="${DEPLOY_SSH_USER:-root}"

MODE=""
USE_RSYNC=false
SKIP_BUILD=false

while [[ $# -gt 0 ]]; do
  case "$1" in
    --mode)
      MODE="${2:-}"
      shift 2
      ;;
    --mode=*)
      MODE="${1#*=}"
      shift
      ;;
    -rsync)
      USE_RSYNC=true
      shift
      ;;
    -skip-build | --skip-build)
      SKIP_BUILD=true
      shift
      ;;
    -h | --help)
      echo "用法: $0 --mode test|prod [-rsync] [-skip-build]"
      exit 0
      ;;
    *)
      echo "未知参数: $1"
      echo "用法: $0 --mode test|prod [-rsync] [-skip-build]"
      exit 1
      ;;
  esac
done

if [[ "$MODE" != "test" && "$MODE" != "prod" ]]; then
  echo "请指定部署环境: --mode test 或 --mode prod"
  echo "用法: $0 --mode test|prod [-rsync] [-skip-build]"
  exit 1
fi

if [[ "$MODE" == "test" ]]; then
  REMOTE_HOST="${DEPLOY_TEST_HOST:?请设置 DEPLOY_TEST_HOST 环境变量}"
  REMOTE_PATH="${DEPLOY_TEST_PATH:-/www/wwwroot/app-staging.example.com}"
  BUILD_CMD="build:stage"
  ENV_LABEL="测试"
else
  REMOTE_HOST="${DEPLOY_PROD_HOST:?请设置 DEPLOY_PROD_HOST 环境变量}"
  REMOTE_PATH="${DEPLOY_PROD_PATH:-/www/wwwroot/app.example.com}"
  BUILD_CMD="build:prod"
  ENV_LABEL="正式"
fi

run_build() {
  if command -v yarn >/dev/null 2>&1 && [[ -f "$ROOT_DIR/yarn.lock" ]]; then
    yarn run "$BUILD_CMD"
  elif command -v pnpm >/dev/null 2>&1 && [[ -f "$ROOT_DIR/pnpm-lock.yaml" ]]; then
    pnpm run "$BUILD_CMD"
  else
    npm run "$BUILD_CMD"
  fi
}

if [[ "$SKIP_BUILD" == true ]]; then
  echo "跳过打包，直接上传..."
else
  echo "正在构建（${ENV_LABEL}）..."
  run_build
fi

if [[ ! -d "$BUILD_DIR" ]]; then
  if [[ "$SKIP_BUILD" == true ]]; then
    echo "错误：未找到 ${BUILD_DIR} 目录，请先执行打包或检查本地产物"
  else
    echo "错误：构建后未找到 ${BUILD_DIR} 目录"
  fi
  exit 1
fi

DEPLOY_DIR="$REMOTE_PATH"
REMOTE="${SSH_USER}@${REMOTE_HOST}:${DEPLOY_DIR}/"
echo "正在部署到 ${REMOTE} ..."

# 宝塔站点目录含受保护的 .user.ini（chattr +i），仅清空非隐藏文件，避免 rm/rsync --delete 报错
clear_remote_deploy_dir() {
  ssh "${SSH_USER}@${REMOTE_HOST}" "DEPLOY_DIR='${DEPLOY_DIR}' bash -s" <<'EOF'
set -e
mkdir -p "$DEPLOY_DIR"
# 清空部署目录（* 不匹配 .user.ini 等隐藏文件）
rm -rf "$DEPLOY_DIR"/*
if [ $? -ne 0 ]; then
  exit 1
fi
EOF
}

clear_remote_deploy_dir

if [[ "$USE_RSYNC" == true ]]; then
  echo "使用 rsync 同步"
  rsync -avz "${BUILD_DIR}/" "${REMOTE}"
else
  echo "使用 scp 同步"
  scp -r "${BUILD_DIR}/." "${REMOTE}"
fi

echo "部署成功：${ENV_LABEL} → ${REMOTE_PATH}"
