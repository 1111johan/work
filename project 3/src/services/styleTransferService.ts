import { generateStyleImage, AIStyle } from './aiService';

export interface StyleTransferRequest {
  sourceImage: string;
  styleId: string;
  customPrompt?: string;
  strength?: number;
}

export interface StyleTransferResult {
  success: boolean;
  processedImage?: string;
  error?: string;
  processingTime?: number;
}

// 扩展的风格定义
export const STYLE_DEFINITIONS: Record<string, AIStyle> = {
  'cyberpunk-neon': {
    id: 'cyberpunk-neon',
    name: 'Neon Genesis',
    description: 'Cyberpunk aesthetics with electric neon vibes',
    category: 'modern',
    popularity: 95,
    processingTime: '2.1s',
    gradient: 'from-cyan-400 via-purple-600 to-pink-500',
    preview: 'https://images.pexels.com/photos/2599244/pexels-photo-2599244.jpeg?auto=compress&cs=tinysrgb&w=400',
    icon: '🌆',
    prompt: 'Transform this image into a cyberpunk neon-lit style with electric blue and purple lighting, futuristic city atmosphere, and glowing neon effects'
  },
  'monet-impressionist': {
    id: 'monet-impressionist',
    name: 'Monet Dreams',
    description: 'Impressionist brushstrokes with ethereal lighting',
    category: 'classic',
    popularity: 98,
    processingTime: '1.8s',
    gradient: 'from-blue-400 via-purple-500 to-pink-400',
    preview: 'https://images.pexels.com/photos/1070945/pexels-photo-1070945.jpeg?auto=compress&cs=tinysrgb&w=400',
    icon: '🎨',
    prompt: 'Transform this image into an impressionist painting style with soft brushstrokes, natural lighting, and Monet-inspired color palette'
  },
  'anime-studio': {
    id: 'anime-studio',
    name: 'Studio Ghibli',
    description: 'Magical anime aesthetic with soft colors',
    category: 'fantasy',
    popularity: 94,
    processingTime: '2.0s',
    gradient: 'from-green-400 via-blue-500 to-purple-500',
    preview: 'https://images.pexels.com/photos/1438761/pexels-photo-1438761.jpeg?auto=compress&cs=tinysrgb&w=400',
    icon: '🎭',
    prompt: 'Transform this image into an anime studio style with vibrant colors, smooth animation, and Japanese animation aesthetics'
  },
  'ink-wash': {
    id: 'ink-wash',
    name: 'Zen Ink Wash',
    description: 'Chinese shuǐmòhuà with fluid brushwork',
    category: 'classic',
    popularity: 76,
    processingTime: '1.9s',
    gradient: 'from-gray-600 via-gray-800 to-black',
    preview: 'https://images.pexels.com/photos/1194420/pexels-photo-1194420.jpeg?auto=compress&cs=tinysrgb&w=400',
    icon: '🖼️',
    prompt: 'Transform this image into a traditional Chinese ink wash painting style with flowing ink effects, monochromatic tones, and artistic brushwork'
  },
  'van-gogh': {
    id: 'van-gogh',
    name: 'Starry Nights',
    description: 'Van Gogh\'s swirling brushstroke technique',
    category: 'classic',
    popularity: 92,
    processingTime: '2.2s',
    gradient: 'from-yellow-400 via-blue-600 to-purple-700',
    preview: 'https://images.pexels.com/photos/1070945/pexels-photo-1070945.jpeg?auto=compress&cs=tinysrgb&w=400',
    icon: '⭐',
    prompt: 'Transform this image into Van Gogh\'s post-impressionist style with swirling brushstrokes, bold colors, and expressive texture'
  },
  'digital-glitch': {
    id: 'digital-glitch',
    name: 'Glitch Art',
    description: 'Digital corruption with RGB split effects',
    category: 'modern',
    popularity: 87,
    processingTime: '1.7s',
    gradient: 'from-red-500 via-green-500 to-blue-500',
    preview: 'https://images.pexels.com/photos/2599244/pexels-photo-2599244.jpeg?auto=compress&cs=tinysrgb&w=400',
    icon: '⚡',
    prompt: 'Transform this image into a digital glitch art style with RGB split effects, digital corruption, and cyberpunk aesthetics'
  },
  'renaissance': {
    id: 'renaissance',
    name: 'Renaissance',
    description: 'Classical Renaissance painting technique',
    category: 'premium',
    popularity: 83,
    processingTime: '2.5s',
    gradient: 'from-amber-600 via-red-700 to-purple-800',
    preview: 'https://images.pexels.com/photos/1070945/pexels-photo-1070945.jpeg?auto=compress&cs=tinysrgb&w=400',
    icon: '👑',
    prompt: 'Transform this image into a Renaissance painting style with classical techniques, rich colors, and dramatic lighting'
  },
  'watercolor-dream': {
    id: 'watercolor-dream',
    name: 'Watercolor Dreams',
    description: 'Flowing watercolor with soft gradients',
    category: 'classic',
    popularity: 88,
    processingTime: '1.9s',
    gradient: 'from-teal-300 via-blue-400 to-purple-500',
    preview: 'https://images.pexels.com/photos/1194420/pexels-photo-1194420.jpeg?auto=compress&cs=tinysrgb&w=400',
    icon: '🎨',
    prompt: 'Transform this image into a watercolor painting style with flowing colors, soft gradients, and dreamy atmosphere'
  },
  'pop-art-warhol': {
    id: 'pop-art-warhol',
    name: 'Pop Art Vibes',
    description: 'Andy Warhol inspired bold colors',
    category: 'modern',
    popularity: 90,
    processingTime: '1.6s',
    gradient: 'from-pink-500 via-red-500 to-yellow-500',
    preview: 'https://images.pexels.com/photos/1194420/pexels-photo-1194420.jpeg?auto=compress&cs=tinysrgb&w=400',
    icon: '📷',
    prompt: 'Transform this image into a pop art style inspired by Andy Warhol with bold colors, high contrast, and graphic elements'
  },
  'ukiyo-e': {
    id: 'ukiyo-e',
    name: 'Ukiyo-e Master',
    description: 'Traditional Japanese woodblock art style',
    category: 'classic',
    popularity: 89,
    processingTime: '2.3s',
    gradient: 'from-red-500 via-orange-500 to-yellow-500',
    preview: 'https://images.pexels.com/photos/1438761/pexels-photo-1438761.jpeg?auto=compress&cs=tinysrgb&w=400',
    icon: '🌊',
    prompt: 'Transform this image into a traditional Japanese ukiyo-e woodblock print style with flat colors, bold outlines, and traditional motifs'
  }
};

