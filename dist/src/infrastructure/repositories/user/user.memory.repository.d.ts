import { UserModel } from "../../../domain/models/user.model";
import { IUserRepository } from "../../../domain/repositories/user.repository.interface";
export declare class UserMemoryRepository implements IUserRepository {
    getAllUsers(): Promise<UserModel[]>;
}
