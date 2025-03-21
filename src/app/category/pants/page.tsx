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

// Sample product data for Pants category
const pantsProducts: Product[] = [
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
    id: 1902,
    title: '코튼 와이드 슬랙스',
    price: '42,000',
    imageUrl: 'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=800',
    hoverImageUrl: 'https://images.unsplash.com/photo-1594633312681-425c7b97ccd2?w=800',
    link: '/product/1902',
    isNew: false,
    isSale: false
  },
  {
    id: 1903,
    title: '하이웨스트 스트레이트 진',
    price: '48,000',
    imageUrl: 'https://images.unsplash.com/photo-1582418702059-97ebafb35d09?w=800',
    hoverImageUrl: 'https://images.unsplash.com/photo-1582418702059-97ebafb35d10?w=800',
    link: '/product/1903',
    isNew: false,
    isSale: false
  },
  {
    id: 1904,
    title: '린넨 와이드 팬츠',
    price: '39,000',
    imageUrl: 'https://images.unsplash.com/photo-1605763240000-7e93b172d754?w=800',
    hoverImageUrl: 'https://images.unsplash.com/photo-1605763240000-7e93b172d755?w=800',
    link: '/product/1904',
    isNew: false,
    isSale: false
  },
  {
    id: 1905,
    title: '카고 조거 팬츠',
    price: '52,000',
    imageUrl: 'https://images.unsplash.com/photo-1584370848010-d7fe6bc767ec?w=800',
    hoverImageUrl: 'https://images.unsplash.com/photo-1584370848010-d7fe6bc767ed?w=800',
    link: '/product/1905',
    isNew: true,
    isSale: false
  },
  {
    id: 1906,
    title: '플리츠 와이드 팬츠',
    price: '46,000',
    imageUrl: 'https://images.unsplash.com/photo-1551854838-212c50b4c184?w=800',
    hoverImageUrl: 'https://images.unsplash.com/photo-1551854838-212c50b4c185?w=800',
    link: '/product/1906',
    isNew: false,
    isSale: false
  }
];

export default function PantsCategoryPage() {
  return (
    <MainLayout>
      <div className="container-rosee py-8">
        <div className="flex items-center gap-2 mb-6 text-sm text-gray-500">
          <Link href="/" className="hover:text-black">Home</Link>
          <span>&gt;</span>
          <span className="text-black">Pants</span>
        </div>

        <h1 className="text-2xl font-semibold mb-6 text-center">PANTS</h1>

        <p className="text-center text-sm text-gray-500 mb-8">- Total {pantsProducts.length} Items</p>

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
          {pantsProducts.map((product) => (
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
