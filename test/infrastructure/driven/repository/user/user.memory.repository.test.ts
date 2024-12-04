import { UserMemoryRepository } from '../../../../../src/infrastructure/driven/repository/user/user.memory.repository'
import { usersMock } from '../../../../mocks/user.model.mock';

describe('UserMemoryRepository', () => {
  it('Should return users', async () => {
    const userMemoryRepository = new UserMemoryRepository()
    const usersFound = await userMemoryRepository.getAllUsers()

    expect(usersFound[0].name).toStrictEqual(usersMock[0].name)
  })
})