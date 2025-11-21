'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { useAuthStore } from '@/lib/store/auth.store';

type Props = {
  params: Promise<{ lang: string }>;
};

export default function AdminPage({ params }: Props) {
  const router = useRouter();
  const { isAuthenticated, user, checkAuth } = useAuthStore();
  const [lang, setLang] = useState('en');

  useEffect(() => {
    params.then(({ lang }) => setLang(lang));
  }, [params]);

  useEffect(() => {
    if (!isAuthenticated) {
      checkAuth().then(() => {
        if (!isAuthenticated) {
          router.push(`/${lang}/auth/login`);
        }
      });
    } else if (user && user.role !== 'ADMIN') {
      router.push(`/${lang}`);
    }
  }, [isAuthenticated, user, checkAuth, router, lang]);

  if (!isAuthenticated || !user || user.role !== 'ADMIN') {
    return null;
  }

  return (
    <>
      <Header />
      <main className="min-h-screen pt-20 pb-12 bg-gradient-to-b from-white via-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">Admin Panel</h1>
          
          <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
            <p className="text-gray-600">Admin panel coming soon.</p>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

