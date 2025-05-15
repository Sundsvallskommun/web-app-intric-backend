import { IsString } from 'class-validator';

export class HealthCheckStatus {
  @IsString()
  status: string;
}
