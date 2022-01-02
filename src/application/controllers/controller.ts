import { badRequest, HttpResponse, serverError } from '@/application/helpes'
import { ValidationComposite, Validator } from '@/application/validation'

export abstract class Controller {
  buildValidators (httpRequest: any): Validator [] {
    return []
  }

  abstract perform (httpRequest: any): Promise<HttpResponse>

  async handle (httpRequest: any): Promise<HttpResponse> {
    const error = this.validate(httpRequest)

    if (error !== undefined) {
      return badRequest(error)
    }
    try {
      return await this.perform(httpRequest)
    } catch (error) {
      return serverError(error)
    }
  }

  private readonly validate = (httpRequest: any): Error | undefined => {
    const validator = this.buildValidators(httpRequest)
    return new ValidationComposite(validator).validate()
  }
}
