import React, { useState } from 'react';
import { generateVideo, stylePrompts } from '../services/runwayService';

export const RunwayMLTest: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<string>('');
  const [error, setError] = useState<string>('');

  const testAPI = async () => {
    setIsLoading(true);
    setError('');
    setResult('');

    try {
      // 使用测试图片
      const testImage = 'https://images.pexels.com/photos/2599244/pexels-photo-2599244.jpeg?auto=compress&cs=tinysrgb&w=400';
      
      const response = await generateVideo({
        originalImage: testImage,
        style: 'cyberpunk-neon',
        prompt: stylePrompts['cyberpunk-neon'],
        duration: 3,
        fps: 24
      });

      if (response.success) {
        setResult(`✅ API连接成功！\n任务ID: ${response.taskId}\n视频URL: ${response.videoUrl}`);
      } else {
        setError(`❌ API调用失败: ${response.error}`);
      }
    } catch (err) {
      setError(`❌ 连接错误: ${err instanceof Error ? err.message : '未知错误'}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-6 bg-white/10 rounded-xl border border-white/20">
      <h3 className="text-xl font-bold text-white mb-4">RunwayML API 测试</h3>
      
      <button
        onClick={testAPI}
        disabled={isLoading}
        className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50"
      >
        {isLoading ? '测试中...' : '测试API连接'}
      </button>

      {result && (
        <div className="mt-4 p-4 bg-green-500/20 border border-green-500/30 rounded-lg">
          <pre className="text-green-400 text-sm whitespace-pre-wrap">{result}</pre>
        </div>
      )}

      {error && (
        <div className="mt-4 p-4 bg-red-500/20 border border-red-500/30 rounded-lg">
          <pre className="text-red-400 text-sm whitespace-pre-wrap">{error}</pre>
        </div>
      )}
    </div>
  );
}; 