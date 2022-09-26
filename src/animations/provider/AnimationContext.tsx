import React from "react";
import { Expand } from "@contracts";
import { AnimationControls } from "framer-motion";

export type ProviderBase = Expand<{
    controls: AnimationControls | undefined;
}>;

export type ContextState = Expand<ProviderBase>;

export const AnimationContext = React.createContext<ContextState | undefined>(
    undefined,
);
