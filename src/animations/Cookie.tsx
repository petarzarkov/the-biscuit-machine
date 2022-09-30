import React from "react";
import { useColorModeValue, Icon, HStack } from "@chakra-ui/react";
import { useAnimationProvider } from "@hooks";
import { MotionStyle, motion, AnimatePresence } from "framer-motion";
import { GiCookie } from "react-icons/gi";
import { SiAiqfome } from "react-icons/si";

export const Cookie: React.FC<{ motionStyle?: MotionStyle; x: number }> = ({ motionStyle, x }) => {
    const { isStopped, duration, isHeated } = useAnimationProvider();
    const [isDoughComplete, setIsDoughComplete] = React.useState(false);
    const iconColor = useColorModeValue("primary.700", "primary.100");
    const baseStyle = {
        width: 25,
        height: 25,
        padding: 0,
        margin: 0,
    };

    const getCookieIcon = (isStamped: boolean) => {
        return <Icon as={isStamped ? GiCookie : SiAiqfome}
            color={iconColor}
            style={{
                ...baseStyle
            }}
        />;
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
                            x: 15,
                        }}
                        animate={isStopped ? {} : isHeated && {
                            x: x / 2,
                            rotate: 360,
                            transition: {
                                ease: "linear",
                                duration,
                                repeatDelay: 1,
                                repeat: Infinity
                            }
                        }}
                        onUpdate={(latest) => {
                            if (latest.x >= x / 2 && !isStopped) {
                                setIsDoughComplete(true);
                            }
                        }}
                    >
                        {getCookieIcon(false)}
                    </motion.div>
                    :
                    <motion.div
                        key="rawCookie"
                        style={{
                            ...baseStyle,
                            ...motionStyle,
                            x: x / 2
                        }}
                        animate={isStopped ? {} : isHeated && {
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
                            if (latest.x >= x || isStopped) {
                                setIsDoughComplete(false);
                            }
                        }}
                    >
                        {getCookieIcon(true)}
                    </motion.div>
                }
            </AnimatePresence>
        </HStack>
    );
};