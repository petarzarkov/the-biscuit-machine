import React from "react";
import { Expand } from "@contracts";

export type ProviderBase = Expand<{
    isStopped: boolean;
}>;

export type ContextState = Expand<ProviderBase> & {
    setControls: (controls: ProviderBase) => void;
};

export const AnimationContext = React.createContext<ContextState | undefined>(
    undefined,
);
