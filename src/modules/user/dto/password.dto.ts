import { IsString, IsEmail, IsNotEmpty, MinLength } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';

export class ForgotPasswordDTO {

    @IsString()
    @IsNotEmpty()
    @IsEmail()
    @ApiModelProperty()
    readonly email: string;
}

export class LoginUserDTO {

    @IsString()
    @IsEmail()
    @IsNotEmpty()
    @ApiModelProperty()
    readonly email: string;

    @IsString()
    @IsNotEmpty()
    @MinLength(6)
    @ApiModelProperty()
    readonly password: string;
}

export class ChangePasswordDTO {

    @IsString()
    @IsNotEmpty()
    @IsEmail()
    @ApiModelProperty()
    readonly email: string;

    @IsString()
    @IsNotEmpty()
    @ApiModelProperty()
    readonly old_password: string;

    @IsString()
    @IsNotEmpty()
    @ApiModelProperty()
    readonly new_1_password: string;

    @IsString()
    @IsNotEmpty()
    @ApiModelProperty()
    readonly new_2_password: string;
}
