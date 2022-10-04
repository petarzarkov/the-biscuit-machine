import React from "react";
import { useColorModeValue, Icon, HStack, Image, Tag, TagLabel, TagRightIcon } from "@chakra-ui/react";
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

    const [skewY, setSkewY] = React.useState(0);

    const [isBaking, setIsBaking] = React.useState(false);
    const xPercent = x / 10;
    React.useEffect(() => {
        if (!isRunning && isDoughComplete) {
            setIsDoughComplete(false);
        }

    }, [isRunning]);

    React.useEffect(() => {
        setControls({
            isExtruding: true
        });
    }, []);

    const calcDynamicDuration = (from: number, to: number) => {
        const distance = to - from;
        const ratio = to / duration;
        const x = distance / ratio;
        const newDuration = x * duration || duration;
        return newDuration;
    };

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
                                duration: calcDynamicDuration(pausedAt.one !== defaultX ? pausedAt.one : defaultX, x / 2),
                                repeatDelay: 1,
                                repeat: Infinity
                            }
                        }}
                        onUpdate={(latest) => {
                            if (!isPaused) {
                                setPausedAt({
                                    ...pausedAt,
                                    one: latest.x as number,
                                });
                            }
                            // Magic number 30, don't touch
                            if (latest.x >= (x / 3) - 30 && isRunning && skewY !== 52) {
                                setControls({
                                    isStamping: true
                                });
                                setSkewY(52);
                            }

                            if (latest.x >= x / 3 && isRunning && !isDoughComplete) {
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
                            },
                            skewY: skewY,
                        }}
                        animate={!isRunning || isPaused ? {} : isHeated && {
                            x: x - xPercent,
                            rotate: 360,
                            transition: {
                                ease: "linear",
                                duration: calcDynamicDuration(pausedAt.two !== x / 3 ? pausedAt.two : x / 3, x - xPercent),
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

                            if (latest.x >= x / 2.2 && skewY !== 0) {
                                setSkewY(0);
                            }
                            if (latest.x >= x / 1.5 && !isBaking) {
                                setIsBaking(true);
                            }

                            if ((latest.x >= (x - xPercent) || !isRunning) && isBaking && isDoughComplete) {
                                setIsDoughComplete(false);
                                setIsBaking(false);

                                setControls({
                                    isExtruding: true
                                });
                            }

                            if (latest.x >= (x - xPercent) && !showScore && score !== (score + 1)) {
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
            </AnimatePresence>
            {showScore &&
                                <motion.div
                                    key="scoreOne"
                                    style={{
                                        ...baseStyle,
                                        ...motionStyle,
                                        x: x - xPercent
                                    }}
                                    animate={{
                                        x,
                                        rotate: 360,
                                        y: 50,
                                        transition: {
                                            ease: "linear",
                                            duration: duration / 2,
                                        }
                                    }}
                                    onUpdate={(latest) => {
                                        if (latest.x as number >= x) {
                                            setShowScore(false);
                                        }
                                    }}
                                >

                                    <Tag size={"md"} key={"scoreOneTag"} variant='subtle' color={iconColor}>
                                        <TagLabel>{"+1"}</TagLabel>
                                        <TagRightIcon
                                            as={GiCookie}
                                            color={iconColor}
                                            p={0}
                                            m={0}
                                        />
                                    </Tag>
                                </motion.div>
            }

        </HStack>
    );
};