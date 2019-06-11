import { IsString, MinLength, IsNumber } from 'class-validator';

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