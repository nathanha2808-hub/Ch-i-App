import { Controller, Get, Post, Body, UseGuards, Request } from '@nestjs/common';
import { Throttle } from '@nestjs/throttler';
import { WalletsService } from './wallets.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { ApiTags, ApiBearerAuth, ApiOperation, ApiBody } from '@nestjs/swagger';
import { DepositDto } from './dto/deposit.dto';
import { WithdrawDto } from './dto/withdraw.dto';

@ApiTags('Wallets (Ví điện tử)')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('api/wallets')
export class WalletsController {
  constructor(private readonly walletsService: WalletsService) {}

  @Get('balance')
  @ApiOperation({ summary: 'Lấy thông tin ví và số dư hiện tại' })
  async getBalance(@Request() req) {
    return this.walletsService.getWallet(req.user.userId);
  }

  @Get('transactions')
  @ApiOperation({ summary: 'Lấy lịch sử giao dịch của ví' })
  async getTransactions(@Request() req) {
    return this.walletsService.getTransactions(req.user.userId);
  }

  @Post('deposit')
  @Throttle({ wallet: { limit: 1, ttl: 10000 } }) // TC-KH18-012 FIX: 1 request/10s
  @ApiOperation({ summary: 'Nạp tiền vào ví' })
  @ApiBody({ type: DepositDto })
  async deposit(@Request() req, @Body() body: DepositDto) {
    return this.walletsService.deposit(req.user.userId, body.amount);
  }

  @Post('withdraw')
  @Throttle({ wallet: { limit: 1, ttl: 30000 } }) // TC-KH19-010 FIX: 1 request/30s
  @ApiOperation({ summary: 'Yêu cầu rút tiền từ ví (UC_13)' })
  @ApiBody({ type: WithdrawDto })
  async withdraw(@Request() req, @Body() body: WithdrawDto) {
    return this.walletsService.withdraw(req.user.userId, body.amount, body.bank_name, body.account_number, body.account_holder);
  }
}
