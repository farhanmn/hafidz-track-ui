import { Gender, ParentType } from "@/lib/types/constant";

export interface Parent {
  id: string;
  name: string;
  gender: Gender;
  phone?: string;
  parent_status: ParentType;
  address?: string;
}

