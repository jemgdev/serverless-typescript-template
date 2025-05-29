import { UserModel } from '../../../../src/core/domain/models/user.model'

describe('LogMessage', () => {
  test('Test', () => {
    const user: UserModel = {
      name: '',
      lastname: '',
      age: 0,
      identificationNumber: '',
      identificationType: '',
    }

    expect(user.name).toEqual('')
  })
})
