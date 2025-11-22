import React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useAnimationProvider, useInterval } from "@hooks";

// I really cannot draw
export const Extruder: React.FC = () => {
    const { isRunning, isPaused, isHeated, setControls, isExtruding } = useAnimationProvider();
    const [b, setB] = React.useState(1);

    const { toggleInterval } = useInterval(() => {
        if (b === 4) {
            setB(1);
            return;
        }

        if (b !== 4) setB(b + 1);
    }, 200);

    React.useEffect(() => {
        if (isRunning && isHeated) {
            if (b !== 4) setB(b + 1);
            toggleInterval(true);
        }

        if (isPaused) {
            toggleInterval(false);
        }

        return () => {
            setB(1);
            toggleInterval(false);
        };

    }, [isRunning, isHeated, isPaused]);

    React.useEffect(() => {
        if (b === 4) {
            setControls({
                isExtruding: false
            });
        }
    }, [b]);

    return (
        <AnimatePresence>
            <motion.img
                src={isExtruding ? `images/extruder${b}.png` : "images/extruder1.png"}
                style={{
                    padding: 0,
                    margin: 0,
                    width: 50,
                    height: 50,
                    x: 15
                }}
                animate={!isRunning || isPaused ? {} : isHeated && isExtruding && {
                    filter: "hue-rotate(360deg)",
                    transition: {
                        ease: "linear",
                        repeat: Infinity
                    }
                }}
            />
        </AnimatePresence>
    );
};
