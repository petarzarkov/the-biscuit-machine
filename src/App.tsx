import React from "react";
import { Route, Routes } from "react-router-dom";
import { Layout } from "@components";
import { NotFound, BiscuitMachine } from "@screens";

const App = () => {
    return (
        <Routes>
            <Route path="/" element={<Layout />}>
                <Route index element={<BiscuitMachine />} />
                <Route path="*" element={<NotFound />} />
            </Route>
        </Routes>
    );
};

export default App;
