import { defineComponent } from 'vue';
import { Button } from 'ant-design-vue';
import { useRouter } from 'vue-router';
import './index.scss';

export default defineComponent({
    name: 'Index',
    props: [],
    emits: [],
    setup(props, context) {
        const router = useRouter();

        return () => (
            <div class='index'>
                <Button type='primary' onClick={() => router.push('/about')}>
                    Click me to about
                </Button>
            </div>
        );
    },
});
