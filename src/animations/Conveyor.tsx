
import React from "react";
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
        <motion.div
            style={{
                width: 400,
                height: 400,
                borderRadius: "50%",
                border: "5px dashed green"
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
            <div>
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
            </div>
        </motion.div>
    );
};
