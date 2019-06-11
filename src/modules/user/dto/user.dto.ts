import { IsString, 
        IsEmail, 
        MinLength, 
        MaxLength,
    } from 'class-validator';
import { Unique } from 'typeorm';
import { ApiModelProperty } from '@nestjs/swagger';

export class UpdateUserDTO {
    @IsString()
    @MinLength(6)
    @ApiModelProperty()
    firstName: string;
    
    @IsString()
    @MinLength(6)
    @ApiModelProperty()
    lastName: string;

    @IsString()
    @IsEmail()
    @MinLength(10)
    @ApiModelProperty()
    email: string;

    @IsString()
    @MinLength(8)
    @MaxLength(15)
    @ApiModelProperty()
    phoneNumber: string;
    
    @ApiModelProperty()
    password: string;
}

@Unique(["email", "phoneNumber"])
export class CreateUserDTO {
    @IsString()
    @MinLength(6)
    @ApiModelProperty()
    firstName: string;

    @IsString()
    @MinLength(6)
    @ApiModelProperty()
    lastName: string;
    
    @IsString()
    @IsEmail()
    @MinLength(10)
    @ApiModelProperty()
    email: string;

    @IsString()
    @MinLength(8)
    @MaxLength(15)
    @ApiModelProperty()
    phoneNumber: string;

    @MinLength(6)
    @ApiModelProperty()
    password: string;

    @ApiModelProperty()
    role: string;
}