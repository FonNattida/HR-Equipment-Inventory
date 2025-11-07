
import { Product, StockStatus } from './types';

export const INVENTORY_DATA: Product[] = [
  { id: '1', name: 'Polo Shirt (Male)', category: 'Apparel', sku: 'AP-M-S-01', image: 'https://picsum.photos/seed/poloM/40/40', stock: 120, incoming: 50, price: 850, status: StockStatus.InStock, details: 'Size: S', averageUsagePerMonth: 15 },
  { id: '2', name: 'Polo Shirt (Male)', category: 'Apparel', sku: 'AP-M-M-02', image: 'https://picsum.photos/seed/poloM/40/40', stock: 80, incoming: 30, price: 850, status: StockStatus.InStock, details: 'Size: M', averageUsagePerMonth: 25 },
  { id: '3', name: 'Polo Shirt (Female)', category: 'Apparel', sku: 'AP-F-M-03', image: 'https://picsum.photos/seed/poloF/40/40', stock: 52, incoming: 20, price: 850, status: StockStatus.InStock, details: 'Size: M', averageUsagePerMonth: 18 },
  { id: '4', name: 'Polo Shirt (Female)', category: 'Apparel', sku: 'AP-F-L-04', image: 'https://picsum.photos/seed/poloF/40/40', stock: 8, incoming: 25, price: 850, status: StockStatus.LowStock, details: 'Size: L', averageUsagePerMonth: 5 },
  { id: '5', name: 'Nurse Hat (1 Stripe)', category: 'Apparel', sku: 'NH-1S-01', image: 'https://picsum.photos/seed/hat1/40/40', stock: 250, incoming: 100, price: 300, status: StockStatus.InStock, details: 'Type: 1 Stripe', averageUsagePerMonth: 40 },
  { id: '6', name: 'Nurse Hat (2 Stripes)', category: 'Apparel', sku: 'NH-2S-02', image: 'https://picsum.photos/seed/hat2/40/40', stock: 15, incoming: 50, price: 350, status: StockStatus.LowStock, details: 'Type: 2 Stripes', averageUsagePerMonth: 10 },
  { id: '7', name: 'Nurse Hat (3 Stripes)', category: 'Apparel', sku: 'NH-3S-03', image: 'https://picsum.photos/seed/hat3/40/40', stock: 0, incoming: 30, price: 400, status: StockStatus.OutOfStock, details: 'Type: 3 Stripes', averageUsagePerMonth: 8 },
  { id: '8', name: 'Employee ID Card', category: 'Accessories', sku: 'AC-IDC-01', image: 'https://picsum.photos/seed/idcard/40/40', stock: 500, incoming: 1000, price: 50, status: StockStatus.InStock, averageUsagePerMonth: 200 },
  { id: '9', name: 'ID Card Holder', category: 'Accessories', sku: 'AC-HOLDER-02', image: 'https://picsum.photos/seed/holder/40/40', stock: 350, incoming: 500, price: 75, status: StockStatus.InStock, averageUsagePerMonth: 150 },
  { id: '10', name: 'Lanyard', category: 'Accessories', sku: 'AC-LNYD-03', image: 'https://picsum.photos/seed/lanyard/40/40', stock: 45, incoming: 200, price: 120, status: StockStatus.LowStock, averageUsagePerMonth: 80 },
  { id: '11', name: 'Retractable Badge Reel (Yoyo)', category: 'Accessories', sku: 'AC-YOYO-04', image: 'https://picsum.photos/seed/yoyo/40/40', stock: 0, incoming: 150, price: 90, status: StockStatus.OutOfStock, averageUsagePerMonth: 60 },
  { id: '12', name: 'B+ Pin', category: 'Accessories', sku: 'AC-PIN-BPLUS', image: 'https://picsum.photos/seed/pin/40/40', stock: 88, incoming: 100, price: 150, status: StockStatus.InStock, averageUsagePerMonth: 20 },
];
   