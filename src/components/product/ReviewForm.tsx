"use client";

import React, { useState } from 'react';
import { Star, Upload, Loader2 } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { createReview } from '@/lib/api/reviews';
import { uploadReviewImages } from '@/lib/api/storage';

interface ReviewFormProps {
  productId: string;
  productOptions: {
    color: string;
    size: string;
  };
  onSuccess: () => void;
}

const ReviewForm = ({ productId, productOptions, onSuccess }: ReviewFormProps) => {
  const { user } = useAuth();
  const [rating, setRating] = useState(5);
  const [content, setContent] = useState('');
  const [files, setFiles] = useState<File[]>([]);
  const [previewUrls, setPreviewUrls] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    try {
      setIsSubmitting(true);
      setUploadProgress(0);

      // 이미지 업로드
      let imageUrls: string[] = [];
      if (files.length > 0) {
        setUploadProgress(10);
        imageUrls = await uploadReviewImages(files, productId, user.uid);
        setUploadProgress(50);
      }

      // 리뷰 작성
      await createReview(productId, {
        userId: user.uid,
        userName: user.email?.split('@')[0] || '익명',
        rating,
        content,
        images: imageUrls,
        productOptions,
        isVerifiedPurchase: true // TODO: 실제 구매 여부 확인 로직 추가
      });

      setUploadProgress(100);
      setContent('');
      setRating(5);
      setFiles([]);
      setPreviewUrls([]);
      onSuccess();
    } catch (error) {
      console.error('리뷰 작성 중 오류 발생:', error);
      alert('리뷰를 작성할 수 없습니다. 다시 시도해주세요.');
    } finally {
      setIsSubmitting(false);
      setUploadProgress(0);
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = e.target.files;
    if (!selectedFiles) return;

    // 최대 5개까지만 선택 가능
    const newFiles = Array.from(selectedFiles).slice(0, 5 - files.length);
    setFiles(prev => [...prev, ...newFiles]);

    // 미리보기 URL 생성
    newFiles.forEach(file => {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrls(prev => [...prev, reader.result as string]);
      };
      reader.readAsDataURL(file);
    });
  };

  const removeImage = (index: number) => {
    setFiles(prev => prev.filter((_, i) => i !== index));
    setPreviewUrls(prev => prev.filter((_, i) => i !== index));
  };

  if (!user) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500">리뷰를 작성하려면 로그인이 필요합니다.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="border rounded-lg p-6 mb-8">
      <h3 className="text-lg font-medium mb-4">리뷰 작성</h3>

      {/* Rating */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          평점
        </label>
        <div className="flex gap-1">
          {[1, 2, 3, 4, 5].map((value) => (
            <button
              key={value}
              type="button"
              onClick={() => setRating(value)}
              className="focus:outline-none"
              disabled={isSubmitting}
            >
              <Star
                className={`w-6 h-6 ${
                  value <= rating
                    ? 'fill-yellow-400 text-yellow-400'
                    : 'text-gray-300'
                }`}
              />
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="mb-4">
        <label
          htmlFor="content"
          className="block text-sm font-medium text-gray-700 mb-2"
        >
          리뷰 내용
        </label>
        <textarea
          id="content"
          rows={4}
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="w-full border rounded-md p-2"
          placeholder="상품에 대한 솔직한 리뷰를 작성해주세요."
          required
          disabled={isSubmitting}
        />
      </div>

      {/* Image Upload */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          이미지 첨부 (최대 5장)
        </label>
        <div className="flex gap-2 mb-2">
          {previewUrls.map((url, index) => (
            <div key={index} className="relative w-20 h-20">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={url}
                alt={`Review image ${index + 1}`}
                className="w-full h-full object-cover rounded"
              />
              <button
                type="button"
                onClick={() => removeImage(index)}
                className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-sm"
                disabled={isSubmitting}
              >
                ×
              </button>
            </div>
          ))}
        </div>
        {files.length < 5 && (
          <label className="cursor-pointer inline-flex items-center gap-2 text-sm text-gray-600 hover:text-gray-800">
            <Upload className="w-4 h-4" />
            사진 추가하기
            <input
              type="file"
              accept="image/*"
              multiple
              className="hidden"
              onChange={handleImageUpload}
              disabled={isSubmitting}
            />
          </label>
        )}
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-black text-white py-2 rounded-md hover:bg-gray-800 disabled:bg-gray-400 relative"
      >
        {isSubmitting ? (
          <div className="flex items-center justify-center">
            <Loader2 className="w-5 h-5 animate-spin mr-2" />
            {uploadProgress > 0 ? `업로드 중... ${uploadProgress}%` : '처리 중...'}
          </div>
        ) : (
          '리뷰 작성하기'
        )}
      </button>
    </form>
  );
};

export default ReviewForm; 