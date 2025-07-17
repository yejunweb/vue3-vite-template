import Exit from '@src/views/Demo/components/Exit';
import { defineComponent } from 'vue';
import logo from '@src/assets/images/logo.png';
import { useStoreUser } from '@src/store/modules/user';
import { storeToRefs } from 'pinia';
import SvgIcon from '@src/components/SvgIcon';

export default defineComponent(
    () => {
        const user = useStoreUser();
        const { fullName } = storeToRefs(user);
        return () => (
            <div>
                <h2>
                    pinia: {fullName.value}
                    {user.fullName}
                </h2>
                <h3>
                    <p>
                        reactive localStorage: {user.countInLocalStorage}
                        <button onClick={user.changeLocalStorageCount}>点我 +1</button>
                    </p>
                    <p>
                        reactive sessionStorage: {user.countInSessionStorage}
                        <button onClick={user.changeSessionStorage}>点我 +1</button>
                    </p>
                </h3>
                <SvgIcon name='empty' />
                <Exit />
                <img alt='Vue logo' src={logo} onClick={() => user.changeName()} />
            </div>
        );
    },
    { name: 'Tsx' }
);
