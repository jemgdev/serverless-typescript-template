import { getUsersHttpAdapter } from '@adapters/get-users.adapter'
import { GetUsersUseCase } from '@core/usecases/get-users.usecase'
import { UserMemoryRepository } from '@core/infrastructure/repositories/user/user.memory.repository'
import { Messages } from '@utils/constants/messages'
import { StatusCodes } from '@utils/constants/status-codes'
import { usersMock } from '../../test/mocks/user.model.mock'

describe('getUsersHttpAdapter', () => {
  let getUsersUseCase: GetUsersUseCase

  beforeEach(() => {
    const userRepository = new UserMemoryRepository()
    getUsersUseCase = new GetUsersUseCase(userRepository)
  })

  it('debe retornar 200 y la lista de usuarios si todo sale bien', async () => {
    jest
      .spyOn(getUsersUseCase, 'invoke')
      .mockResolvedValue(usersMock)

    const result = await getUsersHttpAdapter(getUsersUseCase)

    // @ts-expect-error only for testing purposes
    expect(result.statusCode).toBe(StatusCodes.OPERATION_SUCCESSFULL)
  })

  it('debe retornar 503 si ocurre un error con mensaje SERVICE_UNAVAILABLE', async () => {
    jest
      .spyOn(getUsersUseCase, 'invoke')
      .mockRejectedValue(new Error(Messages.SERVICE_UNAVAILABLE))

    const result = await getUsersHttpAdapter(getUsersUseCase)

    // @ts-expect-error only for testing purposes
    expect(result.statusCode).toBe(StatusCodes.SERVICE_NOT_AVAILABLE)
  })

  it('debe retornar 500 si ocurre un error no controlado', async () => {
    jest
      .spyOn(getUsersUseCase, 'invoke')
      .mockRejectedValue(new Error('Error genérico'))

    const result = await getUsersHttpAdapter(getUsersUseCase)

    // @ts-expect-error only for testing purposes
    expect(result.statusCode).toBe(StatusCodes.UNCONTROLLER_ERROR)
  })
})
