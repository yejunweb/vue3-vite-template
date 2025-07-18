import path from 'path';
import { app, BrowserWindow, ipcMain } from 'electron';
import { log, isDevMode, VITE_DEV_SERVER_URL } from './utils';

process.env.APP_ROOT = path.join(__dirname, '../');
process.env.VITE_PUBLIC = path.join(process.env.APP_ROOT, isDevMode() ? 'public' : 'dist');

// 屏蔽 Electron 的安全警告
process.env['ELECTRON_DISABLE_SECURITY_WARNINGS'] = 'true';

if (!app.requestSingleInstanceLock()) {
    app.quit();
    process.exit(0);
}

let win: BrowserWindow | null;

function createWindow() {
    win = new BrowserWindow({
        icon: path.join(process.env.VITE_PUBLIC, 'favicon.ico'),
        webPreferences: {
            preload: path.join(__dirname, './preload.js'),
        },
        width: 1260, // 窗口宽度
        height: 750, // 窗口高度
        // frame: false, // 创建无框窗口
        resizable: true, // 允许窗口调整大小
        fullscreenable: true, // 允许窗口全屏显示
    });

    // 导航完成时触发，即选项卡的旋转器将停止旋转，并指派 onload 事件后
    win.webContents.on('did-finish-load', () => {
        // 向渲染进程发送信息
        const timer = setTimeout(() => {
            win?.webContents.send('message-form-main', 'This message is from main process!');
            clearTimeout(timer);
        }, 3000);
    });

    if (VITE_DEV_SERVER_URL) {
        win.loadURL(VITE_DEV_SERVER_URL);
        win.webContents.openDevTools(); // 开发环境默认打开开发者工具
    } else {
        win.loadFile(path.join(process.env.VITE_PUBLIC, 'index.html'));
    }
}

// 监听渲染进程信息
ipcMain.on('message-from-renderer', (_event, message) => {
    log.info('message-from-renderer: ', message);
});

// 当所有的窗口都被关闭时触发
app.on('window-all-closed', () => {
    app.quit();
    win = null;
});

// Electron 初始化完成
app.whenReady().then(createWindow);
