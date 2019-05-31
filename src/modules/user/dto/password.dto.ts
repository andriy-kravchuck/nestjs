import { IsString, IsEmail, IsNotEmpty, MinLength } from 'class-validator';

export class ForgotPasswordDTO {

    @IsString()
    @IsNotEmpty()
    @IsEmail()
    readonly email: string;
}

export class LoginUserDTO {

    @IsString()
    @IsEmail()
    @IsNotEmpty()
    readonly email: string;

    @IsString()
    @IsNotEmpty()
    @MinLength(6)
    readonly password: string;
}

export class ChangePasswordDTO {

    @IsString()
    @IsNotEmpty()
    @IsEmail()
    readonly email: string;

    @IsString()
    @IsNotEmpty()
    readonly old_password: string;

    @IsString()
    @IsNotEmpty()
    readonly new_1_password: string;

    @IsString()
    @IsNotEmpty()
    readonly new_2_password: string;
}
