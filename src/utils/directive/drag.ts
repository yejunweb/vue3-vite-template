import type { App, DirectiveBinding, ObjectDirective } from 'vue';

export interface DragPosition {
    left: number;
    top: number;
}

export interface DragBindingValue {
    boundaryMode?: 'half';
    dataName?: string;
    boundaryPadding?: number;
    handleElementMoved?: (position: DragPosition) => void;
    elementMoveEnd?: (position: DragPosition) => void;
}

interface DragState {
    startX: number;
    startY: number;
    startRect: { left: number; top: number };
    startStyleLeft: number;
    startStyleTop: number;
}

interface DragHTMLElement extends HTMLElement {
    _dragCleanup?: () => void;
}

type DragBinding = DirectiveBinding<DragBindingValue | undefined>;

function shouldSkipDrag(target: EventTarget | null): boolean {
    if (!target || !(target instanceof Element)) return false;
    if (typeof target.closest === 'function') {
        return !!target.closest('.ant-slider, .ant-switch, input[type="color"]');
    }
    return typeof target.className === 'string' && target.className.includes('ant-slider');
}

function getNumericStyleOffset(el: HTMLElement, prop: 'left' | 'top'): number {
    const value = window.getComputedStyle(el)[prop];
    if (!value || value === 'auto') return 0;
    return parseFloat(value) || 0;
}

function clampToViewport(left: number, top: number, width: number, height: number, padding = 0): DragPosition {
    const maxLeft = Math.max(padding, window.innerWidth - width - padding);
    const maxTop = Math.max(padding, window.innerHeight - height - padding);

    return {
        left: Math.min(Math.max(left, padding), maxLeft),
        top: Math.min(Math.max(top, padding), maxTop),
    };
}

function clampLegacyToolSet(left: number, top: number, width: number, height: number): DragPosition {
    const screenWidth = window.innerWidth;
    let l = left;
    let t = top;

    if (l < 0 && width >= 480) l = 0;
    if (l < width / 2 && width < 480) l = width / 2;
    if (t < 0) t = 0;
    if (t + height > window.innerHeight) t = window.innerHeight - height;
    if (screenWidth <= 1700 && l + width / 2 > screenWidth) {
        l = screenWidth - width / 2;
    } else if (l + width > screenWidth && width >= 480) {
        l = screenWidth - width;
    }

    return { left: l, top: t };
}

function getClampedViewportPosition(viewportLeft: number, viewportTop: number, el: HTMLElement, binding: DragBinding): DragPosition {
    const { width, height } = el.getBoundingClientRect();
    const value = binding.value ?? {};

    if (value.boundaryMode === 'half' || value.dataName === 'toolSet') {
        return clampLegacyToolSet(viewportLeft, viewportTop, width, height);
    }

    return clampToViewport(viewportLeft, viewportTop, width, height, value.boundaryPadding ?? 0);
}

function applyDragPosition(el: HTMLElement, dragState: DragState, viewportLeft: number, viewportTop: number, binding: DragBinding): DragPosition {
    const clamped = getClampedViewportPosition(viewportLeft, viewportTop, el, binding);
    const styleLeft = dragState.startStyleLeft + (clamped.left - dragState.startRect.left);
    const styleTop = dragState.startStyleTop + (clamped.top - dragState.startRect.top);

    el.style.left = `${styleLeft}px`;
    el.style.top = `${styleTop}px`;

    return { left: styleLeft, top: styleTop };
}

function bindDrag(el: DragHTMLElement, binding: DragBinding): void {
    let startTime = 0;
    let dragState: DragState | null = null;

    const startDrag = (clientX: number, clientY: number) => {
        startTime = Date.now();
        const rect = el.getBoundingClientRect();
        dragState = {
            startX: clientX,
            startY: clientY,
            startRect: { left: rect.left, top: rect.top },
            startStyleLeft: getNumericStyleOffset(el, 'left'),
            startStyleTop: getNumericStyleOffset(el, 'top'),
        };
    };

    const moveDrag = (clientX: number, clientY: number): DragPosition | null => {
        if (!dragState) return null;

        const viewportLeft = dragState.startRect.left + (clientX - dragState.startX);
        const viewportTop = dragState.startRect.top + (clientY - dragState.startY);
        const position = applyDragPosition(el, dragState, viewportLeft, viewportTop, binding);

        if (Date.now() - startTime >= 150 && binding.value?.handleElementMoved) {
            binding.value.handleElementMoved(position);
        }

        return position;
    };

    const endDrag = () => {
        if (binding.value?.elementMoveEnd) {
            binding.value.elementMoveEnd({
                left: getNumericStyleOffset(el, 'left'),
                top: getNumericStyleOffset(el, 'top'),
            });
        }
        dragState = null;
    };

    const onMouseDown = (ev: MouseEvent) => {
        if (shouldSkipDrag(ev.target)) return;
        ev.preventDefault();
        startDrag(ev.clientX, ev.clientY);

        const onMouseMove = (evMove: MouseEvent) => {
            moveDrag(evMove.clientX, evMove.clientY);
        };

        const onMouseUp = () => {
            document.removeEventListener('mousemove', onMouseMove);
            document.removeEventListener('mouseup', onMouseUp);
            setTimeout(endDrag, 0);
        };

        document.addEventListener('mousemove', onMouseMove);
        document.addEventListener('mouseup', onMouseUp);
    };

    const onTouchStart = (ev: TouchEvent) => {
        if (shouldSkipDrag(ev.target)) return;
        const touch = ev.touches[0];
        if (!touch) return;
        startDrag(touch.clientX, touch.clientY);
    };

    const onTouchMove = (ev: TouchEvent) => {
        if (!dragState) return;
        const touch = ev.touches[0];
        if (!touch) return;
        ev.preventDefault();
        moveDrag(touch.clientX, touch.clientY);
    };

    const onTouchEnd = () => {
        endDrag();
    };

    el.addEventListener('mousedown', onMouseDown);
    el.addEventListener('touchstart', onTouchStart, { passive: true });
    el.addEventListener('touchmove', onTouchMove, { passive: false });
    el.addEventListener('touchend', onTouchEnd);

    el._dragCleanup = () => {
        el.removeEventListener('mousedown', onMouseDown);
        el.removeEventListener('touchstart', onTouchStart);
        el.removeEventListener('touchmove', onTouchMove);
        el.removeEventListener('touchend', onTouchEnd);
    };
}

/** Vue 3 元素拖拽指令 */
export const dragDirective: ObjectDirective<DragHTMLElement, DragBindingValue | undefined> = {
    mounted(el, binding) {
        bindDrag(el, binding);
    },
    updated(_el, _binding) {
        // binding.value 回调引用可能变化，拖拽逻辑不依赖 value 内部字段的 reactive 更新
    },
    unmounted(el) {
        el._dragCleanup?.();
        delete el._dragCleanup;
    },
};

export function registerDragDirective(app: App): void {
    app.directive('drag', dragDirective);
}
