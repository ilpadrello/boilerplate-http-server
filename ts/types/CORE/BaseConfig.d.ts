declare namespace CORE {
    export interface BaseConfig {
        server: {
            port: number,
        },
        log?: {
            level?: Logger.Level;
            transports: {
                [key: string]: {
                    level: Logger.Level,
                }
            }
        }
    }
}