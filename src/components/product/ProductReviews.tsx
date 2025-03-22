"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import { Star, ThumbsUp } from 'lucide-react';
import { Review, ReviewSummary } from '@/types/review';
import ReviewForm from './ReviewForm';

interface ProductReviewsProps {
  productId: string;
  reviews: Review[];
  summary: ReviewSummary;
  productOptions: {
    color: string;
    size: string;
  };
}

const ProductReviews = ({ productId, reviews: initialReviews, summary: initialSummary, productOptions }: ProductReviewsProps) => {
  const [reviews, setReviews] = useState(initialReviews);
  const [summary, setSummary] = useState(initialSummary);
  const [sortBy, setSortBy] = useState<'recent' | 'helpful'>('recent');
  const [selectedRating, setSelectedRating] = useState<number | null>(null);

  const handleReviewSuccess = () => {
    // TODO: 리뷰 목록과 요약 정보를 새로 불러오기
    window.location.reload();
  };

  const filteredReviews = reviews.filter(review => 
    selectedRating ? review.rating === selectedRating : true
  );

  const sortedReviews = [...filteredReviews].sort((a, b) => {
    if (sortBy === 'recent') {
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    }
    return b.helpful - a.helpful;
  });

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }).map((_, index) => (
      <Star
        key={index}
        className={`w-4 h-4 ${
          index < rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'
        }`}
      />
    ));
  };

  return (
    <div className="mt-16">
      <h2 className="text-xl font-medium mb-6">상품 리뷰</h2>

      {/* Review Form */}
      <ReviewForm
        productId={productId}
        productOptions={productOptions}
        onSuccess={handleReviewSuccess}
      />

      {/* Review Summary */}
      <div className="bg-gray-50 p-6 rounded-lg mb-8">
        <div className="flex items-center gap-8">
          <div className="text-center">
            <div className="text-3xl font-bold mb-1">{summary.averageRating.toFixed(1)}</div>
            <div className="flex items-center justify-center mb-1">
              {renderStars(Math.round(summary.averageRating))}
            </div>
            <div className="text-sm text-gray-500">
              {summary.totalReviews}개의 리뷰
            </div>
          </div>

          <div className="flex-1">
            {[5, 4, 3, 2, 1].map((rating) => (
              <button
                key={rating}
                className="flex items-center gap-2 w-full mb-1 hover:bg-gray-100 p-1 rounded"
                onClick={() => setSelectedRating(selectedRating === rating ? null : rating)}
              >
                <div className="flex items-center">
                  {renderStars(rating)}
                </div>
                <div className="w-full bg-gray-200 h-2 rounded-full">
                  <div
                    className="bg-yellow-400 h-2 rounded-full"
                    style={{
                      width: `${(summary.ratingDistribution[rating] / summary.totalReviews) * 100}%`
                    }}
                  />
                </div>
                <span className="text-sm text-gray-500 min-w-[40px]">
                  {summary.ratingDistribution[rating]}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Sort Controls */}
      <div className="flex justify-between items-center mb-6">
        <div className="flex gap-2">
          <button
            className={`px-3 py-1 rounded ${
              sortBy === 'recent'
                ? 'bg-gray-900 text-white'
                : 'bg-gray-100'
            }`}
            onClick={() => setSortBy('recent')}
          >
            최신순
          </button>
          <button
            className={`px-3 py-1 rounded ${
              sortBy === 'helpful'
                ? 'bg-gray-900 text-white'
                : 'bg-gray-100'
            }`}
            onClick={() => setSortBy('helpful')}
          >
            도움순
          </button>
        </div>
        {selectedRating && (
          <button
            className="text-sm text-gray-500 hover:text-gray-700"
            onClick={() => setSelectedRating(null)}
          >
            필터 초기화
          </button>
        )}
      </div>

      {/* Review List */}
      <div className="space-y-8">
        {sortedReviews.map((review) => (
          <div key={review.id} className="border-b pb-8">
            <div className="flex items-center gap-2 mb-2">
              <div className="flex">
                {renderStars(review.rating)}
              </div>
              <span className="text-sm text-gray-500">|</span>
              <span className="text-sm font-medium">{review.userName}</span>
              {review.isVerifiedPurchase && (
                <>
                  <span className="text-sm text-gray-500">|</span>
                  <span className="text-sm text-green-600">구매 확인</span>
                </>
              )}
            </div>

            <div className="text-sm text-gray-500 mb-3">
              {review.productOptions.color} / {review.productOptions.size} • {
                new Date(review.createdAt).toLocaleDateString('ko-KR', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })
              }
            </div>

            <p className="text-gray-700 mb-4 whitespace-pre-line">
              {review.content}
            </p>

            {review.images && review.images.length > 0 && (
              <div className="flex gap-2 mb-4">
                {review.images.map((image, index) => (
                  <div key={index} className="relative w-20 h-20">
                    <Image
                      src={image}
                      alt={`Review image ${index + 1}`}
                      fill
                      className="object-cover rounded"
                    />
                  </div>
                ))}
              </div>
            )}

            <button className="flex items-center gap-1 text-sm text-gray-500 hover:text-gray-700">
              <ThumbsUp className="w-4 h-4" />
              도움됨 {review.helpful}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductReviews;
