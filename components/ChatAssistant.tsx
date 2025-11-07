
import React, { useState, useRef, useEffect } from 'react';
import { ChatMessage } from '../types';
import { askAIAssistant } from '../services/geminiService';

const ChatAssistant: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [userInput, setUserInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(scrollToBottom, [messages]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!userInput.trim()) return;

    const newMessages: ChatMessage[] = [...messages, { role: 'user', content: userInput }];
    setMessages(newMessages);
    setUserInput('');
    setIsLoading(true);

    const aiResponse = await askAIAssistant(userInput);
    
    setMessages([...newMessages, { role: 'assistant', content: aiResponse }]);
    setIsLoading(false);
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-8 right-8 bg-indigo-600 text-white p-4 rounded-full shadow-lg hover:bg-indigo-700 transition-transform transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 z-50"
        aria-label="Open AI Assistant"
      >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
          <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 12a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M15.586 15.586a2.25 2.25 0 0 1-3.182 0l-3.182-3.182a2.25 2.25 0 0 1 0-3.182l3.182-3.182a2.25 2.25 0 0 1 3.182 0l3.182 3.182a2.25 2.25 0 0 1 0 3.182l-3.182 3.182Z" transform="translate(-4, -4) scale(0.6)" />
        </svg>
      </button>

      {isOpen && (
        <div className="fixed bottom-24 right-8 w-full max-w-md h-[60vh] bg-white rounded-xl shadow-2xl flex flex-col z-50 transition-all duration-300">
          <header className="bg-indigo-600 text-white p-4 rounded-t-xl flex justify-between items-center">
            <h3 className="font-semibold text-lg">HR AI Assistant</h3>
            <button onClick={() => setIsOpen(false)} className="text-indigo-200 hover:text-white">&times;</button>
          </header>

          <main className="flex-1 p-4 overflow-y-auto bg-gray-50">
            <div className="space-y-4">
               <div className="flex justify-start">
                  <div className="bg-gray-200 text-gray-800 p-3 rounded-lg max-w-xs whitespace-pre-wrap">
                    สวัสดีค่ะ! มีอะไรให้ช่วยเกี่ยวกับสต็อกอุปกรณ์ HR บ้างคะ? ลองถามได้เลย เช่น "เสื้อโปโลไซส์ M เหลือเท่าไหร่?" หรือ "มีอะไรใกล้หมดบ้าง?"
                  </div>
                </div>
              {messages.map((msg, index) => (
                <div key={index} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`p-3 rounded-lg max-w-xs whitespace-pre-wrap ${msg.role === 'user' ? 'bg-indigo-500 text-white' : 'bg-gray-200 text-gray-800'}`}>
                    {msg.content}
                  </div>
                </div>
              ))}
              {isLoading && (
                 <div className="flex justify-start">
                    <div className="bg-gray-200 text-gray-800 p-3 rounded-lg">
                        <span className="animate-pulse">...</span>
                    </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
          </main>
          
          <footer className="p-4 border-t border-gray-200">
            <form onSubmit={handleSendMessage} className="flex items-center">
              <input
                type="text"
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                placeholder="พิมพ์คำถามของคุณ..."
                className="flex-1 border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                disabled={isLoading}
              />
              <button type="submit" className="ml-3 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 disabled:bg-indigo-300" disabled={isLoading}>
                Send
              </button>
            </form>
          </footer>
        </div>
      )}
    </>
  );
};

export default ChatAssistant;

   