import { BaseException } from './base.exception';

export class DataNotFoundException extends BaseException {
  constructor(dataName: string) {
    super(`${dataName} not found`);
  }
}
