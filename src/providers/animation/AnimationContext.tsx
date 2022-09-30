import React from "react";
import { Expand } from "@contracts";

export type AnimationProviderBase = Expand<{
    isStopped: boolean;
    isPaused: boolean;
    duration: number;
}>;

export type AnimationContextState = Expand<AnimationProviderBase> & {
    setControls: (controls: Partial<AnimationProviderBase>) => void;
    isHeated: boolean;
    temperature: number;
    setTemperature: (newTemperature: number) => void;
};

export const AnimationContext = React.createContext<AnimationContextState | undefined>(
    undefined,
);
