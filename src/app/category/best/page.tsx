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

// Sample product data for Best category
const bestProducts: Product[] = [
  {
    id: 1801,
    title: '소프트 컬러 라운드 가디건',
    price: '39,000',
    imageUrl: 'https://ext.same-assets.com/288811423/4282878971.webp',
    hoverImageUrl: 'https://ext.same-assets.com/731913575/2870876322.webp',
    link: '/product/1801',
    colors: 6,
    isNew: false,
    isSale: false
  },
  {
    id: 1431,
    title: '[1+1] 레이어드 립 나시',
    price: '32,000',
    originalPrice: '49,000',
    imageUrl: 'https://ext.same-assets.com/1031444258/1934067122.webp',
    hoverImageUrl: 'https://ext.same-assets.com/4212348796/763926699.webp',
    link: '/product/1431',
    isSale: true,
    isNew: false
  },
  {
    id: 1737,
    title: '와이드 슬랙스 팬츠',
    price: '42,000',
    imageUrl: 'https://ext.same-assets.com/1789176774/491349818.webp',
    hoverImageUrl: 'https://ext.same-assets.com/608899003/1613826622.webp',
    link: '/product/1737',
    isNew: false,
    isSale: false
  },
  {
    id: 1664,
    title: '워싱 와이드 데님',
    price: '59,000',
    imageUrl: 'https://ext.same-assets.com/3755829324/2300253070.webp',
    hoverImageUrl: 'https://ext.same-assets.com/3070283701/2532160922.webp',
    link: '/product/1664',
    isNew: false,
    isSale: false
  }
];

export default function BestCategoryPage() {
  return (
    <MainLayout>
      <div className="container-rosee py-8">
        <div className="flex items-center gap-2 mb-6 text-sm text-gray-500">
          <Link href="/" className="hover:text-black">Home</Link>
          <span>&gt;</span>
          <span className="text-black">BEST</span>
        </div>

        <h1 className="text-2xl font-semibold mb-6 text-center">BEST</h1>

        <p className="text-center text-sm text-gray-500 mb-8">- Total {bestProducts.length} Items</p>

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
          {bestProducts.map((product) => (
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
