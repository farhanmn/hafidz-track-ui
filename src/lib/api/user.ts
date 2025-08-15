import {Response, SingleResponse} from "@/lib/types/response";
import { User } from "@/lib/types/user";

export async function getUsers(role?: string): Promise<Response<User[]>> {
  const params = new URLSearchParams();
  if (role && role !== 'ALL') params.append('role', role);

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users?${params.toString()}`, {
    method: 'GET',
    credentials: 'include',
  });

  if (!res.ok) throw new Error('Get user data failed');
  return res.json();
}

export async function getUserById(id: string): Promise<SingleResponse<User>> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/${id}/detail`, {
    method: 'GET',
    credentials: 'include',
  })

  if (!res.ok) throw new Error('Get user data failed');
  return res.json()
}

export async function updateUser(id: string, name: string) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/${id}`, {
    method: 'PATCH',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ name }),
  })

  if (!res.ok) throw new Error('Update user data failed');
  return res.json()
}