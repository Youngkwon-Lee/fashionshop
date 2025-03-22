export interface Review {
  id: string;
  userId: string;
  userName: string;
  rating: number;
  content: string;
  createdAt: string;
  images?: string[];
  productOptions: {
    color: string;
    size: string;
  };
  helpful: number;
  isVerifiedPurchase: boolean;
}

export interface ReviewSummary {
  averageRating: number;
  totalReviews: number;
  ratingDistribution: {
    [key: number]: number;
  };
} 