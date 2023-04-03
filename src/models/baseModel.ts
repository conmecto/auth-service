import { CreateDateColumn, UpdateDateColumn, DeleteDateColumn, PrimaryGeneratedColumn } from 'typeorm';

export default class BaseModel {
    @PrimaryGeneratedColumn()
    id: number

    @CreateDateColumn({
        type: 'timestamptz',
        name: 'created_at'
    })
    createdAt: Date

    @UpdateDateColumn({
        type: 'timestamptz',
        name: 'updated_at'
    })
    updatedAt: Date

    @DeleteDateColumn({
        type: 'timestamptz',
        name: 'deleted_at'
    })
    deletedAt: Date
}