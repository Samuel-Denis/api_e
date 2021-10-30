import { v4 as uuidV4 } from 'uuid'
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { Pedido } from './pedido';
import { Product } from '@modules/product/infra/typeorm/entities/Product';

@Entity('orderProducts')
class OrderProducts {

    @PrimaryColumn()
    id?: string;

    @ManyToOne(() => Pedido)
    @JoinColumn({ name: 'pedido_id'})
    pedido: Pedido;

    @Column()
    pedido_id: string;


    @ManyToOne(() => Product)
    @JoinColumn({ name: 'product_id' })
    product: Product;

    @Column()
    product_id: string;

    @Column()
    quantidade: number;

    @Column()
    valor: number;

    @CreateDateColumn()
    created_at: Date;

    constructor(){
        if(!this.id){
            this.id = uuidV4()
        }
    }
}

export { OrderProducts }