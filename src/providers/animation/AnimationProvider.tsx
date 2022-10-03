import { temp } from "@config";
import { useIteration } from "@hooks";
import { getData, storeData } from "@store";
import React from "react";
import { AnimationProviderBase, AnimationContext } from "./AnimationContext";

export const AnimationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const { originalIncrement, heatedIncrement } = {
        originalIncrement: 0.05,
        heatedIncrement: 0.01
    };

    const initialState: AnimationProviderBase = {
        isRunning: false,
        isPaused: false,
        duration: 2,
        initialTemp: temp.initialTemp,
        heatedTemp: temp.heatedTemp,
        explodeTemp: temp.explodeTemp,
        isStamping: false,
        isExtruding: false,
        isHeated: false,
        isExploded: false,
        score: 0,
        highScore: 0,
        temperature: temp.initialTemp
    };

    const [state, dispatch] = React.useReducer<(state: AnimationProviderBase, updates: Partial<AnimationProviderBase>) => AnimationProviderBase>(
        (state, updates) => {
            return {
                ...state,
                ...updates
            };
        },
    initialState
    );

    React.useEffect(() => {
        const data = getData<{ highscore: number }>("high_score");

        if (data?.highscore) {
            dispatch({
                highScore: data.highscore
            });
        }

    }, []);

    const { iteration, setIteration, toggleIteration, toggleIncrement } = useIteration(state.initialTemp, originalIncrement);
    React.useEffect(() => {
        if (state.isRunning) {
            toggleIncrement(originalIncrement);
            toggleIteration(true);
        }

    }, [state.isRunning, toggleIteration]);

    React.useEffect(() => {
        if (state.score > state.highScore) {
            dispatch({
                highScore: state.score
            });
            void storeData("high_score", {
                highscore: state.score
            });
        }

    }, [state.score, state.highScore]);

    React.useEffect(() => {
        if (iteration >= state.heatedTemp) {
            dispatch({
                isHeated: true,
                temperature: Math.round(iteration)
            });
            if (!state.isPaused) {
                toggleIncrement(heatedIncrement);
            }

            if (iteration >= (temp.heatedTemp + temp.explodeTemp) / 2 && state.isPaused) {
                toggleIncrement(-heatedIncrement);
            }
        } else {
            dispatch({
                isHeated: false,
                temperature: Math.round(iteration)
            });
            if (state.isPaused) {
                toggleIncrement(heatedIncrement);
            }
        }

        if (!state.isRunning) {
            dispatch({
                isHeated: false,
                temperature: state.initialTemp
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
                isExploded: true,
                temperature: state.initialTemp
            });

        }

    }, [state.isRunning, state.isPaused, iteration]);

    return (
        <AnimationContext.Provider
            value={{
                ...state,
                setControls: dispatch,
                setTemperature: setIteration,
                toggleTemperature: toggleIncrement
            }}
        >
            {children}
        </AnimationContext.Provider>
    );
};
