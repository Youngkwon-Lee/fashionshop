"use client";

import React, { useState } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import Link from 'next/link';
import Image from 'next/image';
import { Check } from 'lucide-react';

// Dummy cart items again for the checkout page
const cartItems = [
  {
    id: 1801,
    title: '소프트 컬러 라운드 가디건',
    price: 39000,
    color: '베이지',
    size: 'FREE',
    quantity: 1,
    imageUrl: 'https://ext.same-assets.com/288811423/4282878971.webp',
  },
  {
    id: 1737,
    title: '와이드 슬랙스 팬츠',
    price: 42000,
    color: '블랙',
    size: 'FREE',
    quantity: 2,
    imageUrl: 'https://ext.same-assets.com/1789176774/491349818.webp',
  }
];

// Payment methods
const paymentMethods = [
  { id: 'card', name: '신용/체크카드' },
  { id: 'trans', name: '계좌이체' },
  { id: 'virtual', name: '가상계좌' },
  { id: 'phone', name: '휴대폰 결제' },
  { id: 'kakao', name: '카카오페이' },
  { id: 'naver', name: '네이버페이' },
];

export default function CheckoutPage() {
  // State for form fields
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    address1: '',
    address2: '',
    zipcode: '',
    shippingNotes: '',
    paymentMethod: 'card',
    agreeTerms: false,
  });

  // State for order completion
  const [orderComplete, setOrderComplete] = useState(false);

  // Handle form input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    let newValue = value;

    // Format phone number
    if (name === 'phone') {
      newValue = value
        .replace(/[^0-9]/g, '')
        .replace(/^(\d{0,3})(\d{0,4})(\d{0,4})$/, (match, p1, p2, p3) => {
          if (p1 && p2 && p3) return `${p1}-${p2}-${p3}`;
          if (p1 && p2) return `${p1}-${p2}`;
          if (p1) return `${p1}`;
          return '';
        });
    }

    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : newValue
    }));
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validate form
    if (!formData.name || !formData.phone || !formData.email || !formData.address1 || !formData.zipcode || !formData.agreeTerms) {
      alert('모든 필수 항목을 입력해주세요.');
      return;
    }

    // In a real app, we would submit the order to an API
    // For this demo, we'll just show the success screen
    setOrderComplete(true);
  };

  // Calculate order totals
  const subtotal = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  const shipping = subtotal >= 50000 ? 0 : 3000;
  const total = subtotal + shipping;

  // Format currency
  const formatCurrency = (amount: number) => {
    return amount.toLocaleString() + '원';
  };

  if (orderComplete) {
    return (
      <MainLayout>
        <div className="container-rosee py-8">
          <div className="text-center py-16 max-w-md mx-auto">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-green-100 text-green-600 mb-6">
              <Check className="w-10 h-10" />
            </div>
            <h1 className="text-2xl font-semibold mb-2">주문이 완료되었습니다</h1>
            <p className="text-gray-500 mb-8">
              주문번호: <span className="font-medium">#ORDER-{Math.floor(Math.random() * 100000)}</span>
            </p>
            <p className="mb-6 text-sm text-gray-600">
              주문하신 상품은 배송 준비 후 발송됩니다.<br />
              주문 내역은 마이페이지에서 확인하실 수 있습니다.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/"
                className="px-6 py-3 bg-black text-white text-center hover:bg-gray-800 transition-colors"
              >
                쇼핑 계속하기
              </Link>
              <Link
                href="/mypage/orders"
                className="px-6 py-3 border border-gray-300 text-center hover:border-black transition-colors"
              >
                주문 확인하기
              </Link>
            </div>
          </div>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="container-rosee py-8">
        <div className="flex items-center gap-2 mb-6 text-sm text-gray-500">
          <Link href="/" className="hover:text-black">Home</Link>
          <span>&gt;</span>
          <Link href="/cart" className="hover:text-black">장바구니</Link>
          <span>&gt;</span>
          <span className="text-black">주문/결제</span>
        </div>

        <h1 className="text-2xl font-semibold mb-6 text-center">주문/결제</h1>

        <form onSubmit={handleSubmit} className="flex flex-col lg:flex-row gap-8">
          {/* Checkout Form */}
          <div className="lg:w-2/3">
            {/* Shipping Information */}
            <div className="mb-8">
              <h2 className="text-lg font-medium mb-4 pb-2 border-b border-gray-200">배송 정보</h2>

              <div className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">이름 <span className="text-red-500">*</span></label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 focus:border-black outline-none transition-colors"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">연락처 <span className="text-red-500">*</span></label>
                    <input
                      type="text"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="010-0000-0000"
                      className="w-full px-3 py-2 border border-gray-300 focus:border-black outline-none transition-colors"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">이메일 <span className="text-red-500">*</span></label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 focus:border-black outline-none transition-colors"
                    required
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="sm:col-span-1">
                    <label className="block text-sm font-medium mb-1">우편번호 <span className="text-red-500">*</span></label>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        name="zipcode"
                        value={formData.zipcode}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 focus:border-black outline-none transition-colors"
                        required
                        readOnly
                      />
                      <button
                        type="button"
                        className="px-3 py-2 bg-gray-100 border border-gray-300 text-sm whitespace-nowrap"
                        onClick={() => alert('우편번호 검색 기능은 데모용으로 구현되어 있지 않습니다.')}
                      >
                        우편번호 찾기
                      </button>
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">주소 <span className="text-red-500">*</span></label>
                  <input
                    type="text"
                    name="address1"
                    value={formData.address1}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 focus:border-black outline-none transition-colors mb-2"
                    required
                  />
                  <input
                    type="text"
                    name="address2"
                    value={formData.address2}
                    onChange={handleInputChange}
                    placeholder="상세주소"
                    className="w-full px-3 py-2 border border-gray-300 focus:border-black outline-none transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">배송 요청사항</label>
                  <textarea
                    name="shippingNotes"
                    value={formData.shippingNotes}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 focus:border-black outline-none transition-colors h-20"
                    placeholder="배송 관련 요청사항을 입력해주세요."
                  />
                </div>
              </div>
            </div>

            {/* Payment Method */}
            <div className="mb-8">
              <h2 className="text-lg font-medium mb-4 pb-2 border-b border-gray-200">결제 방법</h2>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {paymentMethods.map((method) => (
                  <div key={method.id} className="relative">
                    <input
                      type="radio"
                      id={`payment-${method.id}`}
                      name="paymentMethod"
                      value={method.id}
                      checked={formData.paymentMethod === method.id}
                      onChange={handleInputChange}
                      className="absolute opacity-0"
                    />
                    <label
                      htmlFor={`payment-${method.id}`}
                      className={`block border p-3 text-center cursor-pointer hover:border-gray-400 transition-colors ${
                        formData.paymentMethod === method.id ? 'border-black' : 'border-gray-300'
                      }`}
                    >
                      {method.name}
                    </label>
                  </div>
                ))}
              </div>
            </div>

            {/* Terms Agreement */}
            <div className="mb-8">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  name="agreeTerms"
                  checked={formData.agreeTerms}
                  onChange={handleInputChange}
                  className="mr-2"
                  required
                />
                <span>주문 내용을 확인하였으며, 개인정보 수집 및 이용에 동의합니다. <span className="text-red-500">*</span></span>
              </label>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:w-1/3">
            <div className="bg-gray-50 p-6 border border-gray-200 sticky top-4">
              <h2 className="text-lg font-medium mb-4 pb-2 border-b border-gray-200">주문 상품 ({cartItems.length})</h2>

              <div className="space-y-4 mb-6">
                {cartItems.map((item) => (
                  <div key={`${item.id}-${item.color}-${item.size}`} className="flex gap-3">
                    <div className="relative w-16 h-16 flex-shrink-0">
                      <Image
                        src={item.imageUrl}
                        alt={item.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <div className="text-sm font-medium">{item.title}</div>
                      <div className="text-xs text-gray-500">
                        {item.color} / {item.size} / {item.quantity}개
                      </div>
                      <div className="text-sm font-medium mt-1">
                        {formatCurrency(item.price * item.quantity)}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="border-t border-gray-200 pt-4 mb-6">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">상품 금액</span>
                    <span>{formatCurrency(subtotal)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">배송비</span>
                    <span>
                      {shipping === 0
                        ? '무료'
                        : formatCurrency(shipping)}
                    </span>
                  </div>
                  <div className="flex justify-between font-bold text-lg pt-3 mt-1 border-t border-gray-200">
                    <span>총 결제 금액</span>
                    <span>{formatCurrency(total)}</span>
                  </div>
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-black text-white text-center hover:bg-gray-800 transition-colors"
              >
                결제하기
              </button>

              <p className="text-xs text-gray-500 mt-4">
                * 주문 완료 후 결제 대행사로 이동합니다.
              </p>
            </div>
          </div>
        </form>
      </div>
    </MainLayout>
  );
}
