import { v4 as uuidV4 } from 'uuid'
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";
import { User } from '@modules/user/infra/typeorm/entities/user';

@Entity('cartUser')
class Cart {
 
    @PrimaryColumn()
    id?: string;


    @ManyToOne(() => User)
    @JoinColumn({ name: 'user_id'})
    user_id: string;

    @CreateDateColumn()
    created_at: Date;

    constructor(){
        if(!this.id){
            this.id = uuidV4()
        }
    }
}

export { Cart }