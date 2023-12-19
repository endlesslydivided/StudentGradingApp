import { httpRequest } from '@/api'
import type { ISubject, IDecileStat } from '@/types'

const AVERAGE_SUBJECTS_GRADES_PATH = '/subjects/average-grades'

export const subjectsService = {
  getAverageSubjectsGrades: () => httpRequest().get<ISubject[]>(AVERAGE_SUBJECTS_GRADES_PATH),
  getDecileGrades: (id: string) => httpRequest().get<IDecileStat>(`/subjects/${id}/deciles-grades`)
}
