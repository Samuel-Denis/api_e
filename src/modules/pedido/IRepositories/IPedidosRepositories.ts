import { IPedidosDTO } from "../DTOs/pedidoDTO";
import { Pedido } from "../infra/typeorm/entities/pedido";


interface IPedidosRepositories {
    create(data: IPedidosDTO): Promise<Pedido>
    list(user_id: string): Promise<Pedido[]>
    findById(id: string): Promise<Pedido>
    findByNumPedido(numero_pedido: number): Promise<Pedido>
}

export { IPedidosRepositories }