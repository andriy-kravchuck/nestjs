import { Entity, PrimaryGeneratedColumn, Unique, Column, CreateDateColumn, BeforeInsert, BeforeUpdate, AfterUpdate, AfterInsert, AfterLoad } from 'typeorm';
import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';

@Entity('users')
export class  UserEntity {

    @PrimaryGeneratedColumn('uuid')
    id: number;

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

    @CreateDateColumn()
    created: Date;

    @BeforeInsert()
    async hashPassword() {
        this.password = await bcrypt.hash(this.password, 10);
    }

    async toResponseObject(showToken: boolean = true) {
        const {id, firstName, lastName, email, phoneNumber, role, created, token} = this;
        if (showToken) {
            return {id, firstName, lastName, email, phoneNumber, role, created, token};
        }

        return {id, firstName, lastName, email, phoneNumber, role, created};
    }

    async comparePassword(attempt: string) {
        // return attempt;
        return await bcrypt.compare(attempt, this.password);
    }

    private get token() {
        const {id, email} = this;
        return jwt.sign({id, email}, process.env.SECRET, {expiresIn: '7d'});
    }
}
