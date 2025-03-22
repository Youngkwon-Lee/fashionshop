"use client";

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface ProductCardProps {
  id: string | number;
  title: string;
  price: string;
  originalPrice?: string;
  imageUrl: string;
  hoverImageUrl?: string;
  link?: string;
  isNew?: boolean;
  isSale?: boolean;
  colors?: number;
}

const ProductCard = ({
  id,
  title,
  price,
  originalPrice,
  imageUrl,
  hoverImageUrl,
  link,
  isNew = false,
  isSale = false,
  colors,
}: ProductCardProps) => {
  const productLink = link || `/product/${id}`;

  return (
    <div className="product-card group">
      <Link href={productLink} className="block relative">
        <div className="relative overflow-hidden pb-[125%]">
          {/* Main Image */}
          <Image
            src={imageUrl}
            alt={title}
            fill
            className="object-cover transition-opacity duration-300 group-hover:opacity-0"
          />

          {/* Hover Image */}
          {hoverImageUrl && (
            <Image
              src={hoverImageUrl}
              alt={`${title} hover`}
              fill
              className="object-cover opacity-0 transition-opacity duration-300 group-hover:opacity-100"
            />
          )}

          {/* New / Sale Tag */}
          {(isNew || isSale) && (
            <div className="absolute top-2 left-2 flex flex-col gap-1">
              {isNew && (
                <span className="bg-black text-white text-xs px-2 py-1">NEW</span>
              )}
              {isSale && (
                <span className="bg-red-500 text-white text-xs px-2 py-1">SALE</span>
              )}
            </div>
          )}
        </div>
      </Link>

      <div className="product-card-info">
        <h3 className="product-card-title">
          <Link href={productLink}>{title}</Link>
        </h3>
        <div className="flex items-center gap-2">
          {isSale && originalPrice && (
            <span className="text-gray-500 line-through text-xs">{originalPrice}</span>
          )}
          <span className="product-card-price">{price}</span>
          {colors && <span className="text-xs text-gray-500">/ {colors}color</span>}
        </div>

        {/* Icons */}
        <div className="flex items-center gap-2 mt-2">
          <button
            aria-label="Add to cart"
            className="w-6 h-6 opacity-0 group-hover:opacity-100 transition-opacity"
          >
            <Image
              src="https://ext.same-assets.com/325114735/23732276.png"
              alt="Add to cart"
              width={24}
              height={24}
            />
          </button>
          <Image
            src="https://ext.same-assets.com/1870386563/1119032211.png"
            alt="Shipping icon"
            width={12}
            height={12}
          />
          <Image
            src="https://ext.same-assets.com/4244793570/1097868712.png"
            alt="Delay icon"
            width={12}
            height={12}
          />
        </div>

        <div className="text-xs text-gray-500 mt-1">
          <p>3 ~ 14 일 이내</p>
          <p>03/23 ~ 04/03</p>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
