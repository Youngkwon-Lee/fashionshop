import React from 'react';
import MainLayout from '@/components/layout/MainLayout';
import SignupForm from '@/components/auth/SignupForm';

export default function SignupPage() {
  return (
    <MainLayout>
      <div className="container-rosee py-16">
        <div className="max-w-md mx-auto">
          <h1 className="text-2xl font-semibold mb-8 text-center">회원가입</h1>
          <SignupForm />
        </div>
      </div>
    </MainLayout>
  );
} 