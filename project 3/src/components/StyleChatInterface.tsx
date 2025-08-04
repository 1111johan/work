import React, { useState, useRef, useEffect } from 'react';
import { Send, Mic, Brain, X } from 'lucide-react';
import { EnhancedStyle } from './EnhancedStyleSelector';

interface StyleChatInterfaceProps {
  originalImage: string;
  onStyleSelect: (style: EnhancedStyle, customPrompt?: string) => void;
  onBack: () => void;
}

interface ChatMessage {
  id: string;
  type: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

const styleKeywords = {
  'cyberpunk': 'cyberpunk-neon',
  'neon': 'cyberpunk-neon',
  '赛博朋克': 'cyberpunk-neon',
  'monet': 'monet-impressionist',
  'impressionist': 'monet-impressionist',
  '莫奈': 'monet-impressionist',
  '印象派': 'monet-impressionist',
  'anime': 'anime-studio',
  '动漫': 'anime-studio',
  'ink': 'ink-wash',
  '水墨': 'ink-wash',
  'van gogh': 'van-gogh',
  'starry': 'van-gogh',
  '梵高': 'van-gogh',
  'glitch': 'digital-glitch',
  '故障': 'digital-glitch',
  'renaissance': 'renaissance',
  '文艺复兴': 'renaissance',
  'watercolor': 'watercolor-dream',
  '水彩': 'watercolor-dream',
  'pop art': 'pop-art-warhol',
  'warhol': 'pop-art-warhol',
  '波普': 'pop-art-warhol',
  'ukiyo': 'ukiyo-e',
  '浮世绘': 'ukiyo-e'
};

const enhancedStyles: EnhancedStyle[] = [
  {
    id: 'cyberpunk-neon',
    name: 'Neon Genesis',
    description: 'Cyberpunk aesthetics with electric neon vibes',
    icon: <div>🌆</div>,
    gradient: 'from-cyan-400 via-purple-600 to-pink-500',
    preview: 'https://images.pexels.com/photos/2599244/pexels-photo-2599244.jpeg?auto=compress&cs=tinysrgb&w=400',
    category: 'modern',
    popularity: 95,
    processingTime: '2.1s'
  },
  {
    id: 'monet-impressionist',
    name: 'Monet Dreams',
    description: 'Impressionist brushstrokes with ethereal lighting',
    icon: <div>🎨</div>,
    gradient: 'from-blue-400 via-purple-500 to-pink-400',
    preview: 'https://images.pexels.com/photos/1070945/pexels-photo-1070945.jpeg?auto=compress&cs=tinysrgb&w=400',
    category: 'classic',
    popularity: 98,
    processingTime: '1.8s'
  },
  {
    id: 'anime-studio',
    name: 'Studio Ghibli',
    description: 'Magical anime aesthetic with soft colors',
    icon: <div>🎭</div>,
    gradient: 'from-green-400 via-blue-500 to-purple-500',
    preview: 'https://images.pexels.com/photos/1438761/pexels-photo-1438761.jpeg?auto=compress&cs=tinysrgb&w=400',
    category: 'fantasy',
    popularity: 94,
    processingTime: '2.0s'
  },
  {
    id: 'ink-wash',
    name: 'Zen Ink Wash',
    description: 'Chinese shuǐmòhuà with fluid brushwork',
    icon: <div>🖼️</div>,
    gradient: 'from-gray-600 via-gray-800 to-black',
    preview: 'https://images.pexels.com/photos/1194420/pexels-photo-1194420.jpeg?auto=compress&cs=tinysrgb&w=400',
    category: 'classic',
    popularity: 76,
    processingTime: '1.9s'
  },
  {
    id: 'van-gogh',
    name: 'Starry Nights',
    description: 'Van Gogh\'s swirling brushstroke technique',
    icon: <div>⭐</div>,
    gradient: 'from-yellow-400 via-blue-600 to-purple-700',
    preview: 'https://images.pexels.com/photos/1070945/pexels-photo-1070945.jpeg?auto=compress&cs=tinysrgb&w=400',
    category: 'classic',
    popularity: 92,
    processingTime: '2.2s'
  },
  {
    id: 'digital-glitch',
    name: 'Glitch Art',
    description: 'Digital corruption with RGB split effects',
    icon: <div>⚡</div>,
    gradient: 'from-red-500 via-green-500 to-blue-500',
    preview: 'https://images.pexels.com/photos/2599244/pexels-photo-2599244.jpeg?auto=compress&cs=tinysrgb&w=400',
    category: 'modern',
    popularity: 87,
    processingTime: '1.7s'
  },
  {
    id: 'renaissance',
    name: 'Renaissance',
    description: 'Classical Renaissance painting technique',
    icon: <div>👑</div>,
    gradient: 'from-amber-600 via-red-700 to-purple-800',
    preview: 'https://images.pexels.com/photos/1070945/pexels-photo-1070945.jpeg?auto=compress&cs=tinysrgb&w=400',
    category: 'premium',
    popularity: 83,
    processingTime: '2.5s'
  },
  {
    id: 'watercolor-dream',
    name: 'Watercolor Dreams',
    description: 'Flowing watercolor with soft gradients',
    icon: <div>🎨</div>,
    gradient: 'from-teal-300 via-blue-400 to-purple-500',
    preview: 'https://images.pexels.com/photos/1194420/pexels-photo-1194420.jpeg?auto=compress&cs=tinysrgb&w=400',
    category: 'classic',
    popularity: 88,
    processingTime: '1.9s'
  },
  {
    id: 'pop-art-warhol',
    name: 'Pop Art Vibes',
    description: 'Andy Warhol inspired bold colors',
    icon: <div>📷</div>,
    gradient: 'from-pink-500 via-red-500 to-yellow-500',
    preview: 'https://images.pexels.com/photos/1194420/pexels-photo-1194420.jpeg?auto=compress&cs=tinysrgb&w=400',
    category: 'modern',
    popularity: 90,
    processingTime: '1.6s'
  },
  {
    id: 'ukiyo-e',
    name: 'Ukiyo-e Master',
    description: 'Traditional Japanese woodblock art style',
    icon: <div>🌊</div>,
    gradient: 'from-red-500 via-orange-500 to-yellow-500',
    preview: 'https://images.pexels.com/photos/1438761/pexels-photo-1438761.jpeg?auto=compress&cs=tinysrgb&w=400',
    category: 'classic',
    popularity: 89,
    processingTime: '2.3s'
  }
];

export const StyleChatInterface: React.FC<StyleChatInterfaceProps> = ({
  originalImage,
  onStyleSelect,
  onBack
}) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      type: 'assistant',
      content: '你好！我是你的AI艺术助手。请告诉我你想要什么样的艺术风格，比如：赛博朋克、莫奈印象派、动漫风格、水墨画等。',
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [selectedStyle, setSelectedStyle] = useState<EnhancedStyle | null>(null);
  const [customPrompt, setCustomPrompt] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const generateResponse = (userInput: string): string => {
    const input = userInput.toLowerCase();
    
    for (const [keyword, styleId] of Object.entries(styleKeywords)) {
      if (input.includes(keyword)) {
        const style = enhancedStyles.find(s => s.id === styleId);
        if (style) {
          setSelectedStyle(style);
          return `我为你选择了 ${style.name} 风格！这个风格的特点是：${style.description}`;
        }
      }
    }

    if (input.includes('温暖') || input.includes('warm')) {
      return '我推荐 "Monet Dreams" 印象派风格，它使用温暖的色调和柔和的笔触。';
    }
    
    if (input.includes('动漫') || input.includes('anime')) {
      return '我推荐 "Studio Ghibli" 动漫风格，它使用柔和的色彩和梦幻的视觉效果。';
    }

    if (input.includes('现代') || input.includes('modern')) {
      return '我推荐 "Neon Genesis" 赛博朋克风格或 "Glitch Art" 故障艺术风格，它们都很现代和未来感。';
    }

    if (input.includes('传统') || input.includes('traditional')) {
      return '我推荐 "Renaissance" 文艺复兴风格或 "Ukiyo-e Master" 浮世绘风格，它们都是传统艺术风格。';
    }

    if (input.includes('梦幻') || input.includes('dreamy')) {
      return '我推荐 "Watercolor Dreams" 水彩风格，它使用流动的色彩和梦幻的氛围。';
    }

    return '我理解你的需求！请尝试说一些关键词：赛博朋克、莫奈风格、动漫效果、水墨画、梵高、故障艺术、文艺复兴、水彩、波普艺术、浮世绘等。';
  };

