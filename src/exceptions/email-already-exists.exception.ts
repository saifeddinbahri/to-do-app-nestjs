import { BaseException } from './base.exception';

export class EmailAlreadyExistsException extends BaseException {
  constructor() {
    super('Email Already exists');
  }
}
