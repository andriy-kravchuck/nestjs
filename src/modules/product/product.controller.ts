import { Controller, HttpCode, HttpStatus, Get, Post, Body, UseGuards, Param, Put, Delete } from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDTO } from './dto/product.dto';
import { UserDecorator } from '../user/decorators/user.decorator';
import { ProductGuard } from './guards/product.guard';
import { UserEntity } from '../user/user.entity';
import { ProductEntity } from '../product/product.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { UserGuard } from '../user/guards/user.guard';

@Controller('product')
export class ProductController {
    constructor(private productService: ProductService,
        @InjectRepository(UserEntity)
        private userRepositiry: Repository<UserEntity>,
        @InjectRepository(ProductEntity)
        private productRepositiry: Repository<ProductEntity>) { }
    
    @UseGuards(UserGuard)
    @HttpCode(HttpStatus.OK)
    @Get()
    async findAll(@UserDecorator('id') user) {
        return this.productService.findAll(user);
    }

    @HttpCode(HttpStatus.CREATED)
    @UseGuards(UserGuard)
    @Post()
    async create(@UserDecorator('id') user,  @Body() data: CreateProductDTO) {
        return this.productService.create(user, data);
    }

    @UseGuards(ProductGuard)
    @HttpCode(HttpStatus.OK)
    @Get(':id')
    async findOne(@Param('id') id: string) {
        return this.productService.findOne(id);
    }
    
    @UseGuards(ProductGuard)
    @HttpCode(HttpStatus.OK)
    @Put(':id')
    async update(@Param('id') id: string, @Body() data: CreateProductDTO) {
        return this.productService.update(id, data);
    }

    @UseGuards(ProductGuard)
    @HttpCode(HttpStatus.OK)
    @Delete(':id')
    async destroy(@Param('id') id: string) {
        return this.productService.destroy(id);
    }
}
