<script setup lang="ts">
import { ref, computed, watch, onMounted, onBeforeUnmount, markRaw } from 'vue';
import { merge } from 'lodash';
import type { ECOption } from '@src/utils/echarts';
import echarts from '@src/utils/echarts';

const props = withDefaults(
    defineProps<{
        option?: ECOption;
        unit?: string;
        isAxial?: boolean;
        showXAxisLine?: boolean;
        showYAxisLine?: boolean;
        colors?: string[];
        loading?: boolean;
        isZoom?: boolean;
        notMerge?: boolean;
    }>(),
    {
        unit: '',
        isAxial: false,
        showXAxisLine: false,
        showYAxisLine: false,
        colors: () => [],
        loading: true,
        isZoom: false,
        notMerge: true,
    }
);
/**
 * data
 */
const myChart = ref();
const eChart = ref(null);
const defaultOption = computed(() => {
    return {
        ...(props.colors && {
            colors: props.colors,
        }),
        tooltip: {
            trigger: 'axis',
        },
        grid: {
            top: '20',
            bottom: '0',
            right: '20',
            left: '5',
            containLabel: true,
        },
        xAxis: {
            type: props.isAxial ? 'value' : 'category',
            name: props.isAxial ? props.unit : '',
            axisLine: {
                show: props.showXAxisLine,
                lineStyle: {
                    color: '#85878f',
                },
            },
            splitLine: {
                lineStyle: {
                    color: '#eceff6',
                },
            },
            axisLabel: {
                show: true,
                interval: 0,
                margin: 15,
                color: '#85878f',
                fontSize: 12,
            },
        },
        yAxis: {
            type: props.isAxial ? 'category' : 'value',
            name: props.isAxial ? '' : props.unit,
            axisLine: {
                show: props.showYAxisLine,
            },
            splitLine: {
                lineStyle: {
                    color: '#eceff6',
                },
            },
            axisLabel: {
                show: true,
                margin: 10,
                color: '#85878f',
                fontSize: 12,
            },
        },
        series: {},
        ...(props.isZoom && {
            dataZoom: [
                {
                    type: 'inside',
                    start: 0,
                    end: 100,
                },
            ],
        }),
    };
});

/**
 * methods
 */
const getChart = () => {
    if (!eChart.value) return;
    myChart.value = markRaw(echarts.init(eChart.value));
    // 使用 notMerge 的形式可以移除坐标轴
    myChart.value.setOption(merge(defaultOption.value, props.option), props.notMerge);
};
const resizeChart = () => {
    myChart.value.resize();
};

/**
 * watch
 */
watch(
    () => props.option,
    () => {
        myChart.value.setOption(merge(defaultOption.value, props.option), props.notMerge);
    },
    {
        deep: true,
    }
);
watch(
    () => props.loading,
    value => {
        if (value) {
            myChart.value && myChart.value.showLoading();
        } else {
            myChart.value && myChart.value.hideLoading();
        }
    }
);

/**
 * onMounted
 */
onMounted(() => {
    getChart();
    window.addEventListener('resize', resizeChart); // 窗口大小发生变化的时候重置
});

/**
 * onBeforeUnmount
 */
onBeforeUnmount(() => {
    () => window.removeEventListener('resize', resizeChart);
});

/**
 * defineExpose
 */
defineExpose({
    resizeChart,
});
</script>

<template>
    <div :style="{ width: '100%', height: '100%' }" ref="eChart"></div>
</template>
