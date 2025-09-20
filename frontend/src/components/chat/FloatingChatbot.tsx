import React, { useState, useRef, useEffect } from 'react';
import { 
  MessageCircle, 
  X, 
  Send, 
  Mic, 
  MicOff, 
  Minimize2, 
  Maximize2,
  Bot,
  User as UserIcon
} from 'lucide-react';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
  type?: 'text' | 'suggestion' | 'analysis';
}

interface FloatingChatbotProps {
  user?: any;
  isShieldMode?: boolean;
}

export const FloatingChatbot = ({ user, isShieldMode }: FloatingChatbotProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: isShieldMode 
        ? 'Hello! I\'m your productivity assistant. How can I help you today?' 
        : 'Hi there! I\'m your wellness companion. How are you feeling today?',
      sender: 'bot',
      timestamp: new Date(),
    }
  ]);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async () => {
    if (!message.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: message,
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setMessage('');

    // Simulate bot response (in real app, this would be an API call)
    setTimeout(() => {
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: generateBotResponse(message, isShieldMode),
        sender: 'bot',
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, botResponse]);
    }, 1000);
  };

  const generateBotResponse = (userMessage: string, shieldMode?: boolean) => {
    const lowerMessage = userMessage.toLowerCase();
    
    if (shieldMode) {
      if (lowerMessage.includes('task') || lowerMessage.includes('productivity')) {
        return 'I can help you organize your tasks and improve productivity. Would you like me to suggest some productivity techniques?';
      }
      if (lowerMessage.includes('schedule') || lowerMessage.includes('time')) {
        return 'Time management is crucial for productivity. Let me help you create a better schedule.';
      }
      return 'I\'m here to help with your productivity needs. What would you like to work on?';
    }

    if (lowerMessage.includes('stress') || lowerMessage.includes('anxious')) {
      return 'I understand you\'re feeling stressed. Let\'s try some breathing exercises together. Would you like me to guide you through a quick 3-minute session?';
    }
    if (lowerMessage.includes('sad') || lowerMessage.includes('down')) {
      return 'I hear that you\'re going through a difficult time. Your feelings are valid. Would you like to explore some mood-lifting activities or talk about what\'s on your mind?';
    }
    if (lowerMessage.includes('sleep') || lowerMessage.includes('tired')) {
      return 'Sleep is so important for mental wellness. I can suggest some relaxation techniques or create a personalized bedtime routine for you.';
    }
    return 'Thank you for sharing with me. I\'m here to support your wellness journey. Would you like to explore some coping strategies or track your mood today?';
  };

  const handleVoiceInput = () => {
    setIsListening(!isListening);
    // In a real app, this would integrate with speech recognition API
    if (!isListening) {
      setTimeout(() => {
        setIsListening(false);
        setMessage('This would be voice input text...');
      }, 3000);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 w-14 h-14 rounded-full primary-gradient hover:shadow-glow float-animation transition-smooth shadow-strong z-50 flex items-center justify-center"
      >
        <MessageCircle className="w-6 h-6 text-white" />
      </button>
    );
  }

  return (
    <div className={`
      fixed bottom-6 right-6 w-96 transition-all duration-300 z-50 shadow-strong glass rounded-lg border
      ${isMinimized ? 'h-16' : 'h-[500px]'}
    `}>
      <div className="flex flex-row items-center justify-between p-4 border-b">
        <div className="text-lg flex items-center space-x-2">
          <div className="w-8 h-8 primary-gradient rounded-full flex items-center justify-center">
            <Bot className="w-4 h-4 text-white" />
          </div>
          <span className="font-semibold">
            {isShieldMode ? 'Assistant' : 'Wellness Companion'}
          </span>
          {!user && <span className="text-xs text-muted-foreground">(Guest)</span>}
        </div>
        <div className="flex items-center space-x-1">
          <button
            className="p-1 hover:bg-accent rounded-md transition-colors"
            onClick={() => setIsMinimized(!isMinimized)}
          >
            {isMinimized ? <Maximize2 className="w-4 h-4" /> : <Minimize2 className="w-4 h-4" />}
          </button>
          <button
            className="p-1 hover:bg-accent rounded-md transition-colors"
            onClick={() => setIsOpen(false)}
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      {!isMinimized && (
        <div className="flex flex-col h-[440px]">
          <div className="flex-1 p-4 overflow-y-auto">
            <div className="space-y-4">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`
                      max-w-[80%] p-3 rounded-2xl transition-smooth
                      ${msg.sender === 'user'
                        ? 'bg-primary text-primary-foreground ml-4'
                        : 'bg-muted mr-4'
                      }
                    `}
                  >
                    <div className="flex items-start space-x-2">
                      {msg.sender === 'bot' && (
                        <Bot className="w-4 h-4 mt-0.5 flex-shrink-0" />
                      )}
                      {msg.sender === 'user' && (
                        <UserIcon className="w-4 h-4 mt-0.5 flex-shrink-0 order-2" />
                      )}
                      <p className="text-sm">{msg.text}</p>
                    </div>
                    <p className="text-xs opacity-70 mt-1">
                      {msg.timestamp.toLocaleTimeString([], { 
                        hour: '2-digit', 
                        minute: '2-digit' 
                      })}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            <div ref={messagesEndRef} />
          </div>

          <div className="p-4 border-t bg-background/50">
            <div className="flex items-end space-x-2">
              <div className="flex-1">
                <input
                  ref={inputRef}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Type your message..."
                  className="w-full px-3 py-2 border rounded-md bg-background focus:outline-none focus:ring-2 focus:ring-primary transition-colors resize-none"
                />
              </div>
              <button
                onClick={handleVoiceInput}
                className={`
                  p-2 hover:bg-accent rounded-md transition-colors
                  ${isListening ? 'bg-destructive text-destructive-foreground animate-pulse' : ''}
                `}
              >
                {isListening ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
              </button>
              <button
                onClick={handleSendMessage}
                disabled={!message.trim()}
                className="px-3 py-2 primary-gradient text-white rounded-md hover:shadow-glow transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
            {!user && (
              <p className="text-xs text-muted-foreground mt-2">
                Sign in for personalized responses and conversation history
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};