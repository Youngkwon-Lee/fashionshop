import React from 'react';
import Link from 'next/link';
import ProductCard from './ProductCard';

interface ProductSectionProps {
  title: string;
  subtitle?: string;
  viewAllLink: string;
  products: Array<{
    id: number | string;
    title: string;
    price: string;
    originalPrice?: string;
    imageUrl: string;
    hoverImageUrl?: string;
    link: string;
    isNew?: boolean;
    isSale?: boolean;
    colors?: number;
  }>;
}

const ProductSection = ({ title, subtitle, viewAllLink, products }: ProductSectionProps) => {
  return (
    <section className="py-16">
      <div className="container-rosee">
        <div className="text-center mb-10">
          <h2 className="text-2xl font-semibold mb-2">{title}</h2>
          {subtitle && <p className="text-gray-500">{subtitle}</p>}
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              id={product.id}
              title={product.title}
              price={product.price}
              originalPrice={product.originalPrice}
              imageUrl={product.imageUrl}
              hoverImageUrl={product.hoverImageUrl}
              link={product.link}
              isNew={product.isNew}
              isSale={product.isSale}
              colors={product.colors}
            />
          ))}
        </div>

        <div className="text-center mt-10">
          <Link href={viewAllLink} className="inline-block border border-black px-6 py-2 hover:bg-black hover:text-white transition-colors">
            View All
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ProductSection;
