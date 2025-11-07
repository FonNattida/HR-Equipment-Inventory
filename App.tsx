
import React from 'react';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Inventory from './components/Inventory';
import ChatAssistant from './components/ChatAssistant';

const App: React.FC = () => {
    return (
        <div className="flex min-h-screen bg-gray-100">
            <Sidebar />
            <div className="flex-1 flex flex-col">
                <Header />
                <Inventory />
            </div>
            <ChatAssistant />
        </div>
    );
};

export default App;
   