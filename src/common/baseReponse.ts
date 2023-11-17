export class BaseResponse<T = any> {
    constructor(statusCode: number, message: string, data?: T) {
      this.statusCode = statusCode;
      this.message = message;
      this.data = data;
    }
  
    statusCode: number;
    message: string;
    data?: T;
}