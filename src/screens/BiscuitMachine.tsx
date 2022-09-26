import React, { FC, LegacyRef } from "react";
import { Box } from "@chakra-ui/react";
import { Conveyor } from "@animations";
import { useSize } from "@chakra-ui/react-use-size";

export const BiscuitMachine: FC = () => {
    const elementRef = React.useRef<LegacyRef<HTMLDivElement>>();
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const dimensions = useSize(elementRef as unknown as HTMLDivElement | null);

    return (
        <Box
            // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
            ref={elementRef as unknown as LegacyRef<HTMLDivElement>}
            width={[260, 460, 660]}
        >
            <Conveyor w={dimensions?.width} />
        </Box>
    );
};

