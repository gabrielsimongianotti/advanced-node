import { Validator } from '@/application/validation'

export class ValidationComposite implements Validator {
  constructor (private readonly validators: Validator[]) {}

  validate (): Error | undefined {
    for (const validator of this.validators) {
      const error = validator.validate()
      console.log(validator)
      if (error !== undefined) {
        return error
      }
    }
  }
}
