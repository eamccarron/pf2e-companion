export interface Selection<T> {
  primary: string;
  id: string | number;
  secondary?: string;
  description?: string;
  content: T;
}
