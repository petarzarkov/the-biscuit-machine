import React from "react";
import { ProviderBase, AnimationContext } from "./AnimationContext";
import { useAnimationControls } from "framer-motion";

export const AnimationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const animationControls = useAnimationControls();
    const [state, setControls] = React.useState<ProviderBase>({
        controls: undefined
    });

    React.useEffect(() => {
        setControls({
            controls: animationControls
        });
    }, []);

    return (
        <AnimationContext.Provider
            value={{
                ...state
            }}
        >
            {children}
        </AnimationContext.Provider>
    );
};
