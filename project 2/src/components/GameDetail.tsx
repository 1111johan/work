import React, { useState } from 'react';
import { ArrowLeft, MapPin, Clock, Users, Star, MessageCircle, Heart, Share } from 'lucide-react';
import { Game } from '../types';

interface GameDetailProps {
  game: Game | null;
  onBack: () => void;
}

const GameDetail: React.FC<GameDetailProps> = ({ game, onBack }) => {
  const [isJoined, setIsJoined] = useState(false);
  const [showChat, setShowChat] = useState(false);

  const handleJoin = () => {
    setIsJoined(!isJoined);
  };

  const players = [
    { id: 1, name: '飞盘小王子', level: '进阶', avatar: '👨‍💼', rating: 4.8, joined: '组织者' },
    { id: 2, name: '运动达人', level: '业余', avatar: '👩‍🎓', rating: 4.6, joined: '2天前' },
    { id: 3, name: '新手小白', level: '新手', avatar: '👶', rating: 4.2, joined: '1天前' },
    { id: 4, name: '技术流', level: '专业', avatar: '🎯', rating: 4.9, joined: '3小时前' },
    { id: 5, name: '活跃小美', level: '业余', avatar: '👩‍🦰', rating: 4.7, joined: '1小时前' },
  ];

  const chatMessages = [
    { id: 1, user: '飞盘小王子', message: '大家好！欢迎参加今天的比赛🎉', time: '10:30' },
    { id: 2, user: '运动达人', message: '好期待！请问需要自带飞盘吗？', time: '10:45' },
    { id: 3, user: '飞盘小王子', message: '不用带，我们会准备专业飞盘', time: '10:46' },
    { id: 4, user: '新手小白', message: '我是新手，会有人教吗？', time: '11:20' },
    { id: 5, user: '技术流', message: '放心，我们都很友善的！😊', time: '11:22' },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <div className="apple-nav flex items-center justify-between p-6">
        <button onClick={onBack} className="p-3 rounded-2xl hover:bg-gray-100 transition-colors">
          <ArrowLeft size={24} className="text-gray-600" />
        </button>
        <h1 className="apple-subtitle text-gray-900">比赛详情</h1>
        <div className="flex space-x-2">
          <button className="p-3 rounded-2xl hover:bg-gray-100 transition-colors">
            <Heart size={20} className="text-gray-600" />
          </button>
          <button className="p-3 rounded-2xl hover:bg-gray-100 transition-colors">
            <Share size={20} className="text-gray-600" />
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto pb-24">
        {/* Game Hero */}
        <div className="apple-gradient-primary p-6 text-white">
          <h1 className="apple-title mb-3">{game?.title || '朝阳公园飞盘友谊赛'}</h1>
          <div className="flex items-center space-x-6 text-blue-100">
            <div className="flex items-center">
              <Star size={16} className="mr-1 fill-current" />
              <span className="apple-body">4.8</span>
            </div>
            <div className="flex items-center">
              <Users size={16} className="mr-1" />
              <span className="apple-body">12/16人</span>
            </div>
          </div>
        </div>

        {/* Game Info */}
        <div className="apple-card m-6 p-6">
          <div className="space-y-4">
            <div className="flex items-start space-x-4">
              <MapPin size={20} className="text-blue-500 mt-0.5" />
              <div>
                <div className="apple-body font-medium text-gray-900">朝阳公园南门</div>
                <div className="apple-caption text-gray-600">距离您 1.2km</div>
              </div>
            </div>
            
            <div className="flex items-start space-x-4">
              <Clock size={20} className="text-blue-500 mt-0.5" />
              <div>
                <div className="apple-body font-medium text-gray-900">今天 15:00 - 17:00</div>
                <div className="apple-caption text-gray-600">还有2小时开始</div>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between mt-6 pt-4 border-t border-gray-100">
            <div className="flex space-x-2">
              <span className="px-3 py-1 bg-blue-100 text-blue-700 apple-caption rounded-full font-medium">业余</span>
              <span className="px-3 py-1 bg-green-100 text-green-700 apple-caption rounded-full font-medium">混合局</span>
              <span className="px-3 py-1 bg-yellow-100 text-yellow-700 apple-caption rounded-full font-medium">友好</span>
            </div>
            <span className="apple-subtitle text-blue-500 font-semibold">免费</span>
          </div>
        </div>

        {/* Organizer */}
        <div className="apple-card m-6 p-6">
          <h3 className="apple-subtitle text-gray-900 mb-4">组织者</h3>
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-2xl">👨‍💼</div>
            <div className="flex-1">
              <div className="apple-body font-medium text-gray-900">飞盘小王子</div>
              <div className="apple-caption text-gray-600">组织过23场比赛 • 4.9⭐</div>
            </div>
            <button className="px-4 py-2 bg-blue-100 text-blue-700 rounded-2xl apple-caption font-medium hover:bg-blue-200 transition-colors">
              关注
            </button>
          </div>
        </div>

        {/* Players */}
        <div className="apple-card m-6 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="apple-subtitle text-gray-900">参与玩家 (12/16)</h3>
            <button
              onClick={() => setShowChat(true)}
              className="flex items-center space-x-1 px-3 py-1 bg-blue-100 text-blue-700 rounded-full apple-caption hover:bg-blue-200 transition-colors"
            >
              <MessageCircle size={14} />
              <span>聊天室</span>
            </button>
          </div>
          
          <div className="space-y-3">
            {players.map((player) => (
              <div key={player.id} className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center text-lg">
                  {player.avatar}
                </div>
                <div className="flex-1">
                  <div className="flex items-center space-x-2">
                    <span className="apple-body font-medium text-gray-900">{player.name}</span>
                    {player.joined === '组织者' && (
                      <span className="px-2 py-0.5 bg-blue-100 text-blue-700 apple-caption rounded-full">组织者</span>
                    )}
                  </div>
                  <div className="apple-caption text-gray-600">{player.level} • {player.rating}⭐</div>
                </div>
                <div className="apple-caption text-gray-500">{player.joined}</div>
              </div>
            ))}
          </div>
          
          <div className="mt-4 p-4 bg-gray-50 rounded-2xl text-center">
            <div className="apple-body text-gray-600">还有4个位置</div>
            <div className="apple-caption text-gray-500 mt-1">快邀请朋友一起参加吧</div>
          </div>
        </div>

        {/* Game Rules */}
        <div className="apple-card m-6 p-6">
          <h3 className="apple-subtitle text-gray-900 mb-4">比赛说明</h3>
          <div className="apple-body text-gray-600 space-y-2">
            <p>• 友谊赛性质，重在参与和交流</p>
            <p>• 适合业余水平，新手也欢迎参加</p>
            <p>• 比赛后可选择聚餐交流</p>
            <p>• 请提前10分钟到场热身</p>
            <p>• 雨天将延期，群内通知</p>
          </div>
        </div>
      </div>

      {/* Bottom Actions */}
      <div className="fixed bottom-0 left-1/2 transform -translate-x-1/2 w-full max-w-md apple-nav p-6">
        <button
          onClick={handleJoin}
          className={`w-full py-4 rounded-2xl font-semibold transition-all ${
            isJoined
              ? 'bg-gray-200 text-gray-700'
              : 'apple-button'
          }`}
        >
          {isJoined ? '已报名 - 点击取消' : '立即报名'}
        </button>
      </div>

      {/* Chat Modal */}
      {showChat && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-end justify-center z-50">
          <div className="apple-bottom-sheet w-full max-w-md h-2/3 flex flex-col">
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h3 className="apple-subtitle text-gray-900">比赛聊天室</h3>
              <button
                onClick={() => setShowChat(false)}
                className="p-3 rounded-2xl hover:bg-gray-100 transition-colors"
              >
                ✕
              </button>
            </div>
            
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {chatMessages.map((msg) => (
                <div key={msg.id} className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <span className="apple-body font-medium text-gray-900">{msg.user}</span>
                    <span className="apple-caption text-gray-500">{msg.time}</span>
                  </div>
                  <div className="bg-gray-100 rounded-2xl p-4 apple-body">{msg.message}</div>
                </div>
              ))}
            </div>
            
            <div className="p-6 border-t border-gray-200">
              <div className="flex space-x-3">
                <input
                  type="text"
                  placeholder="输入消息..."
                  className="flex-1 apple-input"
                />
                <button className="px-6 py-3 apple-button">
                  发送
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default GameDetail;