export interface Task {
  id: string;
  title: string;
  completed: boolean;
  dueDate: Date | null;
  createdAt: Date;
  userId: string;
}

export type TaskFilter = 'all' | 'completed' | 'pending';

export type ThemeMode = 'light' | 'dark';