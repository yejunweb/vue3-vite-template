<script lang="ts" setup>
import { LOGIN_PAGE } from '@/router/config'
import { useStoreUser } from '@/store/modules/user'

definePage({
    style: {
        navigationBarTitleText: '我的',
    },
})

const storeUser = useStoreUser()

// 微信小程序下登录
async function handleLogin() {
    uni.navigateTo({
        url: `${LOGIN_PAGE}`,
    })
}

function handleLogout() {
    const message = useGlobalMessage()
    const toast = useGlobalToast()
    message.confirm({
        title: '提示',
        msg: '确定要退出登录吗？',
        success: async () => {
            await storeUser.logout()
            toast.show('退出登录成功')
            uni.redirectTo({ url: LOGIN_PAGE })
        },
    })
}
</script>

<template>
    <view class="profile-container">
        <view class="mt-3 break-all px-3 text-center text-green-500">
            {{ storeUser.user?.userName ? '已登录' : '未登录' }}
        </view>
        <view class="mt-3 break-all px-3">
            {{ storeUser.user?.userName }}
        </view>

        <view class="mt-[60vh] px-3">
            <view class="m-auto w-160px text-center">
                <button v-if="storeUser.hasLogin" type="warn" class="w-full" @click="handleLogout">
                    退出登录
                </button>
                <button v-else type="primary" class="w-full" @click="handleLogin">
                    登录
                </button>
            </view>
        </view>
    </view>
</template>
