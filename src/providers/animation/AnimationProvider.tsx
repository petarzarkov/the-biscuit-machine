import React from "react";
import { AnimationProviderBase, AnimationContext } from "./AnimationContext";

export const AnimationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [state, setState] = React.useState<AnimationProviderBase>({
        isStopped: true,
        isPaused: false,
        duration: 2
    });

    React.useEffect(() => {
        return setState({
            ...state,
            isStopped: true
        });
    }, []);

    return (
        <AnimationContext.Provider
            value={{
                ...state,
                setControls: (c) => {
                    setState({
                        ...state,
                        ...c
                    });
                }
            }}
        >
            {children}
        </AnimationContext.Provider>
    );
};
