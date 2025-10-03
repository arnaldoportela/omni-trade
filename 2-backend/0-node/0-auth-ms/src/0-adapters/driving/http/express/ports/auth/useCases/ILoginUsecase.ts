import { Injectable } from "../../../../3-crosscutting/ioc/InjectableDecorator";

import { LoginInputDTO } from "../../dtos/input/LoginInputDto";
import { LoginOutputDTO } from "../../dtos/output/LoginOutputDto";

@Injectable()
export abstract class ILoginUseCase {
    abstract execute(data: LoginInputDTO): Promise<LoginOutputDTO>;
}