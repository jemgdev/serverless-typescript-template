import { Messages } from "../../../utils/constants/messages";
import { UserModel } from "../../../domain/models/user.model";
import { IUserRepository } from "../../../domain/repositories/user.repository.interface";
import { Environments } from "../../../environments";

export class UserMemoryRepository implements IUserRepository {
  async getAllUsers(): Promise<UserModel[]> {
    console.log(Environments)
    return [
      {
        name: 'Josué',
        lastname: 'Medina',
        age: 23,
        identificationType: 'DNI',
        identificationNumber: '2893930383'
      }
    ]
  }
}