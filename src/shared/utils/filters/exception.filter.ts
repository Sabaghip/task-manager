import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus } from "@nestjs/common";
import { Request, Response } from "express";

export const HttpStatusToTypeMap = {
  [HttpStatus.OK]: "Ok",
  [HttpStatus.INTERNAL_SERVER_ERROR]: "Internal Server Error",
  [HttpStatus.BAD_REQUEST]: "Bad Request",
  [HttpStatus.REQUEST_TIMEOUT]: "Request Timeout",
  [HttpStatus.NOT_FOUND]: "Not Found",
  [HttpStatus.FORBIDDEN]: "Forbidden",
  [HttpStatus.UNAUTHORIZED]: 'Unauthorized'
};

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {

  catch(exception: unknown, host: ArgumentsHost) {
    const context = host.switchToHttp()
    const req: Request = context.getRequest<Request>()
    const res: Response = context.getResponse<Response>()

    let type: string = "INTERNAL"
    let message: string = "Internal server error."
    let status: number = 500
    let cause: any

    if (exception instanceof HttpException) {
      status = exception.getStatus()
      const response = exception.getResponse();
      type = response['error'] || response['message'] || type;
      message = Array.isArray(response['message']) ? response['message'][0] : response['message'];
      cause = response['cause']
    }

    res.status(status).json({
      status,
      type,
      message,
      cause: cause ? cause : undefined,
      method: req.method,
      path: req.url,
    })
  }
}