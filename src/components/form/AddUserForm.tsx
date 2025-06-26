// src/app/(admin)/users/components/AddUserForm.tsx

'use client';

import { useState, useEffect } from 'react';

interface UserFormProps {
  onSubmit: (data: { name: string; email: string }) => void;
  initialData?: {
    name: string;
    email: string;
  };
  mode?: 'add' | 'edit';
}

export default function AddUserForm({ onSubmit, initialData, mode = 'add' }: UserFormProps) {
  const [name, setName] = useState(initialData?.name || '');
  const [email, setEmail] = useState(initialData?.email || '');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ name, email });
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto space-y-4">
      <h1 className="text-2xl font-bold">
        {mode === 'add' ? 'Add User' : 'Edit User'}
      </h1>

      <div>
        <label className="block mb-1 text-sm font-medium text-gray-700">Name</label>
        <input
          type="text"
          value={name}
          onChange={e => setName(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:border-blue-500"
          required
        />
      </div>

      <div>
        <label className="block mb-1 text-sm font-medium text-gray-700">Email</label>
        <input
          type="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:border-blue-500"
          required
        />
      </div>

      <button
        type="submit"
        className="px-4 py-2 text-white bg-blue-600 rounded hover:bg-blue-700"
      >
        {mode === 'add' ? 'Create' : 'Update'}
      </button>
    </form>
  );
}
