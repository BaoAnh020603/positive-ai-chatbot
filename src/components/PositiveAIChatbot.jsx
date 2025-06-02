import React, { useState, useRef, useEffect } from 'react';
import { Send, Sparkles, Heart, Sun, Star, Share2 } from 'lucide-react';

const PositiveAIChatbot = () => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Xin chào! Tôi là AI Sunshine - người bạn tích cực của bạn! 🌟 Hãy chia sẻ với tôi những gì bạn đang nghĩ, tôi sẽ luôn cố gắng mang đến những lời khuyên và năng lượng tích cực nhất cho bạn. Bạn cần tôi hỗ trợ gì hôm nay?",
      sender: 'ai',
      timestamp: new Date().toLocaleTimeString('vi-VN')
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const positiveResponses = {
    greetings: [
      "Chào bạn! Tôi rất vui được gặp bạn hôm nay! 🌈 Hãy chia sẻ với tôi cảm giác của bạn nhé!",
      "Xin chào! Hy vọng bạn đang có một ngày tuyệt vời! ✨ Tôi ở đây để lắng nghe bạn.",
      "Hello! Tôi cảm nhận được năng lượng tích cực từ bạn! 🌟 Có gì tôi có thể giúp không?"
    ],
    encouragement: [
      "Tôi hiểu bạn đang gặp khó khăn, nhưng hãy nhớ rằng bạn mạnh mẽ hơn bạn nghĩ! 💪 Mỗi thử thách đều là cơ hội để bạn phát triển và trở nên kiên cường hơn.",
      "Mọi cảm xúc đều có giá trị, kể cả buồn bã. 🤗 Hãy cho phép bản thân cảm nhận, rồi từ từ tìm những điều nhỏ bé mang lại niềm vui cho bạn.",
      "Cuộc sống có lúc khó khăn, nhưng tin tôi đi - sau cơn mưa sẽ có cầu vồng! 🌈 Bạn đã vượt qua được nhiều thứ rồi, lần này
