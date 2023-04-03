import { Entity, Column, OneToOne, JoinColumn } from 'typeorm';
import User from './user';
import BaseModel from './baseModel';

@Entity('profile')
export default class Profile extends BaseModel {
    @Column({
        type: 'text',
        length: 2000,
        nullable: true
    })
    description: string

    @OneToOne(() => User)
    @JoinColumn({ name: 'user_id', referencedColumnName: 'id'})
    userId: string

    @Column({
        nullable: true
    })
    location: string

    @Column({
        nullable: true
    })
    school: string

    @Column({
        nullable: true
    })
    work: string

    @Column({
        nullable: true,
        name: 'ig_id'
    })
    igId: string

    @Column({
        nullable: true,
        name: 'snap_id'
    })
    snapId: string

    @Column()
    age: number

    @Column({
        nullable: true
    })
    interests: string

    @Column({
        type: 'text',
        length: 1000
    })
    pic1: string

    @Column({
        type: 'text',
        length: 1000
    })
    pic2: string

    @Column({
        type: 'text',
        length: 1000,
        nullable: true
    })
    pic3: string

    @Column({
        type: 'text',
        length: 1000,
        nullable: true
    })
    pic4: string

    @Column({
        type: 'text',
        length: 1000,
        nullable: true
    })
    pic5: string
}