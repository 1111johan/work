import React, { useState, useEffect } from 'react';
import { ArrowLeft, MapPin, Clock, Users, Heart, X } from 'lucide-react';
import { MatchGame } from '../types';

interface MatchResultsProps {
  onBack: () => void;
  onGameSelect: (game: MatchGame) => void;
}

const MatchResults: React.FC<MatchResultsProps> = ({ onBack, onGameSelect }) => {
  const [matches, setMatches] = useState<MatchGame[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate AI matching process
    setTimeout(() => {
      const matchedGames = [
        {
          id: 1,
          title: '朝阳公园飞盘友谊赛',
          location: '朝阳公园南门',
          distance: '1.2km',
          time: '今天 15:00',
          players: 12,
          maxPlayers: 16,
          level: '业余',
          type: '混合局',
          organizer: '飞盘小王子',
          price: '免费',
          tags: ['友好', '新手友善'],
          rating: 4.8,
          matchScore: 95,
          matchReasons: ['水平匹配', '距离很近', '风格相似'],
          playerProfiles: [
            { name: '小李', level: '业余', avatar: '🧑‍💼' },
            { name: '小王', level: '进阶', avatar: '👩‍🎓' },
            { name: '小张', level: '业余', avatar: '👨‍💻' }
          ]
        },
        {
          id: 2,
          title: '工体草坪飞盘体验',
          location: '工人体育场',
          distance: '3.1km',
          time: '周末 14:00',
          players: 6,
          maxPlayers: 20,
          level: '新手',
          type: '休闲局',
          organizer: '飞盘新手村',
          price: '¥15',
          tags: ['新手', '教学'],
          rating: 4.9,
          matchScore: 88,
          matchReasons: ['新手友善', '教学氛围', '休闲娱乐'],
          playerProfiles: [
            { name: '教练老陈', level: '专业', avatar: '👨‍🏫' },
            { name: '新手小白', level: '新手', avatar: '👶' },
            { name: '活跃小美', level: '业余', avatar: '👩‍🦰' }
          ]
        },
        {
          id: 3,
          title: '奥森竞技飞盘赛',
          location: '奥林匹克森林公园',
          distance: '2.5km',
          time: '明天 09:00',
          players: 8,
          maxPlayers: 12,
          level: '进阶',
          type: '竞技局',
          organizer: '飞盘达人',
          price: '¥30',
          tags: ['高水平', '激烈'],
          rating: 4.6,
          matchScore: 82,
          matchReasons: ['挑战自我', '技能提升', '竞技氛围'],
          playerProfiles: [
            { name: '竞技高手', level: '专业', avatar: '🏆' },
            { name: '进阶玩家', level: '进阶', avatar: '⚡' },
            { name: '技术流', level: '进阶', avatar: '🎯' }
          ]
        }
      ];
      setMatches(matchedGames);
      setIsLoading(false);
    }, 2000);
  }, []);

  const handleLike = () => {
    if (currentIndex < matches.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      // Show completion message
      alert('已查看所有推荐！');
      onBack();
    }
  };

  const handlePass = () => {
    if (currentIndex < matches.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      onBack();
    }
  };

  const handleJoinGame = () => {
    onGameSelect(matches[currentIndex]);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col">
        <div className="apple-nav flex items-center p-6">
          <button onClick={onBack} className="p-3 rounded-2xl hover:bg-gray-100 transition-colors">
            <ArrowLeft size={24} className="text-gray-600" />
          </button>
          <h1 className="apple-subtitle text-gray-900 ml-4">智能匹配中...</h1>
        </div>
        
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <div className="apple-loading mx-auto mb-6"></div>
            <h2 className="apple-subtitle text-gray-900 mb-3">AI正在为您匹配</h2>
            <p className="apple-body text-gray-600">分析您的喜好和附近比赛...</p>
          </div>
        </div>
      </div>
    );
  }

  const currentMatch = matches[currentIndex];

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <div className="apple-nav flex items-center justify-between p-6">
        <button onClick={onBack} className="p-3 rounded-2xl hover:bg-gray-100 transition-colors">
          <ArrowLeft size={24} className="text-gray-600" />
        </button>
        <h1 className="apple-subtitle text-gray-900">匹配结果</h1>
        <div className="apple-caption text-gray-600">
          {currentIndex + 1}/{matches.length}
        </div>
      </div>

      {/* Match Card */}
      <div className="flex-1 p-6 flex items-center justify-center">
        <div className="w-full max-w-sm">
          <div className="apple-card overflow-hidden">
            {/* Match Score */}
            <div className="apple-gradient-primary p-6 text-white text-center">
              <div className="apple-title mb-2">{currentMatch.matchScore}%</div>
              <div className="apple-caption opacity-90">匹配度</div>
            </div>

            {/* Game Info */}
            <div className="p-6">
              <h2 className="apple-subtitle text-gray-900 mb-4">{currentMatch.title}</h2>
              
              <div className="space-y-3 mb-6">
                <div className="flex items-center apple-caption text-gray-600">
                  <MapPin size={16} className="mr-2" />
                  <span>{currentMatch.location} • {currentMatch.distance}</span>
                </div>
                <div className="flex items-center apple-caption text-gray-600">
                  <Clock size={16} className="mr-2" />
                  <span>{currentMatch.time}</span>
                </div>
                <div className="flex items-center apple-caption text-gray-600">
                  <Users size={16} className="mr-2" />
                  <span>{currentMatch.players}/{currentMatch.maxPlayers} 人</span>
                </div>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-6">
                <span className="px-3 py-1 bg-blue-100 text-blue-700 apple-caption rounded-full font-medium">{currentMatch.level}</span>
                <span className="px-3 py-1 bg-green-100 text-green-700 apple-caption rounded-full font-medium">{currentMatch.type}</span>
                <span className="px-3 py-1 bg-orange-100 text-orange-700 apple-caption rounded-full font-medium">{currentMatch.price}</span>
              </div>

              {/* Match Reasons */}
              <div className="mb-6">
                <h3 className="apple-subtitle text-gray-900 mb-3">推荐理由</h3>
                <div className="flex flex-wrap gap-2">
                  {currentMatch.matchReasons.map((reason, index) => (
                    <span key={index} className="px-3 py-1 bg-green-50 text-green-700 apple-caption rounded-full border border-green-200">
                      {reason}
                    </span>
                  ))}
                </div>
              </div>

              {/* Player Profiles */}
              <div className="mb-6">
                <h3 className="apple-subtitle text-gray-900 mb-3">已报名玩家</h3>
                <div className="space-y-3">
                  {currentMatch.playerProfiles.map((player, index) => (
                    <div key={index} className="flex items-center space-x-3">
                      <span className="text-2xl">{player.avatar}</span>
                      <div>
                        <div className="apple-body font-medium text-gray-900">{player.name}</div>
                        <div className="apple-caption text-gray-600">{player.level}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Button */}
              <button
                onClick={handleJoinGame}
                className="w-full apple-button"
              >
                查看详情并报名
              </button>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-center space-x-8 mt-8">
            <button
              onClick={handlePass}
              className="w-16 h-16 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-gray-50 transition-all transform hover:scale-110"
            >
              <X size={24} className="text-gray-600" />
            </button>
            <button
              onClick={handleLike}
              className="w-16 h-16 apple-gradient-primary rounded-full shadow-lg flex items-center justify-center hover:shadow-xl transition-all transform hover:scale-110"
            >
              <Heart size={24} className="text-white" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MatchResults;