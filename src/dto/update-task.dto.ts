import { CreateTaskDTO } from './create-task.dto';

export class UpdateTaskDTO extends CreateTaskDTO {
  readonly id: string;
}
