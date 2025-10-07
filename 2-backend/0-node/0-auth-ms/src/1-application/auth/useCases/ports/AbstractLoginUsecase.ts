import { Injectable } from "@crosscutting/ioc/InjectableDecorator";

import { LoginInputDTO } from "../../dtos/input/LoginInputDto";
import { LoginOutputDTO } from "../../dtos/output/LoginOutputDto";

@Injectable()
export abstract class AbstractLoginUseCase {
    abstract execute(data: LoginInputDTO): Promise<LoginOutputDTO>;
}