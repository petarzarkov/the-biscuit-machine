
import React from "react";
import { HStack } from "@chakra-ui/react";
import { motion, MotionStyle } from "framer-motion";
import { struct } from "@config";

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
            {[...Array(struct.numberOfGears).keys()].map(val => <ConveyorGear key={`CGear${val}`} />)}
        </HStack>
    );
};
