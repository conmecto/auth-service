import BaseModel from './baseModel';

//@Entity('token_identity')
export default class TokenIdentity extends BaseModel {
    // @Column({
    //     unique: true
    // })
    jti: string

    // @Column({
    //     name: 'user_id',
    //     unique: true
    // })
    userId: number

    // @Column({
    //     default: false
    // })
    used: boolean

    // @Column({
    //     type: 'timestamptz'
    // })
    exp: Date  
}