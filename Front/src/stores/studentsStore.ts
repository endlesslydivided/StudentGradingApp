import type { AxiosError } from 'axios'
import { defineStore } from 'pinia'

import { ref } from 'vue'

import { studentsService } from '@/services/students.service'
import { catchError } from '@/utils/catchError'
import type { IStudent, IStudentStat } from '@/types'

export const useStudentsStore = defineStore('Grades store', () => {
  const avgStudentsGrades = ref<IStudent[] | []>([])
  const selectedGrades = ref<IStudentStat | null>(null)

  const getAverageStudentsGrades = async () => {
    try {
      const response = await studentsService.getAverageStudentsGrades()
      if (response) {
        avgStudentsGrades.value = response
      }
    } catch (err) {
      catchError(err as AxiosError)
    }
  }

  const getSelectedGrades = async (id: string) => {
    try {
      const response = await studentsService.getSelectedGrades(id)
      if (response) {
        selectedGrades.value = response
      }
    } catch (err) {
      catchError(err as AxiosError)
    }
  }

  return {
    avgStudentsGrades,
    selectedGrades,
    getAverageStudentsGrades,
    getSelectedGrades
  }
})
