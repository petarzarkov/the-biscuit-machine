import React from "react";
import { useColorModeValue, Icon, HStack } from "@chakra-ui/react";
import { useAnimationProvider } from "@hooks";
import { MotionStyle, motion } from "framer-motion";
import { FaCookie } from "react-icons/fa";
import { GiCookie } from "react-icons/gi";

export const Cookie: React.FC<{ motionStyle?: MotionStyle; x: number }> = ({ motionStyle, x }) => {
    const { isStopped, duration } = useAnimationProvider();
    const iconColor = useColorModeValue("primary.700", "primary.100");
    const baseStyle = {
        width: 25,
        height: 25,
        padding: 0,
        margin: 0,
    };

    const getCookieIcon = (isStamped: boolean) => {
        return <Icon as={isStamped ? GiCookie : FaCookie}
            color={iconColor}
            style={{
                ...baseStyle
            }}
        />;
    };

    return (
        <HStack>
            <motion.div
                style={{
                    ...baseStyle,
                    ...motionStyle,
                    x: 0,
                    y: 90
                }}
                animate={isStopped ? {} : {
                    x: x / 2,
                    rotate: 360,
                    transition: {
                        ease: "linear",
                        duration,
                        repeat: Infinity
                    }
                }}
            >
                {getCookieIcon(false)}
            </motion.div>
            <motion.div
                style={{
                    ...baseStyle,
                    ...motionStyle,
                    x: x / 2,
                    y: 90
                }}
                animate={isStopped ? {} : {
                    x,
                    rotate: 360,
                    transition: {
                        ease: "linear",
                        duration,
                        delay: duration,
                        repeat: Infinity
                    }
                }}
            >
                {getCookieIcon(true)}
            </motion.div>
        </HStack>
    );
};