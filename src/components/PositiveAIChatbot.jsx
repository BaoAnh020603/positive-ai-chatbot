import React, { useState, useRef, useEffect } from 'react';
import { Send, Sun, Moon, Settings, Volume2, VolumeX, Download, Trash2, User, Bot, Heart, Star, Lightbulb, Coffee, Music, Sparkles, Palette, Globe, Camera, Mic, MicOff } from 'lucide-react';

const AIAdvancedChatbot = () => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Xin chào! Tôi là AI Sunshine ☀️ Tôi có thể giúp bạn với nhiều điều tích cực! Hãy thử các tính năng mới của tôi nhé! 🌟",
      isUser: false,
      timestamp: new Date(),
      mood: 'happy'
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [currentMood, setCurrentMood] = useState('happy');
  const [isListening, setIsListening] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [aiPersonality, setAiPersonality] = useState('cheerful');
  const [chatTheme, setChatTheme] = useState('sunshine');
  const messagesEndRef = useRef(null);

  const moods = {
    happy: { icon: '😊', color: 'text-yellow-500', bg: 'bg-yellow-100' },
    excited: { icon: '🤩', color: 'text-pink-500', bg: 'bg-pink-100' },
    calm: { icon: '😌', color: 'text-blue-500', bg: 'bg-blue-100' },
    inspiring: { icon: '✨', color: 'text-purple-500', bg: 'bg-purple-100' },
    energetic: { icon: '⚡', color: 'text-orange-500', bg: 'bg-orange-100' }
  };

  const personalities = {
    cheerful: { name: 'Vui vẻ', emoji: '😄', style: 'Luôn tích cực và nhiệt tình!' },
    wise: { name: 'Khôn ngoan', emoji: '🧠', style: 'Sâu sắc và thấu hiểu' },
    energetic: { name: 'Năng động', emoji: '⚡', style: 'Đầy năng lượng và động lực!' },
    gentle: { name: 'Dịu dàng', emoji: '🤗', style: 'Ấm áp và an ủi' }
  };

  const themes = {
    sunshine: { 
      name: 'Sunshine', 
      primary: 'from-yellow-400 to-orange-400',
      secondary: 'from-yellow-100 to-orange-100',
      accent: 'border-yellow-300'
    },
    ocean: { 
      name: 'Đại dương', 
      primary: 'from-blue-400 to-cyan-400',
      secondary: 'from-blue-100 to-cyan-100',
      accent: 'border-blue-300'
    },
    forest: { 
      name: 'Rừng xanh', 
      primary: 'from-green-400 to-emerald-400',
      secondary: 'from-green-100 to-emerald-100',
      accent: 'border-green-300'
    },
    galaxy: { 
      name: 'Thiên hà', 
      primary: 'from-purple-400 to-pink-400',
      secondary: 'from-purple-100 to-pink-100',
      accent: 'border-purple-300'
    }
  };

  const quickActions = [
    { icon: Heart, text: 'Lời khuyên tình yêu', category: 'love' },
    { icon: Star, text: 'Động lực học tập', category: 'study' },
    { icon: Lightbulb, text: 'Ý tưởng sáng tạo', category: 'creative' },
    { icon: Coffee, text: 'Giao tiếp xã hội', category: 'social' },
    { icon: Music, text: 'Thư giãn & Nghỉ ngơi', category: 'relax' },
    { icon: Sparkles, text: 'Phát triển bản thân', category: 'growth' }
  ];

  const positiveResponses = {
    love: [
      "💖 Tình yêu thật sự bắt đầu từ việc yêu thương bản thân mình! Hãy chăm sóc bản thân trước, sau đó tình yêu sẽ tự nhiên đến với bạn!",
      "🌹 Mối quan hệ tốt đẹp được xây dựng trên sự tôn trọng, hiểu biết và chia sẻ. Hãy luôn lắng nghe và thấu hiểu nhau nhé!",
      "💕 Đừng vội vàng tìm kiếm tình yêu, hãy để tình yêu tìm đến bạn khi bạn đã sẵn sàng và xứng đáng!"
    ],
    study: [
      "📚 Học tập không phải cuộc đua, mà là hành trình khám phá! Mỗi ngày học một chút, bạn sẽ tiến bộ rất nhiều!",
      "🎯 Đặt mục tiêu nhỏ mỗi ngày, ăn mừng những thành tựu nhỏ. Thành công lớn được tạo nên từ những bước nhỏ!",
      "💪 Thất bại chỉ là cơ hội để học hỏi! Mỗi lần vấp ngã, bạn lại trở nên mạnh mẽ và khôn ngoan hơn!"
    ],
    creative: [
      "🎨 Sáng tạo không có giới hạn! Hãy thử kết hợp những ý tưởng khác nhau, đôi khi điều kỳ diệu sẽ xảy ra!",
      "💡 Ý tưởng hay nhất thường đến khi bạn thư giãn. Hãy đi dạo, nghe nhạc, hoặc tắm - não bộ sẽ làm việc cho bạn!",
      "✨ Đừng ngại thất bại khi sáng tạo! Những ý tưởng 'tệ' hôm nay có thể trở thành cảm hứng tuyệt vời ngày mai!"
    ],
    social: [
      "🤝 Giao tiếp tốt bắt đầu từ việc lắng nghe chân thành! Quan tâm đến người khác, họ sẽ quan tâm đến bạn!",
      "😊 Nụ cười là ngôn ngữ chung của mọi người! Một nụ cười thân thiện có thể mở ra nhiều cánh cửa!",
      "💬 Đừng sợ bắt chuyện! Hầu hết mọi người đều thích được quan tâm và chia sẻ câu chuyện của họ!"
    ],
    relax: [
      "🧘‍♀️ Thư giãn không phải lãng phí thời gian, mà là đầu tư cho sự khỏe mạnh! Hãy dành thời gian chăm sóc bản thân!",
      "🌸 Thở sâu, cảm nhận hiện tại. Những khoảnh khắc bình yên nhỏ bé chính là hạnh phúc thật sự!",
      "🎵 Âm nhạc, thiên nhiên, hoặc một tách trà ấm - tìm những điều nhỏ bé mang lại bình an cho tâm hồn bạn!"
    ],
    growth: [
      "🌱 Mỗi ngày là một cơ hội để trở thành phiên bản tốt hơn của chính mình! Tiến bộ từng chút một thôi!",
      "🏆 Đừng so sánh bản thân với người khác, hãy so sánh với chính bạn của ngày hôm qua!",
      "🚀 Vùng thoải mái là nơi an toàn, nhưng phép màu xảy ra khi bạn dám bước ra khỏi đó!"
    ]
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const playSound = () => {
    if (soundEnabled) {
      const audio = new Audio();
      audio.src = 'data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMdBjiPy/PReiwGI3fM8N2QQAkTXrTp66hVFAlGm+DyvmweDzmGw/PXgSwGImPO8N2SQQkTXbLh7Krm';
      audio.volume = 0.3;
      audio.play().catch(() => {});
    }
  };

  const getAIResponse = (input, category = null) => {
    if (category && positiveResponses[category]) {
      const responses = positiveResponses[category];
      return responses[Math.floor(Math.random() * responses.length)];
    }

    const responses = [
      `✨ ${input} là một chủ đề thú vị! Hãy luôn nhìn vào mặt tích cực của mọi việc nhé!`,
      `🌟 Tôi hiểu bạn đang quan tâm đến ${input}. Hãy tin rằng mọi thứ sẽ ổn thôi!`,
      `💫 Câu hỏi của bạn về ${input} rất hay! Mỗi thử thách đều là cơ hội để bạn trưởng thành!`,
      `🌈 ${input} thật sự khiến tôi suy nghĩ! Hãy luôn giữ tinh thần lạc quan nhé!`,
      `☀️ Cảm ơn bạn đã chia sẻ về ${input}! Tôi tin bạn sẽ tìm ra giải pháp tuyệt vời!`
    ];
    
    return responses[Math.floor(Math.random() * responses.length)];
  };

  const handleSend = (text = inputText, category = null) => {
    if (!text.trim() && !category) return;

    const userMessage = {
      id: Date.now(),
      text: text || 'Câu hỏi nhanh',
      isUser: true,
      timestamp: new Date(),
      mood: currentMood
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setIsTyping(true);
    
    playSound();

    setTimeout(() => {
      const aiResponse = {
        id: Date.now() + 1,
        text: getAIResponse(text, category),
        isUser: false,
        timestamp: new Date(),
        mood: currentMood
      };
      
      setMessages(prev => [...prev, aiResponse]);
      setIsTyping(false);
      playSound();
    }, 1500 + Math.random() * 1000);
  };

  const handleQuickAction = (action) => {
    handleSend(action.text, action.category);
  };

  const exportChat = () => {
    const chatData = messages.map(msg => 
      `[${msg.timestamp.toLocaleTimeString()}] ${msg.isUser ? 'Bạn' : 'AI'}: ${msg.text}`
    ).join('\n');
    
    const blob = new Blob([chatData], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `AI-Sunshine-Chat-${new Date().toISOString().split('T')[0]}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const clearChat = () => {
    setMessages([{
      id: 1,
      text: "Chat đã được làm mới! Tôi sẵn sàng trò chuyện với bạn! 🌟",
      isUser: false,
      timestamp: new Date(),
      mood: 'happy'
    }]);
  };

  const toggleVoiceRecognition = () => {
    setIsListening(!isListening);
    // Voice recognition would be implemented here
    if (!isListening) {
      setTimeout(() => {
        setIsListening(false);
        handleSend("Tôi vừa nói gì đó...");
      }, 3000);
    }
  };

  const currentTheme = themes[chatTheme];

  return (
    <div className={`min-h-screen transition-all duration-500 ${isDarkMode ? 'bg-gray-900' : `bg-gradient-to-br ${currentTheme.secondary}`}`}>
      {/* Header */}
      <div className={`bg-gradient-to-r ${currentTheme.primary} shadow-lg`}>
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-white/20 p-2 rounded-full">
                <Sun className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-white">AI Sunshine</h1>
                <p className="text-white/80 text-sm">
                  {personalities[aiPersonality].emoji} {personalities[aiPersonality].style}
                </p>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <button
                onClick={() => setIsDarkMode(!isDarkMode)}
                className="p-2 bg-white/20 rounded-full hover:bg-white/30 transition-colors"
              >
                {isDarkMode ? <Sun className="w-5 h-5 text-white" /> : <Moon className="w-5 h-5 text-white" />}
              </button>
              
              <button
                onClick={() => setSoundEnabled(!soundEnabled)}
                className="p-2 bg-white/20 rounded-full hover:bg-white/30 transition-colors"
              >
                {soundEnabled ? <Volume2 className="w-5 h-5 text-white" /> : <VolumeX className="w-5 h-5 text-white" />}
              </button>
              
              <button
                onClick={() => setShowSettings(!showSettings)}
                className="p-2 bg-white/20 rounded-full hover:bg-white/30 transition-colors"
              >
                <Settings className="w-5 h-5 text-white" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Settings Panel */}
      {showSettings && (
        <div className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} border-b shadow-sm`}>
          <div className="container mx-auto px-4 py-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Personality */}
              <div>
                <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-white' : 'text-gray-700'}`}>
                  Tính cách AI
                </label>
                <select
                  value={aiPersonality}
                  onChange={(e) => setAiPersonality(e.target.value)}
                  className={`w-full p-2 rounded-lg border ${isDarkMode ? 'bg-gray-700 text-white border-gray-600' : 'bg-white border-gray-300'}`}
                >
                  {Object.entries(personalities).map(([key, personality]) => (
                    <option key={key} value={key}>
                      {personality.emoji} {personality.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Theme */}
              <div>
                <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-white' : 'text-gray-700'}`}>
                  Chủ đề màu sắc
                </label>
                <select
                  value={chatTheme}
                  onChange={(e) => setChatTheme(e.target.value)}
                  className={`w-full p-2 rounded-lg border ${isDarkMode ? 'bg-gray-700 text-white border-gray-600' : 'bg-white border-gray-300'}`}
                >
                  {Object.entries(themes).map(([key, theme]) => (
                    <option key={key} value={key}>
                      {theme.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Actions */}
              <div>
                <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-white' : 'text-gray-700'}`}>
                  Thao tác
                </label>
                <div className="flex gap-2">
                  <button
                    onClick={exportChat}
                    className={`flex-1 p-2 rounded-lg border ${isDarkMode ? 'bg-gray-700 text-white border-gray-600 hover:bg-gray-600' : 'bg-white border-gray-300 hover:bg-gray-50'} transition-colors`}
                  >
                    <Download className="w-4 h-4 mx-auto" />
                  </button>
                  <button
                    onClick={clearChat}
                    className={`flex-1 p-2 rounded-lg border ${isDarkMode ? 'bg-gray-700 text-white border-gray-600 hover:bg-gray-600' : 'bg-white border-gray-300 hover:bg-gray-50'} transition-colors`}
                  >
                    <Trash2 className="w-4 h-4 mx-auto" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Quick Actions */}
      <div className={`${isDarkMode ? 'bg-gray-800' : 'bg-white/50'} border-b`}>
        <div className="container mx-auto px-4 py-3">
          <div className="flex gap-2 overflow-x-auto pb-2">
            {quickActions.map((action, index) => (
              <button
                key={index}
                onClick={() => handleQuickAction(action)}
                className={`flex items-center gap-2 px-4 py-2 rounded-full whitespace-nowrap ${isDarkMode ? 'bg-gray-700 text-white hover:bg-gray-600' : `bg-white border ${currentTheme.accent} hover:shadow-md`} transition-all duration-200`}
              >
                <action.icon className="w-4 h-4" />
                <span className="text-sm">{action.text}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Chat Messages */}
      <div className="container mx-auto px-4 py-6 max-w-4xl">
        <div className="space-y-4 min-h-[60vh] max-h-[60vh] overflow-y-auto">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex items-start gap-3 ${message.isUser ? 'flex-row-reverse' : 'flex-row'}`}
            >
              <div className={`p-2 rounded-full ${message.isUser ? 'bg-blue-500' : `bg-gradient-to-r ${currentTheme.primary}`}`}>
                {message.isUser ? (
                  <User className="w-5 h-5 text-white" />
                ) : (
                  <Bot className="w-5 h-5 text-white" />
                )}
              </div>
              
              <div className={`max-w-[70%] ${message.isUser ? 'text-right' : 'text-left'}`}>
                <div
                  className={`p-4 rounded-2xl shadow-sm ${
                    message.isUser
                      ? isDarkMode ? 'bg-blue-600 text-white' : 'bg-blue-500 text-white'
                      : isDarkMode ? 'bg-gray-700 text-white' : 'bg-white border border-gray-200'
                  }`}
                >
                  <p className="text-sm leading-relaxed">{message.text}</p>
                </div>
                <p className={`text-xs mt-1 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                  {message.timestamp.toLocaleTimeString()}
                  {!message.isUser && (
                    <span className="ml-2">{moods[message.mood]?.icon}</span>
                  )}
                </p>
              </div>
            </div>
          ))}
          
          {isTyping && (
            <div className="flex items-start gap-3">
              <div className={`p-2 rounded-full bg-gradient-to-r ${currentTheme.primary}`}>
                <Bot className="w-5 h-5 text-white" />
              </div>
              <div className={`p-4 rounded-2xl shadow-sm ${isDarkMode ? 'bg-gray-700' : 'bg-white border border-gray-200'}`}>
                <div className="flex gap-1">
                  <div className={`w-2 h-2 rounded-full ${isDarkMode ? 'bg-gray-400' : 'bg-gray-400'} animate-bounce`}></div>
                  <div className={`w-2 h-2 rounded-full ${isDarkMode ? 'bg-gray-400' : 'bg-gray-400'} animate-bounce`} style={{ animationDelay: '0.1s' }}></div>
                  <div className={`w-2 h-2 rounded-full ${isDarkMode ? 'bg-gray-400' : 'bg-gray-400'} animate-bounce`} style={{ animationDelay: '0.2s' }}></div>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className={`mt-6 p-4 rounded-2xl shadow-lg ${isDarkMode ? 'bg-gray-800 border border-gray-700' : `bg-white border-2 ${currentTheme.accent}`}`}>
          <div className="flex items-center gap-3">
            <button
              onClick={toggleVoiceRecognition}
              className={`p-3 rounded-full transition-all duration-200 ${
                isListening
                  ? 'bg-red-500 text-white animate-pulse'
                  : isDarkMode ? 'bg-gray-700 text-white hover:bg-gray-600' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {isListening ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
            </button>
            
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Chia sẻ suy nghĩ tích cực của bạn..."
              className={`flex-1 p-3 rounded-xl border-0 focus:outline-none focus:ring-2 focus:ring-yellow-400 ${
                isDarkMode ? 'bg-gray-700 text-white placeholder-gray-400' : 'bg-gray-50 text-gray-800 placeholder-gray-500'
              }`}
              disabled={isListening}
            />
            
            <button
              onClick={() => handleSend()}
              disabled={!inputText.trim() || isListening}
              className={`p-3 rounded-full transition-all duration-200 ${
                inputText.trim() && !isListening
                  ? `bg-gradient-to-r ${currentTheme.primary} text-white hover:shadow-lg transform hover:scale-105`
                  : isDarkMode ? 'bg-gray-700 text-gray-400' : 'bg-gray-200 text-gray-400'
              }`}
            >
              <Send className="w-5 h-5" />
            </button>
          </div>
          
          {isListening && (
            <div className="mt-3 text-center">
              <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                🎤 Đang lắng nghe... Hãy nói điểu gì đó tích cực!
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Footer */}
      <footer className={`mt-12 bg-white/80 backdrop-blur-sm border-t-2 ${currentTheme.accent} ${isDarkMode ? 'bg-gray-800/80 border-gray-700' : ''}`}>
        <div className="container mx-auto px-4 py-6 text-center">
          <div className="flex flex-col items-center gap-2">
            <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              © 2025 Bản quyền thuộc về <strong className="text-yellow-600">Nguyễn Nhật Bảo Anh</strong>
            </p>
            <p className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
              Mang lại năng lượng tích cực cho mọi người 🌟
            </p>
            <p className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
              Made with ❤️ and ☀️
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default AIAdvancedChatbot;
