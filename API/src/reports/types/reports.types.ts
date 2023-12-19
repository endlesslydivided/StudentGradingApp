export interface ReportSubject {
  name: string;
}

export interface ReportGrade {
  mark?: number;
  subjectId?: string;
  isLastSubmitted: true;
}

export interface StudentReport {
  name: string;
  grades: Array<ReportGrade>;
}
