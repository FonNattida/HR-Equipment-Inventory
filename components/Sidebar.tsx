
import React, { useState } from 'react';
import { HomeIcon, StoreIcon, InventoryIcon, ChevronDownIcon, ChevronUpIcon } from './icons';

interface NavLinkProps {
  icon: React.ReactNode;
  label: string;
  isActive?: boolean;
  isSub?: boolean;
}

const NavLink: React.FC<NavLinkProps> = ({ icon, label, isActive = false, isSub = false }) => (
  <a href="#" className={`flex items-center px-4 py-2.5 text-sm font-medium rounded-md transition-colors duration-200 ${
    isActive
      ? 'bg-gray-700 text-white'
      : 'text-gray-300 hover:bg-gray-700 hover:text-white'
  } ${isSub ? 'pl-12' : ''}`}>
    {icon}
    <span className="ml-3">{label}</span>
  </a>
);

const CollapsibleNavSection: React.FC<{
  icon: React.ReactNode;
  label: string;
  children: React.ReactNode;
  startOpen?: boolean;
}> = ({ icon, label, children, startOpen = false }) => {
  const [isOpen, setIsOpen] = useState(startOpen);

  return (
    <div>
      <button onClick={() => setIsOpen(!isOpen)} className="flex items-center justify-between w-full px-4 py-2.5 text-sm font-medium text-left text-gray-300 rounded-md hover:bg-gray-700 hover:text-white focus:outline-none">
        <div className="flex items-center">
            {icon}
            <span className="ml-3">{label}</span>
        </div>
        {isOpen ? <ChevronUpIcon className="w-5 h-5" /> : <ChevronDownIcon className="w-5 h-5" />}
      </button>
      {isOpen && <div className="mt-1 space-y-1">{children}</div>}
    </div>
  );
};


const Sidebar: React.FC = () => {
    return (
        <div className="flex flex-col w-64 bg-gray-800 text-white min-h-screen">
            <div className="flex items-center justify-center h-20 border-b border-gray-700">
                <div className="flex items-center">
                    <div className="w-8 h-8 bg-indigo-500 rounded-md flex items-center justify-center font-bold text-xl">F</div>
                    <h1 className="text-xl font-bold ml-3">Fixoria sales</h1>
                </div>
            </div>
            <div className="flex-1 p-4 space-y-2">
                <div className="text-xs text-gray-400 uppercase font-semibold px-4 mb-2">Main Menu</div>
                <NavLink icon={<HomeIcon className="w-5 h-5"/>} label="Home" />
                <CollapsibleNavSection icon={<StoreIcon className="w-5 h-5"/>} label="My Store" startOpen={true}>
                    <NavLink icon={<span className="w-5"></span>} label="Products" isSub />
                    <NavLink icon={<span className="w-5"></span>} label="Orders" isSub />
                    <NavLink icon={<InventoryIcon className="w-5 h-5"/>} label="Inventory" isActive isSub />
                    <NavLink icon={<span className="w-5"></span>} label="Discount" isSub />
                </CollapsibleNavSection>
                 {/* Other sections can be added here */}
            </div>
            <div className="p-4 border-t border-gray-700">
                <div className="flex items-center">
                    <img className="w-10 h-10 rounded-full" src="https://picsum.photos/seed/user/40/40" alt="User" />
                    <div className="ml-3">
                        <p className="text-sm font-semibold">Himmad</p>
                        <p className="text-xs text-gray-400">CEO Fixariastudio</p>
                    </div>
                    <ChevronDownIcon className="w-5 h-5 ml-auto text-gray-400"/>
                </div>
            </div>
        </div>
    );
};

export default Sidebar;
   