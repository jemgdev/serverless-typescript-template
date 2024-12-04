import { Messages } from '../../src/constants/messages'
import { UserMemoryRepository } from '../../src/infrastructure/driven/repository/user/user.memory.repository'
import { GetUsersUseCase } from '../../src/usecases/get-users.usecase'
import { usersMock } from '../mocks/user.model.mock'

describe('GetUsersUseCase', () => {
  let userRepository: UserMemoryRepository

  beforeEach(() => {
    userRepository = new UserMemoryRepository()
  })

  it('Should return a valid user', async () => {
    jest.spyOn(userRepository, 'getAllUsers')
      .mockResolvedValue(usersMock)

    const getUserUseCase = new GetUsersUseCase(userRepository)
    const usersFound = await getUserUseCase.invoke()

    expect(usersFound).toStrictEqual(usersMock)
  })

  it('Should throw an service unavailable error when repository throws an uavailable error', async () => {
    jest.spyOn(userRepository, 'getAllUsers')
      .mockRejectedValue(new Error(Messages.SERVICE_UNAVAILABLE))

    const getUserUseCase = new GetUsersUseCase(userRepository)
    
    await expect(getUserUseCase.invoke())
      .rejects
      .toThrow(Messages.SERVICE_UNAVAILABLE)
  })

  it('Should throw a uncontroller error when repository throws any error', async () => {
    jest.spyOn(userRepository, 'getAllUsers')
      .mockRejectedValue(new Error('Any error'))

    const getUserUseCase = new GetUsersUseCase(userRepository)
    
    await expect(getUserUseCase.invoke())
      .rejects
      .toThrow(Messages.UNCONTROLLER_ERROR)
  })
})