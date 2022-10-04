import React from "react";
import { Expand } from "@contracts";

export type AnimationProviderBase = Expand<{
    isRunning: boolean;
    isPaused: boolean;
    duration: number;
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
};

export const AnimationContext = React.createContext<AnimationContextState | undefined>(
    undefined,
);
