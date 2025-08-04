import { RunwayML, TaskFailedError } from '@runwayml/sdk';

// 初始化RunwayML客户端
const createRunwayClient = () => {
  const apiKey = import.meta.env.VITE_RUNWAY_API_KEY;
  if (!apiKey) {
    throw new Error('RunwayML API key not found in environment variables');
  }
  return new RunwayML({ apiKey });
};

// AI任务类型
export type AITaskType = 'image-generation' | 'video-generation' | 'style-transfer' | 'nft-minting';

// AI任务状态
export type AITaskStatus = 'pending' | 'processing' | 'completed' | 'failed' | 'cancelled';

// AI任务结果
export interface AITaskResult {
  success: boolean;
  taskId?: string;
  status: AITaskStatus;
  progress: number;
  output?: string | string[];
  error?: string;
  metadata?: any;
}

// 风格定义
export interface AIStyle {
  id: string;
  name: string;
  description: string;
  category: 'modern' | 'classic' | 'artistic' | 'anime';
  popularity: number;
  processingTime: string;
  gradient: string;
  preview: string;
  icon: string;
  prompt: string;
}

// 预设风格
export const AI_STYLES: AIStyle[] = [
  {
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
  {
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
  {
    id: 'anime-studio',
    name: 'Anime Studio',
    description: 'Japanese animation style with vibrant colors',
    category: 'anime',
    popularity: 92,
    processingTime: '2.5s',
    gradient: 'from-pink-400 via-purple-500 to-blue-400',
    preview: 'https://images.pexels.com/photos/1438761/pexels-photo-1438761.jpeg?auto=compress&cs=tinysrgb&w=400',
    icon: '🎭',
    prompt: 'Transform this image into an anime studio style with vibrant colors, smooth animation, and Japanese animation aesthetics'
  },
  {
    id: 'ink-wash',
    name: 'Ink Wash',
    description: 'Traditional Chinese ink painting style',
    category: 'artistic',
    popularity: 88,
    processingTime: '2.3s',
    gradient: 'from-gray-400 via-gray-600 to-black',
    preview: 'https://images.pexels.com/photos/1194420/pexels-photo-1194420.jpeg?auto=compress&cs=tinysrgb&w=400',
    icon: '🖼️',
    prompt: 'Transform this image into a traditional Chinese ink wash painting style with flowing ink effects, monochromatic tones, and artistic brushwork'
  }
];

// 图片生成
export const generateImage = async (params: {
  prompt: string;
  style: string;
  referenceImage?: string;
}): Promise<AITaskResult> => {
  try {
    const client = createRunwayClient();
    
    const task = await client.textToImage.create({
      model: 'gen4_image',
      ratio: '1:1',
      promptText: params.prompt,
      referenceImages: params.referenceImage ? [{
        uri: params.referenceImage,
        tag: 'reference'
      }] : []
    });

    const result = await task.waitForTaskOutput();
    
    return {
      success: true,
      taskId: task.id,
      status: 'completed',
      progress: 100,
      output: result.output[0]
    };
    
  } catch (error) {
    console.error('Image generation error:', error);
    
    if (error instanceof TaskFailedError) {
      return {
        success: false,
        taskId: error.taskId,
        status: 'failed',
        progress: 0,
        error: '图片生成失败'
      };
    }
    
    return {
      success: false,
      status: 'failed',
      progress: 0,
      error: error instanceof Error ? error.message : '未知错误'
    };
  }
};

// 视频生成
export const generateVideo = async (params: {
  originalImage: string;
  style: string;
  prompt?: string;
  duration?: number;
  fps?: number;
}): Promise<AITaskResult> => {
  try {
    const client = createRunwayClient();
    
    const prompt = params.prompt || `Transform this image into a ${params.style} style video with smooth motion and artistic effects`;
    
    const task = await client.imageToVideo.create({
      model: 'gen4_video',
      inputImage: params.originalImage,
      prompt: prompt,
      duration: params.duration || 5,
      fps: params.fps || 24,
      motionStrength: 0.8,
      styleStrength: 0.9,
    });

    const result = await task.waitForTaskOutput();
    
    return {
      success: true,
      taskId: task.id,
      status: 'completed',
      progress: 100,
      output: result.output[0]
    };
    
  } catch (error) {
    console.error('Video generation error:', error);
    
    if (error instanceof TaskFailedError) {
      return {
        success: false,
        taskId: error.taskId,
        status: 'failed',
        progress: 0,
        error: '视频生成失败'
      };
    }
    
    return {
      success: false,
      status: 'failed',
      progress: 0,
      error: error instanceof Error ? error.message : '未知错误'
    };
  }
};

// 风格转换
export const transferStyle = async (params: {
  sourceImage: string;
  styleImage: string;
  strength?: number;
  customPrompt?: string;
}): Promise<AITaskResult> => {
  try {
    const client = createRunwayClient();
    
    // 构建提示词
    let prompt = 'Transform this image with artistic style transfer';
    if (params.customPrompt) {
      prompt = params.customPrompt;
    }
    
    const task = await client.imageToImage.create({
      model: 'gen4_image',
      inputImage: params.sourceImage,
      prompt: prompt,
      referenceImages: [{
        uri: params.styleImage,
        tag: 'style'
      }],
      strength: params.strength || 0.8
    });

    const result = await task.waitForTaskOutput();
    
    return {
      success: true,
      taskId: task.id,
      status: 'completed',
      progress: 100,
      output: result.output[0]
    };
    
  } catch (error) {
    console.error('Style transfer error:', error);
    
    if (error instanceof TaskFailedError) {
      return {
        success: false,
        taskId: error.taskId,
        status: 'failed',
        progress: 0,
        error: '风格转换失败'
      };
    }
    
    return {
      success: false,
      status: 'failed',
      progress: 0,
      error: error instanceof Error ? error.message : '未知错误'
    };
  }
};

// 基于风格的图片生成
export const generateStyleImage = async (params: {
  sourceImage: string;
  style: AIStyle;
  customPrompt?: string;
}): Promise<AITaskResult> => {
  try {
    const client = createRunwayClient();
    
    // 构建提示词
    let prompt = params.style.prompt;
    if (params.customPrompt) {
      prompt = `${params.style.prompt}, ${params.customPrompt}`;
    }
    
    const task = await client.imageToImage.create({
      model: 'gen4_image',
      inputImage: params.sourceImage,
      prompt: prompt,
      strength: 0.8
    });

    const result = await task.waitForTaskOutput();
    
    return {
      success: true,
      taskId: task.id,
      status: 'completed',
      progress: 100,
      output: result.output[0]
    };
    
  } catch (error) {
    console.error('Style generation error:', error);
    
    if (error instanceof TaskFailedError) {
      return {
        success: false,
        taskId: error.taskId,
        status: 'failed',
        progress: 0,
        error: '风格生成失败'
      };
    }
    
    return {
      success: false,
      status: 'failed',
      progress: 0,
      error: error instanceof Error ? error.message : '未知错误'
    };
  }
};

// 获取任务状态
export const getTaskStatus = async (taskId: string): Promise<AITaskResult> => {
  try {
    const client = createRunwayClient();
    const task = await client.getTask(taskId);
    
    return {
      success: task.status === 'completed',
      taskId: task.id,
      status: task.status as AITaskStatus,
      progress: task.progress || 0,
      output: task.status === 'completed' ? task.output[0] : undefined,
      error: task.status === 'failed' ? '任务执行失败' : undefined
    };
    
  } catch (error) {
    return {
      success: false,
      status: 'failed',
      progress: 0,
      error: error instanceof Error ? error.message : '获取任务状态失败'
    };
  }
};

// 取消任务
export const cancelTask = async (taskId: string): Promise<boolean> => {
  try {
    const client = createRunwayClient();
    await client.cancelTask(taskId);
    return true;
  } catch (error) {
    console.error('Cancel task error:', error);
    return false;
  }
};

// 批量处理
export const batchProcess = async (tasks: Array<{
  type: AITaskType;
  params: any;
}>): Promise<AITaskResult[]> => {
  const results: AITaskResult[] = [];
  
  for (const task of tasks) {
    try {
      let result: AITaskResult;
      
      switch (task.type) {
        case 'image-generation':
          result = await generateImage(task.params);
          break;
        case 'video-generation':
          result = await generateVideo(task.params);
          break;
        case 'style-transfer':
          result = await transferStyle(task.params);
          break;
        default:
          result = {
            success: false,
            status: 'failed',
            progress: 0,
            error: '不支持的任务类型'
          };
      }
      
      results.push(result);
    } catch (error) {
      results.push({
        success: false,
        status: 'failed',
        progress: 0,
        error: error instanceof Error ? error.message : '未知错误'
      });
    }
  }
  
  return results;
};

// 获取风格建议
export const getStyleSuggestions = (imageUrl: string): AIStyle[] => {
  // 这里可以根据图片内容分析来推荐风格
  // 目前返回所有可用风格
  return AI_STYLES.sort((a, b) => b.popularity - a.popularity);
};

// 验证API连接
export const testAPIConnection = async (): Promise<boolean> => {
  try {
    const client = createRunwayClient();
    // 尝试获取API状态
    await client.getTask('test');
    return true;
  } catch (error) {
    console.error('API connection test failed:', error);
    return false;
  }
}; 