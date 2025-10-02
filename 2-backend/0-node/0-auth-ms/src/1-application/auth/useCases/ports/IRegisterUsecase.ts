import { Injectable } from "../../../../3-crosscutting/ioc/InjectableDecorator";

import { RegisterInputDTO } from "../../dtos/input/RegisterInputDto";

@Injectable()
export abstract class IRegisterUseCase {
    abstract execute(data: RegisterInputDTO): Promise<any>;
}