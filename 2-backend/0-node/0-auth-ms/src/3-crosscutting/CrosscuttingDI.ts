import { AbstractHasher } from "./crypto/AbstractHasher";
import { ArgonHasher } from "./crypto/ArgonHasher";
import { IoCContainer } from "./ioc/IoCContainer";

export class CrosscuttingDI {
    public static register(container: IoCContainer): void {
        container.register({ service: AbstractHasher, useClass: ArgonHasher });
    }
}