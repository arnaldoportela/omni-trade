import argon2 from "argon2";
import { AbstractHasher } from "./AbstractHasher";

export class ArgonHasher extends AbstractHasher {
    public async hash(value: string): Promise<string> {
        return argon2.hash(value, {
            type: argon2.argon2id,
            memoryCost: 2 ** 16,
            timeCost: 3,
            parallelism: 1
        });
    }

    public async verify(value: string, hash: string): Promise<boolean> {
        return argon2.verify(hash, value);
    }

    public isHash(value: string): boolean {
        return /^\$argon2(id|i|d)\$v=\d+\$/.test(value);
    }
}