import React from "react";
import { Expand } from "@contracts";

export type AnimationProviderBase = Expand<{
    isRunning: boolean;
    isPaused: boolean;
    duration: number;
    initialTemp: number;
    heatedTemp: number;
    explodeTemp: number;
}>;

export type AnimationContextState = Expand<AnimationProviderBase> & {
    setControls: (controls: Partial<AnimationProviderBase>) => void;
    isHeated: boolean;
    temperature: number;
    setTemperature: (newTemperature: number) => void;
    toggleTemperature: (incremenet: number) => void;
    isExploded: boolean;
    setIsExploded: (c: boolean) => void;
};

export const AnimationContext = React.createContext<AnimationContextState | undefined>(
    undefined,
);
