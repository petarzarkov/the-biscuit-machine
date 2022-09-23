
import React from "react";
import { motion, MotionStyle } from "framer-motion";

export const ConveyorCircle: React.FC<{ motionStyle?: MotionStyle }> = ({ motionStyle }) => {
    return (
        <motion.div
            style={{
                width: 125,
                height: 125,
                borderRadius: "50%",
                border: "5px dashed red",
                ...motionStyle
            }}
            animate={{
                rotate: [0, 180, 180]
            }}
            transition={{
                duration: 5,
                ease: "easeInOut",
                repeat: Infinity
            }}
        />
    );
};

export const Conveyor = () => {

    return (
        <motion.div
            style={{
                width: 600,
                height: 200,
                borderRadius: "50%",
                border: "5px dashed green"
            }}
            animate={{
                rotate: [0, 180, 180, 0]
            }}
            transition={{
                duration: 5,
                ease: "easeInOut",
                repeat: Infinity
            }}
        >
            <div>
                <ConveyorCircle motionStyle={{
                    marginRight: "auto",
                    marginLeft: 0
                }}/>
                <ConveyorCircle motionStyle={{
                    margin: "auto"
                }}/>
                <ConveyorCircle motionStyle={{
                    marginLeft: "auto",
                    marginRight: 0
                }}/>
            </div>
        </motion.div>
    );
};
