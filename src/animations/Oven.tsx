import React from "react";
import { Image, Box } from "@chakra-ui/react";
import { useAnimationProvider } from "@hooks";
import { motion } from "framer-motion";

export const Oven: React.FC<{ x: number }> = ({ x }) => {
    const { isStopped } = useAnimationProvider();

    return (
        <Box
            as={motion.div}
            width={[200, 200, 200]}
            height={[200, 200, 200]}
            style={{
                padding: 0,
                margin: 0,
                x: x - 200,
                y: 70
            }}
            animate={isStopped ? {} : {
                transition: {
                    ease: "linear",
                    duration: 2,
                    repeat: Infinity
                }
            }}
        >
            <Image
                src={"images/oven.png"}
                style={{
                    padding: 0,
                    margin: 0,
                }}
            />
        </Box>
    );
};