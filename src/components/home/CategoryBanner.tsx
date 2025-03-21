import React from 'react';
import Link from 'next/link';

const categories = [
  {
    id: 1,
    name: '#Knit',
    link: '/category/knit/52'
  },
  {
    id: 2,
    name: '#Sweat',
    link: '/category/sweat/59'
  },
  {
    id: 3,
    name: '#Denim pants',
    link: '/product/list.html?cate_no=56'
  }
];

const CategoryBanner = () => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container-rosee">
        <h2 className="text-2xl font-semibold text-center mb-8">Collection</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {categories.map((category) => (
            <Link
              key={category.id}
              href={category.link}
              className="bg-white py-10 text-center shadow-sm hover:shadow-md transition-shadow"
            >
              <span className="text-lg font-medium">{category.name}</span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategoryBanner;
