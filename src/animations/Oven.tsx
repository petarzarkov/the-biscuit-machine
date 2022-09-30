import React from "react";
import { Image, Box } from "@chakra-ui/react";
import { useAnimationProvider } from "@hooks";
import { motion } from "framer-motion";
import { Temperature } from "./Temperature";

export const Oven: React.FC<{ x: number }> = ({ x }) => {
    const { isRunning, duration, isExploded, setIsExploded, isPaused } = useAnimationProvider();
    const xAxisMap: Record<number, number> = {
        260: 135,
        460: 280,
        660: 400
    };

    React.useEffect(() => {
        if (isExploded) {
            void new Promise(resolve => setTimeout(resolve, 2000)).then(() => {
                setIsExploded(false);
            });
        }

    }, [isExploded]);

    return (
        <Box
            as={motion.div}
            width={[100, 150, 180]}
            height={[170, 190, 190]}
            style={{
                position: "absolute",
                padding: 0,
                margin: 0,
                x: xAxisMap[x]
            }}
            animate={!isRunning ? {} : {
                transition: {
                    ease: "linear",
                    duration,
                    repeat: Infinity
                }
            }}
        >
            {
                isExploded ?
                    <Image
                        src="images/explosion.webp"
                        w={115}
                        h={115}
                    />
                    :
                    <>
                        <Temperature />
                        <Image
                            as={motion.img}
                            src={"images/oven.png"}
                            style={{
                                padding: 0,
                                margin: 0,
                            }}
                            animate={!isRunning || isPaused ? {} : {
                                filter: "hue-rotate(360deg)",
                                transition: {
                                    ease: "linear",
                                    duration,
                                    repeat: Infinity
                                }
                            }}
                        />
                    </>
            }

        </Box>
    );
};