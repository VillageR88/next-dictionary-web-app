export interface QuizData {
  quizzes: Quiz[];
}

export interface Quiz {
  title: string;
  icon: string;
  questions: Question[];
}

export interface Question {
  question: string;
  options: string[];
  answer: string;
}

export enum Selection {
  HTML = 'HTML',
  CSS = 'CSS',
  JavaScript = 'JavaScript',
  Accessibility = 'Accessibility',
}
