import React from 'react';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-white border-t">
      <div className="container-rosee py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h2 className="font-semibold mb-4">이슬(rosée) - 2030 fasion brand</h2>
            <div className="text-sm text-gray-600 space-y-1">
              <p>상호명 : rosée</p>
              <p>대표자명 : 김이슬</p>
              <p>주소 : 경기도 부천시 오정구 111-1</p>
              <p>이메일 : cs@rosee.com</p>
              <p>전화 : 1234-5678</p>
            </div>
          </div>
          
          <div>
            <h2 className="font-semibold mb-4">CUSTOMER CENTER</h2>
            <div className="text-sm text-gray-600 space-y-1">
              <p className="text-xl font-bold">1234-5678</p>
              <p>평일 10:00 - 17:00</p>
              <p>점심 12:00 - 13:00</p>
              <p>토/일/공휴일 휴무</p>
            </div>
          </div>

          <div>
            <h2 className="font-semibold mb-4">BANK INFO</h2>
            <div className="text-sm text-gray-600 space-y-1">
              <p>국민은행 123456-78-901234</p>
              <p>예금주 : 김이슬</p>
            </div>
          </div>

          <div>
            <h2 className="font-semibold mb-4">RETURN / EXCHANGE</h2>
            <div className="text-sm text-gray-600 space-y-1">
              <p>경기도 부천시 오정구 111-1</p>
              <p>자세한 교환·반품절차 안내는 문의란 및 공지사항을 참고해주세요</p>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t text-sm text-gray-500">
          <p>© 2024 rosée. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
