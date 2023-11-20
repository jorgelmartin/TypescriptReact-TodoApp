// / <reference types="vite/client" />
interface ImportMetaEnv {
    
    readonly VITE_API_BIN_KEY: string
    readonly VITE_API_BIN_X_ACCESS_KEY: string
    // more env variables...
}

interface ImportMeta {
    readonly env: ImportMetaEnv
}