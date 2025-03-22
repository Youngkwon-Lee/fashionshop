import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { RelatedProduct } from '@/types/product';
import { formatPrice } from '@/lib/api/products';

interface RelatedProductsProps {
  products: RelatedProduct[];
  title: string;
}

const RelatedProducts = ({ products, title }: RelatedProductsProps) => {
  return (
    <div className="mt-16">
      <h2 className="text-xl font-medium mb-6">{title}</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {products.map((product) => (
          <Link
            key={product.id}
            href={product.link}
            className="group"
          >
            <div className="relative aspect-[3/4] mb-3">
              <Image
                src={product.imageUrl}
                alt={product.title}
                fill
                className="object-cover group-hover:opacity-80 transition-opacity"
              />
            </div>
            <h3 className="text-sm mb-1 group-hover:underline">{product.title}</h3>
            <div className="text-sm">
              {product.originalPrice && (
                <span className="text-gray-500 line-through mr-2">
                  {formatPrice(product.originalPrice)}
                </span>
              )}
              <span className="font-medium">{formatPrice(product.price)}</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default RelatedProducts;
