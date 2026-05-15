import { IsString, IsNotEmpty, Matches } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ResendOtpDto {
  @ApiProperty({ example: '0901234567', description: 'Số điện thoại cần gửi lại OTP' })
  @IsString()
  @IsNotEmpty()
  @Matches(/^[0-9+\-\s]{8,20}$/, { message: 'Số điện thoại không hợp lệ' })
  phone: string;
}
