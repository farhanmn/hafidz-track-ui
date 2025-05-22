'use client';

import "@/app/globals.css";
import { usePageTitle } from '@/app/context/PageTitleContext';
import Link from "next/link";
import type {Metadata} from "next";

export const metadata: Metadata = {
  title: "Homepage",
};

export default function Header() {
  const { title } = usePageTitle();

  return (
    <header className="bg-blue-600 text-white shadow sticky top-0 z-10">
      <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
        <h1 className="text-xl font-bold">{title || 'Loading...'}</h1>
        <nav>
          <ul className="flex gap-6 text-sm">
            <li><Link href="/" className="hover:underline">Home</Link></li>
            <li><Link href="/about" className="hover:underline">About</Link></li>
            <li><Link href="/products" className="hover:underline">Products</Link></li>
          </ul>
        </nav>
      </div>
    </header>
  );
}