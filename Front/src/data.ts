import type { ChartOptions } from 'chart.js'

import { computed } from 'vue'

export const data = {
  Alex: {
    history: 80,
    english: 70,
    physics: '',
    geography: '',
    chemistry: 90,
    biology: 30
  },
  Michael: {
    history: '',
    english: 95,
    physics: 87,
    geography: 45,
    chemistry: '',
    biology: ''
  },
  John: {
    history: 50,
    english: 65,
    physics: '',
    geography: 85,
    chemistry: '',
    biology: 78
  },
  Oliver: {
    history: 67,
    english: 83,
    physics: 67,
    geography: '',
    chemistry: '',
    biology: 56
  },
  Alice: {
    history: 77,
    english: '',
    physics: 65,
    geography: 83,
    chemistry: 76,
    biology: 88
  },
  Ashley: {
    history: '',
    english: 98,
    physics: 100,
    geography: '',
    chemistry: 93,
    biology: 75
  },
  Max: {
    history: 55,
    english: 75,
    physics: 54,
    geography: 63,
    chemistry: 78,
    biology: 90
  },
  Jenny: {
    history: 83,
    english: '',
    physics: 72,
    geography: '',
    chemistry: 67,
    biology: ''
  },
  Grace: {
    history: '',
    english: 78,
    physics: 59,
    geography: 71,
    chemistry: '',
    biology: 63
  },
  Jason: {
    history: 62,
    english: '',
    physics: 69,
    geography: 84,
    chemistry: 66,
    biology: ''
  },
  Samantha: {
    history: '',
    english: 92,
    physics: 94,
    geography: 82,
    chemistry: 88,
    biology: 74
  },
  Julia: {
    history: 73,
    english: 86,
    physics: '',
    geography: '',
    chemistry: 97,
    biology: 89
  }
}

export const options = computed<ChartOptions<'bar' | 'pie' | 'line'>>(() => {
  return {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          color: '#353535'
        }
      }
    },
    scales: {
      x: {
        ticks: { color: '#353535' },
        grid: { color: '#353535' }
      },
      y: {
        ticks: { color: '#353535' },
        grid: { color: '#353535' }
      }
    }
  }
})
