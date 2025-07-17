import { defineComponent } from 'vue';
import './style.scss';

export default defineComponent({
    name: 'SvgIcon',
    props: {
        name: {
            type: String,
            required: true,
        },
    },
    setup(props) {
        return () => (
            <svg class='svg-icon' aria-hidden='true'>
                <use xlinkHref={`#icon-${props.name}`} />
            </svg>
        );
    },
});
