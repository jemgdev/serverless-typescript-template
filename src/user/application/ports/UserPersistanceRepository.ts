import { User } from '../../domain/User'

export interface UserPersistanceRepository {
  save: (user: User) => Promise<string>
  findById: (id: string) => Promise<User | null>
  findAll: () => Promise<User[]>
}
