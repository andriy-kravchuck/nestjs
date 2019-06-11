import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, BeforeInsert, OneToMany } from 'typeorm';
import * as bcrypt from "bcryptjs";
import * as jwt from "jsonwebtoken";
import { ProductEntity } from '../product/product.entity';

@Entity('users')
export class  UserEntity {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ type: 'text', nullable: false})
    firstName: string;

    @Column({ type: 'text', nullable: false})
    lastName: string;

    @Column({ type: 'text', unique: true, nullable: false })
    email: string;

    @Column({ type: 'text', unique: true, nullable: false})
    phoneNumber: string;

    @Column({ type: 'text', nullable: false})
    password: string;

    @Column({ type: 'text', default: 'user', nullable: true})
    role: string;

    @Column({ type: 'text', default: '', nullable: true})
    code: string;

    @Column({ type: 'boolean', default: false, nullable: true})
    active: boolean;

    @OneToMany(type => ProductEntity, product => product.user)
    products: ProductEntity[];

    @CreateDateColumn()
    created: Date;

    @BeforeInsert()
    async hashPassword() {
        this.password = await bcrypt.hash(this.password, 10);
    }

    toResponseObject(showToken: boolean = false) {
        const { active, password, token, ...rest } = this;
    
        return showToken ? { ...rest, token } : rest;
    }

    async comparePassword(attempt: string) {
        return await bcrypt.compare(attempt, this.password);
    }

    private get token() {
        const {id, email} = this;
        return jwt.sign({id, email}, 'secret', {expiresIn: '7d'});
    }
}
