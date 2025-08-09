import { getUsersHttpAdapter } from '../../src/adapters/get-users-http.adapter'
import { GetUsersUseCase } from '../../src/core/usecases/get-users.usecase'
import { UserMemoryRepository } from '../../src/core/infrastructure/repositories/user.memory.repository'
import { Messages } from '../../src/utils/constants/messages'
import { StatusCodes } from '../../src/utils/constants/status-codes'
import { usersMock } from '../mocks/user.model.mock'

describe('getUsersHttpAdapter', () => {
  let getUsersUseCase: GetUsersUseCase

  beforeEach(() => {
    const userRepository = new UserMemoryRepository()
    getUsersUseCase = new GetUsersUseCase(userRepository)
  })

  it('debe retornar 200 y la lista de usuarios si todo sale bien', async () => {
    jest.spyOn(getUsersUseCase, 'invoke').mockResolvedValue(usersMock)
    // @ts-expect-error only for testing purposes
    const event: APIGatewayProxyEventV2 = {
      headers: {},
      body: JSON.stringify({}),
    }

    const result = await getUsersHttpAdapter(event, getUsersUseCase)

    // @ts-expect-error only for testing purposes
    expect(result.statusCode).toBe(StatusCodes.OPERATION_SUCCESSFUL)
  })

  it('debe retornar 503 si ocurre un error con mensaje SERVICE_UNAVAILABLE', async () => {
    jest
      .spyOn(getUsersUseCase, 'invoke')
      .mockRejectedValue(new Error(Messages.SERVICE_UNAVAILABLE))

    // @ts-expect-error only for testing purposes
    const event: APIGatewayProxyEventV2 = {
      headers: {},
      body: JSON.stringify({}),
    }

    const result = await getUsersHttpAdapter(event, getUsersUseCase)

    // @ts-expect-error only for testing purposes
    expect(result.statusCode).toBe(StatusCodes.SERVICE_NOT_AVAILABLE)
  })

  it('debe retornar 500 si ocurre un error no controlado', async () => {
    jest
      .spyOn(getUsersUseCase, 'invoke')
      .mockRejectedValue(new Error('Error genérico'))

    // @ts-expect-error only for testing purposes
    const event: APIGatewayProxyEventV2 = {
      headers: {},
      body: JSON.stringify({}),
    }

    const result = await getUsersHttpAdapter(event, getUsersUseCase)

    // @ts-expect-error only for testing purposes
    expect(result.statusCode).toBe(StatusCodes.UNCONTROLLER_ERROR)
  })
})
