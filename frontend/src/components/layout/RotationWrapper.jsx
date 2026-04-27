import React, { useState, useEffect, createContext, useContext } from 'react';
import { useLocation } from 'react-router-dom';

// Context so child pages can know when the app is in rotated mode
export const RotationContext = createContext(false);
export const useRotation = () => useContext(RotationContext);

/**
 * RotationWrapper
 * Forces a 90-degree rotation on mobile portrait to simulate landscape.
 */
export default function RotationWrapper({ children }) {
  const [shouldRotate, setShouldRotate] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const checkRotation = () => {
      if (location.pathname === '/') {
        setShouldRotate(false);
        return;
      }

      const isMobile = window.innerWidth < 1024;
      const isPortrait = window.innerHeight > window.innerWidth;
      const devicePreference = localStorage.getItem('leadbook_device');

      // Only rotate if manually selected 'mobile' AND it's a mobile screen in portrait
      setShouldRotate(isMobile && isPortrait && devicePreference === 'mobile');
    };

    // Run on mount
    checkRotation();

    // Re-check on resize/orientation change
    window.addEventListener('resize', checkRotation);
    window.addEventListener('orientationchange', checkRotation);
    
    // Custom event or simple interval to catch localStorage changes without reload
    const interval = setInterval(checkRotation, 500);

    return () => {
      window.removeEventListener('resize', checkRotation);
      window.removeEventListener('orientationchange', checkRotation);
      clearInterval(interval);
    };
  }, [location.pathname]);

  return (
    <RotationContext.Provider value={false}>
      {children}
    </RotationContext.Provider>
  );
}
