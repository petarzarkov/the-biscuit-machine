import React from "react";
import { Expand } from "@contracts";

export type AnimationProviderBase = Expand<{
    isRunning: boolean;
    isPaused: boolean;
    duration: number;
    initialTemp: number;
    heatedTemp: number;
    explodeTemp: number;
    isStamping: boolean;
    isExtruding: boolean;
    isHeated: boolean;
    isExploded: boolean;
    score: number;
    highScore: number;
    temperature: number;
}>;

export type AnimationContextState = Expand<AnimationProviderBase> & {
    setControls: (controls: Partial<AnimationProviderBase>) => void;
    temperature: number;
    setTemperature: (newTemperature: number) => void;
    toggleTemperature: (incremenet: number) => void;
};

export const AnimationContext = React.createContext<AnimationContextState | undefined>(
    undefined,
);
