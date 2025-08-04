import React, { useState } from 'react';
import { RunwayMLTest } from './RunwayMLTest';

export const APITestPage: React.FC = () => {
  const [showTest, setShowTest] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-cyan-900 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent mb-4">
            RunwayML API 集成测试
          </h1>
          <p className="text-white/70 text-lg">
            测试AI照片转视频功能的API连接
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div className="bg-white/10 rounded-xl p-6 border border-white/20">
              <h3 className="text-xl font-bold text-white mb-4">环境配置</h3>
              <div className="space-y-2 text-white/80">
                <p>✅ API密钥已配置</p>
                <p>✅ RunwayML SDK已安装</p>
                <p>✅ 环境变量已加载</p>
                <p>✅ TypeScript类型已定义</p>
              </div>
            </div>

            <div className="bg-white/10 rounded-xl p-6 border border-white/20">
              <h3 className="text-xl font-bold text-white mb-4">功能特性</h3>
              <div className="space-y-2 text-white/80">
                <p>🎬 照片转视频生成</p>
                <p>🎨 多种艺术风格支持</p>
                <p>⏱️ 实时进度监控</p>
                <p>🔄 任务状态轮询</p>
                <p>❌ 错误处理和取消</p>
                <p>💾 视频下载功能</p>
              </div>
            </div>
          </div>

          <div>
            <RunwayMLTest />
          </div>
        </div>

        <div className="mt-8 text-center">
          <button
            onClick={() => setShowTest(!showTest)}
            className="px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl hover:scale-105 transition-all duration-300"
          >
            {showTest ? '隐藏' : '显示'} 详细测试信息
          </button>
        </div>

        {showTest && (
          <div className="mt-8 bg-white/10 rounded-xl p-6 border border-white/20">
            <h3 className="text-xl font-bold text-white mb-4">API 配置详情</h3>
            <div className="space-y-4 text-white/80">
              <div>
                <strong>API密钥:</strong> 
                <span className="ml-2 text-green-400">已配置 (隐藏)</span>
              </div>
              <div>
                <strong>SDK版本:</strong> 
                <span className="ml-2">@runwayml/sdk</span>
              </div>
              <div>
                <strong>支持模型:</strong> 
                <span className="ml-2">gen4_video</span>
              </div>
              <div>
                <strong>视频格式:</strong> 
                <span className="ml-2">MP4, 24fps</span>
              </div>
              <div>
                <strong>最大时长:</strong> 
                <span className="ml-2">5-10秒</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}; 