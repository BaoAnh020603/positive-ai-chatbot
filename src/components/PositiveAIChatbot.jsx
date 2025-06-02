import React, { useState, useRef, useEffect } from 'react';
import { Send, Sun, Sparkles, Heart, Star } from 'lucide-react';

const PositiveAIChatbot = () => {
  const [messages, setMessages] = useState([
    {
      type: 'ai',
      content: 'Xin chào! Tôi là AI Sunshine 🌞 - trợ lý tích cực của bạn! Tôi ở đây để lắng nghe và mang đến những lời khuyên tích cực. Bạn đang cảm thấy thế nào hôm nay?',
      timestamp: new Date()
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const positiveResponses = {
    greetings: [
      "Chào bạn! Thật tuyệt khi được gặp bạn hôm nay! 🌟",
      "Xin chào! Bạn đã làm tôi vui lên chỉ bằng việc ghé thăm! ✨",
      "Hello! Hy vọng hôm nay của bạn tràn đầy niềm vui! 🌈"
    ],
    encouragement: [
      "Bạn đang làm rất tốt! Mỗi bước nhỏ đều có ý nghĩa lớn! 💪",
      "Tin tưởng vào bản thân - bạn mạnh mẽ hơn bạn nghĩ! 🌟",
      "Khó khăn chỉ là tạm thời, nhưng sức mạnh của bạn là vĩnh cửu! ✨",
      "Bạn có thể vượt qua mọi thử thách. Tôi tin tưởng vào bạn! 🚀"
    ],
    motivation: [
      "Hôm nay là một ngày mới tuyệt vời để bắt đầu những điều tích cực! 🌅",
      "Mỗi thất bại đều dạy chúng ta điều gì đó quý giá. Hãy học hỏi và tiến lên! 📚",
      "Thành công không phải đích đến, mà là hành trình. Hãy tận hưởng từng bước! 🛤️",
      "Bạn là tác giả của câu chuyện cuộc đời mình. Hãy viết nó thật đẹp! ✍️"
    ],
    support: [
      "Tôi hiểu bạn đang cảm thấy khó khăn. Nhưng hãy nhớ, sau cơn mưa sẽ có cầu vồng! 🌈",
      "Không sao cả, mọi người đều có những ngày khó khăn. Điều quan trọng là không bỏ cuộc! 💝",
      "Bạn không đơn độc. Luôn có người quan tâm đến bạn, kể cả tôi! 🤗",
      "Hãy cho phép bản thân được nghỉ ngơi và phục hồi. Bạn xứng đáng được yêu thương! 🌸"
    ],
    positivity: [
      "Cuộc sống đẹp biết bao khi chúng ta biết trân trọng những điều nhỏ bé! 🌺",
      "Nụ cười của bạn có thể thắp sáng cả ngày của ai đó! 😊",
      "Hãy tập trung vào những gì bạn có, thay vì những gì bạn thiếu! 🙏",
      "Mỗi ngày là một món quà - đó là lý do người ta gọi nó là 'hiện tại'! 🎁"
    ]
  };

  const getRandomResponse = (category) => {
    const responses = positiveResponses[category];
    return responses[Math.floor(Math.random() * responses.length)];
  };

  const generateAIResponse = (userMessage) => {
    const message = userMessage.toLowerCase();
    
    if (message.includes('xin chào') || message.includes('hello') || message.includes('hi')) {
      return getRandomResponse('greetings');
    } else if (message.includes('buồn') || message.includes('khó khăn') || message.includes('stress') || message.includes('mệt')) {
      return getRandomResponse('support');
    } else if (message.includes('động viên') || message.includes('khuyến khích') || message.includes('help')) {
      return getRandomResponse('encouragement');
    } else if (message.includes('động lực') || message.includes('motivation') || message.includes('thành công')) {
      return getRandomResponse('motivation');
    } else {
      return getRandomResponse('positivity');
    }
  };

  const handleSendMessage = async () => {
    if (!inputText.trim()) return;

    const userMessage = {
      type: 'user',
      content: inputText,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setIsTyping(true);

    // Simulate AI thinking time
    setTimeout(() => {
      const aiResponse = {
        type: 'ai',
        content: generateAIResponse(inputText),
        timestamp: new Date()
      };
      setMessages(prev => [...prev, aiResponse]);
      setIsTyping(false);
    }, 1000 + Math.random() * 2000);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-100 via-yellow-50 to-pink-100 flex flex-col">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-md shadow-lg border-b-2 border-yellow-200">
        <div className="max-w-4xl mx-auto px-4 py-6">
          <div className="flex items-center justify-center space-x-3">
            <div className="bg-gradient-to-r from-yellow-400 to-orange-400 p-3 rounded-full shadow-lg">
              <Sun className="w-8 h-8 text-white animate-spin" style={{animationDuration: '8s'}} />
            </div>
            <div className="text-center">
              <h1 className="text-3xl font-bold bg-gradient-to-r from-yellow-600 to-orange-600 bg-clip-text text-transparent">
                AI Sunshine
              </h1>
              <p className="text-gray-600 text-sm">Trợ lý tích cực của bạn</p>
            </div>
            <div className="hidden sm:flex space-x-2">
              <Sparkles className="w-6 h-6 text-yellow-500 animate-pulse" />
              <Heart className="w-6 h-6 text-pink-500 animate-bounce" />
              <Star className="w-6 h-6 text-orange-500 animate-pulse" />
            </div>
          </div>
        </div>
      </div>

      {/* Chat Container */}
      <div className="flex-1 max-w-4xl mx-auto w-full px-4 py-6 flex flex-col">
        {/* Messages */}
        <div className="flex-1 space-y-4 mb-6 overflow-y-auto max-h-96">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-xs sm:max-w-md lg:max-w-lg px-4 py-3 rounded-2xl shadow-md ${
                  message.type === 'user'
                    ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-br-sm'
                    : 'bg-white/90 backdrop-blur-sm text-gray-800 rounded-bl-sm border border-yellow-200'
                }`}
              >
                <p className="text-sm leading-relaxed">{message.content}</p>
                <p className={`text-xs mt-2 ${
                  message.type === 'user' ? 'text-blue-100' : 'text-gray-500'
                }`}>
                  {message.timestamp.toLocaleTimeString('vi-VN', {
                    hour: '2-digit',
                    minute: '2-digit'
                  })}
                </p>
              </div>
            </div>
          ))}

          {isTyping && (
            <div className="flex justify-start">
              <div className="bg-white/90 backdrop-blur-sm px-4 py-3 rounded-2xl rounded-bl-sm shadow-md border border-yellow-200">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-yellow-400 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-orange-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                  <div className="w-2 h-2 bg-pink-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="bg-white/80 backdrop-blur-md rounded-2xl shadow-lg border-2 border-yellow-200 p-4">
          <div className="flex space-x-3">
            <textarea
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Chia sẻ suy nghĩ của bạn với AI Sunshine..."
              className="flex-1 resize-none border-0 bg-transparent placeholder-gray-500 text-gray-800 focus:outline-none focus:ring-0 text-sm leading-relaxed"
              rows="2"
              disabled={isTyping}
            />
            <button
              onClick={handleSendMessage}
              disabled={!inputText.trim() || isTyping}
              className="bg-gradient-to-r from-yellow-400 to-orange-400 hover:from-yellow-500 hover:to-orange-500 disabled:from-gray-300 disabled:to-gray-400 text-white p-3 rounded-full shadow-lg transition-all duration-200 transform hover:scale-105 disabled:scale-100"
            >
              <Send className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mt-4 flex flex-wrap gap-2 justify-center">
          {[
            "Tôi cần động viên 💪",
            "Hôm nay thế nào? 🌟",
            "Chia sẻ điều tích cực ✨",
            "Cảm ơn bạn! 💝"
          ].map((suggestion, index) => (
            <button
              key={index}
              onClick={() => setInputText(suggestion.split(' ')[0] === 'Tôi' ? suggestion : suggestion)}
              className="px-3 py-2 bg-white/60 hover:bg-white/80 backdrop-blur-sm rounded-full text-sm text-gray-700 border border-yellow-200 hover:border-yellow-300 transition-all duration-200 transform hover:scale-105"
            >
              {suggestion}
            </button>
          ))}
        </div>
      </div>

      {/* Footer with Copyright */}
      <footer className="bg-white/80 backdrop-blur-md border-t-2 border-yellow-200 mt-8">
        <div className="max-w-4xl mx-auto px-4 py-6">
          <div className="text-center">
            <div className="flex items-center justify-center space-x-2 mb-3">
              <Sun className="w-5 h-5 text-yellow-500" />
              <span className="text-lg font-semibold bg-gradient-to-r from-yellow-600 to-orange-600 bg-clip-text text-transparent">
                AI Sunshine
              </span>
              <Sun className="w-5 h-5 text-yellow-500" />
            </div>
            <p className="text-gray-600 text-sm mb-2">
              Mang lại năng lượng tích cực cho mọi người 🌟
            </p>
            <div className="border-t border-yellow-200 pt-3">
              <p className="text-gray-500 text-xs">
                © 2025 Bản quyền thuộc về <span className="font-semibold text-gray-700">Nguyễn Nhật Bảo Anh</span>
              </p>
              <p className="text-gray-400 text-xs mt-1">
                Made with ❤️ and ☀️
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default PositiveAIChatbot;
