import React, { useEffect, useRef, useState } from 'react';
import { Hand, Mic, Volume2, VolumeX } from 'lucide-react';

interface GestureControllerProps {
  onSwipeLeft: () => void;
  onSwipeRight: () => void;
  onPinch: (scale: number) => void;
  onVoiceCommand: (command: string) => void;
  isActive: boolean;
}

export const GestureController: React.FC<GestureControllerProps> = ({
  onSwipeLeft,
  onSwipeRight,
  onPinch,
  onVoiceCommand,
  isActive
}) => {
  const [isListening, setIsListening] = useState(false);
  const [gestureMode, setGestureMode] = useState<'touch' | 'voice' | 'both'>('both');
  const touchStartRef = useRef<{ x: number; y: number; time: number } | null>(null);
  const recognitionRef = useRef<any>(null);
  const lastPinchDistanceRef = useRef<number>(0);

  // Touch gesture handlers
  const handleTouchStart = (e: TouchEvent) => {
    if (!isActive) return;
    
    if (e.touches.length === 1) {
      touchStartRef.current = {
        x: e.touches[0].clientX,
        y: e.touches[0].clientY,
        time: Date.now()
      };
    } else if (e.touches.length === 2) {
      const distance = Math.sqrt(
        Math.pow(e.touches[0].clientX - e.touches[1].clientX, 2) +
        Math.pow(e.touches[0].clientY - e.touches[1].clientY, 2)
      );
      lastPinchDistanceRef.current = distance;
    }
  };

  const handleTouchMove = (e: TouchEvent) => {
    if (!isActive || !touchStartRef.current) return;

    if (e.touches.length === 2) {
      const distance = Math.sqrt(
        Math.pow(e.touches[0].clientX - e.touches[1].clientX, 2) +
        Math.pow(e.touches[0].clientY - e.touches[1].clientY, 2)
      );
      
      if (lastPinchDistanceRef.current > 0) {
        const scale = distance / lastPinchDistanceRef.current;
        onPinch(scale);
      }
      
      lastPinchDistanceRef.current = distance;
    }
  };

  const handleTouchEnd = (e: TouchEvent) => {
    if (!isActive || !touchStartRef.current || e.touches.length > 0) return;

    const touchEnd = {
      x: e.changedTouches[0].clientX,
      y: e.changedTouches[0].clientY,
      time: Date.now()
    };

    const deltaX = touchEnd.x - touchStartRef.current.x;
    const deltaY = touchEnd.y - touchStartRef.current.y;
    const deltaTime = touchEnd.time - touchStartRef.current.time;

    // Swipe detection
    if (Math.abs(deltaX) > 50 && Math.abs(deltaX) > Math.abs(deltaY) && deltaTime < 300) {
      if (deltaX > 0) {
        onSwipeRight();
      } else {
        onSwipeLeft();
      }
    }

    touchStartRef.current = null;
  };

  // Voice recognition setup
  const setupVoiceRecognition = () => {
    if (!('webkitSpeechRecognition' in window)) {
      console.warn('Speech recognition not supported');
      return;
    }

    const recognition = new (window as any).webkitSpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = false;
    recognition.lang = 'en-US';

    recognition.onstart = () => {
      setIsListening(true);
    };

    recognition.onresult = (event: any) => {
      const command = event.results[event.results.length - 1][0].transcript.toLowerCase().trim();
      onVoiceCommand(command);
    };

    recognition.onerror = () => {
      setIsListening(false);
    };

    recognition.onend = () => {
      setIsListening(false);
      if (gestureMode === 'voice' || gestureMode === 'both') {
        setTimeout(() => {
          if (recognitionRef.current) {
            recognitionRef.current.start();
          }
        }, 100);
      }
    };

    recognitionRef.current = recognition;
  };

  const startVoiceRecognition = () => {
    if (recognitionRef.current && (gestureMode === 'voice' || gestureMode === 'both')) {
      try {
        recognitionRef.current.start();
      } catch (error) {
        console.warn('Voice recognition start failed:', error);
      }
    }
  };

  const stopVoiceRecognition = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
      setIsListening(false);
    }
  };

  useEffect(() => {
    if (isActive) {
      // Add touch event listeners
      document.addEventListener('touchstart', handleTouchStart, { passive: false });
      document.addEventListener('touchmove', handleTouchMove, { passive: false });
      document.addEventListener('touchend', handleTouchEnd, { passive: false });

      // Setup voice recognition
      setupVoiceRecognition();
      startVoiceRecognition();
    }

    return () => {
      document.removeEventListener('touchstart', handleTouchStart);
      document.removeEventListener('touchmove', handleTouchMove);
      document.removeEventListener('touchend', handleTouchEnd);
      stopVoiceRecognition();
    };
  }, [isActive, gestureMode]);

  if (!isActive) return null;

  return (
    <div className="fixed bottom-4 left-4 z-50">
      <div className="bg-black/60 backdrop-blur-sm rounded-2xl p-4 border border-white/20">
        <div className="flex items-center space-x-4">
          {/* Gesture Mode Toggle */}
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setGestureMode(gestureMode === 'touch' ? 'both' : 'touch')}
              className={`p-2 rounded-lg transition-colors ${
                gestureMode === 'touch' || gestureMode === 'both'
                  ? 'bg-cyan-500/20 text-cyan-400'
                  : 'bg-white/10 text-white/60'
              }`}
              title="Touch gestures"
            >
              <Hand className="w-5 h-5" />
            </button>
            
            <button
              onClick={() => {
                if (gestureMode === 'voice') {
                  setGestureMode('touch');
                  stopVoiceRecognition();
                } else {
                  setGestureMode('voice');
                  startVoiceRecognition();
                }
              }}
              className={`p-2 rounded-lg transition-colors ${
                gestureMode === 'voice' || gestureMode === 'both'
                  ? 'bg-purple-500/20 text-purple-400'
                  : 'bg-white/10 text-white/60'
              }`}
              title="Voice commands"
            >
              {isListening ? (
                <Volume2 className="w-5 h-5 animate-pulse" />
              ) : (
                <VolumeX className="w-5 h-5" />
              )}
            </button>
          </div>

          {/* Status Indicator */}
          <div className="text-white/60 text-sm">
            {gestureMode === 'touch' && 'Touch: Swipe & Pinch'}
            {gestureMode === 'voice' && (isListening ? 'Voice: Listening...' : 'Voice: Ready')}
            {gestureMode === 'both' && (isListening ? '🎤 Listening...' : '👋 Gestures Active')}
          </div>
        </div>

        {/* Quick Commands Help */}
        {isListening && (
          <div className="mt-3 pt-3 border-t border-white/10">
            <div className="text-white/40 text-xs space-y-1">
              <div>Say: "next style", "previous", "select", "generate"</div>
              <div>Or: "cyberpunk", "monet", "anime", "watercolor"</div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};