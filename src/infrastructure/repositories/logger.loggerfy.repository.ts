import { ILoggerRepository } from '@domain/repositories/logger.repository.interface';
import { Loggerfy } from 'loggerfy'

export class LoggerLoggerfyRepository implements ILoggerRepository {
  private readonly logger: Loggerfy

  constructor() {
    this.logger = new Loggerfy()
  }

  info<T>({ code, detail, message, metadata }: { code: string; detail: string; message: string; metadata: Record<string, T> }): void {
    this.logger
      .info()
      .setCode(code)
      .setDetail(detail)
      .setMessage(message)
      .setMetadata(metadata)
      .write()
  }

  warm<T>({ code, detail, message, metadata }: { code: string; detail: string; message: string; metadata: Record<string, T> }): void {
    this.logger
      .warn()
      .setCode(code)
      .setDetail(detail)
      .setMessage(message)
      .setMetadata(metadata)
      .write()
  }

  error<T>({ code, detail, message, metadata }: { code: string; detail: string; message: string; metadata: Record<string, T> }): void {
    this.logger
      .error()
      .setCode(code)
      .setDetail(detail)
      .setMessage(message)
      .setMetadata(metadata)
      .write()
  }

}