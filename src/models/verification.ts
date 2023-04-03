import { Entity, Column } from 'typeorm';
import BaseModel from './baseModel';

@Entity('verification')
export default class Verification extends BaseModel {
    @Column({
        unique: true
    })
    email: string

    @Column({
        nullable: true
    })
    code: number

    @Column({
        nullable: true,
        type: 'timestamptz',
        name: 'issued_at'
    })
    issuedAt: Date

    @Column({
        default: 0
    })
    count: number
}