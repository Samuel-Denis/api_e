import { v4 as uuidV4 } from 'uuid'
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { Product } from '@modules/product/infra/typeorm/entities/Product';
import { Cart } from './cart';

@Entity('cartProducts')
class CartProducts {

    @PrimaryColumn()
    id?: string;

    @ManyToOne(() => Cart)
    @JoinColumn({ name: 'cart_id'})
    cart: Cart;

    @Column()
    cart_id: string;

    @ManyToOne(() => Product)
    @JoinColumn({ name: 'product_id' })
    product: Product;

    @Column()
    product_id: string;

    @Column()
    quantidade: number;

    @CreateDateColumn()
    created_at: Date;

    constructor(){
        if(!this.id){
            this.id = uuidV4()
        }
    }
}

export { CartProducts }