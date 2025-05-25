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

export type userData = {
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

export async function fetchUser(): Promise<userData> {
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
