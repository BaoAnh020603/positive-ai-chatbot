import React, { useState, useRef, useEffect } from 'react';
import { Settings, Mic, Volume2, VolumeX, Sun, Moon, Download, Trash2, Send, MessageCircle, Heart, Star, Lightbulb, Coffee, Music, Sparkles, Globe, BarChart, Gamepad2, Calendar } from 'lucide-react';

const AIPositiveChatbot = () => {
  const [messages, setMessages] = useState([
    { type: 'bot', content: '🌟 Xin chào! Tôi là AI Sunshine - trợ lý tích cực của bạn! Hãy chia sẻ điều gì đó để tôi có thể giúp bạn! ☀️', timestamp: new Date() }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [personality, setPersonality] = useState('happy');
  const [theme, setTheme] = useState('sunshine');
  const [darkMode, setDarkMode] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [language, setLanguage] = useState('vi');
  const [isListening, setIsListening] = useState(false);
  const messagesEndRef = useRef(null);
  const [chatStats, setChatStats] = useState({ messages: 0, positiveCount: 0, mood: 'neutral' });

  const personalities = {
    happy: { name: '😄 Vui vẻ', emoji: '😄', style: 'năng động và hài hước' },
    wise: { name: '🧠 Khôn ngoan', emoji: '🧠', style: 'sâu sắc và thông thái' },
    energetic: { name: '⚡ Năng động', emoji: '⚡', style: 'nhiệt huyết và động lực' },
    gentle: { name: '🤗 Dịu dàng', emoji: '🤗', style: 'nhẹ nhàng và ấm áp' }
  };

  const themes = {
    sunshine: {
      name: '☀️ Sunshine',
      gradient: 'from-yellow-400 via-orange-400 to-red-400',
      bg: 'from-yellow-50 to-orange-50',
      accent: 'bg-yellow-400'
    },
    ocean: {
      name: '🌊 Đại dương',
      gradient: 'from-blue-400 via-cyan-400 to-teal-400',
      bg: 'from-blue-50 to-cyan-50',
      accent: 'bg-blue-400'
    },
    forest: {
      name: '🌲 Rừng xanh',
      gradient: 'from-green-400 via-emerald-400 to-teal-400',
      bg: 'from-green-50 to-emerald-50',
      accent: 'bg-green-400'
    },
    galaxy: {
      name: '🌌 Thiên hà',
      gradient: 'from-purple-400 via-pink-400 to-indigo-400',
      bg: 'from-purple-50 to-pink-50',
      accent: 'bg-purple-400'
    }
  };

  const quickQuestions = [
    { key: 'love', label: '❤️ Tình yêu', question: 'Hãy cho tôi lời khuyên về tình yêu và mối quan hệ!' },
    { key: 'study', label: '⭐ Học tập', question: 'Tôi cần động lực để học tập hiệu quả hơn!' },
    { key: 'creative', label: '💡 Sáng tạo', question: 'Hãy truyền cảm hứng sáng tạo cho tôi!' },
    { key: 'social', label: '☕ Giao tiếp', question: 'Làm sao để cải thiện kỹ năng giao tiếp?' },
    { key: 'relax', label: '🎵 Thư giãn', question: 'Tôi cần thư giãn và giảm stress!' },
    { key: 'growth', label: '✨ Phát triển', question: 'Hướng dẫn tôi phát triển bản thân!' }
  ];

  const languages = {
    vi: { name: '🇻🇳 Tiếng Việt', flag: '🇻🇳' },
    en: { name: '🇺🇸 English', flag: '🇺🇸' },
    zh: { name: '🇨🇳 中文', flag: '🇨🇳' },
    ja: { name: '🇯🇵 日本語', flag: '🇯🇵' }
  };

  const getAIResponse = (userMessage, selectedPersonality) => {
    const responses = {
      happy: {
        greetings: ['🎉 Tuyệt vời! ', '😄 Thật tích cực! ', '🌟 Tôi thích điều này! ', '✨ Tuyệt! '],
        advice: {
          love: '💕 Tình yêu thật tuyệt vời! Hãy luôn thành thật, lắng nghe và tôn trọng nhau. Tình yêu đích thực bắt đầu từ việc yêu thương bản thân mình! 😊',
          study: '📚 Học tập là hành trình thú vị! Chia nhỏ mục tiêu, tạo thói quen tích cực, và đừng quên thưởng cho bản thân khi hoàn thành! Bạn có thể làm được! 🌟',
          creative: '🎨 Sáng tạo như nguồn suối! Hãy thử những điều mới, không sợ thất bại, và luôn giữ tâm trí mở. Ý tưởng hay nhất thường đến khi bạn thư giãn! ✨',
          social: '🤝 Giao tiếp tốt = Lắng nghe tốt! Hãy quan tâm thật sự đến người khác, đặt câu hỏi, và chia sẻ chân thành. Nụ cười là ngôn ngữ chung của mọi người! 😊',
          relax: '🧘‍♀️ Thư giãn là nghệ thuật! Thở sâu, nghe nhạc, đi dạo, hoặc làm điều bạn yêu thích. Hãy cho phép bản thân nghỉ ngơi - bạn xứng đáng! 💆‍♀️',
          growth: '🌱 Phát triển từng ngày! Đặt mục tiêu rõ ràng, học hỏi liên tục, và đón nhận thử thách. Mỗi khó khăn là cơ hội để bạn mạnh mẽ hơn! 💪'
        }
      },
      wise: {
        greetings: ['🧠 Thú vị... ', '💭 Suy nghĩ sâu sắc. ', '📖 Điều này đáng suy ngẫm. ', '🎓 Hiểu biết tăng thêm! '],
        advice: {
          love: '💝 Tình yêu chân thật không chỉ là cảm xúc mà là sự lựa chọn hàng ngày. Hãy học cách yêu thương không điều kiện nhưng vẫn giữ ranh giới lành mạnh.',
          study: '📚 Tri thức là kho báu vô giá. Học không chỉ để biết mà để hiểu, không chỉ để nhớ mà để ứng dụng. Hãy học từ mọi trải nghiệm trong cuộc sống.',
          creative: '🎭 Sáng tạo là kết nối những điều tưởng chừng không liên quan. Hãy đọc nhiều, trải nghiệm đa dạng, và cho phép tâm trí lang thang tự do.',
          social: '🗣️ Giao tiếp hiệu quả bắt đầu từ việc hiểu bản thân. Khi bạn biết mình là ai, bạn sẽ kết nối chân thật với người khác.',
          relax: '☯️ Thư giãn không phải là không làm gì, mà là làm điều đúng với tâm trạng bình an. Hãy tìm sự cân bằng trong mọi việc.',
          growth: '🌳 Phát triển bản thân như trồng cây - cần thời gian, kiên nhẫn và chăm sóc đều đặn. Hãy tập trung vào quá trình hơn là kết quả.'
        }
      }
    };

    const currentPersonality = responses[selectedPersonality] || responses.happy;
    const greeting = currentPersonality.greetings[Math.floor(Math.random() * currentPersonality.greetings.length)];
    
    // Detect topic
    let topic = 'general';
    if (userMessage.includes('tình yêu') || userMessage.includes('yêu') || userMessage.includes('mối quan hệ')) topic = 'love';
    else if (userMessage.includes('học') || userMessage.includes('thi') || userMessage.includes('bài tập')) topic = 'study';
    else if (userMessage.includes('sáng tạo') || userMessage.includes('ý tưởng') || userMessage.includes('nghệ thuật')) topic = 'creative';
    else if (userMessage.includes('giao tiếp') || userMessage.includes('nói chuyện') || userMessage.includes('bạn bè')) topic = 'social';
    else if (userMessage.includes('stress') || userMessage.includes('mệt') || userMessage.includes('thư giãn')) topic = 'relax';
    else if (userMessage.includes('phát triển') || userMessage.includes('cải thiện') || userMessage.includes('mục tiêu')) topic = 'growth';

    if (currentPersonality.advice[topic]) {
      return greeting + currentPersonality.advice[topic];
    }

    return greeting + 'Cảm ơn bạn đã chia sẻ! Tôi tin rằng mọi thứ đều sẽ ổn thôi. Hãy luôn giữ tinh thần tích cực và tin vào bản thân nhé! 🌟';
  };

  const playSound = () => {
    if (soundEnabled) {
      const audioContext = new (window.AudioContext || window.webkitAudioContext)();
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();
      
      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);
      
      oscillator.frequency.setValueAtTime(800, audioContext.currentTime);
      gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + 0.3);
      
      oscillator.start();
      oscillator.stop(audioContext.currentTime + 0.3);
    }
  };

  const sendMessage = async (messageText) => {
    if (!messageText.trim()) return;

    const userMessage = { type: 'user', content: messageText, timestamp: new Date() };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    playSound();

    // Update stats
    setChatStats(prev => ({
      ...prev,
      messages: prev.messages + 1,
      positiveCount: prev.positiveCount + (messageText.includes('tích cực') || messageText.includes('tuyệt') || messageText.includes('hay') ? 1 : 0)
    }));

    setTimeout(() => {
      const botResponse = getAIResponse(messageText, personality);
      setMessages(prev => [...prev, { type: 'bot', content: botResponse, timestamp: new Date() }]);
      setIsLoading(false);
      playSound();
    }, 1000 + Math.random() * 1000);
  };

  const startVoiceRecognition = () => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      const recognition = new SpeechRecognition();
      
      recognition.lang = language === 'vi' ? 'vi-VN' : language === 'en' ? 'en-US' : language === 'zh' ? 'zh-CN' : 'ja-JP';
      recognition.onstart = () => setIsListening(true);
      recognition.onend = () => setIsListening(false);
      recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        setInput(transcript);
      };
      
      recognition.start();
    } else {
      alert('Trình duyệt của bạn không hỗ trợ nhận diện giọng nói!');
    }
  };

  const exportChat = () => {
    const chatContent = messages.map(msg => 
      `[${msg.timestamp.toLocaleString()}] ${msg.type === 'user' ? 'Bạn' : 'AI'}: ${msg.content}`
    ).join('\n\n');
    
    const blob = new Blob([chatContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `AI-Sunshine-Chat-${new Date().toISOString().split('T')[0]}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const clearChat = () => {
    setMessages([
      { type: 'bot', content: '🌟 Chat đã được làm mới! Hãy bắt đầu cuộc trò chuyện mới nhé! ☀️', timestamp: new Date() }
    ]);
    setChatStats({ messages: 0, positiveCount: 0, mood: 'neutral' });
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const currentTheme = themes[theme];

  return (
    <div className={`min-h-screen bg-gradient-to-br ${darkMode ? 'from-gray-900 to-gray-800' : currentTheme.bg} transition-all duration-500`}>
      {/* Header */}
      <div className={`bg-white/20 backdrop-blur-lg border-b border-white/30 sticky top-0 z-10`}>
        <div className="max-w-4xl mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className={`w-12 h-12 bg-gradient-to-r ${currentTheme.gradient} rounded-full flex items-center justify-center`}>
                <Sun className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                  AI Sunshine Chatbot
                </h1>
                <p className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                  {personalities[personality].emoji} {personalities[personality].name} • {languages[language].flag} {languages[language].name}
                </p>
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setSoundEnabled(!soundEnabled)}
                className={`p-2 rounded-lg ${darkMode ? 'bg-gray-700 text-white' : 'bg-white/50 text-gray-700'} hover:bg-opacity-80 transition-all`}
              >
                {soundEnabled ? <Volume2 className="w-5 h-5" /> : <VolumeX className="w-5 h-5" />}
              </button>
              
              <button
                onClick={() => setDarkMode(!darkMode)}
                className={`p-2 rounded-lg ${darkMode ? 'bg-gray-700 text-white' : 'bg-white/50 text-gray-700'} hover:bg-opacity-80 transition-all`}
              >
                {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </button>
              
              <button
                onClick={() => setShowSettings(!showSettings)}
                className={`p-2 rounded-lg ${darkMode ? 'bg-gray-700 text-white' : 'bg-white/50 text-gray-700'} hover:bg-opacity-80 transition-all`}
              >
                <Settings className="w-5 h-5" />
              </button>
            </div>
          </div>
          
          {/* Quick Questions */}
          <div className="mt-4 flex flex-wrap gap-2">
            {quickQuestions.map(q => (
              <button
                key={q.key}
                onClick={() => sendMessage(q.question)}
                className={`px-3 py-1 text-sm rounded-full ${darkMode ? 'bg-gray-700 text-white' : 'bg-white/30 text-gray-700'} hover:bg-opacity-80 transition-all`}
              >
                {q.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Settings Panel */}
      {showSettings && (
        <div className={`${darkMode ? 'bg-gray-800' : 'bg-white/90'} backdrop-blur-lg border-b border-white/30 p-4`}>
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* Personality */}
              <div>
                <label className={`block text-sm font-medium ${darkMode ? 'text-white' : 'text-gray-700'} mb-2`}>
                  Tính cách AI
                </label>
                <select
                  value={personality}
                  onChange={(e) => setPersonality(e.target.value)}
                  className={`w-full p-2 rounded-lg ${darkMode ? 'bg-gray-700 text-white' : 'bg-white'} border border-gray-300`}
                >
                  {Object.entries(personalities).map(([key, p]) => (
                    <option key={key} value={key}>{p.name}</option>
                  ))}
                </select>
              </div>

              {/* Theme */}
              <div>
                <label className={`block text-sm font-medium ${darkMode ? 'text-white' : 'text-gray-700'} mb-2`}>
                  Chủ đề màu sắc
                </label>
                <select
                  value={theme}
                  onChange={(e) => setTheme(e.target.value)}
                  className={`w-full p-2 rounded-lg ${darkMode ? 'bg-gray-700 text-white' : 'bg-white'} border border-gray-300`}
                >
                  {Object.entries(themes).map(([key, t]) => (
                    <option key={key} value={key}>{t.name}</option>
                  ))}
                </select>
              </div>

              {/* Language */}
              <div>
                <label className={`block text-sm font-medium ${darkMode ? 'text-white' : 'text-gray-700'} mb-2`}>
                  Ngôn ngữ
                </label>
                <select
                  value={language}
                  onChange={(e) => setLanguage(e.target.value)}
                  className={`w-full p-2 rounded-lg ${darkMode ? 'bg-gray-700 text-white' : 'bg-white'} border border-gray-300`}
                >
                  {Object.entries(languages).map(([key, l]) => (
                    <option key={key} value={key}>{l.name}</option>
                  ))}
                </select>
              </div>

              {/* Actions */}
              <div>
                <label className={`block text-sm font-medium ${darkMode ? 'text-white' : 'text-gray-700'} mb-2`}>
                  Hành động
                </label>
                <div className="flex space-x-2">
                  <button
                    onClick={exportChat}
                    className={`flex-1 p-2 rounded-lg ${darkMode ? 'bg-green-600 text-white' : 'bg-green-500 text-white'} hover:bg-opacity-80 transition-all`}
                  >
                    <Download className="w-4 h-4 mx-auto" />
                  </button>
                  <button
                    onClick={clearChat}
                    className={`flex-1 p-2 rounded-lg ${darkMode ? 'bg-red-600 text-white' : 'bg-red-500 text-white'} hover:bg-opacity-80 transition-all`}
                  >
                    <Trash2 className="w-4 h-4 mx-auto" />
                  </button>
                </div>
              </div>
            </div>

            {/* Stats */}
            <div className="mt-4 grid grid-cols-3 gap-4">
              <div className={`p-3 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-white/50'}`}>
                <div className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                  {chatStats.messages}
                </div>
                <div className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                  Tin nhắn
                </div>
              </div>
              <div className={`p-3 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-white/50'}`}>
                <div className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                  {chatStats.positiveCount}
                </div>
                <div className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                  Tích cực
                </div>
              </div>
              <div className={`p-3 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-white/50'}`}>
                <div className={`text-2xl ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                  😊
                </div>
                <div className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                  Tâm trạng
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Chat Area */}
      <div className="max-w-4xl mx-auto px-4 py-6">
        <div className="space-y-4 mb-24">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-xs md:max-w-md lg:max-w-lg px-4 py-3 rounded-2xl ${
                  message.type === 'user'
                    ? `bg-gradient-to-r ${currentTheme.gradient} text-white`
                    : darkMode
                    ? 'bg-gray-700 text-white'
                    : 'bg-white/70 backdrop-blur-sm text-gray-800'
                } shadow-lg`}
              >
                <p className="whitespace-pre-wrap">{message.content}</p>
                <p className={`text-xs mt-2 opacity-70`}>
                  {message.timestamp.toLocaleTimeString()}
                </p>
              </div>
            </div>
          ))}
          
          {isLoading && (
            <div className="flex justify-start">
              <div className={`px-4 py-3 rounded-2xl ${darkMode ? 'bg-gray-700' : 'bg-white/70 backdrop-blur-sm'} shadow-lg`}>
                <div className="flex space-x-1">
                  <div className={`w-2 h-2 ${currentTheme.accent} rounded-full animate-bounce`}></div>
                  <div className={`w-2 h-2 ${currentTheme.accent} rounded-full animate-bounce`} style={{animationDelay: '0.1s'}}></div>
                  <div className={`w-2 h-2 ${currentTheme.accent} rounded-full animate-bounce`} style={{animationDelay: '0.2s'}}></div>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Input Area */}
      <div className="fixed bottom-0 left-0 right-0 bg-white/20 backdrop-blur-lg border-t border-white/30 p-4">
        <div className="max-w-4xl mx-auto flex space-x-3">
          <button
            onClick={startVoiceRecognition}
            disabled={isListening}
            className={`p-3 rounded-full ${
              isListening 
                ? `bg-red-500 text-white animate-pulse` 
                : darkMode 
                ? 'bg-gray-700 text-white hover:bg-gray-600' 
                : 'bg-white/50 text-gray-700 hover:bg-white/70'
            } transition-all shadow-lg`}
          >
            <Mic className="w-5 h-5" />
          </button>
          
          <div className="flex-1 relative">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && sendMessage(input)}
              placeholder="Chia sẻ điều gì đó tích cực..."
              className={`w-full px-4 py-3 rounded-full ${
                darkMode ? 'bg-gray-700 text-white placeholder-gray-400' : 'bg-white/70 text-gray-800 placeholder-gray-500'
              } backdrop-blur-sm shadow-lg border border-white/30 focus:outline-none focus:ring-2 focus:ring-white/50`}
            />
          </div>
          
          <button
            onClick={() => sendMessage(input)}
            disabled={!input.trim() || isLoading}
            className={`p-3 rounded-full bg-gradient-to-r ${currentTheme.gradient} text-white hover:shadow-lg transition-all shadow-lg disabled:opacity-50 disabled:cursor-not-allowed`}
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Footer */}
      <footer className={`mt-8 py-6 border-t border-white/30 ${darkMode ? 'bg-gray-900/50' : 'bg-white/20'} backdrop-blur-sm`}>
        <div className="max-w-4xl mx-auto px-4 text-center">
          <p className={`${darkMode ? 'text-white' : 'text-gray-800'} font-semibold`}>
            © 2025 Bản quyền thuộc về <strong>Nguyễn Nhật Bảo Anh</strong>
          </p>
          <p className={`${darkMode ? 'text-gray-300' : 'text-gray-600'} mt-2`}>
            Mang lại năng lượng tích cực cho mọi người 🌟
          </p>
          <p className={`${darkMode ? 'text-gray-400' : 'text-gray-500'} text-sm mt-2`}>
            Made with ❤️ and ☀️
          </p>
        </div>
      </footer>
    </div>
  );
};

export default AIPositiveChatbot;
