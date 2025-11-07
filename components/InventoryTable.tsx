
import React from 'react';
import { Product, StockStatus } from '../types';

const StatusBadge: React.FC<{ status: StockStatus }> = ({ status }) => {
  const baseClasses = "px-2.5 py-1 inline-flex text-xs leading-5 font-semibold rounded-full";
  let specificClasses = "";

  switch (status) {
    case StockStatus.InStock:
      specificClasses = "bg-green-100 text-green-800";
      break;
    case StockStatus.LowStock:
      specificClasses = "bg-yellow-100 text-yellow-800";
      break;
    case StockStatus.OutOfStock:
      specificClasses = "bg-red-100 text-red-800";
      break;
  }

  return (
    <span className={`${baseClasses} ${specificClasses}`}>
        <div className={`h-2 w-2 rounded-full mr-2 mt-1 ${
            status === StockStatus.InStock ? 'bg-green-500' :
            status === StockStatus.LowStock ? 'bg-yellow-500' : 'bg-red-500'
        }`}></div>
        {status}
    </span>
  );
};


const InventoryTable: React.FC<{ products: Product[] }> = ({ products }) => {

    const calculatePredictedEmptyDate = (stock: number, usage: number) => {
        if (usage <= 0 || stock <= 0) return 'N/A';
        const months = stock / usage;
        const date = new Date();
        date.setMonth(date.getMonth() + Math.floor(months));
        return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
    };

    return (
        <div className="overflow-x-auto">
            <table className="min-w-full bg-white">
                <thead className="bg-gray-50">
                    <tr>
                        <th className="w-12 px-6 py-3 text-left">
                            <input type="checkbox" className="form-checkbox h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500" />
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product Name</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">SKU</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Incoming</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Stock</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Predicted Empty</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                    {products.map((product) => (
                        <tr key={product.id} className="hover:bg-gray-50">
                            <td className="px-6 py-4 whitespace-nowrap">
                                <input type="checkbox" className="form-checkbox h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500" />
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                                <div className="flex items-center">
                                    <div className="flex-shrink-0 h-10 w-10">
                                        <img className="h-10 w-10 rounded-md object-cover" src={product.image} alt={product.name} />
                                    </div>
                                    <div className="ml-4">
                                        <div className="text-sm font-medium text-gray-900">{product.name}</div>
                                        <div className="text-sm text-gray-500">{product.details}</div>
                                    </div>
                                </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{product.category}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{product.sku}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{product.incoming}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{product.stock}</td>
                            <td className="px-6 py-4 whitespace-nowrap">
                                <StatusBadge status={product.status} />
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{calculatePredictedEmptyDate(product.stock, product.averageUsagePerMonth)}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${product.price.toLocaleString()}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-center text-sm font-medium">
                                <button className="text-gray-500 hover:text-gray-700">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                        <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
                                    </svg>
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default InventoryTable;
   