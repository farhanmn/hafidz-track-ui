'use client';
import React, {useEffect, useState} from "react";
import {Table, TableBody, TableCell, TableHeader, TableRow} from "../ui/table";
import {Role} from "@/lib/types/constant";
import {getUsers} from "@/lib/api/user";
import Select from "@/components/form/Select";
import Button from "@/components/ui/button/Button";
import Tooltip, {POSITION} from "@/components/ui/tooltip/Tooltip";
import {User} from "@/lib/types/user";
import {PencilIcon, TrashBinIcon} from "@/icons"
import {useRouter} from 'next/navigation';
import {fetchUser} from "@/lib/api/auth";

interface Options {
  value: string;
  label: string;
}

export default function UserTable() {
  const [roleId, setRoleId] = useState('');
  const [role, setRole] = useState<Options[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [loggedUsers, setLoggedUsers] = useState<User>();
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleAdd = () => {
    router.push('/users/add');
  };

  const handleEdit = (id: string) => {
    router.push(`/users/${id}/edit`);
  };

  const handleDelete = async (id: string) => {
    const confirmed = confirm('Apakah Anda yakin ingin menghapus data siswa ini?');
    if (!confirmed) return;

    try {
      console.log('Deleting student with id:', id);

      loadUsers();
    } catch (error) {
      console.error('Gagal menghapus siswa:', error);
    }
  };

  const handleSelectChange = (value: string) => {
    console.log("Selected value:", value);
    setRoleId(value);
    loadUsers(value as Role);
  };

  const loadRole = async () => {
    setLoading(true);
    try {
      const res = [
        {
          value: "ALL",
          label: "ALL",
        },
        {
          value: Role.ADMIN,
          label: Role.ADMIN,
        },
        {
          value: Role.MUSYRIF,
          label: Role.MUSYRIF,
        }
      ]
      setRole(res);
    } catch (err) {
      console.error('Failed to load user data:', err);
    } finally {
      setLoading(false);
    }
  }

  const loadUsers = async (role?: Role) => {
    setLoading(true);
    try {
      const res = await getUsers(role);
      setUsers(res.data.data);
    } catch (err) {
      console.error('Failed to load student data:', err);
    } finally {
      setLoading(false);
    }
  };

  const getProfile = async () => {
    try {
      const res = await fetchUser();
      setLoggedUsers(res.data);
    } catch (err) {
      console.error('Failed to load student data:', err);
    }
  }

  useEffect(() => {
    getProfile();
    loadRole();
    loadUsers();
  }, []);


  return (
    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
      <div className="rounded-xl shadow p-5 mb-6">
        <div className="text-right">
          <Button
            onClick={handleAdd}
            disabled={loading}
            className="bg-green-600 dark:bg-green-700 text-white dark:text-white/90 rounded-lg hover:bg-green-700 dark:hover:bg-green-800 transition"
            size="sm"
          >
            Add User
          </Button>
        </div>
      </div>

      <div className="max-w-full overflow-x-auto">
        <div className="min-w-[1102px]">
          <Table>
            {/* Table Header */}
            <TableHeader className="border-b border-gray-100 dark:border-white/[0.05]">
              <TableRow>
                <TableCell
                  isHeader
                  className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                >
                  Name
                </TableCell>
                <TableCell
                  isHeader
                  className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                >
                  Email
                </TableCell>
                <TableCell
                  isHeader
                  className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                >
                  <Select
                    options={role}
                    onChange={handleSelectChange}
                    className="dark:bg-dark-900"
                  />
                </TableCell>
                <TableCell
                  isHeader
                  className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                >
                  Created At
                </TableCell>
                <TableCell
                  isHeader
                  className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                >
                  Action
                </TableCell>
              </TableRow>
            </TableHeader>

            {/* Table Body */}
            <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
              {users.map((user) => (
                <TableRow key={user.id}>
                  <TableCell className="px-5 py-4 sm:px-6 text-start">
                    <div className="flex items-center gap-3">
                      {/*<div className="w-10 h-10 overflow-hidden rounded-full">*/}
                      {/*  <Image*/}
                      {/*    width={40}*/}
                      {/*    height={40}*/}
                      {/*    src={order.user.image}*/}
                      {/*    alt={order.user.name}*/}
                      {/*  />*/}
                      {/*</div>*/}
                      <div>
                        <span className="block font-medium text-gray-800 text-theme-sm dark:text-white/90">
                          {user.name}
                        </span>
                        <span className="block text-gray-500 text-theme-xs dark:text-gray-400">
                          {user.id}
                        </span>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                    {user.email}
                  </TableCell>
                  <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                    {user.role}
                  </TableCell>
                  <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                    {user.created_at}
                  </TableCell>
                  <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                    <div className="flex items-center gap-2">
                      <Button
                        onClick={() => handleEdit(user.id)}
                        type="button"
                        className="bg-yellow-500 dark:bg-yellow-600 hover:bg-yellow-600 dark:hover:bg-yellow-700 text-white dark:text-white/90"
                        size="sm"
                      >
                        <PencilIcon className="fill-gray-500 dark:fill-gray-400" />
                      </Button>
                      { loggedUsers?.id !== user.id ? (
                        <Button
                          onClick={() => handleDelete(user.id)}
                          type="button"
                          className="bg-red-600 dark:bg-red-700 hover:bg-red-700 dark:hover:bg-red-800 text-white dark:text-white/90"
                          size="sm"
                        >
                          <TrashBinIcon className="fill-gray-500 dark:fill-gray-400" />
                        </Button>
                      ) : (
                        <Tooltip text="Cannot delete the account you are currently logged in to" position={POSITION.top}>
                          <Button
                            onClick={() => handleDelete(user.id)}
                            type="button"
                            className="bg-red-600 dark:bg-red-700 hover:bg-red-700 dark:hover:bg-red-800 text-white dark:text-white/90"
                            size="sm"
                            disabled
                          >
                            <TrashBinIcon className="fill-gray-500 dark:fill-gray-400" />
                          </Button>
                        </Tooltip>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}
