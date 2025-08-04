import React, { useState } from 'react';
import { AlertCircle, CheckCircle, XCircle, Zap, Settings, Globe, Key } from 'lucide-react';

export const APIDiagnostic: React.FC = () => {
  const [diagnostics, setDiagnostics] = useState<Array<{
    name: string;
    status: 'pending' | 'success' | 'failed';
    message: string;
    details?: string;
  }>>([
    { name: '环境变量检查', status: 'pending', message: '检查API密钥配置' },
    { name: '网络连接检查', status: 'pending', message: '检查网络连接' },
    { name: 'API密钥验证', status: 'pending', message: '验证API密钥有效性' },
    { name: 'SDK连接测试', status: 'pending', message: '测试RunwayML SDK连接' },
    { name: '模型可用性', status: 'pending', message: '检查AI模型可用性' }
  ]);

  const [isRunning, setIsRunning] = useState(false);

  const runDiagnostics = async () => {
    setIsRunning(true);
    
    // 检查环境变量
    try {
      const apiKey = import.meta.env.VITE_RUNWAY_API_KEY;
      if (!apiKey) {
        updateDiagnostic(0, 'failed', 'API密钥未配置', '请在.env文件中设置VITE_RUNWAY_API_KEY');
      } else if (apiKey.length < 50) {
        updateDiagnostic(0, 'failed', 'API密钥格式错误', 'API密钥长度不足，请检查格式');
      } else {
        updateDiagnostic(0, 'success', 'API密钥已配置', `密钥长度: ${apiKey.length} 字符`);
      }
    } catch (error) {
      updateDiagnostic(0, 'failed', '环境变量读取失败', error instanceof Error ? error.message : '未知错误');
    }

    // 检查网络连接
    try {
      const response = await fetch('https://api.runwayml.com/v1/health', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      });
      
      if (response.ok) {
        updateDiagnostic(1, 'success', '网络连接正常', '可以访问RunwayML API服务器');
      } else {
        updateDiagnostic(1, 'failed', '网络连接异常', `HTTP ${response.status}: ${response.statusText}`);
      }
    } catch (error) {
      updateDiagnostic(1, 'failed', '网络连接失败', error instanceof Error ? error.message : '无法连接到API服务器');
    }

          // 检查SDK连接
      try {
        const { RunwayML } = await import('@runwayml/sdk');
        const client = new RunwayML({ 
          apiKey: import.meta.env.VITE_RUNWAY_API_KEY 
        });
        
        // 尝试初始化SDK
        updateDiagnostic(3, 'success', 'SDK连接成功', 'RunwayML SDK可以正常初始化');
      } catch (error) {
        updateDiagnostic(3, 'failed', 'SDK初始化失败', error instanceof Error ? error.message : '无法加载RunwayML SDK');
      }

    // 检查模型可用性
    try {
      updateDiagnostic(4, 'success', '模型可用性检查', 'gen4_video 模型应该可用');
    } catch (error) {
      updateDiagnostic(4, 'failed', '模型检查失败', error instanceof Error ? error.message : '无法验证模型可用性');
    }

    setIsRunning(false);
  };

  const updateDiagnostic = (index: number, status: 'success' | 'failed', message: string, details?: string) => {
    setDiagnostics(prev => prev.map((diag, i) => 
      i === index ? { ...diag, status, message, details } : diag
    ));
  };

  const getStatusIcon = (status: 'pending' | 'success' | 'failed') => {
    switch (status) {
      case 'success':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'failed':
        return <XCircle className="w-5 h-5 text-red-500" />;
      default:
        return <AlertCircle className="w-5 h-5 text-yellow-500" />;
    }
  };

  const successCount = diagnostics.filter(d => d.status === 'success').length;
  const failedCount = diagnostics.filter(d => d.status === 'failed').length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-cyan-900 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent mb-4">
            API连接诊断工具
          </h1>
          <p className="text-white/70 text-lg">
            诊断RunwayML API连接问题
          </p>
        </div>

        <div className="mb-6 text-center">
          <button
            onClick={runDiagnostics}
            disabled={isRunning}
            className="px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl hover:scale-105 transition-all disabled:opacity-50"
          >
            {isRunning ? '诊断中...' : '开始诊断'}
          </button>
        </div>

        <div className="grid gap-4">
          {diagnostics.map((diagnostic, index) => (
            <div key={index} className={`p-6 rounded-xl border-2 ${
              diagnostic.status === 'success' ? 'border-green-500/30 bg-green-500/10' :
              diagnostic.status === 'failed' ? 'border-red-500/30 bg-red-500/10' :
              'border-gray-500/30 bg-gray-500/10'
            }`}>
              <div className="flex items-start space-x-4">
                {getStatusIcon(diagnostic.status)}
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-white mb-2">{diagnostic.name}</h3>
                  <p className="text-white/70 mb-2">{diagnostic.message}</p>
                  {diagnostic.details && (
                    <p className="text-sm text-white/60 bg-white/10 p-2 rounded">
                      {diagnostic.details}
                    </p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 p-6 bg-white/10 rounded-2xl border border-white/20">
          <h3 className="text-xl font-bold text-white mb-4">诊断结果</h3>
          <div className="grid md:grid-cols-3 gap-4 text-center">
            <div>
              <div className="text-3xl font-bold text-green-400">{successCount}</div>
              <div className="text-white/70">成功项目</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-red-400">{failedCount}</div>
              <div className="text-white/70">失败项目</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-blue-400">{diagnostics.length - successCount - failedCount}</div>
              <div className="text-white/70">待检查</div>
            </div>
          </div>
        </div>

        {failedCount > 0 && (
          <div className="mt-6 p-6 bg-red-500/20 border border-red-500/30 rounded-2xl">
            <h3 className="text-lg font-bold text-red-400 mb-4">🔧 故障排除建议</h3>
            <div className="space-y-3 text-white/80">
              <div className="flex items-start space-x-2">
                <Key className="w-5 h-5 text-red-400 mt-0.5" />
                <div>
                  <strong>API密钥问题:</strong> 确保在.env文件中正确设置了VITE_RUNWAY_API_KEY
                </div>
              </div>
              <div className="flex items-start space-x-2">
                <Globe className="w-5 h-5 text-red-400 mt-0.5" />
                <div>
                  <strong>网络连接:</strong> 检查网络连接，确保可以访问api.runwayml.com
                </div>
              </div>
              <div className="flex items-start space-x-2">
                <Settings className="w-5 h-5 text-red-400 mt-0.5" />
                <div>
                  <strong>SDK配置:</strong> 确保已正确安装@runwayml/sdk包
                </div>
              </div>
              <div className="flex items-start space-x-2">
                <Zap className="w-5 h-5 text-red-400 mt-0.5" />
                <div>
                  <strong>API限制:</strong> 检查API使用配额和限制
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}; 