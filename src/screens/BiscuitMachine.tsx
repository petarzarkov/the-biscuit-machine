import React, { FC, LegacyRef } from "react";
import { Box, IconButton, ButtonGroup, useColorModeValue, HStack, Image } from "@chakra-ui/react";
import { Conveyor, Cookie, Oven } from "@animations";
import { useSize } from "@chakra-ui/react-use-size";
import { useAnimationProvider } from "@hooks";
import { VscDebugStart, VscStopCircle } from "react-icons/vsc";

export const BiscuitMachine: FC = () => {
    const elementRef = React.useRef<LegacyRef<HTMLDivElement>>();
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const dimensions = useSize(elementRef as unknown as HTMLDivElement | null);
    const { isStopped, setControls, isExploded, setIsExploded } = useAnimationProvider();
    const color = useColorModeValue("primary.900", "primary.300");

    React.useEffect(() => {
        if (isExploded) {
            void new Promise(resolve => setTimeout(resolve, 2000)).then(() => {
                setIsExploded(false);
            });
        }

    }, [isExploded]);

    return (
        <Box
            // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
            ref={elementRef as unknown as LegacyRef<HTMLDivElement>}
            width={[260, 460, 660]}
        >

            {
                isExploded ?
                    <Image
                        src="images/explosion.gif"
                        borderRadius={20}
                    />
                    :
                    <div>
                        <HStack p={0} m={0}>
                            <Cookie x={dimensions?.width || 400} />
                            <Oven x={dimensions?.width || 400} />
                        </HStack>

                        <Conveyor w={dimensions?.width} />
                    </div>
            }

            <Box m={5}>
                <ButtonGroup gap='4' color={color}>
                    <IconButton
                        aria-label="btnStart"
                        title="start"
                        onClick={() => {
                            if (isStopped) {
                                setControls({
                                    isStopped: false
                                });
                            }
                        }}
                        size="lg"
                        isRound
                        disabled={!isStopped}
                        variant={isStopped ? "solid" : "outline"}
                        icon={
                            <VscDebugStart size="28px" />
                        }
                    />
                    {/* <IconButton
                        aria-label="btnPause"
                        title="pause"
                        onClick={() => {
                            if (!isPaused && !isStopped) {
                                setControls({
                                    isPaused: true
                                });
                            }
                        }}
                        size="lg"
                        isRound
                        disabled={!isPaused && isStopped}
                        variant={isPaused ? "solid" : "outline"}
                        icon={
                            <AiOutlinePauseCircle size="28px" />
                        }
                    /> */}
                    <IconButton
                        aria-label="btnStop"
                        title="stop"
                        onClick={() => {
                            if (!isStopped) {
                                setControls({
                                    isStopped: true
                                });
                            }
                        }}
                        size="lg"
                        isRound
                        disabled={isStopped}
                        variant={!isStopped ? "solid" : "outline"}
                        icon={
                            <VscStopCircle size="28px" />
                        }
                    />
                </ButtonGroup>
            </Box>
        </Box>
    );
};

