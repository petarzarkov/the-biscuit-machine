import React from "react";
import { HStack, Icon, useColorModeValue } from "@chakra-ui/react";
import { motion, MotionStyle } from "framer-motion";
import { struct } from "@config";
import { BsFillGearFill } from "react-icons/bs";

export const ConveyorGear: React.FC<{ motionStyle?: MotionStyle }> = ({ motionStyle }) => {
    const iconColor = useColorModeValue("primary.800", "primary.100");
    return (
        <motion.div
            style={{
                width: 75,
                height: 75,
                padding: 0,
                margin: -5,
                ...motionStyle
            }}
            animate={{
                rotate: 180
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
                    margin: 0,
                    padding: 0,
                    width: 75,
                    height: 75
                }}/>
        </motion.div>
    );
};

export const Conveyor = () => {

    return (
        <HStack p={0}>
            {[...Array(struct.numberOfGears).keys()].map((val) => <ConveyorGear key={`CGear${val}`} />)}
        </HStack>
    );
};
