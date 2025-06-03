import { Gender, GradeStatus, StudentStatus } from "@/lib/types/constant";
import { User } from "@/lib/types/user";
import { Parent } from "@/lib/types/parent";

export interface Student {
  id: string;
  musyrif_id: string;
  name: string;
  gender: Gender;
  grade: string;
  grade_status: GradeStatus;
  birth_date: string;
  join_date: string;
  status: StudentStatus;
  Musyrif: User;
  Parent: Parent;
}