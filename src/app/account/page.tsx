"use client";

import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function AccountPage() {
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.push('/login');
    }
  }, [user, router]);

  if (!user) {
    return null;
  }

  return (
    <div className="container-rosee py-8">
      <h1 className="text-2xl font-bold mb-6">마이페이지</h1>
      
      <div className="bg-white rounded-lg shadow p-6">
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-4">계정 정보</h2>
          <p className="text-gray-600">이메일: {user.email}</p>
        </div>

        <div className="space-y-4">
          <h2 className="text-xl font-semibold">주문 관리</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="border rounded-lg p-4 text-center">
              <p className="font-medium">결제완료</p>
              <p className="text-2xl font-bold mt-2">0</p>
            </div>
            <div className="border rounded-lg p-4 text-center">
              <p className="font-medium">배송준비</p>
              <p className="text-2xl font-bold mt-2">0</p>
            </div>
            <div className="border rounded-lg p-4 text-center">
              <p className="font-medium">배송중</p>
              <p className="text-2xl font-bold mt-2">0</p>
            </div>
            <div className="border rounded-lg p-4 text-center">
              <p className="font-medium">배송완료</p>
              <p className="text-2xl font-bold mt-2">0</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 