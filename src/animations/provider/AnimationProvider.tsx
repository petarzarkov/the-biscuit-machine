import React from "react";
import { ProviderBase, AnimationContext } from "./AnimationContext";

export const AnimationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [state, setControls] = React.useState<ProviderBase>({
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
