import React, { useEffect } from "react";
import { HStack, Icon, useColorModeValue, Box, Button, ButtonGroup } from "@chakra-ui/react";
import { motion, MotionStyle, useMotionValue } from "framer-motion";
import { BsFillGearFill } from "react-icons/bs";
import { GiCookie } from "react-icons/gi";
import { FaCookie } from "react-icons/fa";
import { useAnimationProvider } from "@hooks";

export const ConveyorGear: React.FC<{ motionStyle?: MotionStyle; gearCount: number; w: number }> = ({ motionStyle, gearCount, w }) => {
    const { controls } = useAnimationProvider();
    const iconColor = useColorModeValue("primary.700", "primary.100");
    const baseStyle = {
        width: (w / gearCount),
        height: (w / gearCount),
        padding: 0,
    };

    return (
        <motion.div
            style={{
                ...baseStyle,
                margin: -0.5,
                ...motionStyle
            }}
            animate={{
                ...controls,
                rotate: 360
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
                    ...baseStyle,
                    margin: 0
                }}/>
        </motion.div>
    );
};

export const Cookie: React.FC<{ motionStyle?: MotionStyle; x: number }> = ({ motionStyle, x }) => {
    const { controls } = useAnimationProvider();
    const xTrack = useMotionValue(x);
    const iconColor = useColorModeValue("primary.700", "primary.100");
    const baseStyle = {
        width: 25,
        height: 25,
        padding: 0,
        margin: 0,
    };

    const getCookieIcon = (n: number) => {
        return n >= x / 2 ?
            <Icon as={FaCookie}
                color={iconColor}
                style={{
                    ...baseStyle
                }}
            />
            :
            <Icon as={GiCookie}
                color={iconColor}
                style={{
                    ...baseStyle
                }}
            />;
    };

    let iconRef = getCookieIcon(x);
    useEffect(() => xTrack.onChange(latest => {
        iconRef = getCookieIcon(latest);
    }), [x]);

    return (
        <motion.div
            style={{
                ...baseStyle,
                ...motionStyle
            }}
            animate={{
                ...controls,
                x: xTrack.get()
            }}
            transition={{
                ease: "linear",
                duration: 2,
                repeat: Infinity
            }}
        >
            {iconRef}
        </motion.div>
    );
};

export const Conveyor: React.FC<{ w?: number }> = ({ w }) => {
    const { controls } = useAnimationProvider();
    const color = useColorModeValue("primary.900", "primary.300");
    const numberOfGearsMap = {
        260: 5,
        460: 10,
        660: 15
    };

    return (
        <Box>
            <Cookie x={w || 400} />
            <HStack
                p={0}
                border="5px dashed black"
                borderRadius={25}
                borderColor={color}
            >
                {[...Array(numberOfGearsMap[(w || 260) as keyof typeof numberOfGearsMap])
                    .keys()].map((val, _, arr) => <ConveyorGear key={`CGear${val}`} gearCount={arr.length} w={w || 260} />)}
            </HStack>
            <ButtonGroup gap='4'>
                <Button onClick={() => {
                    void controls?.start({
                        rotate: 360,
                        transition: {
                            ease: "linear",
                            duration: 2,
                            repeat: Infinity
                        }
                    });
                }}>Continue</Button>
                <Button onClick={() => {
                    controls?.stop();
                }}>Pause</Button>
                <Button onClick={() => {
                    controls?.stop();
                }}>Stop</Button>
            </ButtonGroup>
        </Box>
    );
};
