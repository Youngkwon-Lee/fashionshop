"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { X } from 'lucide-react';
import { createProduct, uploadProductImage } from '@/lib/api/products';

interface ProductFormData {
  title: string;
  category: string;
  price: string;
  stock: string;
  description: string;
  details: string;
  deliveryInfo: string;
  productionPeriod: string;
}

export default function NewProductPage() {
  const router = useRouter();
  const [formData, setFormData] = useState<ProductFormData>({
    title: '',
    category: '',
    price: '',
    stock: '',
    description: '',
    details: '',
    deliveryInfo: '',
    productionPeriod: ''
  });
  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [imageUrls, setImageUrls] = useState<string[]>([]);
  const [colors, setColors] = useState<string[]>(['']);
  const [sizes, setSizes] = useState<string[]>(['']);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const newFiles = Array.from(files);
      setImageFiles(prev => [...prev, ...newFiles]);
      
      // 미리보기 URL 생성
      const newImageUrls = newFiles.map(file => URL.createObjectURL(file));
      setImageUrls(prev => [...prev, ...newImageUrls]);
    }
  };

  const removeImage = (index: number) => {
    setImageFiles(prev => prev.filter((_, i) => i !== index));
    setImageUrls(prev => {
      // 미리보기 URL 해제
      URL.revokeObjectURL(prev[index]);
      return prev.filter((_, i) => i !== index);
    });
  };

  const addColor = () => {
    setColors(prev => [...prev, '']);
  };

  const removeColor = (index: number) => {
    setColors(prev => prev.filter((_, i) => i !== index));
  };

  const updateColor = (index: number, value: string) => {
    setColors(prev => prev.map((color, i) => i === index ? value : color));
  };

  const addSize = () => {
    setSizes(prev => [...prev, '']);
  };

  const removeSize = (index: number) => {
    setSizes(prev => prev.filter((_, i) => i !== index));
  };

  const updateSize = (index: number, value: string) => {
    setSizes(prev => prev.map((size, i) => i === index ? value : size));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      // 이미지 업로드
      const uploadedImageUrls = await Promise.all(
        imageFiles.map(file => uploadProductImage(file))
      );

      // 상품 데이터 생성
      const productData = {
        ...formData,
        price: Number(formData.price),
        stock: Number(formData.stock),
        imageUrls: uploadedImageUrls,
        colors: colors.filter(color => color.trim() !== ''),
        sizes: sizes.filter(size => size.trim() !== ''),
        status: '판매중'
      };

      // 상품 등록
      await createProduct(productData);
      router.push('/admin/products');
    } catch (error) {
      console.error('상품 등록 실패:', error);
      setError('상품 등록에 실패했습니다. 다시 시도해주세요.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold">상품 등록</h1>
        <button
          onClick={() => router.back()}
          className="text-gray-600 hover:text-black"
        >
          취소
        </button>
      </div>

      {error && (
        <div className="mb-6 p-4 bg-red-50 text-red-600 rounded-lg">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* 기본 정보 */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-lg font-medium mb-4">기본 정보</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                상품명
              </label>
              <input
                type="text"
                name="title"
                required
                value={formData.title}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-gray-200"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                카테고리
              </label>
              <select
                name="category"
                required
                value={formData.category}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-gray-200"
              >
                <option value="">카테고리 선택</option>
                <option value="outer">아우터</option>
                <option value="top">상의</option>
                <option value="bottom">하의</option>
                <option value="acc">악세서리</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                가격
              </label>
              <input
                type="number"
                name="price"
                required
                min="0"
                value={formData.price}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-gray-200"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                재고
              </label>
              <input
                type="number"
                name="stock"
                required
                min="0"
                value={formData.stock}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-gray-200"
              />
            </div>
          </div>
        </div>

        {/* 상품 설명 */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-lg font-medium mb-4">상품 설명</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                간단 설명
              </label>
              <input
                type="text"
                name="description"
                required
                value={formData.description}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-gray-200"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                상세 설명
              </label>
              <textarea
                name="details"
                required
                rows={5}
                value={formData.details}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-gray-200"
              />
            </div>
          </div>
        </div>

        {/* 이미지 업로드 */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-lg font-medium mb-4">상품 이미지</h2>
          <div className="space-y-4">
            <div>
              <input
                type="file"
                accept="image/*"
                multiple
                onChange={handleImageUpload}
                className="hidden"
                id="image-upload"
              />
              <label
                htmlFor="image-upload"
                className="block w-full p-4 border-2 border-dashed rounded-lg text-center cursor-pointer hover:bg-gray-50"
              >
                이미지 업로드
              </label>
            </div>
            {imageUrls.length > 0 && (
              <div className="grid grid-cols-4 gap-4">
                {imageUrls.map((url, index) => (
                  <div key={index} className="relative">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={url}
                      alt={`상품 이미지 ${index + 1}`}
                      className="w-full h-32 object-cover rounded"
                    />
                    <button
                      type="button"
                      onClick={() => removeImage(index)}
                      className="absolute top-1 right-1 p-1 bg-white rounded-full shadow hover:bg-gray-100"
                    >
                      <X size={16} />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* 옵션 설정 */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-lg font-medium mb-4">옵션 설정</h2>
          <div className="space-y-6">
            {/* 컬러 옵션 */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="block text-sm font-medium text-gray-700">
                  컬러
                </label>
                <button
                  type="button"
                  onClick={addColor}
                  className="text-sm text-blue-600 hover:text-blue-800"
                >
                  + 컬러 추가
                </button>
              </div>
              <div className="space-y-2">
                {colors.map((color, index) => (
                  <div key={index} className="flex gap-2">
                    <input
                      type="text"
                      value={color}
                      onChange={(e) => updateColor(index, e.target.value)}
                      placeholder="예: 블랙"
                      className="flex-1 px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-gray-200"
                    />
                    {colors.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeColor(index)}
                        className="px-3 py-2 text-gray-600 hover:text-red-600"
                      >
                        <X size={20} />
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* 사이즈 옵션 */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="block text-sm font-medium text-gray-700">
                  사이즈
                </label>
                <button
                  type="button"
                  onClick={addSize}
                  className="text-sm text-blue-600 hover:text-blue-800"
                >
                  + 사이즈 추가
                </button>
              </div>
              <div className="space-y-2">
                {sizes.map((size, index) => (
                  <div key={index} className="flex gap-2">
                    <input
                      type="text"
                      value={size}
                      onChange={(e) => updateSize(index, e.target.value)}
                      placeholder="예: S"
                      className="flex-1 px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-gray-200"
                    />
                    {sizes.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeSize(index)}
                        className="px-3 py-2 text-gray-600 hover:text-red-600"
                      >
                        <X size={20} />
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* 배송 정보 */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-lg font-medium mb-4">배송 정보</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                배송 안내
              </label>
              <textarea
                name="deliveryInfo"
                rows={3}
                value={formData.deliveryInfo}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-gray-200"
                placeholder="예: 3,000원 (70,000원 이상 구매 시 무료)"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                제작 기간
              </label>
              <input
                type="text"
                name="productionPeriod"
                value={formData.productionPeriod}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-gray-200"
                placeholder="예: 평균 3일 소요"
              />
            </div>
          </div>
        </div>

        {/* 저장 버튼 */}
        <div className="flex justify-end">
          <button
            type="submit"
            disabled={isLoading}
            className={`bg-black text-white px-6 py-3 rounded hover:bg-gray-800 ${
              isLoading ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            {isLoading ? '등록 중...' : '상품 등록'}
          </button>
        </div>
      </form>
    </div>
  );
} 