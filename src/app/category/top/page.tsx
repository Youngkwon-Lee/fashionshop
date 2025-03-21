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

// Sample product data for Top category
const topProducts: Product[] = [
  {
    id: 1801,
    title: '소프트 컬러 라운드 가디건',
    price: '39,000',
    imageUrl: 'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=800',
    hoverImageUrl: 'https://images.unsplash.com/photo-1434389677669-e08b4cac3106?w=800',
    link: '/product/1801',
    isNew: false,
    isSale: false,
    colors: 6
  },
  {
    id: 1431,
    title: '[1+1] 레이어드 립 나시',
    price: '32,000',
    originalPrice: '49,000',
    imageUrl: 'https://images.unsplash.com/photo-1583846717393-dc2412c95ed7?w=800',
    hoverImageUrl: 'https://images.unsplash.com/photo-1583846717394-dc2412c95ed8?w=800',
    link: '/product/1431',
    isNew: false,
    isSale: true
  },
  {
    id: 1828,
    title: '마일드 라운드 가디건',
    price: '42,000',
    imageUrl: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=800',
    hoverImageUrl: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78g?w=800',
    link: '/product/1828',
    isNew: false,
    isSale: false
  },
  {
    id: 1228,
    title: '코튼 오버핏 셔츠',
    price: '52,000',
    imageUrl: 'https://images.unsplash.com/photo-1564257631407-4deb1f99d992?w=800',
    hoverImageUrl: 'https://images.unsplash.com/photo-1564257631407-4deb1f99d993?w=800',
    link: '/product/1228',
    isNew: false,
    isSale: false
  },
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
    id: 1829,
    title: '베이직 니트 베스트',
    price: '42,000',
    imageUrl: 'https://images.unsplash.com/photo-1584273143981-41c073dfe8f8?w=800',
    hoverImageUrl: 'https://images.unsplash.com/photo-1584273143981-41c073dfe8f9?w=800',
    link: '/product/1829',
    isNew: false,
    isSale: false
  }
];

export default function TopCategoryPage() {
  return (
    <MainLayout>
      <div className="container-rosee py-8">
        <div className="flex items-center gap-2 mb-6 text-sm text-gray-500">
          <Link href="/" className="hover:text-black">Home</Link>
          <span>&gt;</span>
          <span className="text-black">Top</span>
        </div>

        <h1 className="text-2xl font-semibold mb-6 text-center">TOP</h1>

        <p className="text-center text-sm text-gray-500 mb-8">- Total {topProducts.length} Items</p>

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
          {topProducts.map((product) => (
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
