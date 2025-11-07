
import React from 'react';
import { SearchIcon, BellIcon, ChatBubbleIcon } from './icons';

const Header: React.FC = () => {
    return (
        <header className="bg-white h-20 flex items-center justify-between px-8 border-b border-gray-200">
            <div className="relative w-full max-w-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <SearchIcon className="h-5 w-5 text-gray-400" />
                </div>
                <input
                    type="text"
                    placeholder="Search"
                    className="block w-full bg-gray-100 border border-transparent rounded-lg py-2 pl-10 pr-4 text-sm placeholder-gray-500 focus:outline-none focus:bg-white focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                />
            </div>
            <div className="flex items-center space-x-6">
                <button className="p-2 rounded-full text-gray-500 hover:bg-gray-100 hover:text-gray-700">
                    <BellIcon className="h-6 w-6" />
                </button>
                <button className="p-2 rounded-full text-gray-500 hover:bg-gray-100 hover:text-gray-700">
                    <ChatBubbleIcon className="h-6 w-6" />
                </button>
                <div className="w-10 h-10">
                    <img className="rounded-full w-full h-full object-cover" src="https://picsum.photos/seed/user/40/40" alt="User Profile" />
                </div>
            </div>
        </header>
    );
};

export default Header;
   