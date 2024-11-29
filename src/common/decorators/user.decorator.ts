import { ExecutionContext, createParamDecorator } from '@nestjs/common';

export const User = createParamDecorator(
  (data: unknown, context: ExecutionContext) => context.switchToHttp().getRequest().user
)