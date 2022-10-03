import { temp } from "@config";
import { useIteration } from "@hooks";
import React from "react";
import { AnimationProviderBase, AnimationContext } from "./AnimationContext";

export const AnimationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const { originalIncrement, heatedIncrement } = {
        originalIncrement: 0.05,
        heatedIncrement: 0.01
    };
    const [initialState, setState] = React.useState<AnimationProviderBase>({
        isRunning: false,
        isPaused: false,
        duration: 2,
        initialTemp: temp.initialTemp,
        heatedTemp: temp.heatedTemp,
        explodeTemp: temp.explodeTemp,
        isStamping: false,
        isHeated: false,
        isExploded: false,
    });

    const [state, dispatch] = React.useReducer<(state: AnimationProviderBase, updates: Partial<AnimationProviderBase>) => AnimationProviderBase>(
        (state, updates) => {
            setState(state);
            return {
                ...state,
                ...updates
            };
        },
    initialState
    );

    const { iteration, setIteration, toggleIteration, toggleIncrement } = useIteration(state.initialTemp, originalIncrement);
    React.useEffect(() => {
        if (state.isRunning) {
            toggleIncrement(originalIncrement);
            toggleIteration(true);
        }

    }, [state.isRunning, toggleIteration]);

    React.useEffect(() => {
        if (iteration >= state.heatedTemp) {
            dispatch({
                isHeated: true
            });
            if (!state.isPaused) {
                toggleIncrement(heatedIncrement);
            }

            if (iteration >= (temp.heatedTemp + temp.explodeTemp) / 2 && state.isPaused) {
                toggleIncrement(-heatedIncrement);
            }
        } else {
            dispatch({
                isHeated: false
            });
            if (state.isPaused) {
                toggleIncrement(heatedIncrement);
            }
        }

        if (!state.isRunning) {
            dispatch({
                isHeated: false
            });
            setIteration(state.initialTemp);
            toggleIteration(false);
        }

        if (iteration >= state.explodeTemp) {
            setIteration(state.initialTemp);
            toggleIteration(false);
            dispatch({
                isHeated: false,
                isRunning: false,
                isPaused: false,
                isExploded: true
            });

        }

    }, [state.isRunning, state.isPaused, iteration]);

    return (
        <AnimationContext.Provider
            value={{
                ...state,
                setControls: dispatch,
                temperature: Math.round(iteration),
                setTemperature: setIteration,
                toggleTemperature: toggleIncrement
            }}
        >
            {children}
        </AnimationContext.Provider>
    );
};
