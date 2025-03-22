import { Product } from '@/types/product';
import {
  collection,
  doc,
  addDoc,
  getDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  query,
  where,
  orderBy,
  limit
} from 'firebase/firestore';
import {
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject
} from 'firebase/storage';
import { db, storage } from '../firebase';

// 샘플 상품 데이터
const products: Product[] = [
  {
    id: '1801',
    title: '소프트 컬러 라운드 가디건',
    price: 39000,
    description: '부드러운 촉감의 니트 소재로 제작된 라운드넥 가디건입니다. 여유있는 실루엣으로 다양한 이너와 매치하기 좋으며, 가볍고 따뜻한 착용감을 제공합니다.',
    details: [
      '소재: 아크릴 60%, 나일론 25%, 울 15%',
      '신축성 있음, 비침 없음, 두께감 보통',
      '드라이클리닝 권장',
      '모델 착용 컬러: 베이지',
      '모델 사이즈: 키 180cm, 체중 65kg, 어깨 45cm, 가슴 95cm, 허리 76cm'
    ],
    imageUrls: [
      'https://images.unsplash.com/photo-1584030373081-f37b019b2445?w=800',
      'https://images.unsplash.com/photo-1584030373052-6f0a5f00d1a3?w=800',
      'https://images.unsplash.com/photo-1583846552345-d2192d5c6fcd?w=800',
      'https://images.unsplash.com/photo-1583846552354-02d947cce8c0?w=800',
    ],
    colors: [
      { name: '베이지', code: '#c3ad99', available: true },
      { name: '그레이', code: '#9f9c97', available: true },
      { name: '블랙', code: '#3b3834', available: true },
      { name: '민트', code: '#5bc2be', available: false },
      { name: '카키', code: '#8a664c', available: true },
      { name: '아이보리', code: '#cdc1ac', available: true }
    ],
    sizes: ['FREE'],
    category: 'Top',
    deliveryInfo: '3~14일 이내 배송',
    productionPeriod: '03/23 ~ 04/03',
    relatedProducts: [
      {
        id: '1431',
        title: '[1+1] 레이어드 립 나시',
        price: 32000,
        originalPrice: 49000,
        imageUrl: 'https://images.unsplash.com/photo-1583846717393-dc2412c95ed7?w=800',
        link: '/product/1431',
        isSale: true
      },
      {
        id: '1737',
        title: '와이드 슬랙스 팬츠',
        price: 42000,
        imageUrl: 'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=800',
        link: '/product/1737'
      },
      {
        id: '1664',
        title: '워싱 와이드 데님',
        price: 59000,
        imageUrl: 'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=800',
        link: '/product/1664'
      },
      {
        id: '1830',
        title: '코튼 블렌드 자켓',
        price: 48000,
        imageUrl: 'https://images.unsplash.com/photo-1591369822096-ffd140ec948f?w=800',
        link: '/product/1830',
      }
    ]
  },
  {
    id: '1431',
    title: '[1+1] 레이어드 립 나시',
    price: 32000,
    originalPrice: 49000,
    description: '부드러운 코튼 소재의 레이어드 스타일 나시입니다. 1+1 구성으로 실용적이며, 다양한 아우터와 매치하기 좋습니다.',
    details: [
      '소재: 코튼 95%, 스판 5%',
      '신축성 좋음, 비침 약간, 두께감 얇음',
      '드라이클리닝 권장',
      '모델 착용 컬러: 화이트',
      '모델 사이즈: 키 175cm, 체중 55kg, 어깨 42cm, 가슴 85cm, 허리 67cm'
    ],
    imageUrls: [
      'https://images.unsplash.com/photo-1583846717393-dc2412c95ed7?w=800',
      'https://images.unsplash.com/photo-1583846717394-dc2412c95ed8?w=800',
      'https://images.unsplash.com/photo-1583846717395-dc2412c95ed9?w=800'
    ],
    colors: [
      { name: '화이트', code: '#ffffff', available: true },
      { name: '블랙', code: '#000000', available: true },
      { name: '그레이', code: '#808080', available: true }
    ],
    sizes: ['S', 'M', 'L'],
    category: 'Top',
    deliveryInfo: '당일 배송',
    productionPeriod: '당일 발송',
    relatedProducts: [
      {
        id: '1801',
        title: '소프트 컬러 라운드 가디건',
        price: 39000,
        imageUrl: 'https://images.unsplash.com/photo-1584030373081-f37b019b2445?w=800',
        link: '/product/1801'
      }
    ]
  },
  {
    id: '1664',
    title: '워싱 와이드 데님 자켓',
    price: 59000,
    description: '트렌디한 오버핏의 워싱 데님 자켓입니다. 자연스러운 워싱 처리로 빈티지한 무드를 연출할 수 있습니다.',
    details: [
      '소재: 코튼 100%',
      '신축성 없음, 비침 없음, 두께감 있음',
      '드라이클리닝 권장',
      '모델 착용 컬러: 중청',
      '모델 사이즈: 키 182cm, 체중 70kg, 어깨 46cm, 가슴 98cm, 허리 78cm'
    ],
    imageUrls: [
      'https://images.unsplash.com/photo-1543076447-215ad9ba6923?w=800',
      'https://images.unsplash.com/photo-1543076447-215ad9ba6924?w=800',
      'https://images.unsplash.com/photo-1543076447-215ad9ba6925?w=800'
    ],
    colors: [
      { name: '연청', code: '#a0c8e0', available: true },
      { name: '중청', code: '#5785a8', available: true },
      { name: '진청', code: '#1e4b6e', available: true }
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    category: 'Outer',
    deliveryInfo: '3~5일 이내 배송',
    productionPeriod: '03/25 ~ 03/30',
    relatedProducts: [
      {
        id: '1830',
        title: '코튼 블렌드 자켓',
        price: 48000,
        imageUrl: 'https://images.unsplash.com/photo-1548624313-0396c75e4b1a?w=800',
        link: '/product/1830'
      }
    ]
  }
];

// 이미지 업로드 함수
export async function uploadProductImage(file: File): Promise<string> {
  const filename = `products/${Date.now()}-${file.name}`;
  const storageRef = ref(storage, filename);
  await uploadBytes(storageRef, file);
  return getDownloadURL(storageRef);
}

// 이미지 삭제 함수
export async function deleteProductImage(imageUrl: string) {
  const imageRef = ref(storage, imageUrl);
  await deleteObject(imageRef);
}

// 상품 등록
export async function createProduct(productData: any) {
  try {
    const docRef = await addDoc(collection(db, 'products'), {
      ...productData,
      createdAt: new Date(),
      updatedAt: new Date()
    });
    return docRef.id;
  } catch (error) {
    console.error('Error creating product:', error);
    throw error;
  }
}

// 상품 목록 조회
export async function getProducts() {
  try {
    const q = query(
      collection(db, 'products'),
      orderBy('createdAt', 'desc')
    );
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
  } catch (error) {
    console.error('Error getting products:', error);
    throw error;
  }
}

// 카테고리별 상품 조회
export async function getProductsByCategory(category: string) {
  try {
    const q = query(
      collection(db, 'products'),
      where('category', '==', category),
      orderBy('createdAt', 'desc')
    );
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
  } catch (error) {
    console.error('Error getting products by category:', error);
    throw error;
  }
}

// 단일 상품 조회
export async function getProduct(productId: string) {
  try {
    const docRef = doc(db, 'products', productId);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return {
        id: docSnap.id,
        ...docSnap.data()
      };
    }
    return null;
  } catch (error) {
    console.error('Error getting product:', error);
    throw error;
  }
}

// 상품 수정
export async function updateProduct(productId: string, productData: any) {
  try {
    const docRef = doc(db, 'products', productId);
    await updateDoc(docRef, {
      ...productData,
      updatedAt: new Date()
    });
  } catch (error) {
    console.error('Error updating product:', error);
    throw error;
  }
}

// 상품 삭제
export async function deleteProduct(productId: string) {
  try {
    const docRef = doc(db, 'products', productId);
    await deleteDoc(docRef);
  } catch (error) {
    console.error('Error deleting product:', error);
    throw error;
  }
}

// 가격 포맷팅 함수
export function formatPrice(price: number): string {
  return new Intl.NumberFormat('ko-KR').format(price) + '원';
} 