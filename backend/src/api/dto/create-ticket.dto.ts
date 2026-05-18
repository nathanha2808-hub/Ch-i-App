import { IsString, IsNotEmpty, MaxLength, MinLength, IsOptional, IsNumber } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateTicketDto {
  @ApiProperty({ example: 'Tasker tới muộn 30 phút' })
  @IsString()
  @IsNotEmpty()
  @MinLength(5, { message: 'Tiêu đề tối thiểu 5 ký tự' })
  @MaxLength(255)
  subject: string;

  @ApiProperty({ example: 'Tasker đặt lịch 9:00 nhưng tới 9:35...' })
  @IsString()
  @IsNotEmpty()
  @MinLength(10, { message: 'Mô tả tối thiểu 10 ký tự' })
  @MaxLength(5000)
  description: string;

  // Lỗi 2 FIX: Cho phép gắn đơn hàng vào khiếu nại
  @ApiPropertyOptional({ example: 1, description: 'ID đơn hàng liên quan (optional)' })
  @IsOptional()
  @IsNumber()
  order_id?: number;
}
