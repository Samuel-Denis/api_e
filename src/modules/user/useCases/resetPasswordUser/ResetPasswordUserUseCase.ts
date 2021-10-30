import { IDateProvider } from "@shared/container/providers/DateProvider/IDateProvider";
import { AppError } from "@shared/errors/appError";
import { inject, injectable } from "tsyringe";
import { hash } from "bcryptjs";
import { IUsersTokensRepository } from "@modules/user/IRepositories/IUsersTokensRepository";
import { IUserRepository } from "@modules/user/IRepositories/IUserRepository";

interface IRequest {
  token: string,
  password: string;
}

@injectable()
class ResetPasswordUserUseCase {

  constructor(
    @inject("UsersTokenRepository")
    private usersTokensRepository: IUsersTokensRepository,

    @inject("DayjsDateProvider")
    private dayjsDateProvider: IDateProvider,

    @inject("UserRepository")
    private usersRepository: IUserRepository
  ) { }

  async execute({ token, password }: IRequest): Promise<void> {
    const userToken = await this.usersTokensRepository.findByRefreshToken(token);

    if (!userToken) {
      throw new AppError("Token Invalid!");
    }

    if (this.dayjsDateProvider.compareIfBefore(userToken.expires_date, this.dayjsDateProvider.dateNow())) {
      throw new AppError("Token expired!");
    }

    const user = await this.usersRepository.findById(userToken.user_id);

    user.password = await hash(password, 8);

    await this.usersRepository.create(user);

    await this.usersTokensRepository.deleteById(userToken.id);

  }
}
export { ResetPasswordUserUseCase };