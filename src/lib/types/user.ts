export interface User {
  id: string;
  name: string;
  email: string;
  password?: string | undefined;
  role?: "ADMIN" | "MUSYRIF";
  created_at?: string;
}