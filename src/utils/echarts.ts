import * as echarts from 'echarts/core';
import type { BarSeriesOption, LineSeriesOption } from 'echarts/charts';
import {
    BarChart,
    EffectScatterChart,
    FunnelChart,
    LineChart,
    RadarChart,
    PieChart,
    PictorialBarChart,
    ScatterChart,
    GraphChart,
    GaugeChart,
    TreemapChart,
    HeatmapChart,
} from 'echarts/charts';
import type {
    TitleComponentOption,
    TooltipComponentOption,
    LegendComponentOption,
    GridComponentOption,
    GraphicComponentOption,
    DataZoomComponentOption,
    DatasetComponentOption,
    ToolboxComponentOption,
    VisualMapComponentOption,
} from 'echarts/components';
import {
    TitleComponent,
    TooltipComponent,
    LegendComponent,
    GridComponent,
    GraphicComponent,
    DataZoomComponent,
    DatasetComponent,
    TransformComponent,
    ToolboxComponent,
    VisualMapComponent,
} from 'echarts/components';
import { LabelLayout, UniversalTransition } from 'echarts/features';
import { CanvasRenderer } from 'echarts/renderers';

// 注册必须的组件
echarts.use([
    TitleComponent,
    TooltipComponent,
    LegendComponent,
    GridComponent,
    GraphicComponent,
    DataZoomComponent,
    DatasetComponent,
    TransformComponent,
    ToolboxComponent,
    VisualMapComponent,
    BarChart,
    EffectScatterChart,
    FunnelChart,
    LineChart,
    RadarChart,
    PieChart,
    PictorialBarChart,
    ScatterChart,
    GraphChart,
    GaugeChart,
    TreemapChart,
    HeatmapChart,
    LabelLayout,
    UniversalTransition,
    CanvasRenderer,
]);

// 通过 ComposeOption 来组合出一个只有必须组件和图表的 Option 类型
export type ECOption = echarts.ComposeOption<
    | BarSeriesOption
    | LineSeriesOption
    | TitleComponentOption
    | TooltipComponentOption
    | LegendComponentOption
    | GridComponentOption
    | GraphicComponentOption
    | DataZoomComponentOption
    | DatasetComponentOption
    | ToolboxComponentOption
    | VisualMapComponentOption
>;

export default echarts;
