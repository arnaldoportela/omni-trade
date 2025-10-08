import { Config } from "@crosscutting/config/Config";
import { Injectable } from "@crosscutting/ioc/InjectableDecorator";
import type { CookieOptions } from "express";

@Injectable()
export class CookieOptionsBuilder {
    private cookie: CookieOptions;
    private readonly config: Config;

    constructor(_config: Config) {
        this.config = _config;

        this.cookie = {
            httpOnly: false,
            secure: this.config.isProduction,
            sameSite: 'lax',
            domain: this.config.appHost,
            maxAge: this.config.maxExpireTimeout
        }
    }

    public withMaxAge(_maxAge: number): CookieOptionsBuilder {
        this.cookie.maxAge = _maxAge;
        return this;
    }

    public withHttpOnly(_httpOnly: boolean): CookieOptionsBuilder {
        this.cookie.httpOnly = _httpOnly;
        return this;
    }

    public withDomain(_domain: string): CookieOptionsBuilder{
        return this;
    }

    public build(): CookieOptions {
        return this.cookie;
    }
}