import React from "react";
import { useColorModeValue, Icon, HStack, Image } from "@chakra-ui/react";
import { useAnimationProvider } from "@hooks";
import { MotionStyle, motion, AnimatePresence } from "framer-motion";
import { GiCookie } from "react-icons/gi";

export const Cookie: React.FC<{ motionStyle?: MotionStyle; x: number }> = ({ motionStyle, x }) => {
    const { isRunning, duration, isHeated, isPaused } = useAnimationProvider();
    const [isDoughComplete, setIsDoughComplete] = React.useState(false);
    const [pausedAt, setPausedAt] = React.useState(15);
    const iconColor = useColorModeValue("primary.700", "primary.100");
    const baseStyle = {
        width: 50,
        height: 50,
        padding: 0,
        margin: 0,
    };

    React.useEffect(() => {
        if (!isRunning && isDoughComplete) {
            setIsDoughComplete(false);
        }

    }, [isRunning]);

    return (
        <HStack>
            <AnimatePresence mode="wait">
                {!isDoughComplete ?
                    <motion.div
                        key="dough"
                        style={{
                            ...baseStyle,
                            ...motionStyle,
                            x: isPaused ? pausedAt : 15,
                            ...!isRunning && {
                                visibility: "hidden"
                            }
                        }}
                        animate={!isRunning || isPaused ? {} : isHeated && {
                            x: x / 2,
                            transition: {
                                ease: "linear",
                                duration,
                                repeatDelay: 1,
                                repeat: Infinity
                            }
                        }}
                        onUpdate={(latest) => {
                            if (!isPaused) {
                                setPausedAt(latest.x as number);
                            }
                            if (latest.x >= x / 2 && isRunning) {
                                setIsDoughComplete(true);
                            }
                        }}
                    >
                        <Image
                            src={"images/jumpyDough.webp"}
                            style={{
                                padding: 0,
                                margin: 0
                            }}
                        />
                    </motion.div>
                    :
                    <motion.div
                        key="rawCookie"
                        style={{
                            ...baseStyle,
                            ...motionStyle,
                            x: isPaused ? pausedAt : x / 2,
                            ...!isRunning && {
                                visibility: "hidden"
                            }
                        }}
                        animate={!isRunning || isPaused ? {} : isHeated && {
                            x: x,
                            rotate: 360,
                            transition: {
                                ease: "linear",
                                duration,
                                delay: 1,
                                repeat: Infinity
                            }
                        }}
                        onUpdate={(latest) => {
                            if (!isPaused) {
                                setPausedAt(latest.x as number);
                            }

                            if (latest.x >= x || !isRunning) {
                                setIsDoughComplete(false);
                            }
                        }}
                    >
                        <Icon as={GiCookie}
                            color={iconColor}
                            style={{
                                ...baseStyle
                            }}
                        />
                    </motion.div>
                }
            </AnimatePresence>
        </HStack>
    );
};