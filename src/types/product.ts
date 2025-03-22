export interface Color {
  name: string;
  code: string;
  available: boolean;
}

export interface RelatedProduct {
  id: string;
  title: string;
  price: number;
  originalPrice?: number;
  imageUrl: string;
  link: string;
  isSale?: boolean;
}

export interface Product {
  id: string;
  title: string;
  price: number;
  description: string;
  details: string;
  imageUrls: string[];
  category: string;
  colors: string[];
  sizes: string[];
  stock: number;
  status: string;
  deliveryInfo?: string;
  productionPeriod?: string;
  createdAt: Date;
  updatedAt: Date;
} 