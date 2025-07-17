import visualizer from 'rollup-plugin-visualizer';

export const rollupPluginVisualizer = () =>
    visualizer({
        filename: 'report.html',
        open: true,
        gzipSize: true,
        brotliSize: true,
    });
