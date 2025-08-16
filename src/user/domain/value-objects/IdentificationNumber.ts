export class IdentificationNumber {
  private constructor (private readonly value: string) {
    if (value.length <= 8) {
      throw new Error('Invalid identification number format')
    }
  }

  public static create (value: string): IdentificationNumber {
    return new IdentificationNumber(value)
  }

  public getValue (): string {
    return this.value
  }
}
