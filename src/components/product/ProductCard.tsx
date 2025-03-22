import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Product } from '@/types/product';
import { formatPrice } from '@/lib/api/products';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <Link href={`/product/${product.id}`} className="group">
      <div className="aspect-square relative mb-4 overflow-hidden">
        <Image
          src={product.imageUrls[0]}
          alt={product.title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-300"
        />
      </div>
      <h3 className="text-sm font-medium mb-1">{product.title}</h3>
      <p className="text-sm text-gray-600">{formatPrice(product.price)}</p>
    </Link>
  );
} 