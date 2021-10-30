import { container } from 'tsyringe';
import { UserRepository } from '@modules/user/infra/repositories/userRepository';
import { IUserRepository } from '@modules/user/IRepositories/IUserRepository';
import { IProductRespositories } from '@modules/product/IRepositories/IProductsRepositories';
import { ProductsRepositories } from '@modules/product/infra/Repositories/ProductsRepositories';
import { ICategoriesRepositories } from '@modules/product/IRepositories/ICategoriesRepositories';
import { CategoriesRepositories } from '@modules/product/infra/Repositories/categoriesRepositories';
import { IPedidosRepositories } from '@modules/pedido/IRepositories/IPedidosRepositories';
import { PedidosRepositories } from '@modules/pedido/infra/repositories/pedidosRepositories';
import { IOrdersPedidosRepositories } from '@modules/pedido/IRepositories/IOrdersProductsRepositories';
import { OrdersProductsRepositories } from '@modules/pedido/infra/repositories/ordersProductsRepositories';
import { IUsersTokensRepository } from '@modules/user/IRepositories/IUsersTokensRepository';
import { UsersTokensRepository } from '@modules/user/infra/repositories/UsersTokensRepository';
import { ICartRepositories } from '@modules/carrinho/IRepositories/IRepositoriesCart';
import { ICartProductsRepositories } from '@modules/carrinho/IRepositories/IRepositoriesCartProducts';
import { CartRepositories } from '@modules/carrinho/infra/repositories/cartRepositroies';
import { CarProductsRepositories } from '@modules/carrinho/infra/repositories/cartProductsRepositories';

container.registerSingleton<IUserRepository>(
  'UserRepository', UserRepository,
);

container.registerSingleton<IProductRespositories>(
  'ProductsRepositories', ProductsRepositories,
);

container.registerSingleton<ICategoriesRepositories>(
  'CategoriesRespositories', CategoriesRepositories,
);

container.registerSingleton<IPedidosRepositories>(
  'PedidosRepositories', PedidosRepositories,
);

container.registerSingleton<IOrdersPedidosRepositories>(
  'OrdersProductsRepositories', OrdersProductsRepositories,
);

container.registerSingleton<IUsersTokensRepository>(
  "UsersTokenRepository", UsersTokensRepository
);

container.registerSingleton<ICartRepositories>(
  "CartRepositories", CartRepositories
);

container.registerSingleton<ICartProductsRepositories>(
  "CarProductsRepositories", CarProductsRepositories
);


