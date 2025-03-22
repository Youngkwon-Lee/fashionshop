"use client";

import { useEffect, useState } from 'react';
import Link from 'next/link';
import ProductDetail from '@/components/product/ProductDetail';
import RelatedProducts from '@/components/product/RelatedProducts';
import ProductReviews from '@/components/product/ProductReviews';
import { getProduct } from '@/lib/api/products';
import { getProductReviews, getProductReviewSummary } from '@/lib/api/reviews';
import { Product } from '@/types/product';
import { useRouter, useParams } from 'next/navigation';
import { Review, ReviewSummary } from '@/types/review';

export default function ProductPage() {
  const params = useParams();
  const productId = params?.id as string;
  const router = useRouter();
  const [product, setProduct] = useState<Product | null>(null);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [reviewSummary, setReviewSummary] = useState<ReviewSummary | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      if (!productId) {
        router.push('/404');
        return;
      }

      try {
        // 상품 정보, 리뷰 목록, 리뷰 요약 정보를 병렬로 불러옴
        const [productData, reviewsData, summaryData] = await Promise.all([
          getProduct(productId),
          getProductReviews(productId),
          getProductReviewSummary(productId)
        ]);

        if (!productData) {
          router.push('/404');
          return;
        }

        setProduct(productData);
        setReviews(reviewsData);
        setReviewSummary(summaryData);
      } catch (error) {
        console.error('Failed to load product data:', error);
        router.push('/404');
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [productId, router]);

  if (loading) {
    return (
      <div className="container-rosee py-8">
        <div className="animate-pulse">
          <div className="h-[600px] bg-gray-200 mb-8"></div>
          <div className="h-8 bg-gray-200 w-1/3 mb-4"></div>
          <div className="h-4 bg-gray-200 w-1/4 mb-8"></div>
          <div className="h-24 bg-gray-200 mb-8"></div>
        </div>
      </div>
    );
  }

  if (!product) {
    return null;
  }

  return (
    <div className="container-rosee py-8">
      <div className="flex items-center gap-2 mb-6 text-sm text-gray-500">
        <Link href="/" className="hover:text-black">Home</Link>
        <span>&gt;</span>
        <Link href={`/category/${product.category.toLowerCase()}`} className="hover:text-black">{product.category}</Link>
        <span>&gt;</span>
        <span className="text-black">{product.title}</span>
      </div>

      {/* Product Detail */}
      <ProductDetail product={product} />

      {/* Product Reviews */}
      {reviewSummary && (
        <ProductReviews
          productId={product.id}
          reviews={reviews}
          summary={reviewSummary}
          productOptions={{
            color: product.colors[0]?.name || '',
            size: product.sizes[0] || ''
          }}
        />
      )}

      {/* Related Products */}
      <RelatedProducts
        products={product.relatedProducts}
        title="이 상품과 함께 구매한 상품"
      />
    </div>
  );
}
