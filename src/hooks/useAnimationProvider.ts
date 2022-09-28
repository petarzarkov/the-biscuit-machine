import React from "react";
import { AnimationContext } from "@animation";

export function useAnimationProvider() {
    const context = React.useContext(AnimationContext);
    if (context === undefined) {
        throw new Error("useAnimationProvider must be used within an AnimationProvider");
    }

    return context;
}
