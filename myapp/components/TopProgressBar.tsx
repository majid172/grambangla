'use client';

import React, { useEffect, useState, useRef } from 'react';

/**
 * Event-driven trigger to start the top progress bar anywhere across the app.
 * Can be called during API mutations, Cart actions, Admin updates, etc.
 * Zero browser reload required!
 */
export function triggerTopProgress(durationMs: number = 600) {
  if (typeof window !== 'undefined') {
    window.dispatchEvent(
      new CustomEvent('gb-top-progress', {
        detail: { duration: durationMs }
      })
    );
  }
}

export default function TopProgressBar() {
  const [progress, setProgress] = useState(0);
  const [visible, setVisible] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const finishTimerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const handleStart = (e: Event) => {
      const customEvent = e as CustomEvent<{ duration?: number }>;
      const duration = customEvent.detail?.duration || 600;

      // Clear any existing timers
      if (timerRef.current) clearTimeout(timerRef.current);
      if (finishTimerRef.current) clearTimeout(finishTimerRef.current);

      setVisible(true);
      setProgress(25);

      // Fast progress to 75%
      timerRef.current = setTimeout(() => {
        setProgress(75);
      }, duration * 0.3);

      // Finish to 100%
      finishTimerRef.current = setTimeout(() => {
        setProgress(100);
        // Fade out
        setTimeout(() => {
          setVisible(false);
          setProgress(0);
        }, 300);
      }, duration);
    };

    window.addEventListener('gb-top-progress', handleStart);

    return () => {
      window.removeEventListener('gb-top-progress', handleStart);
      if (timerRef.current) clearTimeout(timerRef.current);
      if (finishTimerRef.current) clearTimeout(finishTimerRef.current);
    };
  }, []);

  if (!visible && progress === 0) return null;

  return (
    <div
      aria-hidden="true"
      className="fixed top-0 left-0 right-0 z-[99999] pointer-events-none h-[3px] bg-transparent"
    >
      <div
        className="h-full bg-gradient-to-r from-[#244C32] via-[#E5B83F] to-[#E5B83F] shadow-[0_0_10px_#E5B83F,0_0_5px_#244C32] transition-all ease-out"
        style={{
          width: `${progress}%`,
          transitionDuration: progress === 100 ? '200ms' : '350ms',
          opacity: visible ? 1 : 0,
        }}
      />
    </div>
  );
}
