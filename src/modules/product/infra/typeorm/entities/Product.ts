import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { v4 as uuidV4} from 'uuid'
import { Category } from './category';

@Entity('products')
class Product {

    @PrimaryColumn()
    id?: string;

    @Column()
    name: string;

    @Column()
    description: string;

    @Column()
    valor: number;

    @Column()
    estoque: number;

    @Column()
    type: string;

    @ManyToOne(() => Category)
    @JoinColumn({ name: "category_id" })
    category: Category;
  
    @Column()
    category_id: string;

    @Column()
    image?: string;

    @CreateDateColumn()
    created_at: Date;

    constructor(){
        if(!this.id){
            this.id = uuidV4()
        }
    }
}

export { Product }