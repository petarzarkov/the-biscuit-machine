/// <reference types="vite/client" />

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface ImportMetaEnv {
    readonly NUMBER_OF_GEARS: string;
}

interface ImportMeta {
    readonly env: ImportMetaEnv;
}
