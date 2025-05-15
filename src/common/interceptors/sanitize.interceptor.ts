import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from "@nestjs/common";
import { Request } from "express";
import { Observable } from "rxjs";
import * as sanitizeHtml from 'sanitize-html'
import { LoggerService } from "src/modules/logger/logger.service";

@Injectable()
export class SanitizeInterceptor implements NestInterceptor {
  constructor(
    private readonly logger: LoggerService
  ) { }

  intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> {
    const request: Request = context.switchToHttp().getRequest()
    if (request.body) {
      this.sanitizeRequestBody(request.body)
    }
    return next.handle().pipe()
  }

  private readonly validTags = ['b', 'i', 'em', 'strong', 'p', 'a']

  private sanitizeRequestBody(body: any) {
    Object.keys(body).forEach(key => {
      if (typeof body[key] === 'string') {
        const invalidTags = this.findInvalidTags(body[key]);

        if (invalidTags.length > 0) {
          this.logger.warn(`INVALID TAGS FOUND: ${invalidTags.join(', ')}`);
        }

        body[key] = sanitizeHtml(body[key], {
          allowedTags: this.validTags,
          allowedAttributes: {
            'a': ['href'],
            'img': ['src', 'alt'],
          },
        });
      } else if (typeof body[key] === 'object' && body[key] !== null) {
        this.sanitizeRequestBody(body[key]);
      }
    });
  }
  private findInvalidTags(input: string): string[] {
    const tagRegex = /<\/?([a-zA-Z0-9-]+)(\s[^>]+)?\/?>/g;
    let match;
    const invalidTags: string[] = [];

    while ((match = tagRegex.exec(input)) !== null) {
      const tag = match[1].toLowerCase();
      if (!this.validTags.includes(tag)) {
        invalidTags.push(tag);
      }
    }

    return invalidTags;
  }
}