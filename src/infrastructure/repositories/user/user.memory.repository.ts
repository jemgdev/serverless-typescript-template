import { UserModel } from "@domain/models/user.model";
import { IUserRepository } from "@domain/repositories/user.repository.interface";

export class UserMemoryRepository implements IUserRepository {
  async getAllUsers(): Promise<UserModel[]> {
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