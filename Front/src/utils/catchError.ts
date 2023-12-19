import type { AxiosError } from 'axios'

import { useToast } from 'vue-toastification'

const toast = useToast()

export const catchError = (error: AxiosError | Error) => {
  const axiosError = error as AxiosError
  toast.error(axiosError.message)
}
