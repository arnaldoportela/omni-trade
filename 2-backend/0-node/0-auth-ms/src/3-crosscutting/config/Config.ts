import dotenv from "dotenv";
import ms from "ms";

dotenv.config();

export class Config {

    public isProduction: boolean;
    public connectionString: string;

    public appProtocol: string;
    public appHost: string;
    public appPort: number;

    public idleExpireTimeout: number;
    public maxExpireTimeout: number;

    constructor() {
        this.isProduction = process.env.NODE_ENV === 'production';
        this.connectionString = process.env.CONNECTION_STRING ?? "";
        this.appProtocol = process.env.APP_PROTOCOL ?? "http";
        this.appHost = process.env.APP_HOST ?? "localhost";
        this.appPort = Number(process.env.APP_PORT ?? 3000);

        this.idleExpireTimeout = this.parseMs(process.env.IDLE_EXPIRE_TIMEOUT, "15m");
        this.maxExpireTimeout = this.parseMs(process.env.MAX_EXPIRE_TIMEOUT, "7d");
    }

    private parseMs(value: string | undefined, fallback: string): number {
        // @ts-ignore
        return (ms(value ?? fallback) as unknown) as number;
    };
}