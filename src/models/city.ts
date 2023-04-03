import { Entity, Column } from 'typeorm';
import BaseModel from './baseModel';
import { enums } from '../utils';

@Entity('city')
export default class City extends BaseModel {
    @Column({
        type: 'enum',
        enum: enums.Country,
        default: enums.Country.INDIA
    })
    country: enums.Country

    @Column() 
    name: string
}