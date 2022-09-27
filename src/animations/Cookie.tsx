import React from "react";
import { useColorModeValue, Icon } from "@chakra-ui/react";
import { useAnimationProvider } from "@hooks";
import { MotionStyle, motion } from "framer-motion";
import { FaCookie } from "react-icons/fa";
import { GiCookie } from "react-icons/gi";

export const Cookie: React.FC<{ motionStyle?: MotionStyle; x: number }> = ({ motionStyle, x }) => {
    const { isStopped } = useAnimationProvider();
    const iconColor = useColorModeValue("primary.700", "primary.100");
    const baseStyle = {
        width: 25,
        height: 25,
        padding: 0,
        margin: 0,
    };

    const getCookieIcon = (n: number) => {
        return <Icon as={n >= x / 2 ? FaCookie : GiCookie}
            color={iconColor}
            style={{
                ...baseStyle
            }}
        />;
    };

    return (
        <motion.div
            style={{
                ...baseStyle,
                ...motionStyle,
                x: 0
            }}
            animate={isStopped ? {} : {
                x,
                rotate: 360,
                transition: {
                    ease: "linear",
                    duration: 2,
                    repeat: Infinity
                }
            }}
        >
            {getCookieIcon(x)}
        </motion.div>
    );
};