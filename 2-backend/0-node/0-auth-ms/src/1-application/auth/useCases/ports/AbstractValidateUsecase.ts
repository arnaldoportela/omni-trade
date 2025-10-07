import { Injectable } from "@crosscutting/ioc/InjectableDecorator";

@Injectable()
export abstract class AbstractValidateUseCase {
    abstract execute(): Promise<any>;
}