import React from 'react';
import MainLayout from '@/components/layout/MainLayout';
import Link from 'next/link';
import ProductDetail from '@/components/product/ProductDetail';
import RelatedProducts from '@/components/product/RelatedProducts';
import ProductReviews from '@/components/product/ProductReviews';

// Sample product data
const productData = {
  id: '1801',
  title: '소프트 컬러 라운드 가디건',
  price: '39,000',
  originalPrice: '',
  description: '부드러운 촉감의 니트 소재로 제작된 라운드넥 가디건입니다. 여유있는 실루엣으로 다양한 이너와 매치하기 좋으며, 가볍고 따뜻한 착용감을 제공합니다.',
  details: [
    '소재: 아크릴 60%, 나일론 25%, 울 15%',
    '신축성 있음, 비침 없음, 두께감 보통',
    '드라이클리닝 권장',
    '모델 착용 컬러: 베이지',
    '모델 사이즈: 키 180cm, 체중 65kg, 어깨 45cm, 가슴 95cm, 허리 76cm'
  ],
  imageUrls: [
    'https://images.unsplash.com/photo-1584030373081-f37b019b2445?w=800',
    'https://images.unsplash.com/photo-1584030373052-6f0a5f00d1a3?w=800',
    'https://images.unsplash.com/photo-1583846552345-d2192d5c6fcd?w=800',
    'https://images.unsplash.com/photo-1583846552354-02d947cce8c0?w=800',
  ],
  colors: [
    { name: '베이지', code: '#c3ad99', available: true },
    { name: '그레이', code: '#9f9c97', available: true },
    { name: '블랙', code: '#3b3834', available: true },
    { name: '민트', code: '#5bc2be', available: false },
    { name: '카키', code: '#8a664c', available: true },
    { name: '아이보리', code: '#cdc1ac', available: true }
  ],
  sizes: ['FREE'],
  category: 'Top',
  deliveryInfo: '3~14일 이내 배송',
  productionPeriod: '03/23 ~ 04/03',
  relatedProducts: [
    {
      id: '1431',
      title: '[1+1] 레이어드 립 나시',
      price: '32,000',
      originalPrice: '49,000',
      imageUrl: 'https://images.unsplash.com/photo-1583846717393-dc2412c95ed7?w=800',
      link: '/product/1431',
      isSale: true
    },
    {
      id: '1737',
      title: '와이드 슬랙스 팬츠',
      price: '42,000',
      imageUrl: 'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=800',
      link: '/product/1737'
    },
    {
      id: '1664',
      title: '워싱 와이드 데님',
      price: '59,000',
      imageUrl: 'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=800',
      link: '/product/1664'
    },
    {
      id: '1830',
      title: '코튼 블렌드 자켓',
      price: '48,000',
      imageUrl: 'https://images.unsplash.com/photo-1591369822096-ffd140ec948f?w=800',
      link: '/product/1830',
    }
  ]
};

export default function ProductPage() {
  return (
    <MainLayout>
      <div className="container-rosee py-8">
        <div className="flex items-center gap-2 mb-6 text-sm text-gray-500">
          <Link href="/" className="hover:text-black">Home</Link>
          <span>&gt;</span>
          <Link href={`/category/${productData.category.toLowerCase()}`} className="hover:text-black">{productData.category}</Link>
          <span>&gt;</span>
          <span className="text-black">{productData.title}</span>
        </div>

        {/* Product Detail */}
        <ProductDetail product={productData} />

        {/* Product Reviews */}
        <ProductReviews productId={productData.id} />

        {/* Related Products */}
        <RelatedProducts
          products={productData.relatedProducts}
          title="이 상품과 함께 구매한 상품"
        />
      </div>
    </MainLayout>
  );
}
