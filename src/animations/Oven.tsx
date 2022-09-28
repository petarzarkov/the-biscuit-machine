import React from "react";
import { Image, Box } from "@chakra-ui/react";
import { useAnimationProvider } from "@hooks";
import { motion } from "framer-motion";

export const Oven: React.FC<{ x: number }> = ({ x }) => {
    const { isStopped, duration } = useAnimationProvider();
    // [260, 460, 660]
    const xAxisMap: Record<number, number> = {
        260: 40,
        460: 200,
        660: 360
    };

    return (
        <Box
            as={motion.div}
            width={200}
            height={200}
            style={{
                padding: 0,
                margin: 0,
                x: xAxisMap[x],
                y: 70
            }}
            animate={isStopped ? {} : {
                transition: {
                    ease: "linear",
                    duration,
                    repeat: Infinity
                }
            }}
        >
            <Image
                as={motion.img}
                src={"images/oven.png"}
                style={{
                    padding: 0,
                    margin: 0,
                }}
                animate={isStopped ? {} : {
                    filter: "hue-rotate(360deg)",
                    transition: {
                        ease: "linear",
                        duration,
                        repeat: Infinity
                    }
                }}
            />
        </Box>
    );
};