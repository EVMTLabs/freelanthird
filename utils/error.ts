export class CustomError extends Error {
  constructor(
    public message: string,
    public errorCode: number,
  ) {
    super(message); // Pass the message to the Error class
    this.name = this.constructor.name; // Set the name of the error
  }
}
