"use client";

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { 
  LayoutGrid, 
  Package, 
  Users, 
  ShoppingBag, 
  Settings,
  ChevronRight
} from 'lucide-react';

const menuItems = [
  { href: '/admin', label: '대시보드', icon: LayoutGrid },
  { href: '/admin/products', label: '상품 관리', icon: Package },
  { href: '/admin/orders', label: '주문 관리', icon: ShoppingBag },
  { href: '/admin/users', label: '회원 관리', icon: Users },
  { href: '/admin/settings', label: '설정', icon: Settings },
];

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const { user } = useAuth();

  // 관리자가 아닌 경우 접근 제한
  if (!user?.isAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">접근 권한이 없습니다</h1>
          <p className="text-gray-600 mb-8">관리자만 접근할 수 있는 페이지입니다.</p>
          <Link
            href="/"
            className="inline-block bg-black text-white px-6 py-3 hover:bg-gray-800"
          >
            홈으로 돌아가기
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Admin Header */}
      <header className="bg-white border-b">
        <div className="container-rosee">
          <div className="flex items-center justify-between h-16">
            <Link href="/admin" className="text-xl font-semibold">
              Rosée Admin
            </Link>
            <div className="flex items-center gap-4">
              <span className="text-sm text-gray-600">{user.email}</span>
              <Link
                href="/"
                className="text-sm text-gray-600 hover:text-black"
              >
                스토어 보기
              </Link>
            </div>
          </div>
        </div>
      </header>

      <div className="container-rosee py-8">
        <div className="flex gap-8">
          {/* Sidebar */}
          <aside className="w-60 flex-shrink-0">
            <nav className="bg-white rounded-lg shadow">
              {menuItems.map((item) => {
                const Icon = item.icon;
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`
                      flex items-center gap-3 px-4 py-3 text-sm
                      ${isActive 
                        ? 'text-black font-medium bg-gray-50' 
                        : 'text-gray-600 hover:text-black hover:bg-gray-50'
                      }
                    `}
                  >
                    <Icon size={20} />
                    <span>{item.label}</span>
                    {isActive && <ChevronRight size={16} className="ml-auto" />}
                  </Link>
                );
              })}
            </nav>
          </aside>

          {/* Main Content */}
          <main className="flex-1 bg-white rounded-lg shadow p-6">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
} 