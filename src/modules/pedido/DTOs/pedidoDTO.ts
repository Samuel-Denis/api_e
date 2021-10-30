
interface IPedidosDTO {
    id?: string;
    user_id: string;
    valor_total?: number;
    numero_pedido?: number;
    status_pedido?: number;
    updated_at?: Date;
    taxa_entrega?: number;
    is_entrega?: boolean;
}


export { IPedidosDTO }