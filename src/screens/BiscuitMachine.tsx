import React, { FC } from "react";
import { Box } from "@chakra-ui/react";
import { Conveyor } from "@animations";

export const BiscuitMachine: FC = () => {

    return (
        <Box maxW={400}>
            <Conveyor />
        </Box>
    );
};
