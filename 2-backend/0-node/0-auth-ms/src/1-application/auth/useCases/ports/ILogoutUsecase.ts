import { Injectable } from "../../../../3-crosscutting/ioc/InjectableDecorator";

@Injectable()
export abstract class ILogoutUseCase {
    abstract execute(): Promise<any>;
}