import React from "react";
import { ProviderBase, AnimationContext } from "./AnimationContext";
import { useAnimationControls } from "framer-motion";

export const AnimationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const animationControls = useAnimationControls();
    const [state, setControls] = React.useState<ProviderBase>({
        controls: animationControls
    });

    React.useEffect(() => {
        setControls({
            controls: animationControls
        });
    }, []);

    const restartControls = () => {
        setControls({
            controls: animationControls
        });
    };

    return (
        <AnimationContext.Provider
            value={{
                ...state,
                setControls: (controls) => setControls({ controls }),
                restartControls
            }}
        >
            {children}
        </AnimationContext.Provider>
    );
};
