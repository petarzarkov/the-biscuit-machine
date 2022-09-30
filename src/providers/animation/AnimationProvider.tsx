import { useIteration } from "@hooks";
import React from "react";
import { AnimationProviderBase, AnimationContext } from "./AnimationContext";

export const AnimationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const originalIncrement = 0.05;
    const [state, setState] = React.useState<AnimationProviderBase>({
        isStopped: true,
        isPaused: false,
        duration: 2,
        initialTemp: 200,
        heatedTemp: 220,
        explodeTemp: 260
    });
    const [isHeated, setIsHeated] = React.useState(false);
    const [isExploded, setIsExploded] = React.useState(false);

    const { iteration, setIteration, toggleIteration, toggleIncrement } = useIteration(state.initialTemp, originalIncrement);
    React.useEffect(() => {
        if (!state.isStopped) {
            toggleIncrement(originalIncrement);
            toggleIteration(true);
        }

    }, [state.isStopped, toggleIteration]);

    React.useEffect(() => {
        if (iteration >= state.heatedTemp) {
            setIsHeated(true);
            toggleIncrement(0.01);
        }

        if (state.isStopped) {
            setIsHeated(false);
            setIteration(state.initialTemp);
            toggleIteration(false);
        }

        if (iteration >= state.explodeTemp) {
            setIsHeated(false);
            setIteration(state.initialTemp);
            toggleIteration(false);
            setState({
                ...state,
                isStopped: true,
            });
            setIsExploded(true);
        }

    }, [state.isStopped, iteration]);

    return (
        <AnimationContext.Provider
            value={{
                ...state,
                setControls: (c) => {
                    setState({
                        ...state,
                        ...c
                    });
                },
                isHeated,
                temperature: Math.round(iteration),
                setTemperature: setIteration,
                isExploded,
                setIsExploded
            }}
        >
            {children}
        </AnimationContext.Provider>
    );
};
