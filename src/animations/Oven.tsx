import React from "react";
import { Image, Box } from "@chakra-ui/react";
import { useAnimationProvider } from "@hooks";
import { motion } from "framer-motion";

export const Oven: React.FC<{ x: number }> = ({ x }) => {
    const { isStopped, duration } = useAnimationProvider();
    const xAxisMap: Record<number, number> = {
        260: 135,
        460: 280,
        660: 400
    };

    return (
        <Box
            as={motion.div}
            width={[130, 150, 180]}
            height={[140, 170, 200]}
            style={{
                position: "absolute",
                padding: 0,
                margin: 0,
                x: xAxisMap[x]
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