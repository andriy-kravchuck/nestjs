import { Controller, Get, Post, Body, HttpStatus, HttpCode } from '@nestjs/common';
import { AppService } from './app.service';
import { ForgotPasswordDTO, ChangePasswordDTO } from './user/dto/password.dto';
import { ApiUseTags } from '@nestjs/swagger';

@ApiUseTags('app')
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @HttpCode(HttpStatus.OK)
  @Get()
  getHello() {
    return this.appService.getHello();
  }
  
  @HttpCode(HttpStatus.CREATED)
  @Post()
  getHello2(): string {
    return this.appService.getHello();
  }

  @HttpCode(HttpStatus.OK)
  @Post('change-password')
  async changePass(@Body() data: ChangePasswordDTO) {
    return this.appService.changePass(data);
  }

  @HttpCode(HttpStatus.OK)
  @Post('forgot-password')
  async forgotPass(@Body() data: ForgotPasswordDTO) {
    return this.appService.forgotPass(data);
  }
}
