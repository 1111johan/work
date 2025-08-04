import React, { useState } from 'react';
import { Zap, Phone, MessageCircle, Apple } from 'lucide-react';

interface LoginScreenProps {
  onLogin: () => void;
}

const LoginScreen: React.FC<LoginScreenProps> = ({ onLogin }) => {
  const [phone, setPhone] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async () => {
    setIsLoading(true);
    // Simulate login process
    setTimeout(() => {
      setIsLoading(false);
      onLogin();
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex flex-col">
      {/* Header */}
      <div className="flex-1 flex flex-col justify-center items-center text-center px-8 pt-20">
        <div className="apple-bounce mb-8">
          <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-purple-600 rounded-3xl flex items-center justify-center shadow-2xl">
            <Zap size={48} className="text-white" />
          </div>
        </div>
        
        <h1 className="apple-title text-gray-900 mb-4">飞盘匹配</h1>
        <p className="apple-subtitle text-gray-700 mb-2">FrisbeeMatch</p>
        <p className="apple-body text-gray-600 max-w-sm leading-relaxed">
          智能匹配队友，发现附近比赛
          <br />
          让每一次投掷都充满惊喜
        </p>
      </div>

      {/* Login Form */}
      <div className="apple-bottom-sheet px-8 py-10">
        <h2 className="apple-subtitle text-center text-gray-900 mb-8">开始你的飞盘之旅</h2>
        
        {/* Apple ID Login */}
        <button 
          onClick={handleLogin}
          disabled={isLoading}
          className="w-full apple-button mb-4 flex items-center justify-center space-x-3"
        >
          <Apple size={24} />
          <span>{isLoading ? '登录中...' : '使用 Apple ID 登录'}</span>
        </button>

        {/* WeChat Login */}
        <button 
          onClick={handleLogin}
          disabled={isLoading}
          className="w-full bg-green-500 text-white py-4 rounded-2xl font-medium mb-4 flex items-center justify-center space-x-3 hover:bg-green-600 transition-all transform hover:scale-[1.02] disabled:opacity-50 disabled:transform-none shadow-lg"
        >
          <MessageCircle size={24} />
          <span>{isLoading ? '登录中...' : '微信快速登录'}</span>
        </button>

        <div className="flex items-center my-8">
          <div className="flex-1 border-t border-gray-200"></div>
          <span className="px-4 apple-caption text-gray-500">或</span>
          <div className="flex-1 border-t border-gray-200"></div>
        </div>

        {/* Phone Login */}
        <div className="space-y-4">
          <div>
            <label className="block apple-body font-medium text-gray-700 mb-3">手机号</label>
            <div className="relative">
              <Phone size={20} className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="请输入手机号"
                className="apple-input w-full pl-12 pr-4"
              />
            </div>
          </div>
          
          <button 
            onClick={handleLogin}
            disabled={!phone || isLoading}
            className="w-full apple-button-secondary disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? '登录中...' : '获取验证码'}
          </button>
        </div>

        <p className="apple-caption text-center mt-8 leading-relaxed">
          登录即表示同意
          <span className="text-blue-500 font-medium">《用户协议》</span>
          和
          <span className="text-blue-500 font-medium">《隐私政策》</span>
        </p>
      </div>
    </div>
  );
};

export default LoginScreen;