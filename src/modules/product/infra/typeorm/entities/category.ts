import { Column, CreateDateColumn, Entity, PrimaryColumn } from 'typeorm';
import { v4 as uuidV4 } from 'uuid'

@Entity('categories')
class Category {

    @PrimaryColumn()
    id?: string;

    @Column()
    name: string;

    @Column()
    image: string;

    @CreateDateColumn()
    created_at: Date;

    @CreateDateColumn()
    updated_at: Date;

    constructor(){
        if(!this.id){
            this.id = uuidV4()
        }
    }
}


export { Category }