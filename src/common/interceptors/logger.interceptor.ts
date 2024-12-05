import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const income = Date.now()
    const request = context.switchToHttp().getRequest();
    const response = context.switchToHttp().getResponse();

    console.log('Request:', {
      method: request.method,
      url: request.url,
      headers: request.headers,
    });

    return next.handle().pipe(
      tap((data) => {
        const elapse_time = Date.now()-income
        console.log('Response:', {
          statusCode: response.statusCode,
          data,
          elapse_time: `${elapse_time}ms`,
        });
      }),

      catchError((error) => {
        const elapse_time = Date.now()-income
        console.error('Error:', error, `After ${elapse_time}ms`);
        throw error;
      })
    );
  }
}
