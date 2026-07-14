/**
 * insert-css
 * @param { Boolean }     replace   是否替换样式
 * @param { Boolean }     prepend   样式插入位置是否为节点之前
 * @param { HTMLElement } container 样式插入位置
 */

interface InsertCssOptions {
    replace?: boolean;
    prepend?: boolean;
    container?: HTMLElement;
}

interface StyleElementPositions {
    prepend?: HTMLStyleElement;
    append?: HTMLStyleElement;
}

const containers: HTMLElement[] = []; // will store container HTMLElement references
const styleElements: StyleElementPositions[] = []; // will store {prepend: HTMLElement, append: HTMLElement}
const usage = 'insert-css: You need to provide a CSS string. Usage: insertCss(cssString[, options]).';

function createStyleElement() {
    const styleElement = document.createElement('style');
    styleElement.setAttribute('type', 'text/css');
    return styleElement;
}

function insertCss(css: string, options?: InsertCssOptions): HTMLStyleElement {
    options = options || {};
    if (css === undefined) {
        throw new Error(usage);
    }
    const replace: boolean | undefined = options.replace;
    const position: keyof StyleElementPositions = options.prepend === true ? 'prepend' : 'append';
    const container: HTMLElement = options.container !== undefined ? options.container : (document.querySelector('head') as HTMLElement);
    let containerId: number = containers.indexOf(container);

    // first time we see this container, create the necessary entries
    if (containerId === -1) {
        containerId = containers.push(container) - 1;
        styleElements[containerId] = {};
    }

    // try to get the correponding container + position styleElement, create it otherwise
    let styleElement: HTMLStyleElement;
    if (styleElements[containerId] !== undefined && styleElements[containerId][position] !== undefined) {
        styleElement = styleElements[containerId][position] as HTMLStyleElement;
    } else {
        styleElement = styleElements[containerId][position] = createStyleElement();
        if (position === 'prepend') {
            container.insertBefore(styleElement, container.childNodes[0]);
        } else {
            container.appendChild(styleElement);
        }
    }

    // strip potential UTF-8 BOM if css was read from a file
    if (css.charCodeAt(0) === 0xfeff) {
        css = css.substr(1, css.length);
    }

    // actually add the stylesheet
    if ((styleElement as any).styleSheet) {
        replace ? ((styleElement as any).styleSheet.cssText = css) : ((styleElement as any).styleSheet.cssText += css);
    } else {
        replace ? (styleElement.textContent = css) : (styleElement.textContent += css);
    }

    return styleElement;
}

export default insertCss;
