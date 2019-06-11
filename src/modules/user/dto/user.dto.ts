import { IsString, 
        IsEmail, 
        MinLength, 
        MaxLength,
    } from 'class-validator';
import { Unique } from 'typeorm';

export class UpdateUserDTO {
    @IsString()
    @MinLength(6)
    firstName: string;
    
    @IsString()
    @MinLength(6)
    lastName: string;

    @IsString()
    @IsEmail()
    @MinLength(10)
    email: string;

    @IsString()
    @MinLength(8)
    @MaxLength(15)
    phoneNumber: string;
    
    password: string;
}

@Unique(["email", "phoneNumber"])
export class CreateUserDTO {
    @IsString()
    @MinLength(6)
    firstName: string;

    @IsString()
    @MinLength(6)
    lastName: string;
    
    @IsString()
    @IsEmail()
    @MinLength(10)
    email: string;

    @IsString()
    @MinLength(8)
    @MaxLength(15)
    phoneNumber: string;

    @MinLength(6)
    password: string;

    role: string;
}