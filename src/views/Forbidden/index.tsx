import { defineComponent } from 'vue';
import { useRouter } from 'vue-router';
import { Result, Button } from 'ant-design-vue';

export default defineComponent({
    name: 'Forbidden',
    setup() {
        const router = useRouter();

        return () => (
            <div class='forbidden g-h-full g-w-full g-flex g-items-center g-justify-center'>
                <Result
                    status='404'
                    title='404'
                    subTitle='找不到您所要查找的页面'
                    v-slots={{
                        extra: () => (
                            <Button
                                type='primary'
                                onClick={() => {
                                    router.push('/');
                                }}
                            >
                                回到主页
                            </Button>
                        ),
                    }}
                />
            </div>
        );
    },
});
