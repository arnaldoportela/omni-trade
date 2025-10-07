import { ChangePasswordInputDto } from '@application/auth/dtos/input/ChangePasswordInputDto';
import { Injectable } from '@crosscutting/ioc/InjectableDecorator';

@Injectable()
export abstract class AbstractChangePasswordUseCase{
    abstract execute(data: ChangePasswordInputDto): Promise<any>;
}