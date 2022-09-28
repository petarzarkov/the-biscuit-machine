import React from "react";
import { HStack, Icon, useColorModeValue, Box } from "@chakra-ui/react";
import { motion, MotionStyle } from "framer-motion";
import { BsFillGearFill } from "react-icons/bs";
import { useAnimationProvider } from "@hooks";

export const ConveyorGear: React.FC<{ motionStyle?: MotionStyle; gearCount: number; w: number }> = ({ motionStyle, gearCount, w }) => {
    const { isStopped, duration } = useAnimationProvider();
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
            animate={isStopped ? {} : {
                rotate: 360,
                transition: {
                    ease: "linear",
                    duration,
                    repeat: Infinity
                }
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

export const Conveyor: React.FC<{ w?: number }> = ({ w }) => {
    const color = useColorModeValue("primary.900", "primary.300");
    const numberOfGearsMap: Record<number, number> = {
        260: 5,
        460: 10,
        660: 15
    };

    return (
        <Box>
            <HStack
                p={0}
                border="5px dashed black"
                borderRadius={25}
                borderColor={color}
            >
                {[...Array(numberOfGearsMap[(w || 260)])
                    .keys()].map((val, _, arr) => <ConveyorGear key={`CGear${val}`} gearCount={arr.length} w={w || 260} />)}
            </HStack>
        </Box>
    );
};
