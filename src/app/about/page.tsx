'use client';

import { useEffect } from 'react';
import { usePageTitle } from '@/app/context/PageTitleContext';

export default function AboutPage() {
  const { setTitle } = usePageTitle();

  useEffect(() => {
    setTitle('About');
  }, [setTitle]);

  return (
    <section className="bg-white p-6 rounded shadow">
      <h1 className="text-2xl font-semibold mb-2 text-blue-600">About Page</h1>
      <p className="text-gray-700">This is a simple about page created using Next.js App Router and styled with Tailwind CSS.</p>
    </section>
  );
}