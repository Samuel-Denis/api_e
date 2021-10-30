import auth from "@config/auth";
import { IUserRepository } from "@modules/user/IRepositories/IUserRepository";
import { IUsersTokensRepository } from "@modules/user/IRepositories/IUsersTokensRepository";
import { IDateProvider } from "@shared/container/providers/DateProvider/IDateProvider";
import { AppError } from "@shared/errors/appError";
import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";
import { inject, injectable } from "tsyringe";


interface IRequest {
    email: string;
    password: string;
}

interface IResponse {
    user : {
        name : string;
        avatar : string;
    };
    token : string
    refresh_token: string;
}

@injectable()
class AuthenticateUseCase {

    constructor(
        @inject('UserRepository')  
        private usersRepository: IUserRepository,
        @inject('UsersTokenRepository')
        private usersTokensRepository: IUsersTokensRepository,
        @inject('DayjsDateProvider')
        private dayjsDateProvider: IDateProvider,
    ){}
   async execute({ email, password }: IRequest): Promise<IResponse>{
    const user = await this.usersRepository.findByEmail(email);

    if (!user) {
      throw new AppError('Email or password incorrect');
    }

    const passwordMatch = await compare(password, user.password);

    if (!passwordMatch) {
      throw new AppError('Email or password incorrect');
    }

    const token = sign({}, auth.secret_token, {
      subject: user.id,
      expiresIn: auth.expires_in_token,
    });

    const refresh_token = sign({ email }, auth.secret_refresh_token, {
      subject: user.id,
      expiresIn: auth.expires_in_refresh_token,
    });

    const refresh_token_expires_date = this.dayjsDateProvider.addDays(auth.expires_in_refresh_token_days);

    await this.usersTokensRepository.create({
      expires_date:  refresh_token_expires_date,
      refresh_token,
      user_id: user.id
    });

    const tokenReturn: IResponse = {
      token,
      refresh_token,
      user: {
        name: user.name,
        avatar:`tmp/avatar/${user.avatar}`
      },
    };

    return tokenReturn;
    }
}

export { AuthenticateUseCase }