import { temp } from "@config";
import { getData, storeData } from "@store";
import React from "react";
import { AnimationProviderBase, AnimationContext } from "./AnimationContext";

export const AnimationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const initialState: AnimationProviderBase = {
        isRunning: false,
        isPaused: false,
        duration: 2,
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

    return (
        <AnimationContext.Provider
            value={{
                ...state,
                setControls: dispatch
            }}
        >
            {children}
        </AnimationContext.Provider>
    );
};
