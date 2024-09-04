import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
  Inject,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Reflector } from '@nestjs/core';
import { LoggerService } from './logger.service';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  constructor(
    private readonly reflector: Reflector,
    @Inject(LoggerService) private readonly loggerService: LoggerService,
  ) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();
    const entity = this.reflector.get<string>('entity', context.getHandler());
    const oldData = request.body.oldData;
    const newData = request.body.newData;

    return next.handle().pipe(
      tap(async () => {
        if (entity && oldData && newData) {
          await this.loggerService.logChange(entity, oldData, newData);
        }
      }),
    );
  }
}
