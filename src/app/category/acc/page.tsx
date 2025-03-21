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

const accProducts: Product[] = [
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
    id: 2002,
    title: '진주 목걸이',
    price: '25,000',
    imageUrl: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=800',
    hoverImageUrl: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8e?w=800',
    link: '/product/2002',
    isNew: false,
    isSale: false
  },
  {
    id: 2003,
    title: '레더 벨트',
    price: '29,000',
    imageUrl: 'https://images.unsplash.com/photo-1594223274512-ad4803739b7c?w=800',
    hoverImageUrl: 'https://images.unsplash.com/photo-1594223274512-ad4803739b7d?w=800',
    link: '/product/2003',
    isNew: false,
    isSale: false
  },
  {
    id: 2004,
    title: '실크 스카프',
    price: '32,000',
    imageUrl: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=800',
    hoverImageUrl: 'https://images.unsplash.com/photo-1584917865442-de89df76afd4?w=800',
    link: '/product/2004',
    isNew: false,
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
  },
  {
    id: 2006,
    title: '버킷 햇',
    price: '28,000',
    imageUrl: 'https://images.unsplash.com/photo-1578998987066-88847474c70f?w=800',
    hoverImageUrl: 'https://images.unsplash.com/photo-1578998987066-88847474c70e?w=800',
    link: '/product/2006',
    isNew: false,
    isSale: false
  }
];

export default function AccCategoryPage() {
  return (
    <MainLayout>
      <div className="container-rosee py-8">
        <div className="flex items-center gap-2 mb-6 text-sm text-gray-500">
          <Link href="/" className="hover:text-black">Home</Link>
          <span>&gt;</span>
          <span className="text-black">Acc</span>
        </div>

        <h1 className="text-2xl font-semibold mb-6 text-center">ACC</h1>

        <p className="text-center text-sm text-gray-500 mb-8">- Total {accProducts.length} Items</p>

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
          {accProducts.map((product) => (
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