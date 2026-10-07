import { DotLottie } from "@lottiefiles/dotlottie-react";
import { useEffect, useState } from "react";

export function useDotLottieLoaded(dotLottie: DotLottie | null) {
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        if (!dotLottie) {
            setIsLoaded(false);
            return;
        }

        const performCheck = () => {
            if (dotLottie.isLoaded) {
                setIsLoaded(true);
                return true;
            }
            return false;
        };

        // Initial check
        if (performCheck()) return;

        // Set up interval
        const checkInterval = setInterval(() => {
            if (performCheck()) {
                clearInterval(checkInterval);
            }
        }, 100);

        return () => {
            if (checkInterval) clearInterval(checkInterval);
        };
    }, [dotLottie]);

    return isLoaded;
}