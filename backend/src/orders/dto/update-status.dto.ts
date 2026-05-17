import { IsString, IsIn } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateOrderStatusDto {
  @ApiProperty({ enum: ['TASKER_ARRIVED', 'IN_PROGRESS', 'PENDING_COMPLETION', 'COMPLETED', 'CANCELLED'] })
  @IsString()
  @IsIn(['TASKER_ARRIVED', 'IN_PROGRESS', 'PENDING_COMPLETION', 'COMPLETED', 'CANCELLED'], {
    message: 'Status phải là TASKER_ARRIVED, IN_PROGRESS, PENDING_COMPLETION, COMPLETED hoặc CANCELLED',
  })
  status: string;
}
