'use client';

import { createContext, useContext, useState, ReactNode } from 'react';

type PageTitleContextType = {
  title: string;
  setTitle: (title: string) => void;
};

const PageTitleContext = createContext<PageTitleContextType | null>(null);

export function PageTitleProvider({ children }: { children: ReactNode }) {
  const [title, setTitle] = useState('');

  return (
    <PageTitleContext.Provider value={{ title, setTitle }}>
      {children}
    </PageTitleContext.Provider>
  );
}

export function usePageTitle(): PageTitleContextType {
  const context = useContext(PageTitleContext);
  if (!context) {
    throw new Error('usePageTitle must be used within a PageTitleProvider');
  }
  return context;
}
