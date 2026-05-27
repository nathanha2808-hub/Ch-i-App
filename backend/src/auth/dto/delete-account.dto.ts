import { ApiProperty } from '@nestjs/swagger';
import { IsString, MinLength, IsOptional } from 'class-validator';

/**
 * App Store Guideline 5.1.1(v) / Google Play account deletion requirement:
 * App có chức năng tạo tài khoản BẮT BUỘC phải có chức năng xóa tài khoản
 * trực tiếp trong app (không được redirect ra web).
 */
export class DeleteAccountDto {
  @ApiProperty({
    description: 'Mật khẩu hiện tại để xác nhận chính chủ',
    example: '123456',
  })
  @IsString()
  @MinLength(6, { message: 'Mật khẩu tối thiểu 6 ký tự' })
  password: string;

  @ApiProperty({
    description: 'Lý do xóa tài khoản (tùy chọn, dùng cho thống kê)',
    example: 'Không còn sử dụng dịch vụ',
    required: false,
  })
  @IsOptional()
  @IsString()
  reason?: string;
}
