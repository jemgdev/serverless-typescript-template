import { Messages } from "../../constants/messages";
import { UserModel } from "../domain/user.model";
import { IUserRepository } from "../domain/user.repository.interface";

export class UserMemoryRepository implements IUserRepository {
  async getAllUsers(): Promise<UserModel[]> {
    try {
      return [
        {
          name: 'Josué',
          lastname: 'Medina',
          age: 23,
          identificationType: 'DNI',
          identificationNumber: '2893930383'
        }
      ]
    } catch (error) {
      throw new Error(Messages.UNCONTROLLER_ERROR)
    }
  }
}