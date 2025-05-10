export interface ILoggerRepository {
  info({ code, detail, message, metadata }: { code: string; detail?: string; message: string; metadata?: Record<string, unknown> }): void
  warm<T>({ code, detail, message, metadata }: { code: string; detail?: string; message: string; metadata?: Record<string, T> }): void
  error<T>({ code, detail, message, metadata }: { code: string; detail?: string; message: string; metadata?: Record<string, T> }): void
}