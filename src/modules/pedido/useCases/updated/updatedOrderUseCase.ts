import { IPedidosRepositories } from "@modules/pedido/IRepositories/IPedidosRepositories";
import { AppError } from "@shared/errors/appError";
import { inject, injectable } from "tsyringe";
import { IDateProvider } from '@shared/container/providers/DateProvider/IDateProvider';
import dayjs from 'dayjs';
import utc from "dayjs/plugin/utc";
dayjs.extend(utc);


interface IRequest{
    num : number,
    num_pedido : string
}
@injectable()
class UpdatedOrderUseCase {
    constructor(
        @inject('PedidosRepositories')
        private pedidosRepositories: IPedidosRepositories,

        @inject("DayjsDateProvider")
        private dateProvider: IDateProvider,
    ){}
    async execute({num, num_pedido}: IRequest): Promise<void> {
        const order = await this.pedidosRepositories.findByNumPedido(parseInt(num_pedido));

        

        if(!order){
            throw new AppError('Pedido não encontrado');
        }

        if(!order.is_entrega){
            throw new AppError('Pedido não é para entrega...')
        }

        order.status_pedido = num;

        order.updated_at = this.dateProvider.dateNow();

        await this.pedidosRepositories.create(order);

    }
}

export { UpdatedOrderUseCase }