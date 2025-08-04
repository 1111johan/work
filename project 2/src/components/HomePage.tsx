import React, { useState, useEffect } from 'react';
import { MapPin, Clock, Users, Zap, Filter, Star } from 'lucide-react';
import { Game } from '../types';

interface HomePageProps {
  onQuickMatch: () => void;
  onGameSelect: (game: Game) => void;
}

const HomePage: React.FC<HomePageProps> = ({ onQuickMatch, onGameSelect }) => {
  const [viewMode, setViewMode] = useState<'map' | 'list'>('map');
  const [nearbyGames, setNearbyGames] = useState<Game[]>([]);

  useEffect(() => {
    // Simulate loading nearby games
    const games = [
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
        rating: 4.8
      },
      {
        id: 2,
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
        rating: 4.6
      },
      {
        id: 3,
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
        rating: 4.9
      }
    ];
    setNearbyGames(games);
  }, []);

  const GameCard = ({ game }: { game: Game }) => (
    <div 
      onClick={() => onGameSelect(game)}
      className="apple-card p-6 cursor-pointer"
    >
      <div className="flex justify-between items-start mb-4">
        <div className="flex-1">
          <h3 className="apple-subtitle text-gray-900 mb-2">{game.title}</h3>
          <div className="flex items-center apple-caption text-gray-600 mb-3">
            <MapPin size={14} className="mr-1" />
            <span>{game.location}</span>
            <span className="mx-2">•</span>
            <span>{game.distance}</span>
          </div>
        </div>
        <div className="flex items-center space-x-1">
          <Star size={14} className="text-yellow-400 fill-current" />
          <span className="apple-caption text-gray-600">{game.rating}</span>
        </div>
      </div>

      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center apple-caption text-gray-600">
          <Clock size={14} className="mr-1" />
          <span>{game.time}</span>
        </div>
        <div className="flex items-center apple-caption text-gray-600">
          <Users size={14} className="mr-1" />
          <span>{game.players}/{game.maxPlayers}</span>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex space-x-2">
          <span className="px-3 py-1 bg-blue-100 text-blue-700 apple-caption rounded-full font-medium">{game.level}</span>
          <span className="px-3 py-1 bg-green-100 text-green-700 apple-caption rounded-full font-medium">{game.type}</span>
          {game.tags.map((tag, index) => (
            <span key={index} className="px-3 py-1 bg-gray-100 text-gray-600 apple-caption rounded-full">{tag}</span>
          ))}
        </div>
        <span className="apple-subtitle text-blue-500 font-semibold">{game.price}</span>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <div className="apple-nav">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="apple-title text-gray-900">飞盘匹配</h1>
              <div className="flex items-center apple-caption text-gray-600 mt-1">
                <MapPin size={14} className="mr-1" />
                <span>北京市朝阳区</span>
              </div>
            </div>
            <button className="p-3 rounded-2xl bg-gray-100 hover:bg-gray-200 transition-colors">
              <Filter size={20} className="text-gray-600" />
            </button>
          </div>

          {/* Quick Match Button */}
          <button
            onClick={onQuickMatch}
            className="w-full apple-gradient-primary text-white py-4 rounded-2xl font-semibold flex items-center justify-center space-x-2 hover:shadow-lg transition-all transform hover:scale-[1.02] shadow-lg"
          >
            <Zap size={20} />
            <span>快速匹配</span>
          </button>
        </div>

        {/* View Mode Toggle */}
        <div className="px-6 pb-6">
          <div className="bg-gray-100 rounded-2xl p-1">
            <button
              onClick={() => setViewMode('map')}
              className={`flex-1 py-3 px-4 rounded-xl font-medium transition-all ${
                viewMode === 'map'
                  ? 'bg-white text-blue-500 shadow-sm'
                  : 'text-gray-600'
              }`}
            >
              地图模式
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`flex-1 py-3 px-4 rounded-xl font-medium transition-all ${
                viewMode === 'list'
                  ? 'bg-white text-blue-500 shadow-sm'
                  : 'text-gray-600'
              }`}
            >
              列表模式
            </button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        {viewMode === 'map' ? (
          <div className="space-y-6">
            {/* Map Placeholder */}
            <div className="apple-card h-80 flex items-center justify-center relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-100 to-purple-100"></div>
              <div className="text-center z-10">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                  <MapPin size={32} className="text-white" />
                </div>
                <p className="apple-subtitle text-gray-800 mb-2">地图加载中...</p>
                <p className="apple-caption text-gray-600">显示附近3场比赛</p>
              </div>
              
              {/* Mock map markers */}
              <div className="absolute top-16 left-20 w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white text-sm font-bold shadow-lg animate-pulse">1</div>
              <div className="absolute top-32 right-24 w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white text-sm font-bold shadow-lg animate-pulse">2</div>
              <div className="absolute bottom-16 left-1/2 w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white text-sm font-bold shadow-lg animate-pulse">3</div>
            </div>

            {/* Recommended Games */}
            <div>
              <h2 className="apple-subtitle text-gray-900 mb-4">推荐比赛</h2>
              <div className="space-y-4">
                {nearbyGames.slice(0, 2).map((game) => (
                  <GameCard key={game.id} game={game} />
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="flex items-center justify-between mb-6">
              <h2 className="apple-subtitle text-gray-900">附近比赛</h2>
              <span className="apple-caption text-gray-600">{nearbyGames.length} 场比赛</span>
            </div>
            {nearbyGames.map((game) => (
              <GameCard key={game.id} game={game} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default HomePage;