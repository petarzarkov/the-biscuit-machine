import React from "react";
import { Image } from "@chakra-ui/react";
import { motion, AnimatePresence } from "framer-motion";
import { useAnimationProvider } from "@hooks";

// I really cannot draw
export const Stamper: React.FC<{ x: number }> = ({ x }) => {
    const { isRunning, isStamping, isPaused, setControls } = useAnimationProvider();
    const [pausedAt, setPausedAt] = React.useState(0);

    return (
        <AnimatePresence>
            <motion.div
                style={{
                    padding: 0,
                    margin: 0,
                    width: 50,
                    height: 50,
                    marginLeft: (x / 3) - 50,
                    y: isPaused ? pausedAt : 0
                }}
                animate={!isRunning || isPaused ? {
                    rotate: [-1, 1.3, -1.5, 1, -0.5, 0, 1, -1.4, 0],
                    transition: {
                        repeatDelay: 0.2,
                        repeat: Infinity
                    }
                } : isStamping ? {
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
                    if (!isPaused && isRunning && pausedAt !== latest.y) {
                        setPausedAt(latest.y as number);
                    }

                    // Needs to be here because onAnimationComplete does not trigger on android
                    if (latest.y as number >= 50 && isStamping) {
                        setControls({
                            isStamping: false
                        });
                    }
                }}
                onAnimationComplete={() => {
                    setControls({
                        isStamping: false
                    });
                }}
            >
                <Image
                    src={"images/anvil.png"}
                    style={{
                        padding: 0,
                        margin: 0
                    }}
                />
            </motion.div>
        </AnimatePresence>
    );
};
