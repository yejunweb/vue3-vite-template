<template>
    <view class="login center">
        <view class="login-main w-full">
            <wd-form ref="formRef" :model="formState">
                <wd-input
                    v-model="formState.loginName"
                    :rules="[
                        {
                            required: true,
                            validator: validatePhone,
                            message: '请输入账号或手机号',
                        },
                    ]"
                    prop="loginName"
                    size="large"
                    placeholder="请输入账号或手机号"
                />
                <wd-input
                    v-model="formState.password"
                    :rules="[{ required: true, message: '请输入密码' }]"
                    prop="password"
                    size="large"
                    placeholder="请输入密码"
                    show-password
                />
                <view class="flex items-center">
                    <wd-input
                        v-model="formState.code"
                        class="flex-1"
                        :rules="[{ required: true, message: '请输入验证码' }]"
                        prop="code"
                        size="large"
                        placeholder="请输入验证码"
                    />
                    <image class="h-[100rpx] w-[200rpx] flex-shrink-0" :src="storeCaptcha.captchaInfo.img" @click="storeCaptcha.getCaptchaInfo" />
                </view>
            </wd-form>
            <view class="login-main__operate pt-[48rpx]">
                <wd-button type="primary" size="large" block @click="handleSubmit">
                    登录
                </wd-button>
            </view>
        </view>
    </view>
</template>

<script lang="ts" setup>
import * as api from '@/api/modules/auth'
import { useStoreCaptcha } from '@/store/modules/captcha'
import { useStoreUser } from '@/store/modules/user'

const storeCaptcha = useStoreCaptcha()
const storeUser = useStoreUser()

definePage({
    style: {
        navigationStyle: 'custom',
        navigationBarTitleText: '登录',
    },
})

/**
 * data
 */
const formState = reactive({
    loginName: '',
    password: '',
    code: '',
})
const formRef = ref()

/**
 * methods
 */
const validatePhone = (val: string) => {
    if (!val) return Promise.reject(new Error('请输入手机号码'))
    if (!/^1[3-9]\d{9}$/.test(val)) return Promise.reject(new Error('请输入正确的手机号'))
    return Promise.resolve()
}
const handleSubmit = async () => {
    const { valid } = await formRef.value.validate()
    if (!valid) return
    api
        .login({
            ...formState,
            uuid: storeCaptcha.captchaInfo.uuid,
        })
        .then((res) => {
            storeUser.setAuth({ token: (res as any).token })
            return storeUser.getUser()
        })
        .then(() => {
            uni.navigateBack()
        })
        .catch(() => {
            storeCaptcha.getCaptchaInfo()
        })
}
</script>

<style lang="scss" scoped>
.login {
    height: 100vh;
    padding: 0 $space8;
}
</style>
