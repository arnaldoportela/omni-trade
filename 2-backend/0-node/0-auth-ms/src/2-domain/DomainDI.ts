import { IoCContainer } from "../3-crosscutting/ioc/IoCContainer";
import { AuthDomainDI } from "./auth/AuthDomainDI";

export class DomainDI {
    public static register(container: IoCContainer): void {
        AuthDomainDI.register(container);
    }
}