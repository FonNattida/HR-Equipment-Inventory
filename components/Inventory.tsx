
import React, { useState, useMemo } from 'react';
import { INVENTORY_DATA } from '../constants';
import { StockStatus } from '../types';
import InventoryTable from './InventoryTable';
import Pagination from './Pagination';
import { SearchIcon } from './icons';

const Inventory: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState<StockStatus | 'All'>('All');
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    const filteredData = useMemo(() => {
        return INVENTORY_DATA
            .filter(product => 
                statusFilter === 'All' || product.status === statusFilter
            )
            .filter(product => 
                product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                product.sku.toLowerCase().includes(searchTerm.toLowerCase()) ||
                product.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
                product.details?.toLowerCase().includes(searchTerm.toLowerCase())
            );
    }, [searchTerm, statusFilter]);
    
    const paginatedData = useMemo(() => {
        const startIndex = (currentPage - 1) * itemsPerPage;
        return filteredData.slice(startIndex, startIndex + itemsPerPage);
    }, [filteredData, currentPage, itemsPerPage]);

    const totalProducts = INVENTORY_DATA.length;
    const inStockCount = INVENTORY_DATA.filter(p => p.status === StockStatus.InStock).length;
    const lowStockCount = INVENTORY_DATA.filter(p => p.status === StockStatus.LowStock).length;
    const outOfStockCount = INVENTORY_DATA.filter(p => p.status === StockStatus.OutOfStock).length;
    const totalAssetValue = INVENTORY_DATA.reduce((sum, p) => sum + p.stock * p.price, 0);

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    return (
        <main className="flex-1 bg-gray-50 p-8">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-3xl font-bold text-gray-800">Inventory</h2>
                <div className="flex items-center space-x-3">
                    <button className="px-4 py-2 text-sm font-medium border border-gray-300 rounded-lg hover:bg-gray-100">Import</button>
                    <button className="px-4 py-2 text-sm font-medium border border-gray-300 rounded-lg hover:bg-gray-100">Export</button>
                    <button className="px-4 py-2 text-sm font-medium bg-indigo-600 text-white rounded-lg hover:bg-indigo-700">+ Add Product</button>
                </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 mb-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
                    <div>
                        <p className="text-sm text-gray-500">Total Asset Value</p>
                        <p className="text-3xl font-bold text-gray-800">${totalAssetValue.toLocaleString()}</p>
                    </div>
                    <div>
                        <div className="flex justify-between items-baseline">
                           <p className="text-2xl font-bold text-gray-800">{totalProducts}</p>
                           <p className="text-sm font-medium text-gray-500">Products</p>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2.5 mt-2">
                           <div className="flex h-2.5">
                               <div className="bg-green-500" style={{width: `${(inStockCount/totalProducts)*100}%`}}></div>
                               <div className="bg-yellow-400" style={{width: `${(lowStockCount/totalProducts)*100}%`}}></div>
                               <div className="bg-red-500" style={{width: `${(outOfStockCount/totalProducts)*100}%`}}></div>
                           </div>
                        </div>
                         <div className="flex justify-between text-xs mt-2 text-gray-500">
                            <span>In stock: <span className="font-semibold text-gray-700">{inStockCount}</span></span>
                            <span>Low stock: <span className="font-semibold text-gray-700">{lowStockCount}</span></span>
                            <span>Out of stock: <span className="font-semibold text-gray-700">{outOfStockCount}</span></span>
                        </div>
                    </div>
                </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-sm border border-gray-200">
                <div className="p-4 flex items-center justify-between flex-wrap gap-4">
                    <div className="relative flex-grow max-w-xs">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <SearchIcon className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                            type="text"
                            placeholder="Search product..."
                            value={searchTerm}
                            onChange={(e) => { setSearchTerm(e.target.value); setCurrentPage(1); }}
                            className="block w-full border-gray-300 rounded-lg py-2 pl-10 pr-4 text-sm focus:ring-indigo-500 focus:border-indigo-500"
                        />
                    </div>
                    <div className="flex items-center space-x-4 flex-wrap">
                        {/* More filters could be added here */}
                        <div>
                             <select 
                                value={statusFilter}
                                onChange={(e) => { setStatusFilter(e.target.value as StockStatus | 'All'); setCurrentPage(1); }}
                                className="border-gray-300 rounded-lg text-sm focus:ring-indigo-500 focus:border-indigo-500"
                             >
                                <option value="All">All Statuses</option>
                                <option value={StockStatus.InStock}>In stock</option>
                                <option value={StockStatus.LowStock}>Low stock</option>
                                <option value={StockStatus.OutOfStock}>Out of stock</option>
                            </select>
                        </div>
                        <button className="text-sm text-gray-600 hover:text-gray-900">Filter</button>
                    </div>
                </div>
                <InventoryTable products={paginatedData} />
                <Pagination
                    currentPage={currentPage}
                    totalItems={filteredData.length}
                    itemsPerPage={itemsPerPage}
                    onPageChange={handlePageChange}
                />
            </div>
        </main>
    );
};

export default Inventory;
   