import { Injectable } from "@crosscutting/ioc/InjectableDecorator";

import { RegisterInputDTO } from "../../dtos/input/RegisterInputDto";

@Injectable()
export abstract class AbstractRegisterUseCase {
    abstract execute(data: RegisterInputDTO): Promise<any>;
}