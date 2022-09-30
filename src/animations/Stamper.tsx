import React from "react";
import { Image } from "@chakra-ui/react";
import { motion } from "framer-motion";
import { useAnimationProvider } from "@hooks";

// I really cannot draw
export const Stamper: React.FC<{ x: number }> = ({ x }) => {
    const { isRunning, isStamping, isPaused, setIsStamping } = useAnimationProvider();
    const [pausedAt, setPausedAt] = React.useState(0);

    return (
        <motion.div
            style={{
                padding: 0,
                margin: 0,
                width: 50,
                height: 50,
                marginLeft: (x / 3) - 50,
                y: isPaused ? pausedAt : 0
            }}
            animate={!isRunning || isPaused ? {} : isStamping ? {
                y: 50,
                transition: {
                    ease: "linear"
                }
            } : {
                y: 0,
                transition: {
                    ease: "linear"
                }
            }}
            onUpdate={(latest) => {
                if (!isPaused) {
                    setPausedAt(latest.y as number);
                }
            }}
            onAnimationComplete={() => {
                setIsStamping(false);
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
