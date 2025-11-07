
export enum StockStatus {
  InStock = 'In stock',
  LowStock = 'Low stock',
  OutOfStock = 'Out of stock',
}

export interface Product {
  id: string;
  name: string;
  category: 'Apparel' | 'Accessories' | 'Electronics' | 'Wellness' | 'Home & Living';
  sku: string;
  image: string;
  stock: number;
  incoming: number;
  price: number;
  status: StockStatus;
  details?: string; // e.g., 'Size: M, Gender: Female' or 'Type: 2 Stripes'
  averageUsagePerMonth: number;
}

export interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}
   