"use client";

import React, { useState, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import { Search } from 'lucide-react';

interface SearchFormProps {
  className?: string;
  placeholder?: string;
  defaultValue?: string;
  onlyIcon?: boolean;
  onClick?: () => void;
}

const SearchForm = ({
  className = "",
  placeholder = "상품 검색",
  defaultValue = "",
  onlyIcon = false,
  onClick
}: SearchFormProps) => {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState(defaultValue);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  if (onlyIcon) {
    return (
      <button
        aria-label="검색"
        className={`flex items-center justify-center ${className}`}
        onClick={onClick}
      >
        <Search className="w-5 h-5" />
      </button>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className={`flex items-center border-b border-gray-300 focus-within:border-black transition-colors ${className}`}
    >
      <input
        type="text"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        placeholder={placeholder}
        className="flex-1 py-2 outline-none text-sm bg-transparent"
      />
      <button type="submit" aria-label="검색" className="px-2">
        <Search className="w-4 h-4" />
      </button>
    </form>
  );
};

export default SearchForm;
