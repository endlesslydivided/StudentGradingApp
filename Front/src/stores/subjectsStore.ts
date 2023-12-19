import type { AxiosError } from 'axios'
import { defineStore } from 'pinia'

import { ref } from 'vue'

import { subjectsService } from '@/services/subjects.service'
import { catchError } from '@/utils/catchError'
import type { IDecileStat, ISubject } from '@/types'

export const useSubjectsStore = defineStore('Subjects store', () => {
  const avgSubjectsGrades = ref<ISubject[] | []>([])
  const decileGrades = ref<IDecileStat | null>(null)

  const getAverageSubjectsGrades = async () => {
    try {
      const response = await subjectsService.getAverageSubjectsGrades()
      if (response) {
        avgSubjectsGrades.value = response
      }
    } catch (err) {
      catchError(err as AxiosError)
    }
  }

  const getDecileGrades = async (id: string) => {
    try {
      const response = await subjectsService.getDecileGrades(id)
      if (response) {
        decileGrades.value = response
      }
    } catch (err) {
      catchError(err as AxiosError)
    }
  }

  return {
    avgSubjectsGrades,
    decileGrades,
    getAverageSubjectsGrades,
    getDecileGrades
  }
})
