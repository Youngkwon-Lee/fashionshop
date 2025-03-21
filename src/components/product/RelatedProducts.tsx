import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

interface RelatedProduct {
  id: string;
  title: string;
  price: string;
  originalPrice?: string;
  imageUrl: string;
  link: string;
  isSale?: boolean;
}

interface RelatedProductsProps {
  products: RelatedProduct[];
  title?: string;
}

const RelatedProducts = ({ products, title = "관련 상품" }: RelatedProductsProps) => {
  return (
    <div className="py-12">
      <h2 className="text-xl font-medium mb-6">{title}</h2>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {products.map((product) => (
          <div key={product.id} className="group">
            <Link href={product.link} className="block">
              <div className="relative aspect-[3/4] mb-3 overflow-hidden">
                <Image
                  src={product.imageUrl}
                  alt={product.title}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
                {product.isSale && (
                  <div className="absolute top-2 left-2">
                    <span className="bg-red-500 text-white text-xs px-2 py-1">SALE</span>
                  </div>
                )}
              </div>

              <h3 className="text-sm font-medium mb-1">{product.title}</h3>
              <div className="flex items-baseline gap-2">
                {product.originalPrice && (
                  <span className="text-gray-500 line-through text-xs">{product.originalPrice}</span>
                )}
                <span className="text-sm">{product.price}</span>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RelatedProducts;
