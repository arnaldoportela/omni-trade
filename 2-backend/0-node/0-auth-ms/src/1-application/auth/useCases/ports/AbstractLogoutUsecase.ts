import { Injectable } from "@crosscutting/ioc/InjectableDecorator";

@Injectable()
export abstract class AbstractLogoutUseCase {
    abstract execute(): Promise<any>;
}