import { BaseException } from './base.exception';

export class CredentialsDoesNotMatchException extends BaseException {
  constructor() {
    super('Credentials does not match');
  }
}
