"use client";

import { createContext, useContext, ReactNode, useEffect, useState } from 'react';
import { useMediaQuery } from 'react-responsive';

interface MediaQueryContextType {
    isMobile: boolean;
    isTablet: boolean;
    isDesktop: boolean;
    isLoading: boolean;
}

const MediaQueryContext = createContext<MediaQueryContextType | undefined>(undefined);

interface MediaQueryProviderProps {
    children: ReactNode;
    userAgent?: string;
}

export function MediaQueryProvider({ children, userAgent }: MediaQueryProviderProps) {
    const [isLoading, setIsLoading] = useState(true);
  
    // Default to desktop view during SSR to avoid layout shift
    const defaultMobile = false;
    const defaultTablet = false;
    const defaultDesktop = true;
  
    const isMobile = useMediaQuery({ maxWidth: 768 });
    const isTablet = useMediaQuery({
        minWidth: 769,
        maxWidth: 1024 
    });
    const isDesktop = useMediaQuery({ minWidth: 1025 });
  
    useEffect(() => {
        setIsLoading(false);
    }, []);
  
    // During SSR or initial load, use defaults
    const value: MediaQueryContextType = {
        isMobile: isLoading ? defaultMobile : isMobile,
        isTablet: isLoading ? defaultTablet : isTablet,
        isDesktop: isLoading ? defaultDesktop : isDesktop,
        isLoading
    };

    return (
        <MediaQueryContext.Provider value={value}>
            {children}
        </MediaQueryContext.Provider>
    );
}

export const useMediaQueries = () => {
    const context = useContext(MediaQueryContext);
    if (!context) {
        throw new Error('useMediaQueries must be used within MediaQueryProvider');
    }
    return context;
};

// components/MyComponent.tsx
// import { useMediaQueries } from '../contexts/MediaQueryContext';

// export default function MyComponent() {
//   const { isMobile, isTablet, isDesktop, isLoading } = useMediaQueries();
  
//   // Option 1: Show loading state
//   if (isLoading) {
//     return <div>Loading...</div>;
//   }
  
//   // Option 2: Or render content immediately with defaults
//   return (
//     <div>
//       {isMobile && <MobileView />}
//       {isTablet && <TabletView />}
//       {isDesktop && <DesktopView />}
//     </div>
//   );
// }