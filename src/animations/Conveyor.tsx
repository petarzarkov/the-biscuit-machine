import React from "react";
import { HStack, useColorModeValue } from "@chakra-ui/react";
import { Gear } from "./Gear";

export const Conveyor: React.FC<{ w?: number }> = ({ w }) => {
    const color = useColorModeValue("primary.900", "primary.300");
    const numberOfGearsMap: Record<number, number> = {
        200: 5,
        460: 10,
        660: 15
    };

    return (
        <HStack
            m={0}
            p={0}
            border="5px dashed black"
            borderRadius={25}
            borderColor={color}>
            {[...Array(numberOfGearsMap[(w || 200)])
                .keys()].map((val, _, arr) => <Gear key={`ConveyorGear${val}`} gearCount={arr.length} w={w || 200} />)}
        </HStack>
    );
};
