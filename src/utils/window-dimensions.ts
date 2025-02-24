import { useState, useEffect } from 'react';

interface WindowDimensions {
    width: number;
    height: number;
}

export const useWindowDimensions = (): WindowDimensions => {
    const [windowDimensions, setWindowDimensions] = useState<WindowDimensions>({
        width: 0,
        height: 0,
    });

    useEffect(() => {
        if (!window) {
            return;
        }
        const handleResize = () => {
            setWindowDimensions({
                width: window.innerWidth,
                height: window.innerHeight,
            });
        };

        window.addEventListener('resize', handleResize);
        
        // Cleanup function to remove event listener
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []); // Empty dependency array means this effect runs once on mount

    return windowDimensions;
};

export default useWindowDimensions;