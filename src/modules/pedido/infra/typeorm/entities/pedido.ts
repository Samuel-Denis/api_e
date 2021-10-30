import { v4 as uuidV4 } from 'uuid'
import { Column, CreateDateColumn, Entity, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";

@Entity('pedidos')
class Pedido {
 
    @PrimaryColumn()
    id?: string;

    @Column()
    user_id: string;

    @Column()
    valor_total: number;

    @Column()
    status_pedido: number;

    @Column()
    is_entrega: boolean;

    @Column()
    taxa_entrega: number;

    @PrimaryGeneratedColumn()
    numero_pedido: number;

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

export { Pedido }