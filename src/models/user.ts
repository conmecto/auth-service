import { Entity, Column } from 'typeorm';
import BaseModel from './baseModel';
import { enums } from '../utils';

@Entity('users')
export default class User extends BaseModel {
    @Column({
        unique: true
    })
    email: string

    @Column()
    name: string

    @Column()
    dob: Date

    @Column({
        type: 'enum',
        enum: enums.Gender,
        default: enums.Gender.MAN
    })
    gender: enums.Gender
    
    @Column({
        type: 'enum',
        enum: enums.Role,
        default: enums.Role.USER
    })
    role: enums.Role

    @Column({
        type: 'enum',
        enum: enums.Country,
        default: enums.Country.INDIA
    })
    country: enums.Country

    @Column({
        type: 'enum',
        enum: enums.Search,
        default: enums.Search.ALL,
        name: 'search_for'
    }) 
    searchFor: enums.Search

    @Column({
        nullable: true,
        name: 'search_in'
    }) 
    searchIn: string

    @Column({
        default: false
    })
    verified: boolean
}