import { User } from '../../domain/User'
import { UserPersistanceRepository } from '../../application/ports/UserPersistanceRepository'
import { randomUUID } from 'crypto'
import { UserPersistanceMapper } from '../../application/mappers/UserPersistanceMapper'
import { IUserPersistance } from '../../application/dtos/IUserPersistance'

export class InMemoryUserRepository implements UserPersistanceRepository {
  private readonly users = new Map<string, IUserPersistance>()

  constructor () {
    const id = randomUUID()
    this.users.set(id, {
      id,
      name: 'Jhon',
      last_name: 'Freddy',
      age: 10,
      identification_type: 'DNI',
      identification_number: '123456789012'
    })
  }

  async save (user: User): Promise<string> {
    this.users.set(
      user.toPrimitives().id,
      UserPersistanceMapper.toPersistence(user)
    )

    return user.toPrimitives().id
  }

  async findById (id: string): Promise<User | null> {
    const userFound = this.users.get(id)

    if (!userFound) {
      return null
    }

    return UserPersistanceMapper.toDomain(userFound)
  }

  async findAll (): Promise<User[]> {
    const rawUsers = Array.from(this.users.values())
    return rawUsers.map(rawUser => UserPersistanceMapper.toDomain(rawUser))
  }
}
