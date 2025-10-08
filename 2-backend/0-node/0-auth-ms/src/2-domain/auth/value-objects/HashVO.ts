import { AbstractHasher } from "@crosscutting/crypto/AbstractHasher";

export class HashVO{
    private hash: string;

    private constructor(_hash: string) { 
        this.hash = _hash;
    }

    public get(): string{
        return this.hash;
    }

    public static async create(_value: string, _hasher: AbstractHasher) {
        if (_hasher.isHash(_value)) {
            return new HashVO(_value);
        }
        return new HashVO(await _hasher.hash(_value));
    }
}