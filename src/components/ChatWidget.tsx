import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, Send, X, Minimize2, Maximize2 } from 'lucide-react';

interface Message {
  id: number;
  content: string;
  isUser: boolean;
  timestamp: Date;
}

const ChatWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 0,
      content: "Hi there! I'm SoftSell's AI assistant. How can I help you with your software license needs today?",
      isUser: false,
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (messagesEndRef.current && isOpen && !isMinimized) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen, isMinimized]);

  const toggleChat = () => {
    setIsOpen(!isOpen);
    setIsMinimized(false);
  };

  const toggleMinimize = () => {
    setIsMinimized(!isMinimized);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const handleSend = () => {
    if (input.trim() === '') return;

    const userMessage: Message = {
      id: messages.length,
      content: input,
      isUser: true,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const aiResponse = getAIResponse(input);
      setMessages(prev => [...prev, {
        id: prev.length,
        content: aiResponse,
        isUser: false,
        timestamp: new Date()
      }]);
      setIsTyping(false);
    }, 1000 + Math.random() * 1000); // Random delay between 1-2s
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSend();
    }
  };

  // Simple AI response based on keywords
  const getAIResponse = (message: string) => {
    const lowerMessage = message.toLowerCase();
    
    if (lowerMessage.includes('price') || lowerMessage.includes('cost') || lowerMessage.includes('value')) {
      return "Our valuations are typically 40-70% of the original license cost, depending on the software type, version, and remaining term. Would you like to get a free valuation for your specific license?";
    }
    
    if (lowerMessage.includes('how') && lowerMessage.includes('work')) {
      return "It's easy! You upload your license details, we provide a valuation within 24 hours, and if you accept, we handle the transfer and pay you within 48 hours. Would you like to know more about any specific part of the process?";
    }
    
    if (lowerMessage.includes('time') || lowerMessage.includes('long')) {
      return "The entire process usually takes 3-5 business days from submission to payment. Valuations are provided within 24 hours, and payment is processed within 48 hours after you accept our offer.";
    }
    
    if (lowerMessage.includes('secure') || lowerMessage.includes('security') || lowerMessage.includes('safe')) {
      return "Security is our top priority. We use bank-level encryption for all data transfers and secure payment processing. Your license information is handled with strict confidentiality and we're compliant with all relevant data protection regulations.";
    }
    
    if (lowerMessage.includes('contact') || lowerMessage.includes('speak') || lowerMessage.includes('human') || lowerMessage.includes('representative')) {
      return "You can speak with our team by calling (800) 555-1234 during business hours (9am-5pm ET) or by emailing contact@softsell.com. Would you like me to arrange a callback from one of our license specialists?";
    }
    
    return "Thanks for your message. That's a great question about software license resale. Would you like to know more about our valuation process, security measures, or payment options?";
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <>
      {/* Chat toggle button */}
      <button
        onClick={toggleChat}
        className={`fixed bottom-6 right-6 p-4 rounded-full shadow-lg z-50 transition-all duration-300 ${
          isOpen ? 'bg-red-500 hover:bg-red-600' : 'bg-blue-600 hover:bg-blue-700'
        }`}
        aria-label={isOpen ? 'Close chat' : 'Open chat'}
      >
        {isOpen ? (
          <X className="w-6 h-6 text-white" />
        ) : (
          <MessageCircle className="w-6 h-6 text-white" />
        )}
      </button>

      {/* Chat window */}
      {isOpen && (
        <div 
          className={`fixed ${
            isMinimized ? 'h-14' : 'h-[450px]'
          } w-[350px] max-w-full bottom-24 right-6 bg-white rounded-lg shadow-xl flex flex-col z-40 overflow-hidden transition-all duration-300`}
        >
          {/* Chat header */}
          <div className="bg-blue-600 text-white p-3 flex items-center justify-between">
            <div className="flex items-center">
              <MessageCircle className="w-5 h-5 mr-2" />
              <span className="font-medium">SoftSell Support</span>
            </div>
            <div className="flex items-center space-x-2">
              <button
                onClick={toggleMinimize}
                className="p-1 hover:bg-blue-700 rounded"
                aria-label={isMinimized ? 'Maximize chat' : 'Minimize chat'}
              >
                {isMinimized ? (
                  <Maximize2 className="w-4 h-4" />
                ) : (
                  <Minimize2 className="w-4 h-4" />
                )}
              </button>
              <button
                onClick={toggleChat}
                className="p-1 hover:bg-blue-700 rounded"
                aria-label="Close chat"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {!isMinimized && (
            <>
              {/* Messages area */}
              <div className="flex-grow overflow-y-auto p-4 bg-gray-50">
                {messages.map(message => (
                  <div
                    key={message.id}
                    className={`mb-4 flex flex-col ${
                      message.isUser ? 'items-end' : 'items-start'
                    }`}
                  >
                    <div
                      className={`max-w-[80%] rounded-lg p-3 ${
                        message.isUser
                          ? 'bg-blue-600 text-white'
                          : 'bg-white border border-gray-200'
                      }`}
                    >
                      {message.content}
                    </div>
                    <span className="text-xs text-gray-500 mt-1">
                      {formatTime(message.timestamp)}
                    </span>
                  </div>
                ))}
                {isTyping && (
                  <div className="flex items-start mb-4">
                    <div className="bg-gray-200 rounded-lg px-4 py-2">
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 rounded-full bg-gray-500 animate-bounce"></div>
                        <div className="w-2 h-2 rounded-full bg-gray-500 animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                        <div className="w-2 h-2 rounded-full bg-gray-500 animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                      </div>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* Input area */}
              <div className="p-3 border-t border-gray-200 bg-white">
                <div className="flex items-center">
                  <input
                    type="text"
                    value={input}
                    onChange={handleInputChange}
                    onKeyPress={handleKeyPress}
                    placeholder="Type your message..."
                    className="flex-grow px-4 py-2 border rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <button
                    onClick={handleSend}
                    disabled={input.trim() === ''}
                    className={`px-4 py-2 rounded-r-lg ${
                      input.trim() === ''
                        ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                        : 'bg-blue-600 text-white hover:bg-blue-700'
                    }`}
                  >
                    <Send className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      )}
    </>
  );
};

export default ChatWidget;