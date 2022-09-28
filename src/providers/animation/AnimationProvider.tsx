import React from "react";
import { AnimationProviderBase, AnimationContext } from "./AnimationContext";

export const AnimationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [state, setControls] = React.useState<AnimationProviderBase>({
        isStopped: false
    });

    React.useEffect(() => {
        setControls({
            isStopped: true
        });
    }, []);

    return (
        <AnimationContext.Provider
            value={{
                ...state,
                setControls
            }}
        >
            {children}
        </AnimationContext.Provider>
    );
};
