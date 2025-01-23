export interface MentalHealthQuestion {
  id: string;
  question: string;
  type: 'scale' | 'choice' | 'text';
  options?: string[];
}

export interface Exercise {
  id: string;
  title: string;
  type: 'meditation' | 'breathing' | 'journaling';
  duration: string;
  description: string;
  imageUrl: string;
  benefits: string[];
}

export interface ScreeningResult {
  stress: number;
  anxiety: number;
  mood: number;
  recommendations: string[];
}

export interface JournalEntry {
  id: string;
  date: string;
  mood: number;
  content: string;
  tags: string[];
}

export interface User {
  id: string;
  email: string;
  name?: string;
}

export interface AuthState {
  user: User | null;
  isLoading: boolean;
  error: string | null;
}