/* eslint-disable no-undef */
export abstract class Environments {
  static readonly STAGE: string = process.env.STAGE || ''
  static readonly REGION: string = process.env.REGION || ''
}