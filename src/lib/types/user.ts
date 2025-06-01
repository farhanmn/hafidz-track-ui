export interface User {
  success: boolean;
  message: string;
  data: {
    id: string;
    name: string;
    email: string;
    role: "ADMIN" | "MUSYRIF";
    created_at: string;
  }
}

export enum Role {
  ADMIN = "ADMIN",
  MUSYRIF = "MUSYRIF",
}