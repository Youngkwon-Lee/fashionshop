"use client";

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import MainLayout from '@/components/layout/MainLayout';
import Link from 'next/link';
import ProductCard from '@/components/home/ProductCard';
import SearchForm from '@/components/search/SearchForm';

// Combined products from all categories for search
const allProducts = [
  // Outer
  {
    id: 1664,
    title: '워싱 와이드 데님 자켓',
    price: '59,000',
    category: 'Outer',
    imageUrl: 'https://ext.same-assets.com/3755829324/2300253070.webp',
    hoverImageUrl: 'https://ext.same-assets.com/3070283701/2532160922.webp',
    link: '/product/1664',
    isNew: true,
    isSale: false
  },
  {
    id: 1830,
    title: '코튼 블렌드 자켓',
    price: '48,000',
    category: 'Outer',
    imageUrl: 'https://ext.same-assets.com/2732309400/2096599929.webp',
    hoverImageUrl: 'https://ext.same-assets.com/731913575/2870876322.webp',
    link: '/product/1830',
    isNew: false,
    isSale: false
  },
  // Top
  {
    id: 1801,
    title: '소프트 컬러 라운드 가디건',
    price: '39,000',
    category: 'Top',
    imageUrl: 'https://ext.same-assets.com/288811423/4282878971.webp',
    hoverImageUrl: 'https://ext.same-assets.com/731913575/2870876322.webp',
    link: '/product/1801',
    isNew: false,
    isSale: false,
    colors: 6
  },
  {
    id: 1431,
    title: '[1+1] 레이어드 립 나시',
    price: '32,000',
    originalPrice: '49,000',
    category: 'Top',
    imageUrl: 'https://ext.same-assets.com/1031444258/1934067122.webp',
    hoverImageUrl: 'https://ext.same-assets.com/4212348796/763926699.webp',
    link: '/product/1431',
    isNew: false,
    isSale: true
  },
  // Pants
  {
    id: 1737,
    title: '와이드 슬랙스 팬츠',
    price: '42,000',
    category: 'Pants',
    imageUrl: 'https://ext.same-assets.com/1789176774/491349818.webp',
    hoverImageUrl: 'https://ext.same-assets.com/608899003/1613826622.webp',
    link: '/product/1737',
    isNew: false,
    isSale: false
  },
  {
    id: 1851,
    title: '와이드 데님 팬츠',
    price: '65,000',
    category: 'Pants',
    imageUrl: 'https://ext.same-assets.com/1331177003/2217229330.webp',
    hoverImageUrl: 'https://ext.same-assets.com/1552479561/2479325069.webp',
    link: '/product/1851',
    isNew: true,
    isSale: false
  }
];

// Loading component for the suspense boundary
function SearchLoading() {
  return (
    <div className="container-rosee py-8 text-center">
      <p>검색 중...</p>
    </div>
  );
}

