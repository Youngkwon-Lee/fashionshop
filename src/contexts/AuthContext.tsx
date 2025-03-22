"use client";

import React, { createContext, useContext, useEffect, useState } from 'react';
import { 
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  User
} from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { User as UserType } from '@/types/user';

interface AuthContextType {
  user: UserType | null;
  signup: (email: string, password: string) => Promise<void>;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

// 임시 관리자 계정 정보
const ADMIN_EMAIL = 'admin@rosee.com';
const ADMIN_PASSWORD = 'admin123';

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<UserType | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 로컬 스토리지에서 사용자 정보 복원
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setLoading(false);
  }, []);

  async function signup(email: string, password: string) {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
    } catch (error) {
      throw error;
    }
  }

  const login = async (email: string, password: string) => {
    try {
      // 임시 로그인 로직
      if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
        const adminUser: UserType = {
          id: '1',
          email: ADMIN_EMAIL,
          name: '관리자',
          isAdmin: true
        };
        setUser(adminUser);
        localStorage.setItem('user', JSON.stringify(adminUser));
      } else {
        // 일반 사용자 로그인 (임시)
        const normalUser: UserType = {
          id: Date.now().toString(),
          email,
          name: '일반 사용자',
          isAdmin: false
        };
        setUser(normalUser);
        localStorage.setItem('user', JSON.stringify(normalUser));
      }
    } catch (error) {
      console.error('Login failed:', error);
      throw new Error('로그인에 실패했습니다.');
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  const value = {
    user,
    signup,
    login,
    logout,
    loading
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
} 