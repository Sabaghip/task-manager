import { createParamDecorator, ExecutionContext } from "@nestjs/common";


export const User = createParamDecorator(
  (_data: never, context: ExecutionContext) => {
    const user: Request = context.switchToHttp().getRequest()["user"]
    return user
  }
)