import { User } from '@user/domain/User'
import { ICreateUserHttpRequest } from '../dtos/ICreateUserHttpRequest'
import { ICreateUserHttpResponse } from '../dtos/ICreateUserHttpResponse'

export class UserHttpMapper {
  static fromRequest (dto: ICreateUserHttpRequest): User {
    return User.create({
      name: dto.name,
      lastname: dto.lastName,
      age: dto.age,
      identificationNumber: dto.identificationNumber,
      identificationType: dto.identificationType
    })
  }

  static toResponse (user: User): ICreateUserHttpResponse {
    const userData = user.toPrimitives()
    return {
      id: userData.id
    }
  }
}
