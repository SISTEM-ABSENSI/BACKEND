import { mockRequest, mockResponse } from '../utilities/testHelpers'
import { userLogin } from '../controllers/auth/login'
import { UserModel } from '../models/user'
import { StatusCodes } from 'http-status-codes'

jest.mock('../models/user')

describe('userLogin Controller', () => {
  let req: ReturnType<typeof mockRequest>
  let res: ReturnType<typeof mockResponse>

  beforeEach(() => {
    req = mockRequest()
    res = mockResponse()
  })

  test('should return 404 if user is not found', async () => {
    req.body = { userName: 'jhon', userPassword: 'qwerty' }
    UserModel.findOne = jest.fn().mockResolvedValue(null)

    await userLogin(req, res)

    expect(UserModel.findOne).toHaveBeenCalledWith({
      where: {
        deleted: 0,
        userName: 'jhon'
      }
    })
    expect(res.status).toHaveBeenCalledWith(StatusCodes.NOT_FOUND)
    expect(res.json).toHaveBeenCalledWith({
      status: 'error',
      errorMessage: 'Account not found. Please register first!',
      data: null,
      next: null,
      requestParam: null,
      version: {
        code: '1.0.0',
        name: ''
      }
    })
  })

  // ... other test cases
})
