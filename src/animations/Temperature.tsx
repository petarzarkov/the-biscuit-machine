import React from "react";
import { Icon, useColorModeValue, HStack, Tag, TagLabel, TagRightIcon, CircularProgress } from "@chakra-ui/react";
import { useAnimationProvider, useIteration } from "@hooks";
import { TbTemperatureCelsius } from "react-icons/tb";
import { FaTemperatureHigh, FaTemperatureLow } from "react-icons/fa";
import { temp } from "@config";

export const Temperature: React.FC = () => {
    const { originalIncrement, heatedIncrement } = {
        originalIncrement: 0.05,
        heatedIncrement: 0.01
    };
    const { isRunning, setControls, isPaused, isHeated } = useAnimationProvider();
    const iconColor = useColorModeValue("primary.700", "primary.100");
    const color = isHeated ? "orange.400" : iconColor;

    const { iteration, setIteration, toggleIteration, toggleIncrement } = useIteration(temp.initialTemp, originalIncrement);

    React.useEffect(() => {
        if (isRunning) {
            toggleIncrement(originalIncrement);
            toggleIteration(true);
        }

        if (!isRunning || isPaused) {
            toggleIncrement(iteration >= temp.heatedTemp ? !isPaused ? heatedIncrement : -heatedIncrement : originalIncrement);
        }

    }, [isRunning, isPaused, toggleIteration]);

    React.useEffect(() => {
        if (Math.round(iteration) >= 250) {
            setControls({
                temperature: 250
            });
        }

        if (iteration >= temp.heatedTemp) {
            // Update provider temperature and isHeated only on specific scenarios, to not re-render all children
            if (Math.round(iteration) === temp.heatedTemp) {
                setControls({
                    isHeated: true,
                    temperature: temp.heatedTemp
                });
            }

            if (!isPaused) {
                toggleIncrement(heatedIncrement);
            }

            if (iteration >= (temp.heatedTemp + temp.explodeTemp) / 2 && isPaused) {
                toggleIncrement(-heatedIncrement);
            }
        } else {
            if (isHeated && Math.round(iteration) < temp.heatedTemp) {
                setControls({
                    isHeated: false
                });
            }

            if (isPaused) {
                toggleIncrement(heatedIncrement);
            }
        }

        if (!isRunning) {
            if (isHeated) {
                setControls({
                    isHeated: false,
                    temperature: temp.initialTemp
                });
            }

            setIteration(temp.initialTemp);
            toggleIteration(false);
        }

        if (Math.round(iteration) === temp.explodeTemp) {
            setIteration(temp.initialTemp);
            toggleIteration(false);
            setControls({
                isHeated: false,
                isRunning: false,
                isPaused: false,
                isExploded: true,
                temperature: temp.initialTemp
            });

        }

    }, [isRunning, isPaused, iteration]);

    return (
        <HStack>
            <Icon as={isHeated ? FaTemperatureHigh : FaTemperatureLow}
                color={color}
                p={0}
                m={0}
            />
            <Tag size={"md"} key={"temperatureDisplay"} variant='outline' color={color}>
                <TagLabel>{Math.round(iteration)}</TagLabel>
                <TagRightIcon
                    as={TbTemperatureCelsius}
                    color={color}
                    p={0}
                    m={0}
                />
            </Tag>
            <CircularProgress value={iteration} size={5} color={color} min={temp.initialTemp} max={temp.explodeTemp}/>
        </HStack>
    );
};