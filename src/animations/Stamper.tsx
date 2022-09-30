import React from "react";
import { Image } from "@chakra-ui/react";
import { motion } from "framer-motion";
import { useAnimationProvider } from "@hooks";

// I really cannot draw
export const Stamper: React.FC<{ x: number }> = ({ x }) => {
    const { isRunning, duration, isPaused, isHeated } = useAnimationProvider();

    return (
        <motion.div
            style={{
                padding: 0,
                margin: 0,
                width: 50,
                height: 50,
                marginLeft: x / 2
            }}
            animate={!isRunning || isPaused ? {} : isHeated && {
                y: 50,
                transition: {
                    skewY: 50,
                    ease: "linear",
                    duration,
                    repeat: Infinity
                }
            }}
        >
            <Image
                src={"images/stamper.png"}
                style={{
                    padding: 0,
                    margin: 0
                }}
            />
        </motion.div>
    );
};
