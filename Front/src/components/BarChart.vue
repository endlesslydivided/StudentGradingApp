<template>
  <h2 v-if="chartTitle" class="chart-title">{{ chartTitle }}</h2>
  <Bar v-if="chartData" @click="onClick" ref="chartRef" :data="chartData" :options="options" />
</template>

<script setup lang="ts">
import {
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  Title,
  Tooltip,
  type InteractionItem
} from 'chart.js'

import { ref } from 'vue'
import { Bar, getElementAtEvent, type ChartComponentRef } from 'vue-chartjs'
import { options } from '../data'
import type { IStudent, ISubject } from '@/types'

const props = defineProps<{
  chartData: any
  chartTitle?: string
  items?: ISubject[] | IStudent[]
}>()

const emit = defineEmits<(e: 'selectItem', value: string) => void>()

const chartRef = ref<ChartComponentRef | null>(null)

const elementAtEvent = (element: InteractionItem[]) => {
  if (!element.length) return
  const { index } = element[0]

  if (props.items) {
    const id = props.items[index].id
    emit('selectItem', id)
  }
}

const onClick = (event: MouseEvent) => {
  const {
    value: { chart }
  } = chartRef

  if (!chart) {
    return
  }

  elementAtEvent(getElementAtEvent(chart, event))
}

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)
</script>

<style scoped lang="scss">
.chart-title {
  text-align: center;
  margin-bottom: var(--space-xs);
}
</style>
