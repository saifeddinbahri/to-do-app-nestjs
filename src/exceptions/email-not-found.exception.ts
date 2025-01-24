import { BaseException } from './base.exception';

export class EmailNotFoundException extends BaseException {
  constructor() {
    super('Email does not exist');
  }
}
