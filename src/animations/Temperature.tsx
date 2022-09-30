import React from "react";
import { Icon, useColorModeValue, HStack, Tag, TagLabel, TagRightIcon } from "@chakra-ui/react";
import { useAnimationProvider } from "@hooks";
import { TbTemperatureCelsius } from "react-icons/tb";
import { FaTemperatureHigh, FaTemperatureLow } from "react-icons/fa";

export const Temperature: React.FC = () => {
    const { temperature } = useAnimationProvider();
    const iconColor = useColorModeValue("primary.700", "primary.100");

    return (
        <HStack>
            <Icon as={temperature >= 200 ? FaTemperatureHigh : FaTemperatureLow}
                color={iconColor}
                p={0}
                m={0}
            />
            <Tag size={"md"} key={"temperatureDisplay"} variant='outline' color={iconColor}>
                <TagLabel>{temperature}</TagLabel>
                <TagRightIcon
                    as={TbTemperatureCelsius}
                    color={iconColor}
                    p={0}
                    m={0}
                />
            </Tag>
        </HStack>
    );
};