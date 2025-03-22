"use client";

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useCart } from '@/contexts/CartContext';
import { formatPrice } from '@/lib/api/products';

export default function CartPage() {
  const { items, removeFromCart, updateQuantity, getTotalPrice } = useCart();

  if (items.length === 0) {
    return (
      <div className="container-rosee py-16 text-center">
        <h1 className="text-2xl font-bold mb-4">장바구니가 비어있습니다</h1>
        <p className="text-gray-600 mb-8">원하는 상품을 장바구니에 담아보세요.</p>
        <Link
          href="/"
          className="inline-block bg-black text-white px-6 py-3 hover:bg-gray-800"
        >
          쇼핑 계속하기
        </Link>
      </div>
    );
  }

  return (
    <div className="container-rosee py-8">
      <h1 className="text-2xl font-bold mb-8">장바구니</h1>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Cart Items */}
        <div className="flex-1">
          {items.map((item) => (
            <div
              key={`${item.id}-${item.color}-${item.size}`}
              className="flex gap-4 py-4 border-b"
            >
              <div className="w-24 h-24 relative flex-shrink-0">
                <Image
                  src={item.imageUrl}
                  alt={item.title}
                  fill
                  className="object-cover"
                />
              </div>

              <div className="flex-1">
                <div className="flex justify-between">
                  <div>
                    <h3 className="font-medium">{item.title}</h3>
                    <p className="text-sm text-gray-600 mt-1">
                      {item.color} / {item.size}
                    </p>
                  </div>
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="text-gray-400 hover:text-black"
                  >
                    ✕
                  </button>
                </div>

                <div className="flex justify-between items-end mt-4">
                  <div className="flex items-center border">
                    <button
                      onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
                      className="w-8 h-8 flex items-center justify-center text-gray-600 hover:bg-gray-100"
                    >
                      -
                    </button>
                    <span className="w-12 text-center">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.id, Math.min(10, item.quantity + 1))}
                      className="w-8 h-8 flex items-center justify-center text-gray-600 hover:bg-gray-100"
                    >
                      +
                    </button>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">{formatPrice(item.price * item.quantity)}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Order Summary */}
        <div className="lg:w-80">
          <div className="bg-gray-50 p-6">
            <h2 className="text-lg font-bold mb-4">주문 요약</h2>
            <div className="space-y-2 text-sm mb-4">
              <div className="flex justify-between">
                <span>상품 금액</span>
                <span>{formatPrice(getTotalPrice())}</span>
              </div>
              <div className="flex justify-between">
                <span>배송비</span>
                <span>무료</span>
              </div>
            </div>
            <div className="border-t pt-4">
              <div className="flex justify-between font-bold">
                <span>총 결제금액</span>
                <span>{formatPrice(getTotalPrice())}</span>
              </div>
            </div>
            <Link
              href="/checkout"
              className="block w-full bg-black text-white text-center py-3 mt-6 hover:bg-gray-800"
            >
              구매하기
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
