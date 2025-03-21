import React from 'react';
import MainLayout from '@/components/layout/MainLayout';
import Link from 'next/link';
import ProductCard from '@/components/home/ProductCard';

interface Product {
  id: string | number;
  title: string;
  price: string;
  originalPrice?: string;
  imageUrl: string;
  hoverImageUrl?: string;
  link: string;
  isNew?: boolean;
  isSale?: boolean;
  colors?: number;
}

// Sample product data for Outer category
const outerProducts: Product[] = [
  {
    id: 1664,
    title: '워싱 와이드 데님 자켓',
    price: '59,000',
    imageUrl: 'https://images.unsplash.com/photo-1543076447-215ad9ba6923?w=800',
    hoverImageUrl: 'https://images.unsplash.com/photo-1543076447-215ad9ba6924?w=800',
    link: '/product/1664',
    isNew: true,
    isSale: false
  },
  {
    id: 1830,
    title: '코튼 블렌드 자켓',
    price: '48,000',
    imageUrl: 'https://images.unsplash.com/photo-1548624313-0396c75e4b1a?w=800',
    hoverImageUrl: 'https://images.unsplash.com/photo-1548624313-0396c75e4b1b?w=800',
    link: '/product/1830',
    isNew: false,
    isSale: false
  },
  {
    id: 1663,
    title: '울 블렌드 코트',
    price: '56,000',
    imageUrl: 'https://images.unsplash.com/photo-1485968579580-b6d095142e6e?w=800',
    hoverImageUrl: 'https://images.unsplash.com/photo-1485968579580-b6d095142e6f?w=800',
    link: '/product/1663',
    isNew: false,
    isSale: false
  },
  {
    id: 1849,
    title: '레더 자켓',
    price: '125,000',
    imageUrl: 'https://images.unsplash.com/photo-1487222477894-8943e31ef7b2?w=800',
    hoverImageUrl: 'https://images.unsplash.com/photo-1487222477894-8943e31ef7b3?w=800',
    link: '/product/1849',
    isNew: true,
    isSale: false
  },
  {
    id: 1638,
    title: '오버핏 트렌치 코트',
    price: '49,000',
    imageUrl: 'https://images.unsplash.com/photo-1495385794356-15371f348c31?w=800',
    hoverImageUrl: 'https://images.unsplash.com/photo-1495385794356-15371f348c32?w=800',
    link: '/product/1638',
    isNew: false,
    isSale: false
  },
  {
    id: 1696,
    title: '파라슈트 점퍼',
    price: '59,000',
    imageUrl: 'https://images.unsplash.com/photo-1525450824786-227cbef70703?w=800',
    hoverImageUrl: 'https://images.unsplash.com/photo-1525450824786-227cbef70704?w=800',
    link: '/product/1696',
    isNew: false,
    isSale: false
  }
];

export default function OuterCategoryPage() {
  return (
    <MainLayout>
      <div className="container-rosee py-8">
        <div className="flex items-center gap-2 mb-6 text-sm text-gray-500">
          <Link href="/" className="hover:text-black">Home</Link>
          <span>&gt;</span>
          <span className="text-black">Outer</span>
        </div>

        <h1 className="text-2xl font-semibold mb-6 text-center">OUTER</h1>

        <p className="text-center text-sm text-gray-500 mb-8">- Total {outerProducts.length} Items</p>

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
          {outerProducts.map((product) => (
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
              colors={product.colors}
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
