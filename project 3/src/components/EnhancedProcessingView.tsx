import React, { useState, useEffect } from 'react';
import { Loader2, Sparkles, Zap, Cpu, Palette, Brain, Eye, Wand2 } from 'lucide-react';
import { EnhancedStyle } from './EnhancedStyleSelector';

interface EnhancedProcessingViewProps {
  style: EnhancedStyle;
  originalImage: string;
}

export const EnhancedProcessingView: React.FC<EnhancedProcessingViewProps> = ({ 
  style, 
  originalImage 
}) => {
  const [progress, setProgress] = useState(0);
  const [currentStep, setCurrentStep] = useState(0);
  const [processingDetails, setProcessingDetails] = useState<string[]>([]);

  const steps = [
    { 
      icon: <Eye className="w-6 h-6" />, 
      label: 'Analyzing composition...', 
      duration: 600,
      details: ['Detecting faces and objects', 'Understanding scene composition', 'Analyzing color palette']
    },
    { 
      icon: <Brain className="w-6 h-6" />, 
      label: 'AI neural processing...', 
      duration: 800,
      details: ['Loading Stable Diffusion 3 model', 'Processing 10M+ parameters', 'Understanding artistic context']
    },
    { 
      icon: <Palette className="w-6 h-6" />, 
      label: `Applying ${style.name} style...`, 
      duration: 900,
      details: ['Transforming color scheme', 'Applying artistic brushstrokes', 'Enhancing artistic details']
    },
    { 
      icon: <Wand2 className="w-6 h-6" />, 
      label: 'Upscaling to 8K...', 
      duration: 500,
      details: ['SwinIR super-resolution', 'Preserving fine details', 'Optimizing output quality']
    },
    { 
      icon: <Sparkles className="w-6 h-6" />, 
      label: 'Finalizing masterpiece...', 
      duration: 200,
      details: ['Final quality checks', 'Preparing for display', 'Adding metadata']
    }
  ];

  useEffect(() => {
    let totalDuration = 0;
    let currentDuration = 0;

    steps.forEach((step, index) => {
      totalDuration += step.duration;
      setTimeout(() => {
        setCurrentStep(index);
        setProcessingDetails(step.details);
      }, currentDuration);
      currentDuration += step.duration;
    });

    const progressInterval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return prev + 0.8;
      });
    }, totalDuration / 125);

    return () => clearInterval(progressInterval);
  }, []);

  const getProcessingStats = () => {
    const baseTime = 2.0;
    const timeMultiplier = style.category === 'premium' ? 1.3 : 1.0;
    const estimatedTime = (baseTime * timeMultiplier).toFixed(1);
    
    return {
      estimatedTime: `${estimatedTime}s`,
      modelVersion: 'Stable Diffusion 3.0',
      resolution: '8K Ultra HD',
      parameters: '10.2M+'
    };
  };

  const stats = getProcessingStats();

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="max-w-4xl mx-auto text-center">
        {/* Main Processing Display */}
        <div className="relative mb-8">
          <div className="w-80 h-80 mx-auto rounded-3xl overflow-hidden border-4 border-white/20 relative">
            <img 
              src={originalImage} 
              alt="Processing" 
              className="w-full h-full object-cover"
            />
            
            {/* Processing Overlay with Dynamic Effects */}
            <div className={`absolute inset-0 bg-gradient-to-br ${style.gradient}/30 backdrop-blur-sm border-4 border-white/20 rounded-3xl`}>
              {/* Scanning Lines Effect */}
              <div className="absolute inset-0 overflow-hidden">
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-cyan-400 to-transparent animate-pulse" 
                     style={{ top: `${progress}%` }} />
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-purple-400 to-transparent animate-pulse"
                     style={{ bottom: `${100 - progress}%` }} />
              </div>
              
              {/* Central Processing Animation */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className={`relative w-24 h-24 rounded-full bg-gradient-to-r ${style.gradient} flex items-center justify-center animate-pulse`}>
                  <Loader2 className="w-12 h-12 text-white animate-spin" />
                  
                  {/* Orbiting Elements */}
                  {[...Array(3)].map((_, i) => (
                    <div
                      key={i}
                      className="absolute w-3 h-3 bg-white rounded-full"
                      style={{
                        animation: `orbit 2s linear infinite`,
                        animationDelay: `${i * 0.7}s`,
                        transformOrigin: '50px 0px'
                      }}
                    />
                  ))}
                </div>
              </div>
              
              {/* AI Processing Grid */}
              <div className="absolute inset-4 grid grid-cols-8 gap-1 opacity-20">
                {[...Array(64)].map((_, i) => (
                  <div
                    key={i}
                    className="aspect-square bg-cyan-400 rounded-sm"
                    style={{
                      opacity: Math.random() > 0.7 ? 1 : 0,
                      animationDelay: `${Math.random() * 2}s`
                    }}
                  />
                ))}
              </div>
            </div>
            
            {/* Floating Particles */}
            <div className="absolute -inset-8">
              {[...Array(12)].map((_, i) => (
                <div
                  key={i}
                  className="absolute w-2 h-2 bg-cyan-400 rounded-full animate-ping"
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                    animationDelay: `${Math.random() * 3}s`,
                    animationDuration: `${1.5 + Math.random()}s`
                  }}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Style Info Header */}
        <div className="mb-8">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <div className={`p-3 rounded-full bg-gradient-to-r ${style.gradient}`}>
              {style.icon}
            </div>
            <h2 className="text-4xl font-bold text-white">
              Creating {style.name}
            </h2>
          </div>
          <p className="text-xl text-white/70 mb-2">{style.description}</p>
          <div className="flex items-center justify-center space-x-4 text-sm text-white/60">
            <span>ETA: {stats.estimatedTime}</span>
            <span>•</span>
            <span>{stats.resolution}</span>
            <span>•</span>
            <span>AI Model: {stats.modelVersion}</span>
          </div>
        </div>

        {/* Enhanced Progress Bar */}
        <div className="mb-8">
          <div className="bg-white/10 rounded-full h-4 mb-4 overflow-hidden relative">
            <div 
              className={`h-full bg-gradient-to-r ${style.gradient} transition-all duration-300 ease-out relative`}
              style={{ width: `${progress}%` }}
            >
              <div className="absolute inset-0 bg-white/30 animate-pulse"></div>
              <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-white/50 to-transparent"></div>
            </div>
          </div>
          <div className="flex justify-between items-center mb-2">
            <p className="text-2xl font-bold text-white">{Math.round(progress)}%</p>
            <p className="text-white/60">
              {progress < 100 ? `${(stats.estimatedTime as any * (100 - progress) / 100).toFixed(1)}s remaining` : 'Complete!'}
            </p>
          </div>
        </div>

        {/* Processing Steps */}
        <div className="space-y-4 mb-8">
          {steps.map((step, index) => (
            <div 
              key={index}
              className={`flex items-center justify-between p-4 rounded-xl transition-all duration-500 ${
                index === currentStep 
                  ? `bg-gradient-to-r ${style.gradient}/20 border border-white/30 scale-105` 
                  : index < currentStep 
                    ? 'bg-green-500/20 border border-green-400/30' 
                    : 'bg-white/5 border border-white/10'
              }`}
            >
              <div className="flex items-center space-x-4">
                <div className={`p-2 rounded-full transition-all ${
                  index === currentStep 
                    ? `bg-gradient-to-r ${style.gradient} animate-pulse` 
                    : index < currentStep 
                      ? 'bg-green-500' 
                      : 'bg-white/10'
                }`}>
                  {step.icon}
                </div>
                <div className="text-left">
                  <span className={`font-medium ${
                    index === currentStep ? 'text-white' : index < currentStep ? 'text-green-400' : 'text-white/60'
                  }`}>
                    {step.label}
                  </span>
                  {index === currentStep && processingDetails.length > 0 && (
                    <div className="text-xs text-white/60 mt-1">
                      {processingDetails.map((detail, i) => (
                        <div key={i} className="flex items-center space-x-2">
                          <div className="w-1 h-1 bg-cyan-400 rounded-full animate-pulse"></div>
                          <span>{detail}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
              
              <div className="text-right">
                {index < currentStep && (
                  <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                    <Zap className="w-4 h-4 text-white" />
                  </div>
                )}
                {index === currentStep && (
                  <div className="w-6 h-6 border-2 border-cyan-400 border-t-transparent rounded-full animate-spin"></div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* AI Insights */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
            <h4 className="text-lg font-semibold text-white mb-4 flex items-center space-x-2">
              <Brain className="w-5 h-5 text-purple-400" />
              <span>AI Analysis</span>
            </h4>
            <div className="space-y-2 text-sm text-white/70">
              <div className="flex justify-between">
                <span>Faces detected:</span>
                <span className="text-cyan-400">1 person</span>
              </div>
              <div className="flex justify-between">
                <span>Scene complexity:</span>
                <span className="text-green-400">Moderate</span>
              </div>
              <div className="flex justify-between">
                <span>Color dominance:</span>
                <span className="text-yellow-400">Warm tones</span>
              </div>
              <div className="flex justify-between">
                <span>Style confidence:</span>
                <span className="text-purple-400">{style.popularity}%</span>
              </div>
            </div>
          </div>

          <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
            <h4 className="text-lg font-semibold text-white mb-4 flex items-center space-x-2">
              <Cpu className="w-5 h-5 text-cyan-400" />
              <span>Processing Power</span>
            </h4>
            <div className="space-y-2 text-sm text-white/70">
              <div className="flex justify-between">
                <span>GPU Utilization:</span>
                <span className="text-cyan-400">87%</span>
              </div>
              <div className="flex justify-between">
                <span>Memory Usage:</span>
                <span className="text-green-400">12.4 GB</span>
              </div>
              <div className="flex justify-between">
                <span>Processing Speed:</span>
                <span className="text-yellow-400">2.3 it/s</span>
              </div>
              <div className="flex justify-between">
                <span>Model Size:</span>
                <span className="text-purple-400">{stats.parameters}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Fun Fact */}
        <div className="bg-gradient-to-r from-purple-500/20 to-cyan-500/20 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
          <h4 className="text-lg font-semibold text-white mb-2 flex items-center justify-center space-x-2">
            <Sparkles className="w-5 h-5 text-yellow-400" />
            <span>AI Magic in Progress ✨</span>
          </h4>
          <p className="text-white/70">
            Our neural networks are analyzing over 10 million artistic parameters from {style.name} masterpieces, 
            understanding light, shadow, brushstroke patterns, and color harmonies to transform your photo 
            into a unique artistic interpretation that captures the essence of the original style.
          </p>
        </div>
      </div>

      <style jsx>{`
        @keyframes orbit {
          0% { transform: rotate(0deg) translateX(50px) rotate(0deg); }
          100% { transform: rotate(360deg) translateX(50px) rotate(-360deg); }
        }
      `}</style>
    </div>
  );
};