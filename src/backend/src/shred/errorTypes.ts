/** @format */

export class HandledError extends Error {
  public readonly statusCode: number;

  constructor(message: string, statusCode?: number) {
    super(message);
    this.statusCode = statusCode || 400;
    Object.setPrototypeOf(this, HandledError.prototype);
  }
}
