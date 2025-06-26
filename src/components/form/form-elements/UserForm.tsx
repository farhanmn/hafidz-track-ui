"use client";
import React, {useEffect, useState} from 'react';
import ComponentCard from '../../common/ComponentCard';
import Label from '../Label';
import Input from '../input/InputField';
import Select from '../Select';
import {ChevronDownIcon, EyeCloseIcon, EyeIcon} from '../../../icons';
import {Role} from "@/lib/types/constant";
import Button from "@/components/ui/button/Button";

interface UserFormProps {
  onSubmit: (data: { name: string; email: string; password: string; role: Role }) => void;
  initialData?: {
    name: string;
  };
  mode?: 'add' | 'edit';
}

interface Options {
  value: string;
  label: string;
}

export default function UserForm({ onSubmit, initialData, mode = 'add' }: UserFormProps) {
  const [name, setName] = useState(initialData?.name || '');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [role, setRole] = useState<Options[]>([]);
  const [roleId, setRoleId] = useState(Role.ADMIN);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ name, email, password, role: roleId });
  };

  const loadRole = async () => {
    setLoading(true);
    try {
      const res = [
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

  const handleSelectChange = (value: string) => {
    console.log("Selected value:", value);
    setRoleId(value as Role);
  };

  useEffect(() => {
    loadRole();
    if (initialData) {
      setName(initialData.name);
    }
  }, [initialData]);
  return (
    <ComponentCard title={mode === 'add' ? 'Add User' : 'Edit User'}>
      <form onSubmit={handleSubmit} className="max-w-lg mx-auto space-y-4">
        <div className="space-y-6">
        <div>
          <Label>Name</Label>
          <Input
            type="text"
            name={name}
            defaultValue={name}
            onChange={e => setName(e.target.value)}
            required
          />
        </div>
        {mode === 'add' && (
          <div>
          <Label>Email</Label>
          <Input
            type="email"
            name={email}
            onChange={e => setEmail(e.target.value)}
            required
          />
        </div>
        )}

        {mode === 'add' && (
          <div>
          <Label>Password</Label>
          <div className="relative">
            <Input
              type={showPassword ? "text" : "password"}
              name={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="Enter your password"
            />
            <button
              onClick={() => setShowPassword(!showPassword)}
              className="absolute z-30 -translate-y-1/2 cursor-pointer right-4 top-1/2"
            >
              {showPassword ? (
                <EyeIcon className="fill-gray-500 dark:fill-gray-400" />
              ) : (
                <EyeCloseIcon className="fill-gray-500 dark:fill-gray-400" />
              )}
            </button>
          </div>
        </div>
        )}

        {mode === 'add' && (
        <div>
          <Label>Role</Label>
          <div className="relative">
            <Select
              options={role}
              onChange={handleSelectChange}
              defaultValue={Role.ADMIN}
              className="dark:bg-dark-900"
            />
              <span className="absolute text-gray-500 -translate-y-1/2 pointer-events-none right-3 top-1/2 dark:text-gray-400">
                <ChevronDownIcon/>
              </span>
          </div>
        </div>
        )}
        </div>
        <div className="justify-self-end">
          <Button
            type="submit"
            className="px-4 py-2 text-white bg-blue-600 rounded hover:bg-blue-700"
          >
            {mode === 'add' ? 'Create' : 'Update'}
          </Button>
        </div>
      </form>
    </ComponentCard>
  );
}
