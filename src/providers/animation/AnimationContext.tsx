import React from "react";
import { Expand } from "@contracts";

export type AnimationProviderBase = Expand<{
    isStopped: boolean;
}>;

export type AnimationContextState = Expand<AnimationProviderBase> & {
    setControls: (controls: AnimationProviderBase) => void;
};

export const AnimationContext = React.createContext<AnimationContextState | undefined>(
    undefined,
);
