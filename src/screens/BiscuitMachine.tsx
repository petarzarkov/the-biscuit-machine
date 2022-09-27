import React, { FC, LegacyRef } from "react";
import { Box, IconButton, ButtonGroup, useColorModeValue } from "@chakra-ui/react";
import { Conveyor, Cookie } from "@animations";
import { useSize } from "@chakra-ui/react-use-size";
import { useAnimationProvider } from "@hooks";
import { VscDebugStart, VscStopCircle } from "react-icons/vsc";

export const BiscuitMachine: FC = () => {
    const elementRef = React.useRef<LegacyRef<HTMLDivElement>>();
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const dimensions = useSize(elementRef as unknown as HTMLDivElement | null);
    const { isStopped, setControls } = useAnimationProvider();
    const color = useColorModeValue("primary.900", "primary.300");

    return (
        <Box
            // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
            ref={elementRef as unknown as LegacyRef<HTMLDivElement>}
            width={[260, 460, 660]}
        >
            <Cookie x={dimensions?.width || 400} />
            <Conveyor w={dimensions?.width} />

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

