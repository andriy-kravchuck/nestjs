import { Controller, HttpCode, HttpStatus, Get, Post, Body, UseGuards, Param, Put, Delete } from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDTO } from './dto/product.dto';
import { UserGuard } from '../user/guards/user.guard';
import { userInfo } from 'os';
import { UserDecorator } from '../user/decorators/user.decorator';
import bodyParser = require('body-parser');

@Controller('product')
export class ProductController {
    constructor(private productService: ProductService) { }
    
    @HttpCode(HttpStatus.OK)
    @Get()
    async findAll() {
        return this.productService.findAll();
    }

    @HttpCode(HttpStatus.CREATED)
    @UseGuards(new UserGuard())
    @Post()
    async create(@UserDecorator('id') user,  @Body() data: CreateProductDTO) {
        return this.productService.create(user, data);
    }

    @Get(':id')
    async findOne(@Param('id') id: number) {
        return this.productService.findOne(id);
    }
    
    @Put(':id')
    async update(@Param('id') id: number, @Body() data: CreateProductDTO) {
        return this.productService.update(id, data);
    }

    @Delete(':id')
    async destroy(@Param('id') id: number) {
        return this.productService.destroy(id);
    }
}
