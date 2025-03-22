export interface CartItem {
  id: string;
  title: string;
  price: number;
  quantity: number;
  imageUrl: string;
  color: string;
  size: string;
}

export interface Cart {
  items: CartItem[];
  totalPrice: number;
} 