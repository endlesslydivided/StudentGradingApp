import { httpRequest } from '@/api'
import type { IStudent, IStudentStat } from '@/types'

const AVERAGE_STUDENTS_GRADES_PATH = '/students/average-grades'

export const studentsService = {
  getAverageStudentsGrades: () => httpRequest().get<IStudent[]>(AVERAGE_STUDENTS_GRADES_PATH),
  getSelectedGrades: (id: string) => httpRequest().get<IStudentStat>(`/students/${id}/grades`)
}
