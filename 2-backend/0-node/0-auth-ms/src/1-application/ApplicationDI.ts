import { IoCContainer } from "../3-crosscutting/ioc/IoCContainer";
import { AuthApplicationDI } from "./auth/AuthApplicationDI";

export class ApplicationDI {
    public static register(container: IoCContainer): void {
        AuthApplicationDI.register(container);
    }
}