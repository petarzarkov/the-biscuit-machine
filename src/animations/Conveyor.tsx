
import React from "react";
import { HStack } from "@chakra-ui/react";
import { motion, MotionStyle } from "framer-motion";

export const ConveyorGear: React.FC<{ motionStyle?: MotionStyle }> = ({ motionStyle }) => {
    return (
        <motion.div
            style={{
                width: 125,
                height: 125,
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
            <img src={"images/gear.png"} alt="gear" />
        </motion.div>
    );
};

export const Conveyor = () => {

    return (
        <HStack>
            <ConveyorGear motionStyle={{
                marginRight: "auto",
                marginLeft: 0
            }}/>
            <ConveyorGear motionStyle={{
                margin: "auto"
            }}/>
            <ConveyorGear motionStyle={{
                marginLeft: "auto",
                marginRight: 0
            }}/>
        </HStack>
    );
};
