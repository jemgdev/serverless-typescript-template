import { User } from '../../domain/User'
import { UserRepository } from '../../application/ports/UserRepository'
import { randomUUID } from 'crypto'
import { UserMapper } from '../transformers/UserMapper'
import { RawUserRecord } from '../transformers/RawUserRecord'

export class InMemoryUserRepository implements UserRepository {
  private readonly users = new Map<string, RawUserRecord>()

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

  async save (user: User): Promise<void> {
    this.users.set(
      user.toPrimitives().id,
      UserMapper.toPersistence(user)
    )
  }

  async findById (id: string): Promise<User | null> {
    const userFound = this.users.get(id)

    if (!userFound) {
      return null
    }

    return UserMapper.toDomain(userFound)
  }

  async findAll (): Promise<User[]> {
    const rawUsers = Array.from(this.users.values())
    return rawUsers.map(rawUser => UserMapper.toDomain(rawUser))
  }
}
