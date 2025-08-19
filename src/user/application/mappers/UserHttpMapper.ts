import { User } from '@user/domain/User'
import { ICreateUserHttpRequest } from '@user/dtos/ICreateUserHttpRequest'
import { ICreateUserHttpResponse } from '@user/dtos/ICreateUserHttpResponse'

export class UserHttpMapper {
  static fromRequest (dto: ICreateUserHttpRequest): User {
    return User.create({
      name: dto.name,
      lastname: dto.lastname,
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
