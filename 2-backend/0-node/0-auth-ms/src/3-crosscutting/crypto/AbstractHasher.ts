export abstract class AbstractHasher{
    public abstract hash(value: string): Promise<string>;
    public abstract verify(value: string, hash: string): Promise<boolean>;
    public abstract isHash(value: string): boolean;
}