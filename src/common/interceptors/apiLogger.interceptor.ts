import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from "@nestjs/common";
import { Request } from "express";
import { Observable } from "rxjs";
import { LoggerService } from "src/modules/logger/logger.service";

@Injectable()
export class ApiLoggerInterceptor implements NestInterceptor {
  constructor(
    private readonly logger: LoggerService
  ) { }

  intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> {
    const request: Request = context.switchToHttp().getRequest()
    const { body, params, queryParam, url, userData } = this.logger.getRequestDataInString(request)
    this.logger.log(
      url,
      userData,
      queryParam,
      params,
      body,
    );
    return next.handle().pipe()
  }
}