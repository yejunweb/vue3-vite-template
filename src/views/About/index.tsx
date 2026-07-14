import { defineComponent } from 'vue';
import { Button } from 'ant-design-vue';
import { useRouter } from 'vue-router';
import styles from './index.module.scss';

export default defineComponent({
    name: 'About',
    props: [],
    emits: [],
    setup(props, context) {
        const router = useRouter();

        return () => (
            <div class={styles.about}>
                <Button type='primary' onClick={() => router.push('/')}>
                    Click me to index
                </Button>
            </div>
        );
    },
});
