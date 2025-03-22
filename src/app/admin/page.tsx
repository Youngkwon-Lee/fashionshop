"use client";

import React from 'react';
import { useCart } from '@/contexts/CartContext';
import { formatPrice } from '@/lib/api/products';
import {
  BarChart3,
  TrendingUp,
  Users,
  ShoppingBag
} from 'lucide-react';

const StatCard = ({ 
  title, 
  value, 
  icon: Icon, 
  trend 
}: { 
  title: string; 
  value: string | number; 
  icon: React.ElementType;
  trend?: { 
    value: number;
    isPositive: boolean;
  };
}) => (
  <div className="bg-white p-6 rounded-lg shadow">
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm text-gray-600">{title}</p>
        <h3 className="text-2xl font-bold mt-1">{value}</h3>
        {trend && (
          <p className={`text-sm mt-2 ${trend.isPositive ? 'text-green-600' : 'text-red-600'}`}>
            {trend.isPositive ? '+' : '-'}{Math.abs(trend.value)}%
            <span className="text-gray-600 ml-1">지난달 대비</span>
          </p>
        )}
      </div>
      <div className="bg-gray-50 p-3 rounded-lg">
        <Icon size={24} className="text-gray-600" />
      </div>
    </div>
  </div>
);

export default function AdminDashboard() {
  const { items } = useCart();

  // 임시 통계 데이터
  const stats = [
    {
      title: '총 매출',
      value: formatPrice(15800000),
      icon: BarChart3,
      trend: { value: 12, isPositive: true }
    },
    {
      title: '총 주문',
      value: '158건',
      icon: ShoppingBag,
      trend: { value: 8, isPositive: true }
    },
    {
      title: '신규 회원',
      value: '24명',
      icon: Users,
      trend: { value: 2.5, isPositive: false }
    },
    {
      title: '전환율',
      value: '3.2%',
      icon: TrendingUp,
      trend: { value: 0.8, isPositive: true }
    }
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold mb-8">대시보드</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <StatCard key={index} {...stat} />
        ))}
      </div>

      <div className="mt-8">
        <h2 className="text-xl font-bold mb-4">최근 주문</h2>
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">주문번호</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">고객</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">상품</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">금액</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">상태</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {/* 임시 주문 데이터 */}
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm">#12345</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">김로제</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">소프트 컬러 라운드 가디건 외 2건</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">{formatPrice(158000)}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-2 py-1 text-xs font-medium bg-green-100 text-green-800 rounded-full">
                    배송완료
                  </span>
                </td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm">#12344</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">박지수</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">워시드 와이드 데님 자켓</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">{formatPrice(89000)}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full">
                    배송중
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
} 