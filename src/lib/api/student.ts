import { Response } from "@/lib/types/response";
import { Student } from "@/lib/types/student";
import { Gender, GradeStatus } from "../types/constant";

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

export async function addStudent(name: string, grade: string, gender: Gender, gradeStatus: GradeStatus, musyrif: string) {
  console.log('Adding student with data:', { name, grade, gender, gradeStatus, musyrif });
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/students`, {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ name, grade, gender, grade_status: gradeStatus, musyrif_id: musyrif }),
  })

  if (!res.ok) throw new Error('Register failed');
  return res.json();
}