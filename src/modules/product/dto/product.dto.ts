import { validate, IsString, IsEmail, MinLength, MaxLength, IsOptional, IsNumber } from 'class-validator';
import { Unique } from 'typeorm';

export class CreateProductDTO {
    @IsString()
    @MinLength(6)
    productName: string;

    @IsString()
    productCode: string;

    @IsString()
    @MinLength(8)
    description: string;

    @IsNumber()
    price: number;

    @IsNumber()
    starRating: number;

    @IsString()
    imageUrl: string;
}

export class ProductRO {
    @IsString()
    @MinLength(6)
    productName: string;

    @IsString()
    productCode: string;

    @IsString()
    @MinLength(8)
    description: string;

    @IsNumber()
    price: number;

    @IsNumber()
    starRating: number;

    @IsString()
    imageUrl: string;
}