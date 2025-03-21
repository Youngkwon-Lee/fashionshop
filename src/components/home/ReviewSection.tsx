import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

const reviews = [
  {
    id: 1,
    productTitle: '롱 와이드 데님 팬츠',
    productLink: '/product/detail.html?product_no=688',
    imageUrl: 'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=800',
    rating: 5,
    username: '****'
  },
  {
    id: 2,
    productTitle: '소프트 가디건',
    productLink: '/product/detail.html?product_no=189',
    imageUrl: 'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=800',
    rating: 5,
    username: '****'
  },
  {
    id: 3,
    productTitle: '소프트 가디건',
    productLink: '/product/detail.html?product_no=189',
    imageUrl: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=800',
    rating: 5,
    username: '****',
    comment: '가디건 너무 예뻐요~'
  },
  {
    id: 4,
    productTitle: '울 블렌디드 니트',
    productLink: '/product/detail.html?product_no=946',
    imageUrl: 'https://images.unsplash.com/photo-1506629082955-511b1aa562c8?w=800',
    rating: 5,
    username: '****'
  },
  {
    id: 5,
    productTitle: '양털 라이닝 데님 자켓',
    productLink: '/product/detail.html?product_no=1621',
    imageUrl: 'https://images.unsplash.com/photo-1543076447-215ad9ba6923?w=800',
    rating: 5,
    username: '김*영'
  },
  {
    id: 6,
    productTitle: '스웨이드 오버핏 자켓',
    productLink: '/product/detail.html?product_no=988',
    imageUrl: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=800',
    rating: 5,
    username: '****'
  }
];

const ReviewSection = () => {
  return (
    <section className="py-12 bg-gray-50">
      <div className="container-rosee">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl md:text-2xl font-semibold">Reviews</h2>
          <Link
            href="/board/review/list.html?board_no=4"
            className="text-sm underline hover:text-gray-700"
          >
            more view
          </Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {reviews.map((review) => (
            <div key={review.id} className="bg-white p-4 hover:shadow-md transition-shadow">
              <Link href={`/board/review/view_photo.html?no=${review.id}&board_no=4`} className="block relative aspect-square mb-3">
                <Image
                  src={review.imageUrl}
                  alt={review.productTitle}
                  fill
                  className="object-cover"
                />
                <div className="absolute bottom-2 right-2">
                  <Image
                    src="https://ext.same-assets.com/987172505/616642244.gif"
                    alt="Review"
                    width={20}
                    height={20}
                  />
                </div>
              </Link>

              {review.comment && (
                <p className="mb-2 text-sm text-gray-600">{review.comment}</p>
              )}

              <div className="flex items-start gap-3">
                <p className="text-xs text-gray-400">{review.username}</p>
                <div className="flex-1 flex flex-col">
                  <Link href={review.productLink} className="flex-1">
                    <Image
                      src={review.imageUrl}
                      alt={review.productTitle}
                      width={50}
                      height={60}
                      className="object-cover"
                    />
                  </Link>
                  <div className="flex items-center gap-1 mt-1">
                    <Image
                      src="https://ext.same-assets.com/3509491558/2758536740.png"
                      alt="Rating"
                      width={50}
                      height={12}
                    />
                  </div>
                  <Link href={review.productLink} className="text-xs hover:underline mt-1">
                    {review.productTitle}
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ReviewSection;
