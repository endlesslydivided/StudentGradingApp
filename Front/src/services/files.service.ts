import { httpRequest } from '@/api'

const FILE_UPLOAD_PATH = '/reports'

interface ISubjectGrade {
  [key: string]: number | string
}

export const filesService = {
  uploadFile: (data: FormData) =>
    httpRequest('multipart/form-data').post<ISubjectGrade>(FILE_UPLOAD_PATH, data)
}
