import { responseMessage } from '../../src/utils/response-message'
import { StatusCodes } from '../../src/utils/constants/status-codes'
import { Loggerfy } from 'loggerfy'
import { GetUsersUseCase } from "../../src/core/usecases/get-users.usecase"
import { UserRepository } from "../../src/core/domain/repositories/user.repository"
import { UserMemoryRepository } from "../../src/core/infrastructure/repositories/user.memory.repository"
import { getUsersSqsAdapter } from "../../src/adapters/get-users-sqs.adapter"
import { UserModel } from "../../src/core/domain/models/user.model"

describe('getUsersSqsAdapter', () => {
  let userRepository: UserRepository
  let getUsersUseCase: GetUsersUseCase
  let logger: Loggerfy

  beforeEach(() => {
    logger = new Loggerfy()
    userRepository = new UserMemoryRepository()
    getUsersUseCase = new GetUsersUseCase(userRepository)
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  it('Should return OPERATION_SUCCESSFULL', async () => {
    jest.spyOn(getUsersUseCase, 'invoke').mockResolvedValue([
      {
        name: '',
        lastname: '',
        age: 0,
        identificationNumber: '',
        identificationType: ''
      }
    ])

    const response = await getUsersSqsAdapter(getUsersUseCase, {
      username: '',
      expiresAt: 0,
      code: '',
      message: '',
      detail: '',
      level: 'INFO',
      environment: ''
    })

    expect(response).toStrictEqual(responseMessage<{
      areMessageRegistered: UserModel[]
    }>({
      statusCode: StatusCodes.OPERATION_SUCCESSFULL,
      body: {
        areMessageRegistered: [
          {
            name: '',
            lastname: '',
            age: 0,
            identificationNumber: '',
            identificationType: ''
          }
        ]
      }
    }))
  })
})