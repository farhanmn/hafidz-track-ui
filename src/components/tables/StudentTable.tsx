'use client';
import React, {useEffect, useState} from "react";
import {Table, TableBody, TableCell, TableHeader, TableRow,} from "../ui/table";

import {Student} from "@/lib/types/student";
import Badge from "../ui/badge/Badge";
import {fetchStudent} from "@/lib/api/student";
import { StudentStatus} from "@/lib/types/constant";
import {getUsers} from "@/lib/api/user";
import Select from "@/components/form/Select";
import Input from "@/components/form/input/InputField";
import Button from "@/components/ui/button/Button";

interface Options {
  value: string;
  label: string;
}

export default function StudentTable() {
  const [gradeStatus, setGradeStatus] = useState('');
  const [musyrifId, setMusyrifId] = useState('');
  const [name, setName] = useState('');
  const [students, setStudents] = useState<Student[]>([]);
  const [musyrif, setMusyrif] = useState<Options[]>([]);
  const [loading, setLoading] = useState(false);

  const handleAdd = () => {
    console.log('Add student with id:');
  };

  const handleEdit = (id: string) => {
    console.log('Edit student with id:', id);
  };

  const handleDelete = async (id: string) => {
    const confirmed = confirm('Apakah Anda yakin ingin menghapus data siswa ini?');
    if (!confirmed) return;

    try {
      console.log('Deleting student with id:', id);

      loadStudents();
    } catch (error) {
      console.error('Gagal menghapus siswa:', error);
    }
  };


  const handleSelectChange = (value: string) => {
    console.log("Selected value:", value);
    setMusyrifId(value);
  };

  const loadMusyrif = async () => {
    setLoading(true);
    try {
      const res = await getUsers('musyrif');
      const options = res.data.data.map((item) => {
        return {
          value: item.id,
          label: item.name,
        }
      })
      setMusyrif(options);
    } catch (err) {
      console.error('Failed to load user data:', err);
    } finally {
      setLoading(false);
    }
  }

  const loadStudents = async (filter: {
    grade_status?: string;
    musyrif_id?: string;
    name?: string;
  } = {}) => {
    setLoading(true);
    try {
      const res = await fetchStudent(filter);
      setStudents(res.data.data);
    } catch (err) {
      console.error('Failed to load student data:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadMusyrif();
    loadStudents();
  }, []);

  const handleFilter = () => {
    loadStudents({
      grade_status: gradeStatus || undefined,
      musyrif_id: musyrifId || undefined,
      name: name || undefined,
    });
  };


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
            Add Student
          </Button>
        </div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-gray-800 dark:text-white/90 flex items-center gap-2">
            Filter
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <div>
            <Input
              type="text"
              placeholder="Name"
              name={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full border border-gray-300 rounded-lg py-2 pr-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <Input
              type="text"
              placeholder="Grade Status"
              name={gradeStatus}
              onChange={(e) => setGradeStatus(e.target.value)}
              className="w-full border border-gray-300 rounded-lg py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <Select
              options={musyrif}
              placeholder="Select Musyrif"
              onChange={handleSelectChange}
              className="dark:bg-dark-900"
            />
          </div>
        </div>
        <div className="text-right">
          <Button
            onClick={handleFilter}
            disabled={loading}
            className="bg-blue-600 dark:bg-blue-900 text-white dark:text-white/90 rounded-lg hover:bg-blue-700 transition"
          >
            {loading ? 'Loading...' : 'Apply Filter'}
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
                  Gender
                </TableCell>
                <TableCell
                  isHeader
                  className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                >
                  Grade
                </TableCell>
                <TableCell
                  isHeader
                  className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                >
                  Grade Status
                </TableCell>
                <TableCell
                  isHeader
                  className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                >
                  Musyrif
                </TableCell>
                <TableCell
                  isHeader
                  className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                >
                  Status
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
              {students.map((student) => (
                <TableRow key={student.id}>
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
                          {student.name}
                        </span>
                        <span className="block text-gray-500 text-theme-xs dark:text-gray-400">
                          {student.id}
                        </span>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                    {student.gender}
                  </TableCell>
                  <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                    {student.grade}
                  </TableCell>
                  <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                    {student.grade_status}
                  </TableCell>
                  <TableCell className="px-4 py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                    {student.Musyrif.name}
                  </TableCell>
                  <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                    <Badge
                      size="sm"
                      color={
                        student.status === StudentStatus.ACTIVE
                          ? "success"
                          : student.status === StudentStatus.NONACTIVE
                            ? "warning"
                            : "error"
                      }
                    >
                      {student.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                    <div className="flex items-center gap-2">
                      <Button
                        onClick={() => handleEdit(student.id)}
                        type="button"
                        className="bg-yellow-500 dark:bg-yellow-600 hover:bg-yellow-600 dark:hover:bg-yellow-700 text-white dark:text-white/90"
                        size="sm"
                      >
                        Edit
                      </Button>
                      <Button
                        onClick={() => handleDelete(student.id)}
                        type="button"
                        className="bg-red-600 dark:bg-red-700 hover:bg-red-700 dark:hover:bg-red-800 text-white dark:text-white/90"
                        size="sm"
                      >
                        Delete
                      </Button>
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
