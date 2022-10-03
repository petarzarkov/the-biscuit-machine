import React from "react";
import { useColorModeValue, Icon, HStack, Image, Text } from "@chakra-ui/react";
import { useAnimationProvider } from "@hooks";
import { MotionStyle, motion, AnimatePresence } from "framer-motion";
import { GiCookie } from "react-icons/gi";

export const Cookie: React.FC<{ motionStyle?: MotionStyle; x: number }> = ({ motionStyle, x }) => {
    const defaultX = 15;
    const { isRunning, duration, isHeated, isPaused, setControls, score } = useAnimationProvider();
    const [isDoughComplete, setIsDoughComplete] = React.useState(false);
    const [showScore, setShowScore] = React.useState(false);
    const [pausedAt, setPausedAt] = React.useState({
        one: defaultX,
        two: defaultX
    });
    const iconColor = useColorModeValue("primary.700", "primary.100");
    const baseStyle = {
        width: 50,
        height: 50,
        padding: 0,
        margin: 0,
    };

    const [isBaking, setIsBaking] = React.useState(false);

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
                            x: isPaused ? pausedAt.one : defaultX,
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
                            if (latest.x > 0 && showScore) {
                                setShowScore(false);
                            }

                            if (!isPaused) {
                                setPausedAt({
                                    ...pausedAt,
                                    one: latest.x as number,
                                });
                            }
                            // Magic number 30, don't touch
                            if (latest.x >= (x / 3) - 30 && isRunning) {
                                setControls({
                                    isStamping: true
                                });
                            }

                            if (latest.x >= x / 3 && isRunning) {
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
                            x: isPaused ? pausedAt.two : x / 3,
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
                                setPausedAt({
                                    ...pausedAt,
                                    two: latest.x as number
                                });
                            }

                            if (latest.x >= x / 1.5) {
                                setIsBaking(true);
                            }

                            if (latest.x >= x || !isRunning) {
                                setIsDoughComplete(false);
                                setIsBaking(false);
                            }

                            if (latest.x === x) {
                                setControls({
                                    score: score + 1
                                });
                                setShowScore(true);
                            }
                        }}
                    >

                        {
                            isBaking ?
                                <Image
                                    src={"images/cookieBaked.png"}
                                    style={{
                                        ...baseStyle
                                    }}
                                />
                                :
                                <Icon as={GiCookie}
                                    color={iconColor}
                                    style={{
                                        ...baseStyle
                                    }}
                                />
                        }

                    </motion.div>
                }
                {showScore &&
                                <motion.div
                                    key="scoreOne"
                                    style={{
                                        ...baseStyle,
                                        ...motionStyle,
                                        x: x
                                    }}
                                    animate={{
                                        transition: {
                                            ease: "linear",
                                            duration,
                                            repeat: Infinity
                                        }
                                    }}
                                >
                                    <Text color={iconColor}>{"+1"}</Text>
                                </motion.div>
                }

            </AnimatePresence>
        </HStack>
    );
};