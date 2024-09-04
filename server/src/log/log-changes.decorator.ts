import { applyDecorators, SetMetadata, UseInterceptors } from '@nestjs/common';
import { LoggingInterceptor } from './logging.interceptor';

export function LogChanges(entity: string) {
  return applyDecorators(
    SetMetadata('entity', entity),
    UseInterceptors(LoggingInterceptor),
  );
}
