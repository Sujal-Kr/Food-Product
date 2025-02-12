export class ApiError extends Error {
  constructor(code, message) {
    super(message);
    this.statusCode = code;
  }
}

// export class ValidationErrorResponse  {
//   constructor(message) {
//     this.statusCode = statusCode;
//     this.data = data;
//     this.message = message;
//   }
// }
