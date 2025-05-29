import { responseMessage } from '../../src/utils/response-message'

describe('responseMessage', () => {
  it('should return response with status code and JSON stringified body', () => {
    const result = responseMessage({
      statusCode: 200,
      body: { message: 'Success', data: [1, 2, 3] },
    })

    expect(result).toEqual({
      statusCode: 200,
      body: JSON.stringify({ message: 'Success', data: [1, 2, 3] }),
      headers: {
        'Content-Type': 'application/json',
      },
    })
  })

  it('should return response with status code and no body', () => {
    const result = responseMessage({ statusCode: 204 })

    expect(result).toEqual({
      statusCode: 204,
      body: undefined,
      headers: {
        'Content-Type': 'application/json',
      },
    })
  })
})
