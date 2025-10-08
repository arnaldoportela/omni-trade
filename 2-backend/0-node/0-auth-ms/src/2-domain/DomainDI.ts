import { IoCContainer } from "../3-crosscutting/ioc/IoCContainer";
import { SessionFactory } from "./auth/factories/SessionFactory";


export class DomainDI {
    public static register(container: IoCContainer): void {
        container.register({ service: SessionFactory });
    }
}