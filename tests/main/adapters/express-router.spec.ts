import { Request, RequestHandler, Response, NextFunction } from 'express'
import { Controller } from '@/application/controllers'
import { mock, MockProxy } from 'jest-mock-extended'
import { getMockReq, getMockRes } from '@jest-mock/express'
import { adapterExpressRoute } from '@/main/adapters'

describe('adapterExpressRoute', () => {
  let req: Request
  let res: Response
  let next: NextFunction
  let controller: MockProxy<Controller>
  let sut: RequestHandler

  beforeEach(() => {
    req = getMockReq({ body: { any: 'any' } })
    res = getMockRes().res
    next = getMockRes().next
    controller = mock<Controller>()
    controller.handle.mockResolvedValue({ statusCode: 200, data: { data: 'any_data' } })
    sut = adapterExpressRoute(controller)
  })

  it('sholl call hadle with correct request', async () => {
    await sut(req, res, next)

    expect(controller.handle).toHaveBeenCalledWith({ any: 'any' })
    expect(controller.handle).toHaveBeenCalledTimes(1)
  })

  it('sholl call hadle with empty request', async () => {
    const req = getMockReq()

    await sut(req, res, next)

    expect(controller.handle).toHaveBeenCalledWith({})
    expect(controller.handle).toHaveBeenCalledTimes(1)
  })

  it('sholl respond with 200 and valid data', async () => {
    await sut(req, res, next)

    expect(res.status).toHaveBeenCalledWith(200)
    expect(res.status).toHaveBeenCalledTimes(1)
    expect(res.json).toHaveBeenCalledWith({ data: 'any_data' })
    expect(res.json).toHaveBeenCalledTimes(1)
  })

  it('sholl respond with 400 and valid error', async () => {
    controller.handle.mockResolvedValue({ statusCode: 400, data: new Error('any_error') })

    await sut(req, res, next)

    expect(res.status).toHaveBeenCalledWith(400)
    expect(res.status).toHaveBeenCalledTimes(1)
    expect(res.json).toHaveBeenCalledWith({ error: 'any_error' })
    expect(res.json).toHaveBeenCalledTimes(1)
  })

  it('sholl respond with 500 and valid error', async () => {
    controller.handle.mockResolvedValue({ statusCode: 500, data: new Error('any_error') })

    await sut(req, res, next)

    expect(res.status).toHaveBeenCalledWith(500)
    expect(res.status).toHaveBeenCalledTimes(1)
    expect(res.json).toHaveBeenCalledWith({ error: 'any_error' })
    expect(res.json).toHaveBeenCalledTimes(1)
  })
})
