import React from "react";
import { HStack, Icon, useColorModeValue, Box } from "@chakra-ui/react";
import { motion, MotionStyle } from "framer-motion";
import { BsFillGearFill } from "react-icons/bs";
import { GiCookie } from "react-icons/gi";

export const ConveyorGear: React.FC<{ motionStyle?: MotionStyle; gearCount: number; w: number }> = ({ motionStyle, gearCount, w }) => {
    const iconColor = useColorModeValue("primary.700", "primary.100");
    const baseStyle = {
        width: (w / gearCount),
        height: (w / gearCount),
        padding: 0,
    };

    return (
        <motion.div
            style={{
                ...baseStyle,
                margin: -0.5,
                ...motionStyle
            }}
            animate={{
                rotate: 360
            }}
            transition={{
                ease: "linear",
                duration: 2,
                repeat: Infinity
            }}
        >
            <Icon as={BsFillGearFill}
                color={iconColor}
                style={{
                    ...baseStyle,
                    margin: 0
                }}/>
        </motion.div>
    );
};

export const Cookie: React.FC<{ motionStyle?: MotionStyle; x?: number }> = ({ motionStyle, x }) => {
    const iconColor = useColorModeValue("primary.700", "primary.100");
    const baseStyle = {
        width: 25,
        height: 25,
        padding: 0,
        margin: 0,
    };

    return (
        <motion.div
            style={{
                ...baseStyle,
                ...motionStyle
            }}
            animate={{
                x: x
            }}
            transition={{
                ease: "linear",
                duration: 2,
                repeat: Infinity
            }}
        >
            <Icon as={GiCookie}
                color={iconColor}
                style={{
                    ...baseStyle
                }}/>
        </motion.div>
    );
};

export const Conveyor: React.FC<{ w?: number }> = ({ w }) => {
    const numberOfGearsMap = {
        260: 5,
        460: 10,
        660: 15
    };

    return (
        <Box>
            <Cookie x={w || 400} />
            <HStack
                p={0}
                border="5px dashed black"
                borderRadius={25}
                borderColor={useColorModeValue("primary.900", "primary.300")}
            >
                {[...Array(numberOfGearsMap[(w || 260) as keyof typeof numberOfGearsMap])
                    .keys()].map((val, _, arr) => <ConveyorGear key={`CGear${val}`} gearCount={arr.length} w={w || 260} />)}
            </HStack>
        </Box>
    );
};
