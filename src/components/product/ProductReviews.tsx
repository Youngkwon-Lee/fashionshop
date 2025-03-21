"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import { ChevronDown, ChevronUp, Star } from 'lucide-react';

// Sample review data
const sampleReviews = [
  {
    id: 1,
    username: '김*영',
    rating: 5,
    date: '2023-12-15',
    content: '색상도 예쁘고 따뜻해요. 기본 아이템이라 여러 옷에 매치하기 좋아요!',
    imageUrl: 'https://images.unsplash.com/photo-1584030373081-f37b019b2445?w=800',
  },
  {
    id: 2,
    username: '박*준',
    rating: 4,
    date: '2023-12-10',
    content: '가볍고 편하게 입기 좋아요. 다양한 코디에 활용하고 있습니다.',
  },
  {
    id: 3,
    username: '이*나',
    rating: 5,
    date: '2023-12-05',
    content: '배송도 빠르고 제품도 좋아요! 사이즈도 딱 맞아서 만족합니다.',
    imageUrl: 'https://images.unsplash.com/photo-1584030373052-6f0a5f00d1a3?w=800',
  },
  {
    id: 4,
    username: '최*석',
    rating: 3,
    date: '2023-11-30',
    content: '생각보다 얇아요. 초봄이나 가을에 입기 좋을 것 같습니다.',
  },
  {
    id: 5,
    username: '정*현',
    rating: 5,
    date: '2023-11-25',
    content: '색감이 정말 예뻐요! 여러 색상으로 구매하고 싶네요.',
    imageUrl: 'https://images.unsplash.com/photo-1583846552345-d2192d5c6fcd?w=800',
  }
];

interface ProductReviewsProps {
  productId: string;
}

const ProductReviews = ({ productId }: ProductReviewsProps) => {
  const [expandedReview, setExpandedReview] = useState<number | null>(null);

  const toggleReview = (reviewId: number) => {
    setExpandedReview(expandedReview === reviewId ? null : reviewId);
  };

  return (
    <div className="py-12 border-t border-gray-200">
      <h2 className="text-xl font-medium mb-6">Reviews ({sampleReviews.length})</h2>

      <div className="mb-6">
        <div className="bg-gray-50 p-6 flex flex-col md:flex-row items-center">
          <div className="text-center md:text-left md:w-1/3 mb-4 md:mb-0">
            <div className="text-3xl font-bold mb-2">4.4</div>
            <div className="flex justify-center md:justify-start">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  className={`w-4 h-4 ${star <= 4 ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`}
                />
              ))}
            </div>
            <div className="text-sm text-gray-500 mt-1">총 {sampleReviews.length}개 리뷰</div>
          </div>

          <div className="md:w-2/3">
            <div className="space-y-2">
              {[5, 4, 3, 2, 1].map((rating) => {
                const count = sampleReviews.filter(r => r.rating === rating).length;
                const percentage = Math.round((count / sampleReviews.length) * 100);

                return (
                  <div key={rating} className="flex items-center gap-3">
                    <div className="flex items-center gap-1 w-12">
                      <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm">{rating}</span>
                    </div>
                    <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-yellow-400 rounded-full"
                        style={{ width: `${percentage}%` }}
                      ></div>
                    </div>
                    <div className="text-xs text-gray-500 w-10 text-right">{percentage}%</div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-6">
        {sampleReviews.map((review) => (
          <div key={review.id} className="border-b border-gray-200 pb-6">
            <div className="flex justify-between mb-2">
              <div>
                <span className="font-medium">{review.username}</span>
                <span className="text-gray-500 text-sm ml-2">{review.date}</span>
              </div>
              <div className="flex">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    className={`w-3 h-3 ${star <= review.rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`}
                  />
                ))}
              </div>
            </div>

            {review.imageUrl && (
              <div className="mb-3">
                <Image
                  src={review.imageUrl}
                  alt={`Review by ${review.username}`}
                  width={120}
                  height={120}
                  className="object-cover rounded"
                />
              </div>
            )}

            <div className={expandedReview === review.id ? '' : 'line-clamp-2'}>
              <p className="text-sm text-gray-700">{review.content}</p>
            </div>

            {review.content.length > 100 && (
              <button
                className="text-xs text-gray-500 mt-2 flex items-center"
                onClick={() => toggleReview(review.id)}
              >
                {expandedReview === review.id ? (
                  <>
                    <ChevronUp className="w-3 h-3 mr-1" />
                    접기
                  </>
                ) : (
                  <>
                    <ChevronDown className="w-3 h-3 mr-1" />
                    더 보기
                  </>
                )}
              </button>
            )}
          </div>
        ))}
      </div>

      <div className="mt-8 text-center">
        <button className="px-6 py-2 border border-gray-300 hover:border-black transition-colors">
          더 많은 리뷰 보기
        </button>
      </div>
    </div>
  );
};

export default ProductReviews;
