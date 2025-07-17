import { Modal } from 'ant-design-vue';
import { CloseOutlined } from '@ant-design/icons-vue';
import type { VNodeChild } from 'vue';
import './index.scss';

interface MessageBoxProps {
    /** 类型 info | success | error | warn | confirm */
    type?: 'info' | 'success' | 'error' | 'warn' | 'confirm';
    /** 标题 */
    title: string | VNodeChild;
    /** 内容 */
    content: string | VNodeChild;
    /** 确认按钮文字 */
    okText?: string;
    /** 确认按钮类型 */
    okType?: string;
    /** 取消按钮文字 */
    cancelText?: string;
    /** 是否显示右上角关闭按钮 */
    showClose?: boolean;
    /** 自定义类名 */
    class?: string;
    /** 自定义操作栏 */
    operate?: VNodeChild;
    /** 确认回调 */
    onOk?: () => void | Promise<void>;
    /** 取消回调 */
    onCancel?: () => void;
}

export const MessageBox = (props: MessageBoxProps): Promise<void> => {
    return new Promise<void>((resolve, reject) => {
        const handleConfirm = async () => {
            if (props.onOk) {
                await props.onOk();
            }
            resolve();
        };
        const handleCancel = () => {
            modal.destroy();
            reject();
        };
        const modal = Modal[props.type || 'info']({
            wrapClassName: ['message-box', props.operate && 'hide-btns', props.class || ''],
            title: () => (
                <div class='message-box__title'>
                    {props.title}
                    {(props.showClose || props.showClose === undefined) && <CloseOutlined class='title-close' onClick={handleCancel} />}
                </div>
            ),
            content: () => (
                <div class='message-box__content'>
                    <p>{props.content}</p>
                    {props.operate && props.operate}
                </div>
            ),
            okType: props.okType,
            okText: props.okText || '确定',
            cancelText: props.cancelText || '取消',
            onOk: handleConfirm,
            onCancel: props.onCancel,
        });
    });
};
