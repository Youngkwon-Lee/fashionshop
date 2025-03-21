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

const saleProducts: Product[] = [
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
    id: 1432,
    title: '린넨 블렌드 셔츠',
    price: '35,000',
    originalPrice: '52,000',
    imageUrl: 'https://images.unsplash.com/photo-1598554747436-c9293d6a588f?w=800',
    hoverImageUrl: 'https://images.unsplash.com/photo-1598554747437-c9293d6a588g?w=800',
    link: '/product/1432',
    isNew: false,
    isSale: true
  },
  {
    id: 1433,
    title: '코튼 스트라이프 블라우스',
    price: '29,000',
    originalPrice: '45,000',
    imageUrl: 'https://images.unsplash.com/photo-1551803091-e20673f15770?w=800',
    hoverImageUrl: 'https://images.unsplash.com/photo-1551803091-e20673f15771?w=800',
    link: '/product/1433',
    isNew: false,
    isSale: true
  },
  {
    id: 1434,
    title: '플리츠 미디 스커트',
    price: '38,000',
    originalPrice: '55,000',
    imageUrl: 'https://images.unsplash.com/photo-1583846552345-d2192d5c6fcd?w=800',
    hoverImageUrl: 'https://images.unsplash.com/photo-1583846552346-d2192d5c6fce?w=800',
    link: '/product/1434',
    isNew: false,
    isSale: true
  },
  {
    id: 1435,
    title: '와이드 데님 팬츠',
    price: '42,000',
    originalPrice: '65,000',
    imageUrl: 'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=800',
    hoverImageUrl: 'https://images.unsplash.com/photo-1541099649105-f69ad21f3247?w=800',
    link: '/product/1435',
    isNew: false,
    isSale: true
  },
  {
    id: 1436,
    title: '크롭 니트 가디건',
    price: '33,000',
    originalPrice: '48,000',
    imageUrl: 'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=800',
    hoverImageUrl: 'https://images.unsplash.com/photo-1434389677669-e08b4cac3106?w=800',
    link: '/product/1436',
    isNew: false,
    isSale: true
  }
];

export default function SaleCategoryPage() {
  return (
    <MainLayout>
      <div className="container-rosee py-8">
        <div className="flex items-center gap-2 mb-6 text-sm text-gray-500">
          <Link href="/" className="hover:text-black">Home</Link>
          <span>&gt;</span>
          <span className="text-black">Sale</span>
        </div>

        <h1 className="text-2xl font-semibold mb-6 text-center">SALE</h1>

        <p className="text-center text-sm text-gray-500 mb-8">- Total {saleProducts.length} Items</p>

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
          {saleProducts.map((product) => (
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