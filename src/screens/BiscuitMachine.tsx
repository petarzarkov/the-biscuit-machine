import React, { FC } from "react";
import { Box, IconButton, ButtonGroup, useColorModeValue, HStack, Image, Tag, TagLabel, TagLeftIcon } from "@chakra-ui/react";
import { Conveyor, Cookie, Extruder, Motor, Oven, Stamper } from "@animations";
import { useSize } from "@chakra-ui/react-use-size";
import { useAnimationProvider } from "@hooks";
import { VscDebugStart, VscStopCircle } from "react-icons/vsc";
import { AiOutlinePauseCircle } from "react-icons/ai";
import { temp } from "@config";
import { GiCookie } from "react-icons/gi";

export const BiscuitMachine: FC = () => {
    const elementRef = React.useRef(null);
    const dimensions = useSize(elementRef);
    const { isRunning, setControls, isPaused, toggleTemperature, temperature, score, highScore } = useAnimationProvider();
    const color = useColorModeValue("primary.900", "primary.300");

    return (
        <Box
            ref={elementRef}
            width={[260, 460, 660]}
        >
            <HStack>
                <Extruder />
                <Stamper x={dimensions?.width || 400} />
            </HStack>
            <HStack p={0} m={0}>
                <Cookie x={dimensions?.width || 400} />
                <Oven x={dimensions?.width || 400} />
            </HStack>

            <HStack>
                <Motor />
                <Conveyor w={dimensions?.width} />
            </HStack>

            <Box m={5} width={"50%"} margin={"0 auto"} p={5}>
                <ButtonGroup gap='4' color={color}>
                    <IconButton
                        aria-label="btnStart"
                        title="start"
                        onClick={() => {
                            if (!isRunning || isPaused) {
                                setControls({
                                    isRunning: true,
                                    isPaused: false
                                });
                                toggleTemperature(temperature >= temp.heatedTemp ? !isPaused ? 0.01 : -0.01 : 0.05);
                            }
                        }}
                        size="lg"
                        isRound
                        disabled={isRunning && !isPaused}
                        variant={!isRunning ? "solid" : "outline"}
                        icon={
                            <VscDebugStart size="28px" />
                        }
                    />
                    <IconButton
                        aria-label="btnPause"
                        title="pause"
                        onClick={() => {
                            if (isRunning && !isPaused) {
                                setControls({
                                    isPaused: true
                                });
                            }
                        }}
                        size="lg"
                        isRound
                        disabled={isPaused || !isRunning}
                        variant={isPaused ? "solid" : "outline"}
                        icon={
                            <AiOutlinePauseCircle size="28px" />
                        }
                    />
                    <IconButton
                        aria-label="btnStop"
                        title="stop"
                        onClick={() => {
                            if (isRunning) {
                                setControls({
                                    isRunning: false,
                                    isPaused: false,
                                    score: 0
                                });
                            }
                        }}
                        size="lg"
                        isRound
                        disabled={!isRunning || isPaused}
                        variant={isRunning ? "solid" : "outline"}
                        icon={
                            <VscStopCircle size="28px" />
                        }
                    />
                    {temperature >= 250 && <Image
                        src={"images/itsHot.webp"}
                        w={50}
                        h={50}
                        style={{
                            padding: 0,
                            margin: 0,
                        }}
                    />}
                </ButtonGroup>
            </Box>
            <HStack>
                <Tag key={"score"} variant='subtle' color={color}>
                    <TagLabel>{`Score: ${score}`}</TagLabel>
                    <TagLeftIcon
                        as={GiCookie}
                        color={color}
                        p={0}
                        m={0}
                        ml={1}
                    />
                </Tag>
                <Tag key={"highScore"} variant='subtle' color={color}>
                    <TagLabel>{`HighScore: ${highScore}`}</TagLabel>
                    <TagLeftIcon
                        as={GiCookie}
                        color={color}
                        p={0}
                        m={0}
                        ml={1}
                    />
                </Tag>
            </HStack>
        </Box>
    );
};

