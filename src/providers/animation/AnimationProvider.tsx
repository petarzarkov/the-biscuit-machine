import { useIteration } from "@hooks";
import React from "react";
import { AnimationProviderBase, AnimationContext } from "./AnimationContext";

export const AnimationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const initialTemp = 170;
    const [state, setState] = React.useState<AnimationProviderBase>({
        isStopped: true,
        isPaused: false,
        duration: 2,

    });
    const [isHeated, setIsHeated] = React.useState(false);

    const { iteration, setIteration, toggleIteration, toggleIncrement } = useIteration(initialTemp, 0.05);
    React.useEffect(() => {
        if (!state.isStopped) {
            toggleIteration(true);
        }

    }, [state.isStopped, toggleIteration]);

    React.useEffect(() => {
        if (iteration >= 220) {
            setIsHeated(true);
            toggleIncrement(0.01);
        }

        if (state.isStopped) {
            setIsHeated(false);
            setIteration(initialTemp);
            toggleIteration(false);
        }

        if (iteration >= 260) {
            setIsHeated(false);
            setIteration(initialTemp);
            toggleIteration(false);
            setState({
                ...state,
                isStopped: true,
            });
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
                setTemperature: setIteration
            }}
        >
            {children}
        </AnimationContext.Provider>
    );
};
