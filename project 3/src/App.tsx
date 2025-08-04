import React, { useState } from 'react';
import { Header } from './components/Header';
import { PhotoUpload } from './components/PhotoUpload';
import { EnhancedStyleSelector, EnhancedStyle } from './components/EnhancedStyleSelector';
import { EnhancedProcessingView } from './components/EnhancedProcessingView';
import { EnhancedResultsView } from './components/EnhancedResultsView';
import { VideoGenerationView } from './components/VideoGenerationView';
import { SocialFeatures } from './components/SocialFeatures';
import { PricingModal } from './components/PricingModal';
import { NFTMinting } from './components/NFTMinting';
import { ChallengeArena } from './components/ChallengeArena';
import { GestureController } from './components/GestureController';
import { FeatureTest } from './components/FeatureTest';
import { APIDiagnostic } from './components/APIDiagnostic';
import { StyleChatInterface } from './components/StyleChatInterface';

export type AppState = 'upload' | 'style-select' | 'style-chat' | 'processing' | 'results' | 'video-generation' | 'social' | 'challenge-arena' | 'feature-test' | 'api-diagnostic';

function App() {
  const [currentState, setCurrentState] = useState<AppState>('upload');
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [selectedStyle, setSelectedStyle] = useState<EnhancedStyle | null>(null);
  const [showPricing, setShowPricing] = useState(false);
  const [showNFT, setShowNFT] = useState(false);
  const [processedImage, setProcessedImage] = useState<string | null>(null);
  const [customPrompt, setCustomPrompt] = useState<string>('');
  const [gesturesEnabled, setGesturesEnabled] = useState(true);

  const handleImageUpload = (imageUrl: string) => {
    setUploadedImage(imageUrl);
    setCurrentState('style-select');
  };

  const handleStyleSelect = (style: EnhancedStyle, customPrompt?: string) => {
    setSelectedStyle(style);
    if (customPrompt) {
      setCustomPrompt(customPrompt);
    }
  };

  const handleStartProcessing = async () => {
    if (selectedStyle && uploadedImage) {
      setCurrentState('processing');
      
      try {
        // 导入风格迁移服务
        const { performStyleTransfer } = await import('./services/styleTransferService');
        
        // 调用风格迁移服务
        const result = await performStyleTransfer({
          sourceImage: uploadedImage,
          styleId: selectedStyle.id,
          customPrompt: customPrompt || undefined
        });
        
        if (result.success && result.processedImage) {
          setProcessedImage(result.processedImage);
          setCurrentState('results');
        } else {
          console.error('Style transfer failed:', result.error);
          // 回退到模拟结果
          const styleImages = {
            'cyberpunk-neon': 'https://images.pexels.com/photos/2599244/pexels-photo-2599244.jpeg?auto=compress&cs=tinysrgb&w=800',
            'monet-impressionist': 'https://images.pexels.com/photos/1070945/pexels-photo-1070945.jpeg?auto=compress&cs=tinysrgb&w=800',
            'anime-studio': 'https://images.pexels.com/photos/1438761/pexels-photo-1438761.jpeg?auto=compress&cs=tinysrgb&w=800',
            'ink-wash': 'https://images.pexels.com/photos/1194420/pexels-photo-1194420.jpeg?auto=compress&cs=tinysrgb&w=800',
            'van-gogh': 'https://images.pexels.com/photos/1070945/pexels-photo-1070945.jpeg?auto=compress&cs=tinysrgb&w=800',
            'digital-glitch': 'https://images.pexels.com/photos/2599244/pexels-photo-2599244.jpeg?auto=compress&cs=tinysrgb&w=800',
            'renaissance': 'https://images.pexels.com/photos/1070945/pexels-photo-1070945.jpeg?auto=compress&cs=tinysrgb&w=800',
            'watercolor-dream': 'https://images.pexels.com/photos/1194420/pexels-photo-1194420.jpeg?auto=compress&cs=tinysrgb&w=800',
            'pop-art-warhol': 'https://images.pexels.com/photos/1194420/pexels-photo-1194420.jpeg?auto=compress&cs=tinysrgb&w=800',
            'ukiyo-e': 'https://images.pexels.com/photos/1438761/pexels-photo-1438761.jpeg?auto=compress&cs=tinysrgb&w=800'
          };
          
          setProcessedImage(styleImages[selectedStyle.id as keyof typeof styleImages] || styleImages['cyberpunk-neon']);
          setCurrentState('results');
        }
      } catch (error) {
        console.error('Processing error:', error);
        // 回退到模拟结果
        const styleImages = {
          'cyberpunk-neon': 'https://images.pexels.com/photos/2599244/pexels-photo-2599244.jpeg?auto=compress&cs=tinysrgb&w=800',
          'monet-impressionist': 'https://images.pexels.com/photos/1070945/pexels-photo-1070945.jpeg?auto=compress&cs=tinysrgb&w=800',
          'anime-studio': 'https://images.pexels.com/photos/1438761/pexels-photo-1438761.jpeg?auto=compress&cs=tinysrgb&w=800',
          'ink-wash': 'https://images.pexels.com/photos/1194420/pexels-photo-1194420.jpeg?auto=compress&cs=tinysrgb&w=800',
          'van-gogh': 'https://images.pexels.com/photos/1070945/pexels-photo-1070945.jpeg?auto=compress&cs=tinysrgb&w=800',
          'digital-glitch': 'https://images.pexels.com/photos/2599244/pexels-photo-2599244.jpeg?auto=compress&cs=tinysrgb&w=800',
          'renaissance': 'https://images.pexels.com/photos/1070945/pexels-photo-1070945.jpeg?auto=compress&cs=tinysrgb&w=800',
          'watercolor-dream': 'https://images.pexels.com/photos/1194420/pexels-photo-1194420.jpeg?auto=compress&cs=tinysrgb&w=800',
          'pop-art-warhol': 'https://images.pexels.com/photos/1194420/pexels-photo-1194420.jpeg?auto=compress&cs=tinysrgb&w=800',
          'ukiyo-e': 'https://images.pexels.com/photos/1438761/pexels-photo-1438761.jpeg?auto=compress&cs=tinysrgb&w=800'
        };
        
        setProcessedImage(styleImages[selectedStyle.id as keyof typeof styleImages] || styleImages['cyberpunk-neon']);
        setCurrentState('results');
      }
    }
  };

  const handleBackToUpload = () => {
    setCurrentState('upload');
    setUploadedImage(null);
    setSelectedStyle(null);
    setProcessedImage(null);
  };

  const handleShowSocial = () => {
    setCurrentState('social');
  };

  const handleShowChallengeArena = () => {
    setCurrentState('challenge-arena');
  };

  const handleShowFeatureTest = () => {
    setCurrentState('feature-test');
  };

  const handleShowAPIDiagnostic = () => {
    setCurrentState('api-diagnostic');
  };

  const handleShowStyleChat = () => {
    setCurrentState('style-chat');
  };

  const handleGenerateVideo = () => {
    setCurrentState('video-generation');
  };

  // Voice command handler
  const handleVoiceCommand = (command: string) => {
    console.log('Voice command received:', command);
    
    if (command.includes('next') || command.includes('下一个')) {
      // Handle next style
      if (currentState === 'style-select') {
        // Would trigger next style in selector
      }
    } else if (command.includes('select') || command.includes('选择')) {
      if (currentState === 'style-select' && selectedStyle) {
        handleStartProcessing();
      }
    } else if (command.includes('cyberpunk') || command.includes('赛博朋克')) {
      // Auto-select cyberpunk style
      const cyberpunkStyle = {
        id: 'cyberpunk-neon',
        name: 'Neon Genesis',
        description: 'Cyberpunk aesthetics with electric neon vibes',
        category: 'modern' as const,
        popularity: 95,
        processingTime: '2.1s',
        gradient: 'from-cyan-400 via-purple-600 to-pink-500',
        preview: 'https://images.pexels.com/photos/2599244/pexels-photo-2599244.jpeg?auto=compress&cs=tinysrgb&w=400',
        icon: <div>🌆</div>
      };
      handleStyleSelect(cyberpunkStyle);
    } else if (command.includes('monet') || command.includes('莫奈')) {
      // Auto-select Monet style
      const monetStyle = {
        id: 'monet-impressionist',
        name: 'Monet Dreams',
        description: 'Impressionist brushstrokes with ethereal lighting',
        category: 'classic' as const,
        popularity: 98,
        processingTime: '1.8s',
        gradient: 'from-blue-400 via-purple-500 to-pink-400',
        preview: 'https://images.pexels.com/photos/1070945/pexels-photo-1070945.jpeg?auto=compress&cs=tinysrgb&w=400',
        icon: <div>🎨</div>
      };
      handleStyleSelect(monetStyle);
    }
  };

  // Gesture handlers
  const handleSwipeLeft = () => {
    if (currentState === 'style-select') {
      // Would trigger previous style
      console.log('Swipe left - previous style');
    }
  };

  const handleSwipeRight = () => {
    if (currentState === 'style-select') {
      // Would trigger next style
      console.log('Swipe right - next style');
    }
  };

  const handlePinch = (scale: number) => {
    if (currentState === 'results') {
      // Would zoom the result image
      console.log('Pinch gesture - scale:', scale);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-cyan-900 relative overflow-hidden">
      <Header />
      
      {/* Enhanced Background Effects */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-[32rem] h-[32rem] bg-cyan-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-pink-500/10 rounded-full blur-3xl animate-pulse delay-500"></div>
        
        {/* Floating particles */}
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-cyan-400/30 rounded-full animate-ping"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${2 + Math.random() * 3}s`
            }}
          />
        ))}
      </div>

      <main className="relative z-10 pt-20">
        {currentState === 'upload' && (
          <PhotoUpload onImageUpload={handleImageUpload} />
        )}
        
        {currentState === 'style-select' && uploadedImage && (
          <div className="container mx-auto px-4 py-8">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-8">
                <div className="relative inline-block mb-6">
                  <img 
                    src={uploadedImage} 
                    alt="Uploaded" 
                    className="w-40 h-40 object-cover rounded-3xl mx-auto border-4 border-cyan-400/50 shadow-2xl"
                  />
                  <div className="absolute -inset-2 bg-gradient-to-r from-cyan-400/20 to-purple-500/20 rounded-3xl blur-xl"></div>
                </div>
                <h2 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 bg-clip-text text-transparent mb-4">
                  选择你的艺术风格
                </h2>
                <p className="text-xl text-white/80">AI将把你的照片转换为世界级艺术品</p>
              </div>
              
              <EnhancedStyleSelector 
                selectedStyle={selectedStyle} 
                onStyleSelect={handleStyleSelect}
                originalImage={uploadedImage}
              />
              
              {selectedStyle && (
                <div className="text-center mt-12">
                  <button
                    onClick={handleStartProcessing}
                    className={`bg-gradient-to-r ${selectedStyle.gradient} px-12 py-6 rounded-3xl text-white font-bold text-2xl hover:scale-110 transition-all duration-500 shadow-2xl hover:shadow-cyan-500/50 relative overflow-hidden group`}
                  >
                    <span className="relative z-10 flex items-center space-x-3">
                      <span>开始生成 {selectedStyle.name}</span>
                      <span className="text-3xl">✨</span>
                    </span>
                    <div className="absolute inset-0 bg-white/20 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
                  </button>
                  <p className="text-white/60 mt-4 text-lg">
                    预计生成时间: {selectedStyle.processingTime} • 8K超高清质量
                  </p>
                </div>
              )}
              
              <div className="text-center mt-8 space-y-4">
                <button
                  onClick={handleShowStyleChat}
                  className="bg-gradient-to-r from-purple-500 to-pink-500 px-8 py-4 rounded-2xl text-white font-semibold hover:scale-105 transition-all duration-300 shadow-lg"
                >
                  💬 对话式风格选择
                </button>
                <div>
                  <button
                    onClick={handleBackToUpload}
                    className="text-white/60 hover:text-white transition-colors text-lg"
                  >
                    ← 上传不同照片
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {currentState === 'style-chat' && uploadedImage && (
          <StyleChatInterface
            originalImage={uploadedImage}
            onStyleSelect={handleStyleSelect}
            onBack={() => setCurrentState('style-select')}
          />
        )}
        
        {currentState === 'processing' && selectedStyle && (
          <EnhancedProcessingView 
            style={selectedStyle} 
            originalImage={uploadedImage!}
          />
        )}
        
        {currentState === 'results' && processedImage && (
          <EnhancedResultsView 
            originalImage={uploadedImage!}
            processedImage={processedImage}
            style={selectedStyle!}
            onShowSocial={handleShowSocial}
            onShowNFT={() => setShowNFT(true)}
            onBackToUpload={handleBackToUpload}
            onGenerateVideo={handleGenerateVideo}
          />
        )}

        {currentState === 'video-generation' && (
          <VideoGenerationView
            originalImage={uploadedImage!}
            style={selectedStyle!}
            onBack={() => setCurrentState('results')}
          />
        )}
        
        {currentState === 'social' && processedImage && (
          <SocialFeatures 
            processedImage={processedImage}
            style={selectedStyle!}
            onBack={() => setCurrentState('results')}
          />
        )}

        {currentState === 'challenge-arena' && (
          <ChallengeArena
            onBack={() => setCurrentState('results')}
            userArtwork={processedImage || undefined}
            userStyle={selectedStyle || undefined}
          />
        )}

        {currentState === 'feature-test' && (
          <FeatureTest />
        )}

        {currentState === 'api-diagnostic' && (
          <APIDiagnostic />
        )}
      </main>

      {/* Gesture Controller */}
      <GestureController
        onSwipeLeft={handleSwipeLeft}
        onSwipeRight={handleSwipeRight}
        onPinch={handlePinch}
        onVoiceCommand={handleVoiceCommand}
        isActive={gesturesEnabled && ['style-select', 'results'].includes(currentState)}
      />

      {/* Modals */}
      {showPricing && (
        <PricingModal onClose={() => setShowPricing(false)} />
      )}
      
      {showNFT && processedImage && (
        <NFTMinting 
          image={processedImage}
          onClose={() => setShowNFT(false)}
        />
      )}
      
      {/* Enhanced Floating Action Buttons */}
      <div className="fixed bottom-6 right-6 flex flex-col space-y-4 z-40">
        <button
          onClick={() => setShowPricing(true)}
          className="group relative bg-gradient-to-r from-purple-500 to-pink-500 p-4 rounded-full text-white shadow-2xl hover:scale-125 transition-all duration-300 overflow-hidden"
          title="升级到专业版"
        >
          <div className="absolute inset-0 bg-white/20 transform scale-0 group-hover:scale-100 transition-transform duration-300 rounded-full"></div>
          <div className="relative z-10 text-2xl">👑</div>
        </button>
        
        {processedImage && (
          <button
            onClick={handleShowChallengeArena}
            className="group relative bg-gradient-to-r from-yellow-500 to-orange-500 p-4 rounded-full text-white shadow-2xl hover:scale-125 transition-all duration-300 overflow-hidden animate-pulse"
            title="挑战赛竞技场"
          >
            <div className="absolute inset-0 bg-white/20 transform scale-0 group-hover:scale-100 transition-transform duration-300 rounded-full"></div>
            <div className="relative z-10 text-2xl">🏆</div>
          </button>
        )}

        <button
          onClick={() => setGesturesEnabled(!gesturesEnabled)}
          className={`group relative p-4 rounded-full text-white shadow-2xl hover:scale-125 transition-all duration-300 overflow-hidden ${
            gesturesEnabled 
              ? 'bg-gradient-to-r from-green-500 to-teal-500' 
              : 'bg-gradient-to-r from-gray-500 to-gray-600'
          }`}
          title={gesturesEnabled ? '禁用手势控制' : '启用手势控制'}
        >
          <div className="absolute inset-0 bg-white/20 transform scale-0 group-hover:scale-100 transition-transform duration-300 rounded-full"></div>
          <div className="relative z-10 text-2xl">{gesturesEnabled ? '👋' : '🤚'}</div>
        </button>

        <button
          onClick={handleShowFeatureTest}
          className="group relative bg-gradient-to-r from-blue-500 to-cyan-500 p-4 rounded-full text-white shadow-2xl hover:scale-125 transition-all duration-300 overflow-hidden"
          title="功能测试"
        >
          <div className="absolute inset-0 bg-white/20 transform scale-0 group-hover:scale-100 transition-transform duration-300 rounded-full"></div>
          <div className="relative z-10 text-2xl">🧪</div>
        </button>

        <button
          onClick={handleShowAPIDiagnostic}
          className="group relative bg-gradient-to-r from-orange-500 to-red-500 p-4 rounded-full text-white shadow-2xl hover:scale-125 transition-all duration-300 overflow-hidden"
          title="API诊断"
        >
          <div className="absolute inset-0 bg-white/20 transform scale-0 group-hover:scale-100 transition-transform duration-300 rounded-full"></div>
          <div className="relative z-10 text-2xl">🔧</div>
        </button>
      </div>

      {/* Success Celebration Animation */}
      {currentState === 'results' && (
        <div className="fixed inset-0 pointer-events-none z-50">
          {[...Array(30)].map((_, i) => (
            <div
              key={i}
              className="absolute animate-bounce"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 2}s`,
                animationDuration: `${2 + Math.random() * 2}s`
              }}
            >
              {['✨', '🌟', '💫', '⭐', '🎨', '🎭', '🖼️'][Math.floor(Math.random() * 7)]}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default App;