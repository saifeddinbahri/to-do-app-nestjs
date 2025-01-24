import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpStatus,
} from '@nestjs/common';
import { Response } from 'express';
import { BaseException } from 'src/exceptions/base.exception';
import { CredentialsDoesNotMatchException } from 'src/exceptions/credentials-does-not-match.exception';
import { DataNotFoundException } from 'src/exceptions/data-not-found.exception';
import { EmailAlreadyExistsException } from 'src/exceptions/email-already-exists.exception';
import { EmailNotFoundException } from 'src/exceptions/email-not-found.exception';

@Catch(BaseException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: BaseException, host: ArgumentsHost) {
    const context = host.switchToHttp();
    const response = context.getResponse<Response>();
    let status: number;

    switch (exception.constructor) {
      case EmailAlreadyExistsException:
        status = HttpStatus.CONFLICT;
        break;
      case CredentialsDoesNotMatchException:
        status = HttpStatus.CONFLICT;
        break;
      case EmailNotFoundException:
        status = HttpStatus.NOT_FOUND;
        break;
      case DataNotFoundException:
        status = HttpStatus.NOT_FOUND;
        break;
      default:
        status = HttpStatus.INTERNAL_SERVER_ERROR;
    }

    response.status(status).json({
      status: 'Failed',
      message: exception.message,
    });
  }
}
