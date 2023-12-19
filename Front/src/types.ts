export interface IGrade {
  id: string
  studentId: string
  subjectId: string
  isLastSubmitted: string
}

export interface IStudent {
  id: string
  name: string
  createdAt: string
  updatedAt: string
  averageGrade: string
}

export interface ISubject {
  id: string
  name: string
  medialGrade: number
  averageGrade: string
  createdAt: string
  updatedAt: string
}

export interface IDecileStat {
  id: string
  name: string
  createdAt: string
  updatedAt: string
  deciles: number[]
}

export interface IStudentGrades {
  value: string
  subject: {
    name: string
  }
}

export interface IStudentStat {
  id: string
  name: string
  createdAt: string
  updatedAt: string
  averageGrade: string
  grades: IStudentGrades[]
}
