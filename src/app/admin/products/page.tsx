"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Plus, Search, Edit2, Trash2 } from 'lucide-react';
import { formatPrice } from '@/lib/api/products';

// 임시 상품 데이터
const products = [
  {
    id: '1',
    title: '소프트 컬러 라운드 가디건',
    price: 89000,
    imageUrl: '/images/products/cardigan-1.jpg',
    category: '아우터',
    stock: 25,
    status: '판매중'
  },
  {
    id: '2',
    title: '레이어드 립 탱크탑',
    price: 39000,
    imageUrl: '/images/products/top-1.jpg',
    category: '상의',
    stock: 15,
    status: '품절'
  },
  // 추가 상품...
];

export default function ProductsPage() {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredProducts = products.filter(product =>
    product.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold">상품 관리</h1>
        <Link
          href="/admin/products/new"
          className="flex items-center gap-2 bg-black text-white px-4 py-2 rounded hover:bg-gray-800"
        >
          <Plus size={20} />
          <span>상품 등록</span>
        </Link>
      </div>

      {/* 검색 및 필터 */}
      <div className="bg-white p-4 rounded-lg shadow mb-6">
        <div className="flex gap-4">
          <div className="flex-1 relative">
            <input
              type="text"
              placeholder="상품명 검색"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-gray-200"
            />
            <Search size={20} className="absolute left-3 top-2.5 text-gray-400" />
          </div>
          <select className="px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-gray-200">
            <option value="">모든 카테고리</option>
            <option value="outer">아우터</option>
            <option value="top">상의</option>
            <option value="bottom">하의</option>
            <option value="acc">악세서리</option>
          </select>
          <select className="px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-gray-200">
            <option value="">모든 상태</option>
            <option value="active">판매중</option>
            <option value="soldout">품절</option>
            <option value="hidden">숨김</option>
          </select>
        </div>
      </div>

      {/* 상품 목록 */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">상품정보</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">카테고리</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">가격</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">재고</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">상태</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">관리</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {filteredProducts.map((product) => (
              <tr key={product.id}>
                <td className="px-6 py-4">
                  <div className="flex items-center">
                    <div className="h-16 w-16 relative flex-shrink-0">
                      <Image
                        src={product.imageUrl}
                        alt={product.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="ml-4">
                      <div className="text-sm font-medium text-gray-900">
                        {product.title}
                      </div>
                      <div className="text-sm text-gray-500">
                        #{product.id}
                      </div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {product.category}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {formatPrice(product.price)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {product.stock}개
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 py-1 text-xs font-medium rounded-full
                    ${product.status === '판매중' 
                      ? 'bg-green-100 text-green-800'
                      : 'bg-red-100 text-red-800'
                    }`}
                  >
                    {product.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <div className="flex gap-2">
                    <button
                      className="p-1 hover:text-blue-600"
                      onClick={() => {/* 수정 로직 */}}
                    >
                      <Edit2 size={18} />
                    </button>
                    <button
                      className="p-1 hover:text-red-600"
                      onClick={() => {/* 삭제 로직 */}}
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
} 