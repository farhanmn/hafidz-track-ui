import { Response } from "@/lib/types/response";
import { User } from "@/lib/types/user";

export async function getUsers(role?: string): Promise<Response<User[]>> {
  const params = new URLSearchParams();
  if (role) params.append('role', role);

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users?${params.toString()}`, {
    method: 'GET',
    credentials: 'include',
  });

  if (!res.ok) throw new Error('Get user data failed');
  return res.json();
}