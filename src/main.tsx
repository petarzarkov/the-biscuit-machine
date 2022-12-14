import React from "react";
import ReactDOM from "react-dom/client";
import { HashRouter } from "react-router-dom";
import { ThemeProvider } from "@theme";
import { AnimationProvider } from "@animation";

import App from "./App";
import "./index.css";

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
const root = ReactDOM.createRoot(document.getElementById("root")!);
root.render(<React.StrictMode>
    <HashRouter>
        <ThemeProvider>
            <AnimationProvider>
                <App />
            </AnimationProvider>
        </ThemeProvider>
    </HashRouter>
</React.StrictMode>,
);
