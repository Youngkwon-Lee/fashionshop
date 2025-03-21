"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { MinusIcon, PlusIcon, Share2 } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface Color {
  name: string;
  code: string;
  available: boolean;
}

interface RelatedProduct {
  id: string;
  title: string;
  price: string;
  originalPrice?: string;
  imageUrl: string;
  link: string;
  isSale?: boolean;
}

interface ProductDetailProps {
  product: {
    id: string;
    title: string;
    price: string;
    originalPrice?: string;
    description: string;
    details: string[];
    imageUrls: string[];
    colors: Color[];
    sizes: string[];
    category: string;
    deliveryInfo: string;
    productionPeriod: string;
    relatedProducts: RelatedProduct[];
  };
}

const ProductDetail = ({ product }: ProductDetailProps) => {
  const router = useRouter();
  const [currentImage, setCurrentImage] = useState(0);
  const [selectedColor, setSelectedColor] = useState(product.colors.find(c => c.available)?.name || '');
  const [selectedSize, setSelectedSize] = useState(product.sizes[0] || '');
  const [quantity, setQuantity] = useState(1);
  const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false);

  const incrementQuantity = () => {
    setQuantity(prev => prev + 1);
  };

  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(prev => prev - 1);
    }
  };

  const handleAddToCart = () => {
    if (!selectedColor || !selectedSize) {
      alert('컬러와 사이즈를 선택해주세요.');
      return;
    }

    // In a real app, we would add to cart in the state management
    // For now, we'll just show a message
    alert(`장바구니에 추가되었습니다: ${product.title} (${selectedColor}, ${selectedSize}, ${quantity}개)`);

    // This would navigate to the cart page in a real implementation
    // router.push('/cart');
  };

  const handleBuyNow = () => {
    if (!selectedColor || !selectedSize) {
      alert('컬러와 사이즈를 선택해주세요.');
      return;
    }

    // Navigate to checkout with the product
    alert(`즉시 구매: ${product.title} (${selectedColor}, ${selectedSize}, ${quantity}개)`);
    // router.push('/checkout');
  };

  const calculateTotalPrice = () => {
    const priceValue = parseInt(product.price.replace(/,/g, ''));
    return (priceValue * quantity).toLocaleString();
  };

  return (
    <div className="flex flex-col md:flex-row gap-8">
      {/* Image Gallery */}
      <div className="md:w-1/2">
        <div className="relative aspect-[3/4] mb-4">
          <Image
            src={product.imageUrls[currentImage]}
            alt={product.title}
            fill
            className="object-cover"
            priority
          />
        </div>
        <div className="grid grid-cols-4 gap-2">
          {product.imageUrls.map((url, index) => (
            <button
              key={index}
              className={`relative aspect-square ${currentImage === index ? 'border-2 border-black' : 'border border-gray-200'}`}
              onClick={() => setCurrentImage(index)}
            >
              <Image
                src={url}
                alt={`${product.title} preview ${index + 1}`}
                fill
                className="object-cover"
              />
            </button>
          ))}
        </div>
      </div>

      {/* Product Information */}
      <div className="md:w-1/2">
        <h1 className="text-xl md:text-2xl font-medium mb-4">{product.title}</h1>

        <div className="flex items-baseline gap-2 mb-6">
          {product.originalPrice && (
            <span className="text-gray-500 line-through">{product.originalPrice}원</span>
          )}
          <span className="text-xl font-semibold">{product.price}원</span>
        </div>

        {/* Description */}
        <div className="mb-6">
          <p className={`text-sm text-gray-700 whitespace-pre-line ${!isDescriptionExpanded && 'line-clamp-3'}`}>
            {product.description}
          </p>
          {product.description.length > 150 && (
            <button
              className="text-xs text-gray-500 mt-1 underline"
              onClick={() => setIsDescriptionExpanded(!isDescriptionExpanded)}
            >
              {isDescriptionExpanded ? '접기' : '더 보기'}
            </button>
          )}
        </div>

        {/* Color Selection */}
        <div className="mb-6">
          <p className="text-sm font-medium mb-2">Color</p>
          <div className="flex flex-wrap gap-2">
            {product.colors.map((color) => (
              <button
                key={color.name}
                className={`w-8 h-8 rounded-full border ${
                  selectedColor === color.name
                    ? 'ring-2 ring-black ring-offset-2'
                    : 'ring-1 ring-gray-300'
                } ${!color.available && 'opacity-40'}`}
                style={{ backgroundColor: color.code }}
                disabled={!color.available}
                onClick={() => color.available && setSelectedColor(color.name)}
                aria-label={color.name}
                title={color.available ? color.name : `${color.name} (품절)`}
              />
            ))}
          </div>
          {selectedColor && (
            <p className="text-xs text-gray-600 mt-2">선택: {selectedColor}</p>
          )}
        </div>

        {/* Size Selection */}
        <div className="mb-6">
          <p className="text-sm font-medium mb-2">Size</p>
          <div className="flex flex-wrap gap-2">
            {product.sizes.map((size) => (
              <button
                key={size}
                className={`px-3 py-1 border ${
                  selectedSize === size
                    ? 'border-black bg-black text-white'
                    : 'border-gray-300 hover:border-gray-400'
                }`}
                onClick={() => setSelectedSize(size)}
              >
                {size}
              </button>
            ))}
          </div>
        </div>

        {/* Quantity */}
        <div className="mb-6">
          <p className="text-sm font-medium mb-2">Quantity</p>
          <div className="flex items-center w-32 border border-gray-300">
            <button
              className="w-8 h-8 flex items-center justify-center text-gray-500"
              onClick={decrementQuantity}
              disabled={quantity <= 1}
            >
              <MinusIcon className="w-4 h-4" />
            </button>
            <div className="flex-1 text-center">{quantity}</div>
            <button
              className="w-8 h-8 flex items-center justify-center text-gray-500"
              onClick={incrementQuantity}
            >
              <PlusIcon className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Total Price */}
        <div className="flex justify-between items-center mb-6 py-4 border-t border-b border-gray-200">
          <p className="font-medium">Total</p>
          <p className="text-lg font-bold">{calculateTotalPrice()}원</p>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2 mb-8">
          <button
            className="flex-1 py-3 border border-black bg-black text-white hover:bg-gray-800 transition-colors"
            onClick={handleBuyNow}
          >
            바로 구매하기
          </button>
          <button
            className="flex-1 py-3 border border-gray-300 hover:border-black transition-colors"
            onClick={handleAddToCart}
          >
            장바구니 담기
          </button>
          <button
            className="w-12 h-12 flex items-center justify-center border border-gray-300"
            aria-label="Share"
          >
            <Share2 className="w-5 h-5" />
          </button>
        </div>

        {/* Product Details */}
        <div className="mb-6">
          <h2 className="font-medium mb-2">Product Details</h2>
          <ul className="text-sm text-gray-700 space-y-1">
            {product.details.map((detail, index) => (
              <li key={index}>{detail}</li>
            ))}
          </ul>
        </div>

        {/* Delivery Information */}
        <div className="text-sm text-gray-700">
          <p>배송: {product.deliveryInfo}</p>
          <p>제작기간: {product.productionPeriod}</p>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
