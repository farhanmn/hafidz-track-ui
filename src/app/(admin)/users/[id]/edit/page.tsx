"use client";
import {useRouter} from 'next/navigation';
import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import UserForm from "@/components/form/form-elements/UserForm";
import React, {useEffect, useState, use} from "react";
import {getUserById, updateUser} from "@/lib/api/user";
import {User} from "@/lib/types/user";
import {SingleResponse} from "@/lib/types/response";

function getUser(id: string): Promise<SingleResponse<User>> {
  return getUserById(id)
}

export default function EditUserPage(props: { params: Promise<{ id: string }> }) {
  const router = useRouter();
  const params = use(props.params);
  const [user, setUser] = useState<User>();
  const [, setLoading] = useState(false);
  // if (!user) return notFound();

  const loadUser = async (id: string) => {
    setLoading(true);
    try {
      const res = await getUser(id);
      setUser(res.data);
    } catch (err) {
      console.error('Failed to load data:', err);
    } finally {
      setLoading(false);
    }
  }

  const handleEditUser = async (data: { name: string }) => {
    try {
      const res = await updateUser(params.id, data.name)

      if (res.success) {
        router.push("/users");
      } else {
        alert("An error occurred while updating user");
      }
    } catch (err) {
      console.error(err);
      alert("Internal Server Error");
    }
  };

  useEffect(() => {
    loadUser(params.id);
  }, []);

  return (
    <div>
      <PageBreadcrumb pageTitle="Edit User" />
      <div className="grid grid-cols-1">
        <div className="">
          <UserForm mode="edit" initialData={user} onSubmit={handleEditUser} />
        </div>
      </div>
    </div>
  );
}
