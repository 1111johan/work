import React, { useState } from 'react';
import { Home, Search, User, Calendar } from 'lucide-react';
import LoginScreen from './components/LoginScreen';
import ProfileSetup from './components/ProfileSetup';
import HomePage from './components/HomePage';
import MatchResults from './components/MatchResults';
import GameDetail from './components/GameDetail';
import UserProfile from './components/UserProfile';
import { Game, Screen } from './types';

function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('login');
  const [selectedGame, setSelectedGame] = useState<Game | null>(null);

  const renderScreen = () => {
    switch (currentScreen) {
      case 'login':
        return <LoginScreen onLogin={() => setCurrentScreen('setup')} />;
      case 'setup':
        return <ProfileSetup onComplete={() => setCurrentScreen('home')} />;
      case 'home':
        return <HomePage 
          onQuickMatch={() => setCurrentScreen('match')} 
          onGameSelect={(game) => {
            setSelectedGame(game);
            setCurrentScreen('game');
          }}
        />;
      case 'match':
        return <MatchResults 
          onBack={() => setCurrentScreen('home')}
          onGameSelect={(game) => {
            setSelectedGame(game);
            setCurrentScreen('game');
          }}
        />;
      case 'game':
        return <GameDetail 
          game={selectedGame}
          onBack={() => setCurrentScreen('home')} 
        />;
      case 'profile':
        return <UserProfile onBack={() => setCurrentScreen('home')} />;
      default:
        return <HomePage onQuickMatch={() => setCurrentScreen('match')} />;
    }
  };

  const showBottomNav = !['login', 'setup'].includes(currentScreen);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-md mx-auto bg-white min-h-screen shadow-xl">
        {renderScreen()}
        
        {showBottomNav && (
          <div className="fixed bottom-0 left-1/2 transform -translate-x-1/2 w-full max-w-md apple-nav">
            <div className="flex justify-around py-4">
              <button
                onClick={() => setCurrentScreen('home')}
                className={`flex flex-col items-center p-3 rounded-2xl transition-all ${
                  currentScreen === 'home' 
                    ? 'text-blue-500 bg-blue-50' 
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                <Home size={24} />
                <span className="apple-caption mt-1">首页</span>
              </button>
              <button
                onClick={() => setCurrentScreen('match')}
                className={`flex flex-col items-center p-3 rounded-2xl transition-all ${
                  currentScreen === 'match' 
                    ? 'text-blue-500 bg-blue-50' 
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                <Search size={24} />
                <span className="apple-caption mt-1">匹配</span>
              </button>
              <button className="flex flex-col items-center p-3 rounded-2xl text-gray-500 hover:text-gray-700 transition-all">
                <Calendar size={24} />
                <span className="apple-caption mt-1">比赛</span>
              </button>
              <button
                onClick={() => setCurrentScreen('profile')}
                className={`flex flex-col items-center p-3 rounded-2xl transition-all ${
                  currentScreen === 'profile' 
                    ? 'text-blue-500 bg-blue-50' 
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                <User size={24} />
                <span className="apple-caption mt-1">我的</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;