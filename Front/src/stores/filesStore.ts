import type { AxiosError } from 'axios'
import { defineStore } from 'pinia'

import { filesService } from '@/services/files.service'
import { catchError } from '@/utils/catchError'

import { useSubjectsStore } from './subjectsStore'
import { useStudentsStore } from './studentsStore'

import { useToast } from 'vue-toastification'

const toast = useToast()

export const useFilesStore = defineStore('Files store', () => {
  const { getAverageStudentsGrades } = useStudentsStore()
  const { getAverageSubjectsGrades } = useSubjectsStore()

  const uploadFile = async (data: FormData) => {
    try {
      const response = await filesService.uploadFile(data)
      if (response) {
        toast.success('File uploaded!')
        getAverageStudentsGrades()
        getAverageSubjectsGrades()
      }
    } catch (err) {
      catchError(err as AxiosError)
    }
  }

  return {
    uploadFile
  }
})
