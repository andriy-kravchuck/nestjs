import { IsString, MinLength, IsNumber } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';

export class CreateProductDTO {
    @IsString()
    @MinLength(6)
    @ApiModelProperty()
    productName: string;

    @IsString()
    @ApiModelProperty()
    productCode: string;

    @IsString()
    @MinLength(8)
    @ApiModelProperty()
    description: string;

    @IsNumber()
    @ApiModelProperty()
    price: number;

    @IsNumber()
    @ApiModelProperty()
    starRating: number;

    @IsString()
    @ApiModelProperty()
    imageUrl: string;
}

export class ProductRO {
    @IsString()
    @MinLength(6)
    @ApiModelProperty()
    productName: string;

    @IsString()
    @ApiModelProperty()
    productCode: string;

    @IsString()
    @MinLength(8)
    @ApiModelProperty()
    description: string;

    @IsNumber()
    @ApiModelProperty()
    price: number;

    @IsNumber()
    @ApiModelProperty()
    starRating: number;

    @IsString()
    @ApiModelProperty()
    imageUrl: string;
}