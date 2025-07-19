import React, { useState, useEffect } from 'react';
import whooshSound from '../assets/whoosh.mp3';

interface LoadingScreenProps {
  onComplete: () => void;
}

const LoadingScreen: React.FC<LoadingScreenProps> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  const [startTime] = useState(Date.now());
  const [hasInteracted, setHasInteracted] = useState(false);

  useEffect(() => {
    console.log('LoadingScreen mounted, starting progress...');
    
    // Preload the audio
    const audio = new Audio(whooshSound);
    audio.volume = 0.6;
    
    // Add click listener to enable audio
    const handleInteraction = () => {
      if (!hasInteracted) {
        setHasInteracted(true);
        // Try to play audio to unlock it
        audio.play().then(() => {
          audio.pause();
          audio.currentTime = 0;
        }).catch(err => console.log('Audio unlock failed:', err));
      }
    };

    document.addEventListener('click', handleInteraction);
    document.addEventListener('touchstart', handleInteraction);
    
    const interval = setInterval(() => {
      setProgress(prev => {
        const elapsed = Date.now() - startTime;
        const minTime = 3000; // 3 seconds total
        
        // Fast progress to reach 100% in 3 seconds
        const newProgress = prev + 2; // Increment by 2% each time
        
        console.log(`Progress: ${prev}% -> ${newProgress}%, Elapsed: ${elapsed}ms`);
        
        if (newProgress >= 100 && elapsed >= minTime) {
          console.log('Progress complete, clearing interval');
          clearInterval(interval);
          
          // Play whoosh sound effect
          audio.play().catch(err => console.log('Audio play failed:', err));
          
          setTimeout(() => {
            console.log('Setting isVisible to false');
            setIsVisible(false);
            setTimeout(() => {
              console.log('Calling onComplete');
              onComplete();
            }, 500); // Shorter fade out
          }, 500); // Shorter delay before fade
          return 100;
        }
        
        return Math.min(newProgress, 100);
      });
    }, 60); // Much faster interval - 60ms between each 2% increment

    return () => {
      console.log('LoadingScreen unmounting, clearing interval');
      clearInterval(interval);
      document.removeEventListener('click', handleInteraction);
      document.removeEventListener('touchstart', handleInteraction);
    };
  }, [onComplete, startTime, hasInteracted]);

  console.log(`LoadingScreen render - progress: ${progress}%, isVisible: ${isVisible}`);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-50 bg-slate-900 flex items-center justify-center">
      {/* Subtle Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="w-full h-full" style={{
          backgroundImage: `
            linear-gradient(to right, #64748b 1px, transparent 1px),
            linear-gradient(to bottom, #64748b 1px, transparent 1px)
          `,
          backgroundSize: '100px 100px'
        }}></div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 text-center max-w-md mx-auto px-8">
        {/* Minimal Logo */}
        <div className="mb-12">
          <div className="flex items-center justify-center space-x-3 mb-6">
            <div className="w-10 h-10 bg-slate-700 border border-slate-600 rounded-md flex items-center justify-center">
              <span className="text-slate-300 font-mono font-medium text-sm">PB</span>
            </div>
            <span className="text-2xl font-mono font-light text-slate-200">
              PRESS<span className="text-slate-400 font-normal">BOX</span>
            </span>
          </div>
        </div>

        {/* Minimal Progress Bar */}
        <div className="w-full h-1 bg-slate-800 rounded-full mb-8 relative overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-slate-600 to-slate-500 rounded-full transition-all duration-200 ease-out"
            style={{ width: `${progress}%` }}
          >
            {/* Subtle Glow */}
            <div className="absolute inset-0 bg-slate-400/20 rounded-full"></div>
          </div>
        </div>

        {/* Progress Text */}
        <div className="text-lg font-mono font-light text-slate-300 mb-8">
          <span className="tracking-wider">
            {Math.floor(progress)}%
          </span>
        </div>

        {/* Minimal Loading Text */}
        <div className="text-slate-500 text-xs font-mono tracking-wide">
          <span className="animate-pulse">initializing</span>
          <span className="animate-pulse" style={{ animationDelay: '0.5s' }}>...</span>
        </div>

        {/* Subtle Corner Elements */}
        <div className="absolute top-8 left-8 w-6 h-6 border-l border-t border-slate-700 opacity-30"></div>
        <div className="absolute top-8 right-8 w-6 h-6 border-r border-t border-slate-700 opacity-30"></div>
        <div className="absolute bottom-8 left-8 w-6 h-6 border-l border-b border-slate-700 opacity-30"></div>
        <div className="absolute bottom-8 right-8 w-6 h-6 border-r border-b border-slate-700 opacity-30"></div>

        {/* Minimal Floating Dots */}
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="absolute w-0.5 h-0.5 bg-slate-600 rounded-full animate-pulse"
              style={{
                left: `${25 + i * 25}%`,
                top: `${40 + i * 10}%`,
                animationDelay: `${i * 0.8}s`,
                animationDuration: '3s'
              }}
            ></div>
          ))}
        </div>
      </div>

      {/* Subtle Completion Message */}
      {progress >= 100 && (
        <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2 text-slate-500 text-xs font-mono tracking-wider animate-pulse">
          ready
        </div>
      )}
    </div>
  );
};

export default LoadingScreen; 