// 风格迁移主函数
export const performStyleTransfer = async (request: StyleTransferRequest): Promise<StyleTransferResult> => {
  const startTime = Date.now();
  
  try {
    const style = STYLE_DEFINITIONS[request.styleId];
    if (!style) {
      return {
        success: false,
        error: `未知的风格ID: ${request.styleId}`
      };
    }

    // 构建自定义提示词
    let finalPrompt = style.prompt;
    if (request.customPrompt) {
      finalPrompt = `${style.prompt}, ${request.customPrompt}`;
    }

    // 调用AI服务
    const result = await generateStyleImage({
      sourceImage: request.sourceImage,
      style: {
        ...style,
        prompt: finalPrompt
      },
      customPrompt: request.customPrompt
    });

    const processingTime = Date.now() - startTime;

    if (result.success && result.output) {
      return {
        success: true,
        processedImage: result.output as string,
        processingTime
      };
    } else {
      return {
        success: false,
        error: result.error || '风格迁移失败',
        processingTime
      };
    }

  } catch (error) {
    const processingTime = Date.now() - startTime;
    console.error('Style transfer error:', error);
    
    return {
      success: false,
      error: error instanceof Error ? error.message : '未知错误',
      processingTime
    };
  }
};

// 获取所有可用风格
export const getAvailableStyles = (): AIStyle[] => {
  return Object.values(STYLE_DEFINITIONS).sort((a, b) => b.popularity - a.popularity);
};

// 根据关键词推荐风格
export const recommendStylesByKeywords = (keywords: string): AIStyle[] => {
  const input = keywords.toLowerCase();
  const recommendations: AIStyle[] = [];

  // 关键词匹配规则
  const keywordRules = [
    {
      keywords: ['cyberpunk', 'neon', '赛博朋克', '未来', '科技'],
      styleId: 'cyberpunk-neon'
    },
    {
      keywords: ['monet', 'impressionist', '莫奈', '印象派', '柔和'],
      styleId: 'monet-impressionist'
    },
    {
      keywords: ['anime', '动漫', '卡通', '日本'],
      styleId: 'anime-studio'
    },
    {
      keywords: ['ink', 'wash', '水墨', '传统', '中国'],
      styleId: 'ink-wash'
    },
    {
      keywords: ['van gogh', 'starry', '梵高', '星空'],
      styleId: 'van-gogh'
    },
    {
      keywords: ['glitch', '故障', '数字', '现代'],
      styleId: 'digital-glitch'
    },
    {
      keywords: ['renaissance', '文艺复兴', '古典'],
      styleId: 'renaissance'
    },
    {
      keywords: ['watercolor', '水彩', '柔和', '梦幻'],
      styleId: 'watercolor-dream'
    },
    {
      keywords: ['pop art', 'warhol', '波普', '鲜艳'],
      styleId: 'pop-art-warhol'
    },
    {
      keywords: ['ukiyo', '浮世绘', '日本传统'],
      styleId: 'ukiyo-e'
    }
  ];

  for (const rule of keywordRules) {
    if (rule.keywords.some(keyword => input.includes(keyword))) {
      const style = STYLE_DEFINITIONS[rule.styleId];
      if (style && !recommendations.find(r => r.id === style.id)) {
        recommendations.push(style);
      }
    }
  }

  return recommendations;
};

// 验证风格ID是否有效
export const isValidStyleId = (styleId: string): boolean => {
  return styleId in STYLE_DEFINITIONS;
};

// 获取风格详情
export const getStyleDetails = (styleId: string): AIStyle | null => {
  return STYLE_DEFINITIONS[styleId] || null;
}; 