import React, { useState } from 'react';
import { ChevronRight, Trophy, Users, Heart, Zap, Shield, Coffee } from 'lucide-react';

interface ProfileSetupProps {
  onComplete: () => void;
}

const ProfileSetup: React.FC<ProfileSetupProps> = ({ onComplete }) => {
  const [step, setStep] = useState(1);
  const [profile, setProfile] = useState({
    name: '',
    age: '',
    gender: '',
    level: '',
    gameType: '',
    playStyle: [],
    socialStyle: [],
    interests: []
  });

  const levels = [
    { id: 'beginner', label: '新手', desc: '刚接触飞盘，基础技能学习中', icon: '🌱' },
    { id: 'amateur', label: '业余', desc: '掌握基本技能，参与过几次比赛', icon: '🏃' },
    { id: 'intermediate', label: '进阶', desc: '技能熟练，经常参加比赛', icon: '⚡' },
    { id: 'pro', label: '专业', desc: '技能精湛，可指导他人', icon: '🏆' }
  ];

  const playStyles = [
    { id: 'aggressive', label: '激进型', icon: <Zap className="text-red-500" size={20} /> },
    { id: 'steady', label: '稳健型', icon: <Shield className="text-blue-500" size={20} /> },
    { id: 'team', label: '团队型', icon: <Users className="text-green-500" size={20} /> }
  ];

  const socialStyles = [
    { id: 'active', label: '活跃型', icon: <Heart className="text-pink-500" size={20} /> },
    { id: 'quiet', label: '安静型', icon: <Coffee className="text-brown-500" size={20} /> },
    { id: 'coach', label: '教练型', icon: <Trophy className="text-yellow-500" size={20} /> }
  ];

  const interests = [
    { id: 'afterparty', label: '赛后聚餐', icon: '🍽️' },
    { id: 'puresport', label: '纯运动', icon: '🏃‍♂️' },
    { id: 'friendship', label: '交友优先', icon: '👥' },
    { id: 'skill', label: '技能提升', icon: '📈' },
    { id: 'competition', label: '比赛竞技', icon: '🏆' },
    { id: 'casual', label: '休闲娱乐', icon: '😄' }
  ];

  const handleNext = () => {
    if (step < 4) {
      setStep(step + 1);
    } else {
      onComplete();
    }
  };

  const handleTagToggle = (category: string, value: string) => {
    setProfile(prev => ({
      ...prev,
      [category]: prev[category].includes(value) 
        ? prev[category].filter(item => item !== value)
        : [...prev[category], value]
    }));
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <div className="space-y-8">
            <h2 className="apple-title text-center text-gray-900">基本信息</h2>
            <div className="space-y-6">
              <div>
                <label className="block apple-body font-medium text-gray-700 mb-3">昵称</label>
                <input
                  type="text"
                  value={profile.name}
                  onChange={(e) => setProfile(prev => ({ ...prev, name: e.target.value }))}
                  placeholder="请输入您的昵称"
                  className="apple-input w-full"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block apple-body font-medium text-gray-700 mb-3">年龄</label>
                  <input
                    type="number"
                    value={profile.age}
                    onChange={(e) => setProfile(prev => ({ ...prev, age: e.target.value }))}
                    placeholder="年龄"
                    className="apple-input w-full"
                  />
                </div>
                <div>
                  <label className="block apple-body font-medium text-gray-700 mb-3">性别</label>
                  <select
                    value={profile.gender}
                    onChange={(e) => setProfile(prev => ({ ...prev, gender: e.target.value }))}
                    className="apple-input w-full"
                  >
                    <option value="">选择性别</option>
                    <option value="male">男</option>
                    <option value="female">女</option>
                    <option value="other">其他</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-8">
            <h2 className="apple-title text-center text-gray-900">飞盘水平</h2>
            <div className="space-y-4">
              {levels.map((level) => (
                <button
                  key={level.id}
                  onClick={() => setProfile(prev => ({ ...prev, level: level.id }))}
                  className={`w-full p-6 apple-card text-left transition-all ${
                    profile.level === level.id
                      ? 'ring-2 ring-blue-500 bg-blue-50'
                      : 'hover:shadow-lg'
                  }`}
                >
                  <div className="flex items-center space-x-4">
                    <span className="text-3xl">{level.icon}</span>
                    <div className="flex-1">
                      <h3 className="apple-subtitle text-gray-900">{level.label}</h3>
                      <p className="apple-caption text-gray-600 mt-1">{level.desc}</p>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-8">
            <h2 className="apple-title text-center text-gray-900">个性标签</h2>
            
            <div className="space-y-8">
              <div>
                <h3 className="apple-subtitle text-gray-900 mb-4">竞技风格</h3>
                <div className="flex flex-wrap gap-3">
                  {playStyles.map((style) => (
                    <button
                      key={style.id}
                      onClick={() => handleTagToggle('playStyle', style.id)}
                      className={`flex items-center space-x-2 px-6 py-3 rounded-2xl border-2 transition-all ${
                        profile.playStyle.includes(style.id)
                          ? 'border-blue-500 bg-blue-50 text-blue-700'
                          : 'border-gray-200 hover:border-blue-300 bg-white'
                      }`}
                    >
                      {style.icon}
                      <span className="apple-body font-medium">{style.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="apple-subtitle text-gray-900 mb-4">社交属性</h3>
                <div className="flex flex-wrap gap-3">
                  {socialStyles.map((style) => (
                    <button
                      key={style.id}
                      onClick={() => handleTagToggle('socialStyle', style.id)}
                      className={`flex items-center space-x-2 px-6 py-3 rounded-2xl border-2 transition-all ${
                        profile.socialStyle.includes(style.id)
                          ? 'border-blue-500 bg-blue-50 text-blue-700'
                          : 'border-gray-200 hover:border-blue-300 bg-white'
                      }`}
                    >
                      {style.icon}
                      <span className="apple-body font-medium">{style.label}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-8">
            <h2 className="apple-title text-center text-gray-900">兴趣偏好</h2>
            <p className="apple-body text-center text-gray-600">选择您感兴趣的方向（可多选）</p>
            
            <div className="grid grid-cols-2 gap-4">
              {interests.map((interest) => (
                <button
                  key={interest.id}
                  onClick={() => handleTagToggle('interests', interest.id)}
                  className={`p-6 apple-card text-center transition-all ${
                    profile.interests.includes(interest.id)
                      ? 'ring-2 ring-blue-500 bg-blue-50'
                      : 'hover:shadow-lg'
                  }`}
                >
                  <div className="text-3xl mb-3">{interest.icon}</div>
                  <div className="apple-body font-medium">{interest.label}</div>
                </button>
              ))}
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  const canProceed = () => {
    switch (step) {
      case 1:
        return profile.name && profile.age && profile.gender;
      case 2:
        return profile.level;
      case 3:
        return profile.playStyle.length > 0 && profile.socialStyle.length > 0;
      case 4:
        return profile.interests.length > 0;
      default:
        return false;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Progress Bar */}
      <div className="apple-nav p-6">
        <div className="flex items-center justify-between mb-3">
          <span className="apple-caption text-gray-600">设置进度</span>
          <span className="apple-caption text-gray-600">{step}/4</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className="bg-blue-500 h-2 rounded-full transition-all duration-300"
            style={{ width: `${(step / 4) * 100}%` }}
          ></div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 p-6">
        {renderStep()}
      </div>

      {/* Bottom Button */}
      <div className="p-6 apple-nav">
        <button
          onClick={handleNext}
          disabled={!canProceed()}
          className="w-full apple-button flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <span className="apple-body font-medium">{step === 4 ? '完成设置' : '下一步'}</span>
          <ChevronRight size={20} />
        </button>
      </div>
    </div>
  );
};

export default ProfileSetup;