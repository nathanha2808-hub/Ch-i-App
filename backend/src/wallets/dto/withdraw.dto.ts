import { IsNumber, IsString, IsOptional, Min, Max, MinLength, MaxLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class WithdrawDto {
  @ApiProperty({ example: 100000, description: 'Số tiền rút (VND)' })
  @IsNumber({}, { message: 'Số tiền phải là số' })
  @Min(100000, { message: 'Tối thiểu 100.000đ' })
  @Max(50_000_000, { message: 'Tối đa 50.000.000đ một lần' })
  amount: number;

  @ApiProperty({ example: 'Vietcombank', description: 'Tên ngân hàng' })
  @IsString({ message: 'Tên ngân hàng phải là chuỗi' })
  @MinLength(2, { message: 'Tên ngân hàng không hợp lệ' })
  @MaxLength(100, { message: 'Tên ngân hàng quá dài' })
  bank_name: string;

  @ApiProperty({ example: '0123456789', description: 'Số tài khoản ngân hàng' })
  @IsString({ message: 'Số tài khoản phải là chuỗi' })
  @MinLength(5, { message: 'Số tài khoản không hợp lệ' })
  @MaxLength(30, { message: 'Số tài khoản quá dài' })
  account_number: string;

  @ApiProperty({ example: 'NGUYEN VAN A', description: 'Tên chủ tài khoản' })
  @IsString({ message: 'Tên chủ tài khoản phải là chuỗi' })
  @MinLength(2, { message: 'Tên chủ tài khoản không hợp lệ' })
  @MaxLength(100, { message: 'Tên chủ tài khoản quá dài' })
  account_holder: string;
}
