import { IUserRepository } from '../domain/repositories/user.repository.interface';
export declare class GetUsersUseCase {
    private readonly userRepository;
    constructor(userRepository: IUserRepository);
    invoke(): Promise<import("../domain/models/user.model").UserModel[]>;
}
