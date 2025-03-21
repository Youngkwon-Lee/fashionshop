"use client";

import React, { useState } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import Link from 'next/link';
import Image from 'next/image';
import { X, MinusIcon, PlusIcon, ShoppingBag } from 'lucide-react';

// Sample cart items
const initialCartItems = [
  {
    id: 1801,
    title: '소프트 컬러 라운드 가디건',
    price: 39000,
    color: '베이지',
    size: 'FREE',
    quantity: 1,
    imageUrl: 'https://ext.same-assets.com/288811423/4282878971.webp',
    link: '/product/1801',
  },
  {
    id: 1737,
    title: '와이드 슬랙스 팬츠',
    price: 42000,
    color: '블랙',
    size: 'FREE',
    quantity: 2,
    imageUrl: 'https://ext.same-assets.com/1789176774/491349818.webp',
    link: '/product/1737',
  }
];

export default function CartPage() {
  const [cartItems, setCartItems] = useState(initialCartItems);
  const [couponCode, setCouponCode] = useState('');
  const [couponApplied, setCouponApplied] = useState(false);

  const incrementQuantity = (itemId: number) => {
    setCartItems(prevItems =>
      prevItems.map(item =>
        item.id === itemId ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const decrementQuantity = (itemId: number) => {
    setCartItems(prevItems =>
      prevItems.map(item =>
        item.id === itemId && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    );
  };

  const removeItem = (itemId: number) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== itemId));
  };

  const handleApplyCoupon = () => {
    if (couponCode.trim() === 'WELCOME10') {
      setCouponApplied(true);
    } else {
      alert('유효하지 않은 쿠폰 코드입니다.');
    }
  };

  // Calculate subtotal
  const subtotal = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);

  // Calculate discount
  const discount = couponApplied ? Math.round(subtotal * 0.1) : 0;

  // Calculate shipping (free over 50,000)
  const shipping = subtotal >= 50000 ? 0 : 3000;

  // Calculate total
  const total = subtotal - discount + shipping;

  // Format currency
  const formatCurrency = (amount: number) => {
    return amount.toLocaleString() + '원';
  };

  return (
    <MainLayout>
      <div className="container-rosee py-8">
        <div className="flex items-center gap-2 mb-6 text-sm text-gray-500">
          <Link href="/" className="hover:text-black">Home</Link>
          <span>&gt;</span>
          <span className="text-black">장바구니</span>
        </div>

        <h1 className="text-2xl font-semibold mb-6 text-center">장바구니</h1>

        {cartItems.length > 0 ? (
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Cart Items */}
            <div className="lg:w-2/3">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 border-y border-gray-200">
                    <tr>
                      <th className="py-3 px-4 text-left font-medium text-sm">상품정보</th>
                      <th className="py-3 px-4 text-center font-medium text-sm w-32">수량</th>
                      <th className="py-3 px-4 text-right font-medium text-sm w-32">상품금액</th>
                      <th className="py-3 px-4 w-10"></th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {cartItems.map((item) => (
                      <tr key={`${item.id}-${item.color}-${item.size}`} className="hover:bg-gray-50">
                        <td className="py-4 px-4">
                          <div className="flex items-center">
                            <div className="relative w-20 h-20 flex-shrink-0 mr-4">
                              <Image
                                src={item.imageUrl}
                                alt={item.title}
                                fill
                                className="object-cover"
                              />
                            </div>
                            <div>
                              <Link href={item.link} className="font-medium hover:underline">
                                {item.title}
                              </Link>
                              <div className="text-sm text-gray-500 mt-1">
                                <div>컬러: {item.color}</div>
                                <div>사이즈: {item.size}</div>
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="py-4 px-4">
                          <div className="flex items-center justify-center border border-gray-300 w-32 mx-auto">
                            <button
                              className="w-8 h-8 flex items-center justify-center text-gray-500"
                              onClick={() => decrementQuantity(item.id)}
                              disabled={item.quantity <= 1}
                            >
                              <MinusIcon className="w-4 h-4" />
                            </button>
                            <div className="w-12 text-center">{item.quantity}</div>
                            <button
                              className="w-8 h-8 flex items-center justify-center text-gray-500"
                              onClick={() => incrementQuantity(item.id)}
                            >
                              <PlusIcon className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                        <td className="py-4 px-4 text-right font-medium">
                          {formatCurrency(item.price * item.quantity)}
                        </td>
                        <td className="py-4 px-4 text-center">
                          <button
                            className="text-gray-400 hover:text-gray-600"
                            onClick={() => removeItem(item.id)}
                            aria-label="상품 삭제"
                          >
                            <X className="w-5 h-5" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="mt-6 flex justify-between">
                <Link href="/" className="inline-block px-6 py-3 border border-gray-300 text-sm hover:border-black transition-colors">
                  쇼핑 계속하기
                </Link>
                <button
                  className="inline-block px-6 py-3 border border-gray-300 text-sm hover:border-black transition-colors"
                  onClick={() => setCartItems([])}
                >
                  장바구니 비우기
                </button>
              </div>
            </div>

            {/* Order Summary */}
            <div className="lg:w-1/3">
              <div className="bg-gray-50 p-6 border border-gray-200">
                <h2 className="text-lg font-medium mb-4">주문 요약</h2>

                <div className="space-y-3 mb-6">
                  <div className="flex justify-between">
                    <span className="text-gray-600">상품 금액</span>
                    <span>{formatCurrency(subtotal)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">배송비</span>
                    <span>
                      {shipping === 0
                        ? '무료'
                        : formatCurrency(shipping)}
                    </span>
                  </div>
                  {couponApplied && (
                    <div className="flex justify-between text-red-500">
                      <span>할인 (쿠폰)</span>
                      <span>-{formatCurrency(discount)}</span>
                    </div>
                  )}
                  <div className="pt-3 mt-3 border-t border-gray-200 flex justify-between font-bold">
                    <span>총 결제 금액</span>
                    <span>{formatCurrency(total)}</span>
                  </div>
                </div>

                <div className="mb-4">
                  <div className="flex gap-2 mb-3">
                    <input
                      type="text"
                      placeholder="쿠폰 코드 입력"
                      className="flex-1 px-3 py-2 border border-gray-300 text-sm"
                      value={couponCode}
                      onChange={(e) => setCouponCode(e.target.value)}
                      disabled={couponApplied}
                    />
                    <button
                      className="px-4 py-2 bg-gray-800 text-white text-sm hover:bg-black transition-colors"
                      onClick={handleApplyCoupon}
                      disabled={couponApplied || !couponCode.trim()}
                    >
                      적용
                    </button>
                  </div>
                  <p className="text-xs text-gray-500">쿠폰 코드 'WELCOME10'을 사용하여 10% 할인 받으세요.</p>
                </div>

                <Link
                  href="/checkout"
                  className="w-full py-3 bg-black text-white text-center inline-block hover:bg-gray-800 transition-colors"
                >
                  주문하기
                </Link>

                <div className="mt-4 text-xs text-gray-500">
                  <p>· 주문하기 버튼 클릭시 결제 페이지로 이동합니다.</p>
                  <p>· 5만원 이상 구매시 무료배송 혜택이 적용됩니다.</p>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gray-100 mb-6">
              <ShoppingBag className="w-10 h-10 text-gray-400" />
            </div>
            <h2 className="text-xl font-medium mb-2">장바구니가 비어있습니다</h2>
            <p className="text-gray-500 mb-6">상품을 담아 주세요.</p>
            <Link
              href="/"
              className="inline-block px-8 py-3 border border-black bg-black text-white hover:bg-gray-800 transition-colors"
            >
              쇼핑하러 가기
            </Link>
          </div>
        )}
      </div>
    </MainLayout>
  );
}
