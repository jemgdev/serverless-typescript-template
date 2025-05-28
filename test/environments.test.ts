import { Environments } from '../src/environments'

describe('Environments', () => {
  beforeEach(() => {
    jest.resetModules()
  })

  it('should return empty strings if env variables are not set', () => {
    expect(Environments.STAGE).toBe('')
    expect(Environments.REGION).toBe('')
  })
})
