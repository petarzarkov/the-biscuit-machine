import React from "react";
import { Box, Icon, useColorModeValue } from "@chakra-ui/react";
import { Gear } from "./Gear";
import { GiBigGear } from "react-icons/gi";
import { useAnimationProvider } from "@hooks";
import { TbEngine } from "react-icons/tb";
import { motion } from "framer-motion";

export const Motor: React.FC<{ w?: number }> = ({ w }) => {
    const { isPaused, isRunning, isHeated } = useAnimationProvider();
    const color = useColorModeValue("primary.700", "primary.100");
    return (
        <Box
            p={0}
            m={0}
            ml={-30}
        >
            <motion.div
                animate={isPaused || !isRunning ? {} : isHeated && {
                    rotate: [-1, 1.3, -1.5, 1, -0.5, 0, 1, -1.4, 0],
                    transition: {
                        repeatDelay: 0.2,
                        repeat: Infinity
                    }
                }}
            >
                <Icon
                    color={color}
                    as={TbEngine}
                    position={"absolute"}
                    w={[100, 150, 150]}
                    h={[55, 100, 100]}
                    transform={"scaleX(-1)"}
                    ml={[-55, -100, -100]}
                    mt={[4, 0, 0]}
                />
            </motion.div>
            <Gear key={"Motor"} w={w || 200} icon={GiBigGear} />
        </Box>
    );
};
