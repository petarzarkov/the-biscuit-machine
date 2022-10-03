import React from "react";
import { Box } from "@chakra-ui/react";
import { Gear } from "./Gear";
import { GiBigGear } from "react-icons/gi";

export const Motor: React.FC<{ w?: number }> = ({ w }) => {

    return (
        <Box
            p={0}
            m={0}
            ml={-30}
        >
            <Gear key={"Motor"} w={w || 260} icon={GiBigGear} />
        </Box>
    );
};
