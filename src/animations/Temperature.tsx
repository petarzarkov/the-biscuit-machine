import React from "react";
import { Icon, useColorModeValue, HStack, Tag, TagLabel, TagRightIcon } from "@chakra-ui/react";
import { useAnimationProvider } from "@hooks";
import { TbTemperatureCelsius } from "react-icons/tb";
import { FaTemperatureHigh, FaTemperatureLow } from "react-icons/fa";

export const Temperature: React.FC = () => {
    const { temperature, heatedTemp } = useAnimationProvider();
    const iconColor = useColorModeValue("primary.700", "primary.100");

    const color = temperature >= heatedTemp ? "orange.400" : iconColor;
    return (
        <HStack>
            <Icon as={temperature >= heatedTemp ? FaTemperatureHigh : FaTemperatureLow}
                color={color}
                p={0}
                m={0}
            />
            <Tag size={"md"} key={"temperatureDisplay"} variant='outline' color={color}>
                <TagLabel>{temperature}</TagLabel>
                <TagRightIcon
                    as={TbTemperatureCelsius}
                    color={color}
                    p={0}
                    m={0}
                />
            </Tag>
        </HStack>
    );
};