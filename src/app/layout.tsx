import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AuthProvider } from '@/contexts/AuthContext';
import ClientProvider from './ClientProvider';

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Rosee - 2030 Fashion Brand and Trendy select shop",
  description: "2030 Fashion Brand and Trendy select shop",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className={inter.className}>
        <AuthProvider>
          <ClientProvider>
            {children}
          </ClientProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
