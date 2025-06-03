import { User } from "@/lib/types/user";
import { Response } from "@/lib/types/response";
import { Role } from "@/lib/types/constant";

export async function loginUser(email: string, password: string) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/login`, {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  });

  if (!res.ok) throw new Error('Login failed');
  return res.json();
}

export async function logoutUser() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/logout`, {
    method: 'POST',
    credentials: 'include',
  })

  if (!res.ok) throw new Error('Logout failed');
  return res.json();
}

export async function fetchUser(): Promise<Response<User>> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/me`, {
    method: 'GET',
    credentials: 'include',
  });

  if (!res.ok) {
    throw new Error('Not authenticated');
  }

  const data = await res.json();
  return data;
}

export async function registerUser(name: string, email: string, password: string, role: Role) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/register`, {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ name, email, password, role }),
  })

  if (!res.ok) throw new Error('Register failed');
  return res.json();
}
