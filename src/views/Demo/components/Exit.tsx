import { defineComponent } from 'vue';
import { Button } from 'ant-design-vue';
import HelloWorldVue from './HelloWorld.vue';

export default defineComponent(
    () => {
        const modules = import.meta.glob('../components/*');
        console.log(modules);
        const CustomButton = () => {
            const handleClick = () => {
                alert('hi');
            };
            return <Button onClick={handleClick}>click me!</Button>;
        };
        return () => (
            <div>
                <p>JSXInSetup2</p>
                <CustomButton />
                <HelloWorldVue msg={import.meta.env.VITE_APP_TITLE} />
            </div>
        );
    },
    {
        name: 'Exit',
    }
);
