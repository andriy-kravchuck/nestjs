import { Controller, Get, Post, Put, Delete, Param, Body, Req, UsePipes, UseGuards, HttpException, ValidationError, HttpStatus, HttpCode } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDTO } from './dto/user.dto';
import { UpdateUserDTO } from './dto/user.dto';
import { LoginUserDTO } from './dto/password.dto';
import { UserGuard } from './guards/user.guard';
import { UserDecorator } from './decorators/user.decorator';
import { validationError } from 'src/utils/common';


@Controller('user')
export class UserController {
    constructor(private userService: UserService) { }

    @HttpCode(HttpStatus.OK)
    @Get()
    @UseGuards(new UserGuard())
    async findAll(@UserDecorator() user) {
        return this.userService.findAll();
    }

    @HttpCode(HttpStatus.CREATED)
    @Post('register')
    async create(@Body() data: CreateUserDTO) {
        return this.userService.addUser(data);
    }

    @HttpCode(HttpStatus.OK)
    @Get(':id')
    findById(@Param('id') id: number) {
        return this.userService.findOne(id);
    }

    @HttpCode(HttpStatus.OK)
    @Put(':id')
    async update(@Param('id') id: number, @Body() data: UpdateUserDTO) {
        return this.userService.updateUser(id, data);
    }

    @HttpCode(HttpStatus.OK)
    @Delete(':id')
    remove(@Param('id') id: number): object {
        return this.userService.destroyUser(id);
    }

    @HttpCode(HttpStatus.OK)
    @Post('login')
    async login(@Body() data: LoginUserDTO) {
        await validationError(LoginUserDTO, data)
        return this.userService.login(data);
    }
}
