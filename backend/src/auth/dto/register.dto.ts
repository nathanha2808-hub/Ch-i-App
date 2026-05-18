import { IsString, IsNotEmpty, Matches, MinLength, MaxLength, IsIn, IsOptional, IsArray } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class RegisterDto {
  @ApiProperty({ example: '0901234567' })
  @IsString()
  @IsNotEmpty()
  @Matches(/^[0-9+\-\s]{8,20}$/, { message: 'Số điện thoại không hợp lệ' })
  phone: string;

  @ApiProperty({ example: 'password123' })
  @IsString()
  @MinLength(8, { message: 'Mật khẩu tối thiểu 8 ký tự' })
  @MaxLength(100)
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).*$/, { message: 'Mật khẩu phải chứa ít nhất 1 chữ hoa, 1 chữ thường, 1 số và 1 ký tự đặc biệt' })
  password: string;

  @ApiProperty({ example: 'Nguyen Van A' })
  @IsString()
  @IsNotEmpty({ message: 'Họ tên không được trống' })
  @MaxLength(100, { message: 'Họ tên tối đa 100 ký tự' })
  full_name: string;

  @ApiProperty({ example: 'CUSTOMER', enum: ['CUSTOMER', 'TASKER', 'ADMIN'] })
  @IsString()
  @IsIn(['CUSTOMER', 'TASKER', 'ADMIN'], { message: 'Role phải là CUSTOMER, TASKER hoặc ADMIN' })
  role: 'CUSTOMER' | 'TASKER' | 'ADMIN';

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  id_number?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  id_front_base64?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  id_back_base64?: string;

  @ApiProperty({ required: false, type: [String] })
  @IsOptional()
  @IsArray()
  services?: string[];
}
