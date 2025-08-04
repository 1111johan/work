import React, { useState } from 'react';
import { ArrowLeft, Settings, Users, Star, Edit3, Calendar } from 'lucide-react';

interface UserProfileProps {
  onBack: () => void;
}

const UserProfile: React.FC<UserProfileProps> = ({ onBack }) => {
  const [activeTab, setActiveTab] = useState('overview');

  const userStats = {
    totalGames: 23,
    winRate: 68,
    avgRating: 4.7,
    friendsCount: 156
  };

  const achievements = [
    { id: 1, title: '飞盘新手', desc: '完成第一场比赛', icon: '🌱', unlocked: true },
    { id: 2, title: '团队合作', desc: '获得10个团队协作好评', icon: '🤝', unlocked: true },
    { id: 3, title: '技术达人', desc: '技术评分达到4.5+', icon: '⚡', unlocked: true },
    { id: 4, title: '社交达人', desc: '认识50个飞盘朋友', icon: '👥', unlocked: true },
    { id: 5, title: '比赛狂人', desc: '参与20场比赛', icon: '🏆', unlocked: true },
    { id: 6, title: '完美投手', desc: '连续5场MVP', icon: '🎯', unlocked: false }
  ];

  const recentGames = [
    {
      id: 1,
      title: '朝阳公园友谊赛',
      date: '2024-01-15',
      result: '胜利',
      rating: 4.8,
      tags: ['团队协作强', '技术好']
    },
    {
      id: 2,
      title: '奥森竞技赛',
      date: '2024-01-12',
      result: '失败',
      rating: 4.6,
      tags: ['拼搏精神', '友好']
    },
    {
      id: 3,
      title: '工体新手局',
      date: '2024-01-10',
      result: '胜利',
      rating: 4.9,
      tags: ['乐于助人', '教学耐心']
    }
  ];

  const skillTags = [
    { name: '团队协作', level: 85, color: 'bg-blue-500' },
    { name: '技术水平', level: 78, color: 'bg-green-500' },
    { name: '运动精神', level: 92, color: 'bg-purple-500' },
    { name: '沟通能力', level: 88, color: 'bg-yellow-500' }
  ];

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <div className="apple-gradient-primary text-white">
        <div className="flex items-center justify-between p-6">
          <button onClick={onBack} className="p-3 rounded-2xl bg-white/20 hover:bg-white/30 transition-colors">
            <ArrowLeft size={24} />
          </button>
          <h1 className="apple-subtitle">我的资料</h1>
          <button className="p-3 rounded-2xl bg-white/20 hover:bg-white/30 transition-colors">
            <Settings size={24} />
          </button>
        </div>

        {/* Profile Info */}
        <div className="px-6 pb-8">
          <div className="flex items-center space-x-4 mb-6">
            <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center text-4xl backdrop-blur-sm">
              👨‍💼
            </div>
            <div className="flex-1">
              <h2 className="apple-title">飞盘达人</h2>
              <p className="apple-body text-blue-100">进阶玩家 • 北京朝阳</p>
              <div className="flex items-center space-x-6 mt-3">
                <div className="flex items-center space-x-1">
                  <Star size={16} className="fill-current" />
                  <span className="apple-body">{userStats.avgRating}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Users size={16} />
                  <span className="apple-body">{userStats.friendsCount}</span>
                </div>
              </div>
            </div>
            <button className="p-3 rounded-2xl bg-white/20 hover:bg-white/30 transition-colors">
              <Edit3 size={20} />
            </button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4">
            <div className="text-center">
              <div className="apple-title">{userStats.totalGames}</div>
              <div className="apple-caption text-blue-100">参与比赛</div>
            </div>
            <div className="text-center">
              <div className="apple-title">{userStats.winRate}%</div>
              <div className="apple-caption text-blue-100">胜率</div>
            </div>
            <div className="text-center">
              <div className="apple-title">{userStats.avgRating}</div>
              <div className="apple-caption text-blue-100">平均评分</div>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="apple-nav">
        <div className="flex">
          <button
            onClick={() => setActiveTab('overview')}
            className={`flex-1 py-4 px-6 font-medium transition-colors ${
              activeTab === 'overview'
                ? 'text-blue-500 border-b-2 border-blue-500'
                : 'text-gray-600'
            }`}
          >
            概览
          </button>
          <button
            onClick={() => setActiveTab('achievements')}
            className={`flex-1 py-4 px-6 font-medium transition-colors ${
              activeTab === 'achievements'
                ? 'text-blue-500 border-b-2 border-blue-500'
                : 'text-gray-600'
            }`}
          >
            成就
          </button>
          <button
            onClick={() => setActiveTab('history')}
            className={`flex-1 py-4 px-6 font-medium transition-colors ${
              activeTab === 'history'
                ? 'text-blue-500 border-b-2 border-blue-500'
                : 'text-gray-600'
            }`}
          >
            历史
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        {activeTab === 'overview' && (
          <div className="space-y-6">
            {/* Skills */}
            <div className="apple-card p-6">
              <h3 className="apple-subtitle text-gray-900 mb-4">技能雷达</h3>
              <div className="space-y-4">
                {skillTags.map((skill, index) => (
                  <div key={index}>
                    <div className="flex justify-between mb-2">
                      <span className="apple-body font-medium text-gray-700">{skill.name}</span>
                      <span className="apple-caption text-gray-600">{skill.level}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className={`h-2 rounded-full ${skill.color} transition-all duration-500`}
                        style={{ width: `${skill.level}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Personality Tags */}
            <div className="apple-card p-6">
              <h3 className="apple-subtitle text-gray-900 mb-4">个性标签</h3>
              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1 bg-blue-100 text-blue-700 apple-caption rounded-full font-medium">团队型</span>
                <span className="px-3 py-1 bg-green-100 text-green-700 apple-caption rounded-full font-medium">活跃型</span>
                <span className="px-3 py-1 bg-purple-100 text-purple-700 apple-caption rounded-full font-medium">技术流</span>
                <span className="px-3 py-1 bg-yellow-100 text-yellow-700 apple-caption rounded-full font-medium">友好</span>
                <span className="px-3 py-1 bg-pink-100 text-pink-700 apple-caption rounded-full font-medium">乐于助人</span>
              </div>
            </div>

            {/* Recent Reviews */}
            <div className="apple-card p-6">
              <h3 className="apple-subtitle text-gray-900 mb-4">最近评价</h3>
              <div className="space-y-4">
                <div className="p-4 bg-gray-50 rounded-2xl">
                  <div className="flex items-center space-x-2 mb-2">
                    <span className="apple-body font-medium">飞盘小王子</span>
                    <div className="flex text-yellow-400">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} size={12} className="fill-current" />
                      ))}
                    </div>
                  </div>
                  <p className="apple-body text-gray-600">"技术很好，团队协作能力强，是个很棒的队友！"</p>
                </div>
                <div className="p-4 bg-gray-50 rounded-2xl">
                  <div className="flex items-center space-x-2 mb-2">
                    <span className="apple-body font-medium">运动达人</span>
                    <div className="flex text-yellow-400">
                      {[...Array(4)].map((_, i) => (
                        <Star key={i} size={12} className="fill-current" />
                      ))}
                    </div>
                  </div>
                  <p className="apple-body text-gray-600">"很友善，愿意帮助新手，运动精神很棒。"</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'achievements' && (
          <div className="grid grid-cols-2 gap-4">
            {achievements.map((achievement) => (
              <div
                key={achievement.id}
                className={`apple-card p-4 text-center ${
                  achievement.unlocked ? '' : 'opacity-50'
                }`}
              >
                <div className="text-3xl mb-3">{achievement.icon}</div>
                <h4 className="apple-subtitle text-gray-900 mb-2">{achievement.title}</h4>
                <p className="apple-caption text-gray-600">{achievement.desc}</p>
                {achievement.unlocked && (
                  <div className="mt-3 apple-caption text-green-600 font-medium">已解锁</div>
                )}
              </div>
            ))}
          </div>
        )}

        {activeTab === 'history' && (
          <div className="space-y-4">
            {recentGames.map((game) => (
              <div key={game.id} className="apple-card p-4">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="apple-subtitle text-gray-900">{game.title}</h4>
                  <span className={`px-3 py-1 apple-caption rounded-full font-medium ${
                    game.result === '胜利' 
                      ? 'bg-green-100 text-green-700' 
                      : 'bg-red-100 text-red-700'
                  }`}>
                    {game.result}
                  </span>
                </div>
                <div className="flex items-center space-x-4 apple-caption text-gray-600 mb-3">
                  <div className="flex items-center space-x-1">
                    <Calendar size={14} />
                    <span>{game.date}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Star size={14} className="text-yellow-400 fill-current" />
                    <span>{game.rating}</span>
                  </div>
                </div>
                <div className="flex flex-wrap gap-2">
                  {game.tags.map((tag, index) => (
                    <span key={index} className="px-3 py-1 bg-blue-100 text-blue-700 apple-caption rounded-full">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default UserProfile;