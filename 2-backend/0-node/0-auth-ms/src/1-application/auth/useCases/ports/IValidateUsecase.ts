import { Injectable } from "../../../../3-crosscutting/ioc/InjectableDecorator";

@Injectable()
export abstract class IValidateUseCase {
    abstract execute(): Promise<any>;
}