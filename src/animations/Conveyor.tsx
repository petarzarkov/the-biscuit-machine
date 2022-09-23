
import React from "react";
import { motion } from "framer-motion";
import { useIteration } from "@hooks";

export const Conveyor = () => {
    const i = useIteration(0.1);

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.5 * i }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
        />
    );
};
