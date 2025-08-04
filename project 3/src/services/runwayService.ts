import { RunwayML, TaskFailedError } from '@runwayml/sdk';

// 初始化RunwayML客户端
const createRunwayClient = () => {
  const apiKey = import.meta.env.VITE_RUNWAY_API_KEY;
  if (!apiKey) {
    throw new Error('RunwayML API key not found in environment variables');
  }
  return new RunwayML({ apiKey });
};

// 视频生成接口
export interface VideoGenerationParams {
  originalImage: string;
  style: string;
  prompt?: string;
  duration?: number; // 视频时长（秒）
  fps?: number; // 帧率
}

// 视频生成结果接口
export interface VideoGenerationResult {
  success: boolean;
  videoUrl?: string;
  error?: string;
  taskId?: string;
  progress?: number;
}

// 生成视频
export const generateVideo = async (params: VideoGenerationParams): Promise<VideoGenerationResult> => {
  try {
    const client = createRunwayClient();
    
    // 构建提示词
    const prompt = params.prompt || `Transform this image into a ${params.style} style video with smooth motion and artistic effects`;
    
    // 创建视频生成任务
    const task = await client.imageToVideo.create({
      model: 'gen4_video', // 使用视频生成模型
      inputImage: params.originalImage,
      prompt: prompt,
      duration: params.duration || 5, // 默认5秒
      fps: params.fps || 24, // 默认24fps
      motionStrength: 0.8, // 运动强度
      styleStrength: 0.9, // 风格强度
    });

    // 等待任务完成
    const result = await task.waitForTaskOutput();
    
    return {
      success: true,
      videoUrl: result.output[0], // 返回生成的视频URL
      taskId: task.id,
      progress: 100
    };
    
  } catch (error) {
    console.error('Video generation error:', error);
    
    if (error instanceof TaskFailedError) {
      return {
        success: false,
        error: '视频生成失败',
        taskId: error.taskId,
        progress: 0
      };
    }
    
    return {
      success: false,
      error: error instanceof Error ? error.message : '未知错误',
      progress: 0
    };
  }
};

// 获取任务状态
export const getTaskStatus = async (taskId: string): Promise<VideoGenerationResult> => {
  try {
    const client = createRunwayClient();
    const task = await client.getTask(taskId);
    
    return {
      success: task.status === 'completed',
      videoUrl: task.status === 'completed' ? task.output[0] : undefined,
      taskId: task.id,
      progress: task.progress || 0,
      error: task.status === 'failed' ? '任务执行失败' : undefined
    };
    
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : '获取任务状态失败',
      progress: 0
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

// 预设风格映射
export const stylePrompts = {
  'cyberpunk-neon': 'Transform this image into a cyberpunk neon-lit video with electric blue and purple lighting, futuristic city atmosphere, and glowing neon effects',
  'monet-impressionist': 'Transform this image into an impressionist painting style video with soft brushstrokes, natural lighting, and Monet-inspired color palette',
  'anime-studio': 'Transform this image into an anime studio style video with vibrant colors, smooth animation, and Japanese animation aesthetics',
  'ink-wash': 'Transform this image into a traditional Chinese ink wash painting video with flowing ink effects, monochromatic tones, and artistic brushwork'
}; 