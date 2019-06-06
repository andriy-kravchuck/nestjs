import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne } from 'typeorm';
import { UserEntity } from '../user/user.entity';

@Entity('products')
export class  ProductEntity {

    @PrimaryGeneratedColumn('uuid')
    productid: number;

    @Column({ type: 'text', nullable: false})
    productName: string;

    @Column({ type: 'text', nullable: false})
    productCode: string;

    @Column({ type: 'text', nullable: false })
    description: string;

    @Column({ type: 'real', nullable: false})
    price: number;

    @Column({ type: 'real', nullable: false})
    starRating: number;

    @Column({ type: 'text', nullable: true})
    imageUrl: string;

    @ManyToOne(type => UserEntity, user => user.products)
    user: UserEntity;

    @CreateDateColumn()
    releaseDate: Date;
}
