import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';

import { map } from 'rxjs/operators';

@Injectable()
export class IncludeDocumentIdInterceptor<T = unknown>
  implements NestInterceptor
{
  private targetField: keyof T;

  constructor(targetField?: keyof T) {
    this.targetField = targetField;
  }

  intercept(context: ExecutionContext, next: CallHandler) {
    console.log('intercepting');
    if (this.targetField) {
      return next.handle().pipe(
        map((data: Array<T>) => {
          const result = { ...data } as unknown;
          if (Array.isArray(result[this.targetField])) {
            result[this.targetField] = (
              result[this.targetField] as Array<object & { _id: string }>
            ).map(({ _id, ...item }) => ({
              ...(item as T),
              id: _id,
            }));
            return result;
          }
        })
      );
    } else {
      return next.handle().pipe(map((data) => ({ ...data, id: data._id })));
    }
  }
}
