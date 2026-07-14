// ---------------------------- 图片缩放 ----------------------------

/** OSS 图片缩放模式，参见 https://help.aliyun.com/document_detail/44688.html */
export type OSSImageResizeMode = 'lfit' | 'mfit' | 'fill' | 'pad' | 'fixed';

/** 语义化缩放：cover 裁剪填充，contain 等比缩放至区域内 */
export type OSSImageFitMode = 'cover' | 'contain';

/** OSS 图片缩放参数 */
export interface OSSImageResizeOptions {
    /** 目标宽度 [1, 16384] */
    width?: number;
    /** 目标高度 [1, 16384] */
    height?: number;
    /** 按百分比缩放 [1, 1000]，小于 100 缩小，大于 100 放大 */
    percent?: number;
    /** OSS 缩放模式，默认 lfit；若同时指定 fit，fit 优先生效 */
    mode?: OSSImageResizeMode;
    /** 语义化模式：cover → fill，contain → lfit */
    fit?: OSSImageFitMode;
    /** 最长边 [1, 16384] */
    longest?: number;
    /** 最短边 [1, 16384] */
    shortest?: number;
    /** 目标尺寸大于原图时是否放大：1 不放大（默认），0 允许放大 */
    limit?: 0 | 1;
    /** pad 模式填充色，如 '000000' */
    color?: string;
}

const FIT_TO_RESIZE_MODE: Record<OSSImageFitMode, OSSImageResizeMode> = {
    cover: 'fill',
    contain: 'lfit',
};

const buildResizeSegment = (options: OSSImageResizeOptions): string | null => {
    const params: string[] = [];
    const mode = options.fit ? FIT_TO_RESIZE_MODE[options.fit] : options.mode ?? 'lfit';
    params.push(`m_${mode}`);

    if (options.percent !== undefined) params.push(`p_${options.percent}`);
    if (options.width !== undefined) params.push(`w_${options.width}`);
    if (options.height !== undefined) params.push(`h_${options.height}`);
    if (options.longest !== undefined) params.push(`l_${options.longest}`);
    if (options.shortest !== undefined) params.push(`s_${options.shortest}`);
    if (options.limit !== undefined) params.push(`limit_${options.limit}`);
    if (options.color !== undefined) params.push(`color_${options.color}`);

    // 仅有默认 m_lfit 时不生成 resize 段
    if (params.length === 1 && !options.fit && !options.mode) return null;

    return `resize,${params.join(',')}`;
};

// ---------------------------- 质量变换 ----------------------------

/** OSS 图片质量变换参数（相对质量 q 与绝对质量 Q 二选一） */
export type OSSImageQualityOptions = { relative: number; absolute?: never } | { absolute: number; relative?: never };

const buildQualitySegment = (options: OSSImageQualityOptions): string => {
    if ('absolute' in options && options.absolute !== undefined) {
        return `quality,Q_${options.absolute}`;
    }
    return `quality,q_${options.relative}`;
};

// ---------------------------- 格式转换 ----------------------------

/** OSS 图片输出格式 */
export type OSSImageFormat = 'jpg' | 'png' | 'webp' | 'bmp' | 'gif' | 'tiff' | 'heic' | 'avif';

const buildFormatSegment = (format: OSSImageFormat): string => `format,${format}`;

// ---------------------------- 组合处理 ----------------------------

/** OSS 图片处理参数；处理链顺序按对象 key 的写入顺序决定 */
export interface OSSImageProcessOptions {
    resize?: OSSImageResizeOptions;
    quality?: OSSImageQualityOptions;
    format?: OSSImageFormat;
}

type OSSProcessKey = keyof OSSImageProcessOptions;

const buildSegmentByKey = (key: OSSProcessKey, options: OSSImageProcessOptions): string | null => {
    switch (key) {
        case 'resize':
            return options.resize ? buildResizeSegment(options.resize) : null;
        case 'quality':
            return options.quality ? buildQualitySegment(options.quality) : null;
        case 'format':
            return options.format ? buildFormatSegment(options.format) : null;
    }
};

/** 按 options 的 key 插入顺序拼接各处理段 */
const buildOSSImageProcess = (options: OSSImageProcessOptions): string | null => {
    const segments = (Object.keys(options) as OSSProcessKey[])
        .map(key => buildSegmentByKey(key, options))
        .filter((segment): segment is string => segment !== null);

    return segments.length ? `image/${segments.join('/')}` : null;
};

/**
 * 为 OSS 图片 URL 追加处理参数（缩放 / 质量 / 格式）
 * 处理链顺序由 options 的 key 写入顺序决定，如 `{ quality, format }` 与 `{ format, quality }` 结果不同
 * @example getOSSImageUrl(url, { resize: { width: 400, height: 610, fit: 'cover' } })
 * @example getOSSImageUrl(url, { quality: { relative: 90 }, format: 'webp' })
 * @example getOSSImageUrl(url, { format: 'webp', quality: { absolute: 10 } })
 */
export const getOSSImageUrl = (url: string, options: OSSImageProcessOptions = {}): string => {
    if (!url) return url;

    const process = buildOSSImageProcess(options);
    if (!process) return url;

    return `${url}${url.includes('?') ? '&' : '?'}x-oss-process=${process}`;
};