// Actual search results component
function SearchResults() {
  const searchParams = useSearchParams();
  const query = searchParams.get('q') || '';
  const [filteredProducts, setFilteredProducts] = useState(allProducts);
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [priceRange, setPriceRange] = useState<string>('');
  const [sortOption, setSortOption] = useState<string>('relevance');

  // Get unique categories for the filter
  const categories = Array.from(new Set(allProducts.map(product => product.category)));

  useEffect(() => {
    if (!query) {
      setFilteredProducts([]);
      return;
    }

    // Filter products based on search query and filters
    let results = allProducts.filter(product =>
      product.title.toLowerCase().includes(query.toLowerCase()) ||
      product.category.toLowerCase().includes(query.toLowerCase())
    );

    // Apply category filter
    if (selectedCategory) {
      results = results.filter(product => product.category === selectedCategory);
    }

    // Apply price range filter
    if (priceRange) {
      const [min, max] = priceRange.split('-').map(p => parseInt(p.replace(/[^\d]/g, '')));
      results = results.filter(product => {
        const price = parseInt(product.price.replace(/[^\d]/g, ''));
        if (max) {
          return price >= min && price <= max;
        } else {
          return price >= min;
        }
      });
    }

    // Apply sorting
    switch (sortOption) {
      case 'price-asc':
        results.sort((a, b) => parseFloat(a.price.replace(/[^\d]/g, '')) - parseFloat(b.price.replace(/[^\d]/g, '')));
        break;
      case 'price-desc':
        results.sort((a, b) => parseFloat(b.price.replace(/[^\d]/g, '')) - parseFloat(a.price.replace(/[^\d]/g, '')));
        break;
      case 'newest':
        results.sort((a, b) => (a.isNew === b.isNew) ? 0 : a.isNew ? -1 : 1);
        break;
      default:
        // Default is relevance, no change needed
        break;
    }

    setFilteredProducts(results);
  }, [query, selectedCategory, priceRange, sortOption]);

  return (
    <div className="flex flex-col md:flex-row gap-6">
      {/* Filters */}
      <div className="md:w-64 flex-shrink-0">
        <div className="border-b border-gray-200 pb-4 mb-4">
          <h3 className="font-medium mb-3">카테고리</h3>
          <div className="space-y-2">
            <div className="flex items-center">
              <input
                type="radio"
                id="category-all"
                name="category"
                checked={selectedCategory === ''}
                onChange={() => setSelectedCategory('')}
                className="mr-2"
              />
              <label htmlFor="category-all" className="text-sm">전체</label>
            </div>
            {categories.map((category) => (
              <div key={category} className="flex items-center">
                <input
                  type="radio"
                  id={`category-${category}`}
                  name="category"
                  checked={selectedCategory === category}
                  onChange={() => setSelectedCategory(category)}
                  className="mr-2"
                />
                <label htmlFor={`category-${category}`} className="text-sm">{category}</label>
              </div>
            ))}
          </div>
        </div>

        <div className="border-b border-gray-200 pb-4 mb-4">
          <h3 className="font-medium mb-3">가격</h3>
          <div className="space-y-2">
            <div className="flex items-center">
              <input
                type="radio"
                id="price-all"
                name="price"
                checked={priceRange === ''}
                onChange={() => setPriceRange('')}
                className="mr-2"
              />
              <label htmlFor="price-all" className="text-sm">전체</label>
            </div>
            <div className="flex items-center">
              <input
                type="radio"
                id="price-0-30000"
                name="price"
                checked={priceRange === '0-30000'}
                onChange={() => setPriceRange('0-30000')}
                className="mr-2"
              />
              <label htmlFor="price-0-30000" className="text-sm">30,000원 이하</label>
            </div>
            <div className="flex items-center">
              <input
                type="radio"
                id="price-30000-50000"
                name="price"
                checked={priceRange === '30000-50000'}
                onChange={() => setPriceRange('30000-50000')}
                className="mr-2"
              />
              <label htmlFor="price-30000-50000" className="text-sm">30,000원 ~ 50,000원</label>
            </div>
            <div className="flex items-center">
              <input
                type="radio"
                id="price-50000-100000"
                name="price"
                checked={priceRange === '50000-100000'}
                onChange={() => setPriceRange('50000-100000')}
                className="mr-2"
              />
              <label htmlFor="price-50000-100000" className="text-sm">50,000원 ~ 100,000원</label>
            </div>
            <div className="flex items-center">
              <input
                type="radio"
                id="price-100000"
                name="price"
                checked={priceRange === '100000-'}
                onChange={() => setPriceRange('100000-')}
                className="mr-2"
              />
              <label htmlFor="price-100000" className="text-sm">100,000원 이상</label>
            </div>
          </div>
        </div>
      </div>

      {/* Results */}
      <div className="flex-1">
        <div className="flex justify-between items-center mb-4">
          <p className="text-sm">
            <strong>"{query}"</strong>에 대한 검색결과 <strong>{filteredProducts.length}</strong>개
          </p>
          <select
            className="border border-gray-300 py-1 px-3 text-sm"
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
          >
            <option value="relevance">관련도순</option>
            <option value="price-asc">낮은가격순</option>
            <option value="price-desc">높은가격순</option>
            <option value="newest">신상품순</option>
          </select>
        </div>

        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
            {filteredProducts.map((product) => (
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
        ) : (
          <div className="text-center py-12">
            <p className="text-lg text-gray-500 mb-4">검색 결과가 없습니다.</p>
            <p className="text-sm text-gray-400">
              다른 검색어를 입력하시거나 필터를 변경해보세요.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default function SearchPage() {
  return (
    <MainLayout>
      <div className="container-rosee py-8">
        <div className="flex items-center gap-2 mb-6 text-sm text-gray-500">
          <Link href="/" className="hover:text-black">Home</Link>
          <span>&gt;</span>
          <span className="text-black">Search</span>
        </div>

        <div className="mb-6">
          <Suspense fallback={<div>Loading search form...</div>}>
            <SearchForm className="max-w-xl mx-auto" />
          </Suspense>
        </div>

        <Suspense fallback={<SearchLoading />}>
          <SearchResults />
        </Suspense>
      </div>
    </MainLayout>
  );
}
