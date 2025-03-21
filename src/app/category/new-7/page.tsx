import React from 'react';
import MainLayout from '@/components/layout/MainLayout';
import Link from 'next/link';
import ProductCard from '@/components/home/ProductCard';

interface Product {
  id: number;
  title: string;
  price: string;
  imageUrl: string;
  hoverImageUrl: string;
  link: string;
  isNew: boolean;
  isSale: boolean;
  originalPrice?: string;
}

const newProducts: Product[] = [
  {
    id: 1850,
    title: '오버핏 데님 셔츠',
    price: '51,000',
    imageUrl: 'https://images.unsplash.com/photo-1506629082955-511b1aa562c8?w=800',
    hoverImageUrl: 'https://images.unsplash.com/photo-1506629082955-511b1aa562c9?w=800',
    link: '/product/1850',
    isNew: true,
    isSale: false
  },
  {
    id: 2001,
    title: '골드 링 귀걸이',
    price: '19,000',
    imageUrl: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=800',
    hoverImageUrl: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60909?w=800',
    link: '/product/2001',
    isNew: true,
    isSale: false
  },
  {
    id: 1901,
    title: '와이드 데님 팬츠',
    price: '45,000',
    imageUrl: 'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=800',
    hoverImageUrl: 'https://images.unsplash.com/photo-1541099649105-f69ad21f3247?w=800',
    link: '/product/1901',
    isNew: true,
    isSale: false
  },
  {
    id: 2005,
    title: '크로스 백',
    price: '45,000',
    imageUrl: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=800',
    hoverImageUrl: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fb?w=800',
    link: '/product/2005',
    isNew: true,
    isSale: false
  }
];

export default function NewCategoryPage() {
  return (
    <MainLayout>
      <div className="container-rosee py-8">
        <div className="flex items-center gap-2 mb-6 text-sm text-gray-500">
          <Link href="/" className="hover:text-black">Home</Link>
          <span>&gt;</span>
          <span className="text-black">NEW 7%</span>
        </div>

        <h1 className="text-2xl font-semibold mb-6 text-center">NEW 7%</h1>

        <p className="text-center text-sm text-gray-500 mb-8">- Total {newProducts.length} Items</p>

        <div className="flex justify-end mb-6">
          <select className="border border-gray-300 py-1 px-3 text-sm">
            <option value="newest">신상품</option>
            <option value="low">낮은가격</option>
            <option value="high">높은가격</option>
            <option value="name">상품명</option>
            <option value="review">사용후기</option>
          </select>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {newProducts.map((product) => (
            <ProductCard
              key={product.id}
              id={product.id}
              title={product.title}
              price={product.price}
              originalPrice={product.originalPrice}
              imageUrl={product.imageUrl}
              hoverImageUrl={product.hoverImageUrl}
              link={product.link}
              isNew={product.isNew}
              isSale={product.isSale}
            />
          ))}
        </div>

        <div className="flex justify-center items-center gap-2 mt-10">
          <span className="w-8 h-8 flex items-center justify-center bg-black text-white">1</span>
        </div>
      </div>
    </MainLayout>
  );
} 