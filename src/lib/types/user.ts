export interface User {
  id: string;
  name: string;
  email: string;
  role?: "ADMIN" | "MUSYRIF";
  created_at?: string;
}