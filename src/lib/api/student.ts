import { Response } from "@/lib/types/response";
import { Student } from "@/lib/types/student";

export async function fetchStudent({
  grade_status,
  musyrif_id,
  name,
  }: {
  grade_status?: string,
  musyrif_id?: string,
  name?: string,
} ): Promise<Response<Student[]>> {
  const params = new URLSearchParams();
  if (grade_status) params.append('grade_status', grade_status);
  if (musyrif_id) params.append('musyrif_id', musyrif_id);
  if (name) params.append('name', name);

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/students?${params.toString()}`, {
    method: 'GET',
    credentials: 'include',
  });

  if (!res.ok) throw new Error('Get student data failed');
  return res.json();
}