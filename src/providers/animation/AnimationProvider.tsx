import { temp } from "@config";
import { useIteration } from "@hooks";
import React from "react";
import { AnimationProviderBase, AnimationContext } from "./AnimationContext";

export const AnimationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const originalIncrement = 0.05;
    const [state, setState] = React.useState<AnimationProviderBase>({
        isRunning: false,
        isPaused: false,
        duration: 2,
        initialTemp: temp.initialTemp,
        heatedTemp: temp.heatedTemp,
        explodeTemp: temp.explodeTemp
    });
    const [isHeated, setIsHeated] = React.useState(false);
    const [isExploded, setIsExploded] = React.useState(false);

    const { iteration, setIteration, toggleIteration, toggleIncrement } = useIteration(state.initialTemp, originalIncrement);
    React.useEffect(() => {
        if (state.isRunning) {
            toggleIncrement(originalIncrement);
            toggleIteration(true);
        }

    }, [state.isRunning, toggleIteration]);

    React.useEffect(() => {
        if (state.isPaused) {
            toggleIncrement(-originalIncrement);
        }
    }, [state.isPaused]);

    React.useEffect(() => {
        if (iteration >= state.heatedTemp) {
            setIsHeated(true);
            if (!state.isPaused) {
                toggleIncrement(0.01);
            }
        } else {
            setIsHeated(false);
        }

        if (!state.isRunning) {
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
                isRunning: false,
                isPaused: false
            });
            setIsExploded(true);

        }

    }, [state.isRunning, state.isPaused, iteration]);

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
                toggleTemperature: toggleIncrement,
                isExploded,
                setIsExploded
            }}
        >
            {children}
        </AnimationContext.Provider>
    );
};
