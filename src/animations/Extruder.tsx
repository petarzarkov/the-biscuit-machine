import React from "react";
import { motion } from "framer-motion";
import { useAnimationProvider, useInterval } from "@hooks";

// I really cannot draw
export const Extruder: React.FC<{ toggleCookie?: (n: number) => void }> = ({ toggleCookie }) => {
    const { isRunning, duration, isPaused, isHeated } = useAnimationProvider();
    const [b, setB] = React.useState(1);

    const { toggleInterval } = useInterval(() => {
        if (b === 4) {
            setB(1);
            return;
        }

        if (b !== 4) setB(b + 1);
    }, (duration * 1000) / 4);

    React.useEffect(() => {
        if (isRunning && isHeated) {
            // eslint-disable-next-line @typescript-eslint/no-unused-expressions
            toggleCookie && toggleCookie(b);
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

    return (
        <motion.img
            src={`images/extruder${b}.png`}
            style={{
                padding: 0,
                margin: 0,
                width: 50,
                height: 50,
                x: 15
            }}
            animate={!isRunning || isPaused ? {} : isHeated && {
                filter: "hue-rotate(360deg)",
                transition: {
                    ease: "linear",
                    duration: duration,
                    repeat: Infinity
                }
            }}
        >
        </motion.img>
    );
};
