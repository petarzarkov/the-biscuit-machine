import React from "react";
import { Icon, useColorModeValue } from "@chakra-ui/react";
import { motion, MotionStyle } from "framer-motion";
import { BsFillGearFill } from "react-icons/bs";
import { useAnimationProvider } from "@hooks";
import { IconType } from "react-icons";

export const Gear: React.FC<{ motionStyle?: MotionStyle; gearCount?: number; w: number; icon?: IconType }> = ({ motionStyle, gearCount, w, icon }) => {
    const { isRunning, duration, isHeated, isPaused } = useAnimationProvider();
    const iconColor = useColorModeValue("primary.700", "primary.100");
    const baseStyle = {
        width: gearCount ? (w / gearCount) : 44,
        height: gearCount ? (w / gearCount) : 44,
        padding: 0
    };

    return (
        <motion.div
            style={{
                ...baseStyle,
                margin: -0.5,
                ...motionStyle
            }}
            animate={!isRunning || isPaused ? {} : isHeated && {
                rotate: 360,
                transition: {
                    ease: "linear",
                    repeatDelay: 0.2,
                    duration,
                    repeat: Infinity
                }
            }}
        >
            <Icon as={icon || BsFillGearFill}
                color={iconColor}
                style={{
                    ...baseStyle,
                    margin: 0
                }}/>
        </motion.div>
    );
};