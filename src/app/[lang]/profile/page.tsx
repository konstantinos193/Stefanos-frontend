'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { useAuthStore } from '@/lib/store/auth.store';
import { useTranslation } from '@/lib/hooks/useTranslation';

type Props = {
  params: Promise<{ lang: string }>;
};

export default function ProfilePage({ params }: Props) {
  const router = useRouter();
  const { isAuthenticated, user, checkAuth, updateProfilePicture } = useAuthStore();
  const t = useTranslation();
  const [lang, setLang] = useState('en');
  const [profilePicture, setProfilePicture] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

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
    }
  }, [isAuthenticated, checkAuth, router, lang]);

  useEffect(() => {
    if (user?.profilePicture) {
      setProfilePicture(user.profilePicture);
    }
  }, [user]);

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      alert(t('profileMessages.selectImageFile'));
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      alert(t('profileMessages.imageSizeError'));
      return;
    }

    setIsUploading(true);

    // Read file as data URL
    const reader = new FileReader();
    reader.onloadend = () => {
      const result = reader.result as string;
      setProfilePicture(result);
      updateProfilePicture(result);
      setIsUploading(false);
    };
    reader.onerror = () => {
      alert(t('profileMessages.errorReadingFile'));
      setIsUploading(false);
    };
    reader.readAsDataURL(file);
  };

  const handleRemovePicture = () => {
    if (confirm(t('profileMessages.removePictureConfirm'))) {
      setProfilePicture(null);
      updateProfilePicture(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const handleChangePicture = () => {
    fileInputRef.current?.click();
  };

  if (!isAuthenticated || !user) {
    return null;
  }

  return (
    <>
      <Header />
      <main className="min-h-screen pt-20 pb-12 bg-gradient-to-b from-gray-50 via-white to-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Header Section */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-2">{t('profile.title')}</h1>
            <p className="text-gray-600">{t('profile.subtitle')}</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Profile Picture Section */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">{t('profile.profilePicture')}</h2>
                
                <div className="flex flex-col items-center">
                  <div className="relative mb-4">
                    {profilePicture ? (
                      <div className="relative w-32 h-32 rounded-full overflow-hidden ring-4 ring-gray-100 shadow-lg">
                        <Image
                          src={profilePicture}
                          alt={user.name}
                          fill
                          className="object-cover"
                          unoptimized
                        />
                      </div>
                    ) : (
                      <div className="w-32 h-32 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white text-4xl font-bold shadow-lg ring-4 ring-gray-100">
                        {user.name.charAt(0).toUpperCase()}
                      </div>
                    )}
                    
                    {isUploading && (
                      <div className="absolute inset-0 bg-black/50 rounded-full flex items-center justify-center">
                        <div className="w-8 h-8 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
                      </div>
                    )}
                  </div>

                  <div className="flex flex-col gap-2 w-full">
                    <button
                      onClick={handleChangePicture}
                      disabled={isUploading}
                      className="w-full px-4 py-2.5 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-md hover:shadow-lg"
                    >
                      {profilePicture ? t('profile.changePicture') : t('profile.uploadPicture')}
                    </button>
                    
                    {profilePicture && (
                      <button
                        onClick={handleRemovePicture}
                        disabled={isUploading}
                        className="w-full px-4 py-2.5 bg-gray-100 text-gray-700 rounded-lg font-medium hover:bg-gray-200 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {t('profile.removePicture')}
                      </button>
                    )}
                  </div>

                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleFileSelect}
                    className="hidden"
                  />
                </div>
              </div>
            </div>

            {/* Profile Information Section */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-6">{t('profile.accountInformation')}</h2>
                
                <div className="space-y-6">
                  <div className="pb-6 border-b border-gray-200">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {t('profile.fullName')}
                    </label>
                    <div className="mt-1">
                      <p className="text-lg text-gray-900 font-medium">{user.name}</p>
                    </div>
                  </div>

                  <div className="pb-6 border-b border-gray-200">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {t('profile.emailAddress')}
                    </label>
                    <div className="mt-1">
                      <p className="text-lg text-gray-900 font-medium">{user.email}</p>
                      <p className="text-sm text-gray-500 mt-1">{t('profile.emailDescription')}</p>
                    </div>
                  </div>

                  <div className="pb-6 border-b border-gray-200">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {t('profile.accountRole')}
                    </label>
                    <div className="mt-1">
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                        {user.role}
                      </span>
                    </div>
                  </div>

                  {user.mfaEnabled !== undefined && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        {t('profile.twoFactorAuth')}
                      </label>
                      <div className="mt-1">
                        <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                          user.mfaEnabled 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-gray-100 text-gray-800'
                        }`}>
                          {user.mfaEnabled ? t('profile.enabled') : t('profile.disabled')}
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
