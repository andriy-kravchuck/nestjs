import { Injectable, NotFoundException, HttpCode, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductEntity, UserEntity } from 'src/models';
import { Repository } from 'typeorm';
import { CreateProductDTO, ProductRO } from './dto/product.dto';
import { validationError } from 'src/utils/common';


@Injectable()
export class ProductService {
    constructor(
        @InjectRepository(ProductEntity)
        private productRepository: Repository<ProductEntity>,
        @InjectRepository(UserEntity)
        private userRepository: Repository<UserEntity>
    ) {}

    private toResponceObject(product: ProductEntity) {
        return { ...product, user: product.user.toResponseObject() };
    }

    async create(userId: string, data: CreateProductDTO) {
        await validationError(CreateProductDTO, data);

        const user = await this.userRepository.findOne({where: {id: userId}})
        const product = await this.productRepository.create({ ...data, user: user});
        await this.productRepository.save(product);
        return { ...product, user: product.user.toResponseObject() };
    }

    async findAll() : Promise<ProductRO[]>{
        const products = await this.productRepository.find({relations: ['user']})
        return products.map(product => this.toResponceObject(product));
    }

    async findOne(productid: number) : Promise<ProductRO>{
        const product = await this.productRepository.findOne({ where: { productid }, relations: ['user']})
        return this.toResponceObject(product);
    }

    async update(productid: number, data: CreateProductDTO): Promise<ProductRO> {
        let product = await this.productRepository.findOne({ where: { productid }});
        if (! product) {
            throw new NotFoundException('Not found');
        }

        await this.productRepository.update({ productid }, data);
        product = await this.productRepository.findOne({ where: { productid }, relations: ['user']});
        return this.toResponceObject(product);
    }

    async destroy(productid: number) {
        const product = await this.productRepository.findOne({ where: { productid }, relations: ['user']});
        if (!product) {
            throw new NotFoundException('Not found');
        }

        await this.productRepository.delete({ productid });
        return product; 
    }
}