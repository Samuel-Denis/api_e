import { IPedidosDTO } from "@modules/pedido/DTOs/pedidoDTO";
import { IPedidosRepositories } from "@modules/pedido/IRepositories/IPedidosRepositories";
import { getRepository, Repository } from "typeorm";
import { Pedido } from "../typeorm/entities/pedido";


class PedidosRepositories implements IPedidosRepositories {

    private repository: Repository<Pedido>;

    constructor(){
        this.repository = getRepository(Pedido);
    }

    async create({
        user_id,
        valor_total,
        id,
        numero_pedido,
        is_entrega,
        status_pedido,
        updated_at,
        taxa_entrega
    }: IPedidosDTO ): Promise<Pedido> {
        const order = this.repository.create(
            { id, 
              user_id, 
              valor_total, 
              numero_pedido, 
              is_entrega, 
              status_pedido, 
              updated_at,
              taxa_entrega
            })

        await this.repository.save(order);

        return order
    }
    async list(user_id: string): Promise<Pedido[]> {
        return await this.repository.find({user_id})
    }

    async findById(id:string): Promise<Pedido>{
        return this.repository.findOne(id);
    }

    async findByNumPedido(numero_pedido : number):Promise<Pedido>{
        return this.repository.findOne({numero_pedido});
    }

    // async update(entrega: number, id: string):Promise<void>{
    //     this.repository.update()
    // }
}

export { PedidosRepositories }