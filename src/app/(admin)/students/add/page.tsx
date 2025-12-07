'use client';
import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import React from "react";
import StudentForm from "@/components/form/form-elements/StudentForm";
import { addStudent } from "@/lib/api/student";
import { useRouter } from "next/navigation";
import { Gender, GradeStatus } from "@/lib/types/constant";

export default function AddUserPage() {
  const router = useRouter();

  const handleAddStudent = async (data: { name: string; grade: string; gender: Gender, gradeStatus: GradeStatus, musyrif: string }) => {
    try {
      const res = await addStudent(data.name, data.grade, data.gender, data.gradeStatus, data.musyrif);
      console.log(res);
      if (res.success) {
        router.push("/students");
      } else {
        alert("An error occurred while creating student");
      }
    } catch (err) {
      console.error(err);
      alert("Internal server error!");
    }
  };

  return (
    <div>
      <PageBreadcrumb pageTitle="Add Student" />
      <div className="grid grid-cols-1">
        <div className="">
          <StudentForm onSubmit={handleAddStudent} />
        </div>
      </div>
    </div>
  );
}