  const handleSendMessage = async (content: string) => {
    if (!content.trim()) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      type: 'user',
      content: content.trim(),
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');

    setTimeout(() => {
      const response = generateResponse(content);
      const assistantMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        type: 'assistant',
        content: response,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, assistantMessage]);
    }, 1000);
  };

  const handleVoiceInput = () => {
    if (!('webkitSpeechRecognition' in window)) {
      alert('语音识别在此浏览器中不受支持');
      return;
    }

    const recognition = new (window as any).webkitSpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.lang = 'zh-CN';

    recognition.onstart = () => {
      setIsListening(true);
    };

    recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript;
      setInputValue(transcript);
      setIsListening(false);
    };

    recognition.onerror = () => {
      setIsListening(false);
    };

    recognition.start();
  };

  const handleGenerate = () => {
    if (selectedStyle) {
      onStyleSelect(selectedStyle, customPrompt);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-cyan-900 flex flex-col">
      <div className="bg-white/5 backdrop-blur-sm border-b border-white/10 p-4">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <button
              onClick={onBack}
              className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
            >
              <X className="w-5 h-5 text-white" />
            </button>
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-r from-cyan-400 to-purple-500 flex items-center justify-center">
                <Brain className="w-5 h-5 text-white" />
              </div>
              <div>
                <h2 className="text-white font-semibold">AI艺术助手</h2>
                <p className="text-white/60 text-sm">对话式风格选择</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex-1 max-w-4xl mx-auto w-full p-4">
        <div className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 h-full flex flex-col">
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] rounded-2xl p-4 ${
                    message.type === 'user'
                      ? 'bg-gradient-to-r from-cyan-500 to-purple-500 text-white'
                      : 'bg-white/10 text-white border border-white/20'
                  }`}
                >
                  <p className="whitespace-pre-wrap">{message.content}</p>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {selectedStyle && (
            <div className="p-4 border-t border-white/10 bg-white/5">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <img
                    src={originalImage}
                    alt="Original"
                    className="w-16 h-16 rounded-lg object-cover"
                  />
                  <div className="flex items-center space-x-2">
                    <span className="text-white/60">→</span>
                    <div className={`w-16 h-16 rounded-lg bg-gradient-to-r ${selectedStyle.gradient} flex items-center justify-center`}>
                      {selectedStyle.icon}
                    </div>
                  </div>
                  <div>
                    <h4 className="text-white font-semibold">{selectedStyle.name}</h4>
                    <p className="text-white/60 text-sm">{selectedStyle.processingTime}</p>
                  </div>
                </div>
                
                <button
                  onClick={handleGenerate}
                  className="px-6 py-3 bg-gradient-to-r from-cyan-500 to-purple-500 text-white rounded-xl font-semibold hover:scale-105 transition-transform"
                >
                  开始生成
                </button>
              </div>
              
              <div className="mt-4">
                <textarea
                  value={customPrompt}
                  onChange={(e) => setCustomPrompt(e.target.value)}
                  placeholder="添加自定义描述（可选）..."
                  className="w-full bg-white/10 border border-white/20 rounded-lg p-3 text-white placeholder-white/50 resize-none"
                  rows={2}
                />
              </div>
            </div>
          )}

          <div className="p-4 border-t border-white/10">
            <div className="flex items-center space-x-3">
              <div className="flex-1 relative">
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage(inputValue)}
                  placeholder="描述你想要的风格效果..."
                  className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-white/50 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 transition-all"
                />
              </div>
              
              <button
                onClick={handleVoiceInput}
                className={`p-3 rounded-xl transition-all ${
                  isListening
                    ? 'bg-red-500/20 border-2 border-red-400 animate-pulse'
                    : 'bg-white/10 hover:bg-white/20 border border-white/20'
                }`}
              >
                <Mic className={`w-5 h-5 ${isListening ? 'text-red-400' : 'text-white'}`} />
              </button>
              
              <button
                onClick={() => handleSendMessage(inputValue)}
                disabled={!inputValue.trim()}
                className="p-3 bg-gradient-to-r from-cyan-500 to-purple-500 text-white rounded-xl hover:scale-105 transition-transform disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Send className="w-5 h-5" />
              </button>
            </div>
            
            <div className="mt-2 text-xs text-white/40">
              💡 提示：你可以说"赛博朋克"、"莫奈风格"、"动漫效果"等关键词
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
