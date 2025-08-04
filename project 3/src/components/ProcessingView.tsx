import React, { useState, useEffect } from 'react';
import { Loader2, Sparkles, Zap, Cpu, Palette } from 'lucide-react';
import { Style } from './StyleSelector';

interface ProcessingViewProps {
  style: Style;
  originalImage: string;
}

export const ProcessingView: React.FC<ProcessingViewProps> = ({ style, originalImage }) => {
  const [progress, setProgress] = useState(0);
  const [currentStep, setCurrentStep] = useState(0);

  const steps = [
    { icon: <Cpu className="w-6 h-6" />, label: 'Analyzing image...', duration: 800 },
    { icon: <Palette className="w-6 h-6" />, label: 'Applying AI style...', duration: 1200 },
    { icon: <Sparkles className="w-6 h-6" />, label: 'Enhancing details...', duration: 700 },
    { icon: <Zap className="w-6 h-6" />, label: 'Finalizing masterpiece...', duration: 300 }
  ];

  useEffect(() => {
    let totalDuration = 0;
    let currentDuration = 0;

    steps.forEach((step, index) => {
      totalDuration += step.duration;
      setTimeout(() => {
        setCurrentStep(index);
      }, currentDuration);
      currentDuration += step.duration;
    });

    const progressInterval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return prev + 1;
      });
    }, totalDuration / 100);

    return () => clearInterval(progressInterval);
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="max-w-2xl mx-auto text-center">
        {/* Preview Image */}
        <div className="relative mb-8">
          <div className="w-64 h-64 mx-auto rounded-2xl overflow-hidden border-4 border-white/20">
            <img 
              src={originalImage} 
              alt="Processing" 
              className="w-full h-full object-cover"
            />
          </div>
          
          {/* Processing Overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/20 to-purple-600/20 rounded-2xl backdrop-blur-sm border-4 border-white/20">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className={`w-20 h-20 rounded-full bg-gradient-to-r ${style.gradient} flex items-center justify-center animate-pulse`}>
                <Loader2 className="w-10 h-10 text-white animate-spin" />
              </div>
            </div>
          </div>
          
          {/* Floating particles */}
          <div className="absolute -inset-4">
            {[...Array(8)].map((_, i) => (
              <div
                key={i}
                className="absolute w-2 h-2 bg-cyan-400 rounded-full animate-ping"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 2}s`,
                  animationDuration: `${1 + Math.random()}s`
                }}
              />
            ))}
          </div>
        </div>

        {/* Style Info */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-white mb-2">
            Creating {style.name} Masterpiece
          </h2>
          <p className="text-white/70 text-lg">{style.description}</p>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="bg-white/10 rounded-full h-3 mb-4 overflow-hidden">
            <div 
              className={`h-full bg-gradient-to-r ${style.gradient} transition-all duration-300 ease-out relative`}
              style={{ width: `${progress}%` }}
            >
              <div className="absolute inset-0 bg-white/20 animate-pulse"></div>
            </div>
          </div>
          <p className="text-white font-medium text-lg">{progress}% Complete</p>
        </div>

        {/* Current Step */}
        <div className="space-y-4">
          {steps.map((step, index) => (
            <div 
              key={index}
              className={`flex items-center justify-center space-x-3 transition-all duration-500 ${
                index === currentStep 
                  ? 'text-white scale-110' 
                  : index < currentStep 
                    ? 'text-green-400' 
                    : 'text-white/40'
              }`}
            >
              <div className={`p-2 rounded-full ${
                index === currentStep 
                  ? `bg-gradient-to-r ${style.gradient} animate-pulse` 
                  : index < currentStep 
                    ? 'bg-green-500' 
                    : 'bg-white/10'
              }`}>
                {step.icon}
              </div>
              <span className="font-medium">{step.label}</span>
              {index < currentStep && (
                <div className="w-2 h-2 bg-green-400 rounded-full"></div>
              )}
            </div>
          ))}
        </div>

        {/* Fun Facts */}
        <div className="mt-12 p-6 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10">
          <h4 className="text-lg font-semibold text-white mb-2">✨ Did you know?</h4>
          <p className="text-white/70">
            Our AI processes over 10 million parameters to understand your photo's composition, 
            lighting, and emotional context before applying the perfect artistic transformation.
          </p>
        </div>
      </div>
    </div>
  );
};