'use client';

import { useEffect } from 'react';
import { usePageTitle } from '@/app/context/PageTitleContext';

const skills = [
  'JavaScript', 'React', 'Next.js', 'Tailwind CSS', 'TypeScript', 'Node.js', 'Express', 'Git', 'REST APIs', 'MongoDB'
]

const portfolio = [
  {
    title: 'Portfolio Website',
    description: 'A personal portfolio website built with Next.js and Tailwind CSS showcasing projects and skills.',
    url: 'https://your-portfolio-site.com'
  },
  {
    title: 'E-commerce Store',
    description: 'Full-featured e-commerce store built with React, Next.js, and Stripe payment integration.',
    url: 'https://your-ecommerce-site.com'
  },
  {
    title: 'Blog Platform',
    description: 'A Markdown-powered blogging platform with user authentication and CMS features.',
    url: 'https://your-blog-site.com'
  }
]

export default function HomePage() {
  const { setTitle } = usePageTitle();

  useEffect(() => {
    setTitle('Homepage');
  }, [setTitle]);

  return (
    <section className="bg-white p-6 rounded shadow">
      <h1 className="text-3xl font-bold mb-4 text-blue-600">Welcome to My Starter App</h1>
      <p className="text-gray-700 leading-relaxed">This is the homepage using Next.js 14 + Tailwind CSS. Explore the navigation to learn more.</p>
    </section>
  );
}