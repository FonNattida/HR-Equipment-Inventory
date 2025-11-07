
import { INVENTORY_DATA } from '../constants';
import { Product } from '../types';

// This is a mock service to simulate calls to the Gemini API.
// In a real application, this would use `@google/genai` to make API calls.

const findProduct = (query: string): Product | null => {
  const lowerQuery = query.toLowerCase();
  
  // Very simple parsing logic for demonstration
  const sizeMatch = lowerQuery.match(/size (\w+)|ไซส์ (\w+)/);
  const size = sizeMatch ? (sizeMatch[1] || sizeMatch[2]).toUpperCase() : null;

  const genderMatch = lowerQuery.match(/male|female|ผู้ชาย|ผู้หญิง/);
  const gender = genderMatch ? genderMatch[0] : null;

  const typeMatch = lowerQuery.match(/(\d) แถบ|(\d) stripe/);
  const type = typeMatch ? (typeMatch[1] || typeMatch[2]) : null;

  const productKeywords = [
    { keywords: ['polo', 'โปโล'], name: 'Polo Shirt' },
    { keywords: ['nurse hat', 'หมวกพยาบาล'], name: 'Nurse Hat' },
    { keywords: ['id card', 'บัตรพนักงาน'], name: 'Employee ID Card' },
    { keywords: ['lanyard', 'สายคล้อง'], name: 'Lanyard' },
  ];

  let foundProduct: Product | null = null;

  for (const p of productKeywords) {
    if (p.keywords.some(k => lowerQuery.includes(k))) {
      const candidates = INVENTORY_DATA.filter(item => item.name.toLowerCase().includes(p.name.toLowerCase()));
      if (candidates.length > 0) {
        let bestMatch = candidates[0];
        if (size || gender || type) {
          const specificMatch = candidates.find(item => {
            const details = item.details?.toLowerCase() || '';
            const sizeCheck = size ? details.includes(`size: ${size.toLowerCase()}`) : true;
            const genderCheck = gender ? (gender.includes('ชาย') || gender.includes('male') ? item.name.toLowerCase().includes('male') : item.name.toLowerCase().includes('female')) : true;
            const typeCheck = type ? details.includes(`${type} stripe`) : true;
            return sizeCheck && genderCheck && typeCheck;
          });
          if (specificMatch) bestMatch = specificMatch;
        }
        foundProduct = bestMatch;
        break;
      }
    }
  }
  
  return foundProduct;
};


export const askAIAssistant = (query: string): Promise<string> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const product = findProduct(query);

      if (product) {
        const monthsLeft = product.averageUsagePerMonth > 0 ? (product.stock / product.averageUsagePerMonth).toFixed(1) : 'infinity';
        let response = `${product.name} ${product.details || ''} มีในสต็อก ${product.stock} ชิ้นค่ะ`;
        if(product.stock > 0) {
            response += ` คาดว่าจะใช้งานได้อีกประมาณ ${monthsLeft} เดือนค่ะ`;
        } else {
            response += ` สินค้าหมดสต็อก แต่มีกำหนดเข้า ${product.incoming} ชิ้นค่ะ`;
        }
        resolve(response);
      } else if(query.toLowerCase().includes('ใกล้หมด')) {
        const lowStockItems = INVENTORY_DATA.filter(p => p.status === 'Low stock' || p.status === 'Out of stock');
        if (lowStockItems.length > 0) {
          const itemsList = lowStockItems.map(p => `- ${p.name} ${p.details || ''} (เหลือ ${p.stock} ชิ้น)`).join('\n');
          resolve(`นี่คือรายการอุปกรณ์ที่ใกล้หมดค่ะ:\n${itemsList}`);
        } else {
          resolve("ตอนนี้ยังไม่มีอุปกรณ์ที่ใกล้หมดสต็อกค่ะ");
        }
      } 
      else {
        resolve("ขออภัยค่ะ ไม่พบข้อมูลอุปกรณ์ที่คุณต้องการ กรุณาลองถามใหม่นะคะ");
      }
    }, 1000); // Simulate network delay
  });
};
   