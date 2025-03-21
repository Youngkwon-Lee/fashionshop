"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ShoppingBag, User, Menu, X } from 'lucide-react';
import SearchForm from '@/components/search/SearchForm';

const Header = () => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleSearch = () => {
    setIsSearchOpen(!isSearchOpen);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header className="w-full border-b border-gray-200">
      <div className="container-rosee">
        {/* Top Bar */}
        <div className="hidden md:flex justify-end items-center gap-4 py-2 text-xs text-gray-600">
          <Link href="/login" className="hover:text-black">Login</Link>
          <Link href="/join" className="hover:text-black">Join us</Link>
          <Link href="/about" className="hover:text-black">About us</Link>
        </div>

        {/* Logo and Navigation */}
        <div className="flex justify-between items-center py-4">
          {/* Mobile Menu */}
          <div className="md:hidden">
            <button onClick={toggleMobileMenu} aria-label="Toggle mobile menu">
              {isMobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>

          {/* Logo */}
          <div className="flex-1 md:flex-initial flex justify-center md:justify-start">
            <Link href="/">
              <h1 className="text-2xl font-semibold">rosée</h1>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex flex-1 justify-center">
            <ul className="flex gap-8">
              <li><Link href="/category/new-7" className="nav-link">New 7%</Link></li>
              <li><Link href="/category/best" className="nav-link">BEST</Link></li>
              <li><Link href="/category/outer" className="nav-link">Outer</Link></li>
              <li><Link href="/category/top" className="nav-link">Top</Link></li>
              <li><Link href="/category/pants" className="nav-link">Pants</Link></li>
              <li><Link href="/category/acc" className="nav-link">Acc</Link></li>
              <li><Link href="/category/sale" className="nav-link">Sale</Link></li>
            </ul>
          </nav>

          {/* Icons */}
          <div className="flex items-center gap-4">
            <SearchForm onlyIcon onClick={toggleSearch} />
            <Link href="/account" aria-label="Account">
              <User className="w-5 h-5" />
            </Link>
            <Link href="/cart" aria-label="Shopping bag" className="relative">
              <ShoppingBag className="w-5 h-5" />
              <span className="absolute -top-1 -right-1 bg-black text-white text-[10px] rounded-full w-4 h-4 flex items-center justify-center">0</span>
            </Link>
          </div>
        </div>

        {/* Search Panel */}
        {isSearchOpen && (
          <div className="py-4 border-t border-gray-200">
            <SearchForm className="max-w-xl mx-auto" placeholder="검색어를 입력하세요." />
          </div>
        )}

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-200">
            <ul className="space-y-4">
              <li><Link href="/category/new-7" className="block py-2 hover:text-black">New 7%</Link></li>
              <li><Link href="/category/best" className="block py-2 hover:text-black">BEST</Link></li>
              <li><Link href="/category/outer" className="block py-2 hover:text-black">Outer</Link></li>
              <li><Link href="/category/top" className="block py-2 hover:text-black">Top</Link></li>
              <li><Link href="/category/pants" className="block py-2 hover:text-black">Pants</Link></li>
              <li><Link href="/category/acc" className="block py-2 hover:text-black">Acc</Link></li>
              <li><Link href="/category/sale" className="block py-2 hover:text-black">Sale</Link></li>
              <li><Link href="/login" className="block py-2 hover:text-black">Login</Link></li>
              <li><Link href="/join" className="block py-2 hover:text-black">Join us</Link></li>
              <li><Link href="/about" className="block py-2 hover:text-black">About us</Link></li>
            </ul>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
