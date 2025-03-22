import { Review, ReviewSummary } from '@/types/review';
import { db } from '@/lib/firebase';
import {
  collection,
  query,
  where,
  getDocs,
  addDoc,
  doc,
  updateDoc,
  increment,
  orderBy,
  Timestamp,
  serverTimestamp
} from 'firebase/firestore';

// 임시 리뷰 데이터
const MOCK_REVIEWS: Review[] = [
  {
    id: '1',
    userId: 'user1',
    userName: '김*영',
    rating: 5,
    content: '색상도 예쁘고 따뜻해요. 기본 아이템이라 여러 옷에 매치하기 좋아요!',
    createdAt: '2024-03-15T09:00:00Z',
    images: [
      'https://images.unsplash.com/photo-1584030373081-f37b019b2445?w=800'
    ],
    productOptions: {
      color: '블랙',
      size: 'M'
    },
    helpful: 12,
    isVerifiedPurchase: true
  },
  {
    id: '2',
    userId: 'user2',
    userName: '박*준',
    rating: 4,
    content: '가볍고 편하게 입기 좋아요. 다만 생각보다 얇아서 겨울에는 레이어드해서 입어야 할 것 같아요.',
    createdAt: '2024-03-14T15:30:00Z',
    productOptions: {
      color: '네이비',
      size: 'L'
    },
    helpful: 8,
    isVerifiedPurchase: true
  },
  {
    id: '3',
    userId: 'user3',
    userName: '이*나',
    rating: 5,
    content: '배송도 빠르고 제품도 좋아요! 사이즈도 딱 맞아서 만족합니다.',
    createdAt: '2024-03-13T11:20:00Z',
    images: [
      'https://images.unsplash.com/photo-1584030373052-6f0a5f00d1a3?w=800'
    ],
    productOptions: {
      color: '그레이',
      size: 'S'
    },
    helpful: 15,
    isVerifiedPurchase: true
  }
];

// 리뷰 요약 계산 함수
const calculateReviewSummary = (reviews: Review[]): ReviewSummary => {
  const totalReviews = reviews.length;
  if (totalReviews === 0) {
    return {
      averageRating: 0,
      totalReviews: 0,
      ratingDistribution: {
        1: 0,
        2: 0,
        3: 0,
        4: 0,
        5: 0
      }
    };
  }

  const ratingDistribution = reviews.reduce((acc, review) => {
    acc[review.rating] = (acc[review.rating] || 0) + 1;
    return acc;
  }, {} as { [key: number]: number });

  // 모든 평점에 대해 0으로 초기화
  for (let i = 1; i <= 5; i++) {
    ratingDistribution[i] = ratingDistribution[i] || 0;
  }

  const averageRating = reviews.reduce((sum, review) => sum + review.rating, 0) / totalReviews;

  return {
    averageRating,
    totalReviews,
    ratingDistribution
  };
};

// 상품의 리뷰 목록 조회
export const getProductReviews = async (productId: string): Promise<Review[]> => {
  try {
    const reviewsRef = collection(db, 'reviews');
    const q = query(
      reviewsRef,
      where('productId', '==', productId),
      orderBy('createdAt', 'desc')
    );
    
    const querySnapshot = await getDocs(q);
    const reviews: Review[] = [];

    querySnapshot.forEach((doc) => {
      const data = doc.data();
      reviews.push({
        id: doc.id,
        userId: data.userId,
        userName: data.userName,
        rating: data.rating,
        content: data.content,
        createdAt: data.createdAt.toDate().toISOString(),
        images: data.images || [],
        productOptions: {
          color: data.productOptions.color,
          size: data.productOptions.size
        },
        helpful: data.helpful || 0,
        isVerifiedPurchase: data.isVerifiedPurchase || false
      });
    });

    return reviews;
  } catch (error) {
    console.error('리뷰 목록 조회 중 오류 발생:', error);
    return [];
  }
};

// 상품의 리뷰 요약 정보 조회
export const getProductReviewSummary = async (productId: string): Promise<ReviewSummary> => {
  const reviews = await getProductReviews(productId);
  return calculateReviewSummary(reviews);
};

// 리뷰 작성
export const createReview = async (
  productId: string,
  review: Omit<Review, 'id' | 'createdAt' | 'helpful'>
): Promise<Review> => {
  try {
    const reviewsRef = collection(db, 'reviews');
    const reviewData = {
      productId,
      ...review,
      createdAt: serverTimestamp(),
      helpful: 0
    };

    const docRef = await addDoc(reviewsRef, reviewData);
    
    return {
      id: docRef.id,
      ...review,
      createdAt: new Date().toISOString(),
      helpful: 0
    };
  } catch (error) {
    console.error('리뷰 작성 중 오류 발생:', error);
    throw new Error('리뷰를 작성할 수 없습니다.');
  }
};

// 리뷰 도움됨 표시
export const markReviewAsHelpful = async (reviewId: string): Promise<void> => {
  try {
    const reviewRef = doc(db, 'reviews', reviewId);
    await updateDoc(reviewRef, {
      helpful: increment(1)
    });
  } catch (error) {
    console.error('리뷰 도움됨 표시 중 오류 발생:', error);
    throw new Error('리뷰에 도움됨을 표시할 수 없습니다.');
  }
}; 