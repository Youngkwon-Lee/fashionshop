"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { Search, ShoppingBag, User, Menu, X } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useCart } from '@/contexts/CartContext';

const Header = () => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { user, logout } = useAuth();
  const { getTotalItems } = useCart();

  const cartItemCount = getTotalItems();

  const toggleSearch = () => {
    setIsSearchOpen(!isSearchOpen);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header className="border-b">
      <div className="container-rosee">
        {/* Top Bar */}
        <div className="hidden md:flex justify-end items-center gap-4 py-2 text-xs text-gray-600">
          {user ? (
            <>
              <span className="text-black">{user.email}</span>
              <button onClick={logout} className="hover:text-black">로그아웃</button>
              <Link href="/account" className="hover:text-black">마이페이지</Link>
            </>
          ) : (
            <>
              <Link href="/login" className="hover:text-black">로그인</Link>
              <Link href="/signup" className="hover:text-black">회원가입</Link>
            </>
          )}
          <Link href="/about" className="hover:text-black">About us</Link>
        </div>

        <div className="flex items-center justify-between py-4">
          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2"
            onClick={toggleMobileMenu}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>

          {/* Logo */}
          <div className="flex-1 md:flex-initial text-center md:text-left">
            <Link href="/" className="text-2xl font-semibold">
              Rosée
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

          {/* Actions */}
          <div className="flex items-center gap-4">
            <button
              onClick={toggleSearch}
              className="p-2 hover:text-gray-600"
              aria-label="Search"
            >
              <Search className="w-5 h-5" />
            </button>

            <Link
              href="/cart"
              className="p-2 hover:text-gray-600 relative"
              aria-label="Cart"
            >
              <ShoppingBag className="w-5 h-5" />
              {cartItemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-black text-white text-xs w-4 h-4 rounded-full flex items-center justify-center">
                  {cartItemCount}
                </span>
              )}
            </Link>

            {user ? (
              <div className="relative group">
                <button className="p-2 hover:text-gray-600" aria-label="Account">
                  <User className="w-5 h-5" />
                </button>
                <div className="absolute right-0 mt-2 w-48 bg-white border rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-50">
                  <div className="p-2">
                    <div className="text-sm text-gray-600 mb-2">
                      {user.email}
                    </div>
                    <Link
                      href="/account"
                      className="block px-4 py-2 text-sm hover:bg-gray-100 rounded"
                    >
                      내 계정
                    </Link>
                    <Link
                      href="/orders"
                      className="block px-4 py-2 text-sm hover:bg-gray-100 rounded"
                    >
                      주문 내역
                    </Link>
                    <button
                      onClick={logout}
                      className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100 rounded"
                    >
                      로그아웃
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <Link
                href="/login"
                className="p-2 hover:text-gray-600"
                aria-label="Login"
              >
                <User className="w-5 h-5" />
              </Link>
            )}

            {user ? (
              <div className="flex items-center gap-4">
                {user.isAdmin && (
                  <Link
                    href="/admin"
                    className="text-sm text-gray-600 hover:text-black"
                  >
                    관리자
                  </Link>
                )}
                <button
                  onClick={logout}
                  className="text-sm text-gray-600 hover:text-black"
                >
                  로그아웃
                </button>
              </div>
            ) : (
              <Link
                href="/login"
                className="text-sm text-gray-600 hover:text-black"
              >
                로그인
              </Link>
            )}
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <nav className="md:hidden py-4 border-t">
            <Link
              href="/category/new-7"
              className="block py-2 hover:text-gray-600"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              New 7%
            </Link>
            <Link
              href="/category/best"
              className="block py-2 hover:text-gray-600"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              BEST
            </Link>
            <Link
              href="/category/outer"
              className="block py-2 hover:text-gray-600"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Outer
            </Link>
            <Link
              href="/category/top"
              className="block py-2 hover:text-gray-600"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Top
            </Link>
            <Link
              href="/category/pants"
              className="block py-2 hover:text-gray-600"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Pants
            </Link>
            <Link
              href="/category/acc"
              className="block py-2 hover:text-gray-600"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Acc
            </Link>
            <Link
              href="/category/sale"
              className="block py-2 hover:text-gray-600"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Sale
            </Link>
          </nav>
        )}

        {/* Search Bar */}
        {isSearchOpen && (
          <div className="py-4 border-t">
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="검색어를 입력하세요"
                className="flex-1 px-4 py-2 border rounded-md"
              />
              <button className="px-6 py-2 bg-black text-white rounded-md hover:bg-gray-800">
                검색
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
