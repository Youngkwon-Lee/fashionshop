"use client";

import React, { useEffect, useState } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import HeroSlider from '@/components/home/HeroSlider';
import CategoryBanner from '@/components/home/CategoryBanner';
import ProductSection from '@/components/home/ProductSection';
import ReviewSection from '@/components/home/ReviewSection';
import ProductCard from '@/components/product/ProductCard';
import { getProducts } from '@/lib/api/products';
import { Product } from '@/types/product';

// Sample product data for New Arrivals
const newArrivalsData = [
  {
    id: 1850,
    title: '오버핏 데님 셔츠',
    price: '51,000',
    imageUrl: 'https://images.unsplash.com/photo-1506629082955-511b1aa562c8?w=800',
    link: '/product/1850',
    isNew: true
  },
  {
    id: 2001,
    title: '골드 링 귀걸이',
    price: '19,000',
    imageUrl: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=800',
    link: '/product/2001',
    isNew: true
  },
  {
    id: 1901,
    title: '와이드 데님 팬츠',
    price: '45,000',
    imageUrl: 'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=800',
    link: '/product/1901',
    isNew: true
  },
  {
    id: 2005,
    title: '크로스 백',
    price: '45,000',
    imageUrl: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=800',
    link: '/product/2005',
    isNew: true
  }
];

// Sample product data for Weekly Best
const weeklyBestData = [
  {
    id: 1801,
    title: '소프트 컬러 라운드 가디건',
    price: '39,000',
    imageUrl: 'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=800',
    link: '/product/1801',
    isNew: false
  },
  {
    id: 1902,
    title: '코튼 와이드 슬랙스',
    price: '42,000',
    imageUrl: 'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=800',
    link: '/product/1902',
    isNew: false
  },
  {
    id: 2005,
    title: '크로스 백',
    price: '45,000',
    imageUrl: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=800',
    link: '/product/2005',
    isNew: false
  },
  {
    id: 2001,
    title: '골드 링 귀걸이',
    price: '19,000',
    imageUrl: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=800',
    link: '/product/2001',
    isNew: false
  }
];

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getProducts();
        setProducts(data as Product[]);
      } catch (error) {
        console.error('상품 목록 로딩 실패:', error);
        setError('상품 목록을 불러오는데 실패했습니다.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (isLoading) {
    return (
      <MainLayout>
        <div className="container-rosee py-16">
          <div className="text-center">로딩 중...</div>
        </div>
      </MainLayout>
    );
  }

  if (error) {
    return (
      <MainLayout>
        <div className="container-rosee py-16">
          <div className="text-center text-red-600">{error}</div>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <HeroSlider />
      <CategoryBanner />
      <ProductSection
        title="NEW 7%"
        subtitle="신상품 7% 할인"
        viewAllLink="/category/new-7"
        products={newArrivalsData}
      />
      <ProductSection
        title="WEEKLY BEST"
        subtitle="이번 주 인기 상품"
        viewAllLink="/category/best"
        products={weeklyBestData}
      />
      <ReviewSection />
      <div className="container-rosee py-16">
        <h1 className="text-2xl font-bold mb-8">신상품</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </MainLayout>
  );
}
