'use client';
import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import React from "react";
import UserForm from "@/components/form/form-elements/UserForm";
import { registerUser } from "@/lib/api/auth";
import { useRouter } from "next/navigation";
import { Role } from "@/lib/types/constant";

export default function AddUserPage() {
  const router = useRouter();

  const handleAddUser = async (data: { name: string; email: string; password: string; role: Role }) => {
    try {
      const res = await registerUser(data.name, data.email, data.password, data.role);
      if (res.success) {
        router.push("/users");
      } else {
        alert("An error occurred while creating user");
      }
    } catch (err) {
      console.error(err);
      alert("Internal server error!");
    }
  };

  return (
    <div>
      <PageBreadcrumb pageTitle="Add User" />
      <div className="grid grid-cols-1">
        <div className="">
          <UserForm onSubmit={handleAddUser} />
        </div>
      </div>
    </div>
  );
}
