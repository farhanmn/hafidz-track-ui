import { notFound } from 'next/navigation';
import Link from 'next/link';

interface Params {
  params: {
    id: string;
  };
}

async function getUser(id: string) {
  const res = await fetch(`http://localhost:3000/api/users/${id}`, {
    cache: 'no-store',
  });

  if (!res.ok) return null;
  return res.json();
}

export default async function UserDetailPage({ params }: Params) {
  const user = await getUser(params.id);
  if (!user) return notFound();

  return (
    <div className="max-w-md mx-auto py-10">
      <h1 className="text-2xl font-bold mb-4">User Detail</h1>

      <div className="bg-white shadow rounded-lg p-6 space-y-4">
        <div>
          <span className="font-semibold text-gray-700">Name:</span>
          <p>{user.name}</p>
        </div>

        <div>
          <span className="font-semibold text-gray-700">Email:</span>
          <p>{user.email}</p>
        </div>
      </div>

      <div className="mt-6 flex gap-4">
        <Link
          href={`/users/${params.id}/edit`}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Edit User
        </Link>

        <Link
          href="/users"
          className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
        >
          Back to List
        </Link>
      </div>
    </div>
  );
}
