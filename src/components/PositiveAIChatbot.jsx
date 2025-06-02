import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Sparkles } from 'lucide-react';

const PositiveAIChatbot = () => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Xin chào! Tôi là AI Sunshine 🌞 Tôi ở đây để mang đến cho bạn năng lượng tích cực và những lời khuyên hữu ích. Hãy chia sẻ với tôi điều gì đó nhé!",
      isBot: true,
      timestamp: new Date().toLocaleTimeString()
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [messages]);

  const positiveResponses = {
    greeting: [
      "Chào bạn! Thật tuyệt khi gặp bạn hôm nay! 🌟",
      "Xin chào! Bạn có vẻ rất tuyệt vời hôm nay! ✨",
      "Hello! Tôi rất vui được trò chuyện với bạn! 😊",
      "Chào bạn! Hy vọng bạn đang có một ngày tuyệt vời! 🌈"
    ],
    encouragement: [
      "Bạn đang làm rất tốt! Hãy tiếp tục phát huy nhé! 💪",
      "Tôi tin bạn có thể vượt qua mọi khó khăn. Bạn mạnh mẽ hơn bạn nghĩ! 🌟",
      "Mỗi bước nhỏ đều là tiến bộ. Bạn đang trên đường thành công! 🚀",
      "Hãy tự hào về bản thân! Bạn đã cố gắng rất nhiều! ⭐",
      "Khó khăn chỉ là tạm thời, nhưng sự kiên trì của bạn sẽ mãi mãi! 💎"
    ],
    motivation: [
      "Hôm nay là một ngày mới đầy cơ hội! Hãy tận dụng nó! 🌅",
      "Bạn có tiềm năng vô hạn! Đừng bao giờ nghi ngờ bản thân! ✨",
      "Thành công bắt đầu từ việc tin tương bản thân. Tôi tin bạn! 🌟",
      "Hãy biến những giấc mơ thành hiện thực. Bạn xứng đáng với điều tốt nhất! 🎯",
      "Mỗi ngày là một cơ hội để trở thành phiên bản tốt hơn của chính mình! 🦋"
    ],
    wellness: [
      "Đừng quên chăm sóc bản thân nhé! Sức khỏe tinh thần rất quan trọng! 🧘‍♀️",
      "Hãy dành thời gian thư giãn và làm những việc bạn yêu thích! 🎨",
      "Hít thở sâu, mỉm cười và nhớ rằng bạn rất đặc biệt! 😌",
      "Hãy lắng nghe cơ thể và tâm hồn của bạn. Chúng biết bạn cần gì! 💆‍♀️",
      "Ngủ đủ giấc, ăn uống lành mạnh và yêu thương bản thân nhé! 🥗"
    ],
    relationships: [
      "Những mối quan hệ tích cực sẽ mang lại hạnh phúc cho bạn! 👫",
      "Hãy bao quanh mình bằng những người yêu thương và hỗ trợ bạn! 💕",
      "Sự tử tế và lòng biết ơn sẽ làm cho mọi mối quan hệ tốt đẹp hơn! 🤝",
      "Hãy là người bạn mà bạn muốn có trong cuộc sống! 🌸",
      "Giao tiếp chân thành và lắng nghe là chìa khóa của mọi mối quan hệ! 👂"
    ]
  };

  const quickSuggestions = [
    "Tôi cần động viên",
    "Cách giữ tích cực",
    "Lời khuyên sức khỏe",
    "Về các mối quan hệ",
    "Tôi cảm thấy căng thẳng"
  ];

  const generateResponse = (userMessage) => {
    const message = userMessage.toLowerCase();
    
    if (message.includes('chào') || message.includes('hello') || message.includes('hi')) {
      return positiveResponses.greeting[Math.floor(Math.random() * positiveResponses.greeting.length)];
    }
    
    if (message.includes('động viên') || message.includes('buồn') || message.includes('khó khăn') || message.includes('stress')) {
      return positiveResponses.encouragement[Math.floor(Math.random() * positiveResponses.encouragement.length)];
    }
    
    if (message.includes('động lực') || message.includes('mục tiêu') || message.includes('thành công') || message.includes('tích cực')) {
      return positiveResponses.motivation[Math.floor(Math.random() * positiveResponses.motivation.length)];
    }
    
    if (message.includes('sức khỏe') || message.includes('thư giãn') || message.includes('căng thẳng') || message.includes('mệt mỏi')) {
      return positiveResponses.wellness[Math.floor(Math.random() * positiveResponses.wellness.length)];
    }
    
    if (message.includes('quan hệ') || message.includes('bạn bè') || message.includes('gia đình') || message.includes('yêu')) {
      return positiveResponses.relationships[Math.floor(Math.random() * positiveResponses.relationships.length)];
    }
    
    // Default positive response
    const allResponses = Object.values(positiveResponses).flat();
    return allResponses[Math.floor(Math.random() * allResponses.length)];
  };

  const handleSendMessage = async () => {
    if (!inputText.trim()) return;

    const userMessage = {
      id: Date.now(),
      text: inputText,
      isBot: false,
      timestamp: new Date().toLocaleTimeString()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setIsTyping(true);

    // Simulate AI thinking time
    setTimeout(() => {
      const botResponse = {
        id: Date.now() + 1,
        text: generateResponse(inputText),
        isBot: true,
        timestamp: new Date().toLocaleTimeString()
      };
      setMessages(prev => [...prev, botResponse]);
      setIsTyping(false);
    }, 1500);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleSuggestionClick = (suggestion) => {
    setInputText(suggestion);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-100 via-pink-50 to-purple-100 p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl mb-6 p-6">
          <div className="flex items-center justify-center mb-4">
            <div className="bg-gradient-to-r from-yellow-400 to-pink-400 p-3 rounded-full mr-4">
              <Sparkles className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                AI Sunshine
              </h1>
              <p className="text-gray-600">Chatbot tích cực mang đến năng lượng tích cực</p>
            </div>
          </div>
        </div>

        {/* Chat Container */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl overflow-hidden">
          {/* Messages */}
          <div className="h-96 overflow-y-auto p-4 space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex items-start space-x-3 ${message.isBot ? '' : 'flex-row-reverse space-x-reverse'}`}
              >
                <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
                  message.isBot 
                    ? 'bg-gradient-to-r from-yellow-400 to-pink-400' 
                    : 'bg-gradient-to-r from-blue-400 to-purple-400'
                }`}>
                  {message.isBot ? <Bot className="w-4 h-4 text-white" /> : <User className="w-4 h-4 text-white" />}
                </div>
                <div className={`flex flex-col ${message.isBot ? 'items-start' : 'items-end'} max-w-xs lg:max-w-md`}>
                  <div className={`px-4 py-2 rounded-2xl ${
                    message.isBot 
                      ? 'bg-gradient-to-r from-yellow-100 to-pink-100 text-gray-800' 
                      : 'bg-gradient-to-r from-blue-500 to-purple-500 text-white'
                  }`}>
                    <p className="text-sm">{message.text}</p>
                  </div>
                  <span className="text-xs text-gray-500 mt-1">{message.timestamp}</span>
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-r from-yellow-400 to-pink-400 flex items-center justify-center">
                  <Bot className="w-4 h-4 text-white" />
                </div>
                <div className="bg-gradient-to-r from-yellow-100 to-pink-100 px-4 py-2 rounded-2xl">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Suggestions */}
          <div className="px-4 py-2 border-t border-gray-200">
            <div className="flex flex-wrap gap-2">
              {quickSuggestions.map((suggestion, index) => (
                <button
                  key={index}
                  onClick={() => handleSuggestionClick(suggestion)}
                  className="px-3 py-1 text-xs bg-gradient-to-r from-yellow-200 to-pink-200 text-gray-700 rounded-full hover:from-yellow-300 hover:to-pink-300 transition-all duration-200 transform hover:scale-105"
                >
                  {suggestion}
                </button>
              ))}
            </div>
          </div>

          {/* Input */}
          <div className="p-4 border-t border-gray-200">
            <div className="flex space-x-2">
              <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Chia sẻ với tôi điều gì đó tích cực..."
                className="flex-1 px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-pink-400 focus:border-transparent"
              />
              <button
                onClick={handleSendMessage}
                disabled={!inputText.trim()}
                className="px-6 py-2 bg-gradient-to-r from-pink-400 to-purple-500 text-white rounded-full hover:from-pink-500 hover:to-purple-600 focus:outline-none focus:ring-2 focus:ring-pink-400 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 transform hover:scale-105"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-6">
          <p className="text-gray-600 text-sm">
            💝 Được tạo với yêu thương để mang lại năng lượng tích cực cho bạn
          </p>
        </div>
      </div>
    </div>
  );
};

export default PositiveAIChatbot;
