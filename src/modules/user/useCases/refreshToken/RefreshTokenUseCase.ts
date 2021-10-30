import auth from "@config/auth";
import { IUsersTokensRepository } from "@modules/user/IRepositories/IUsersTokensRepository";
import { IDateProvider } from "@shared/container/providers/DateProvider/IDateProvider";
import { AppError } from "@shared/errors/appError";
import { sign, verify } from "jsonwebtoken";
import { inject, injectable } from "tsyringe";

interface IPayload {
  sub: string;
  email: string,
}

interface ITokenResponse {
  token: string;
  refresh_token: string;
}

@injectable()
class RefreshTokenUseCase {
  constructor(
    @inject("UsersTokenRepository")
    private usersTokenRepository: IUsersTokensRepository,

    @inject("DayjsDateProvider")
    private dayjsDateProvider: IDateProvider
  ) { }

  async execute(token: string): Promise<ITokenResponse> {
    const { sub, email } = verify(token, auth.secret_refresh_token) as IPayload;

    const user_id = sub;

    const userToken = await this.usersTokenRepository.findByUserIdAndRefreshToken(user_id, token);

    if (!userToken) {
      throw new AppError("Refresh Token does not exists!");
    }

    await this.usersTokenRepository.deleteById(userToken.id);

    const refresh_token_expires_date = this.dayjsDateProvider.addDays(auth.expires_in_refresh_token_days);

    const refresh_token = sign({ email }, auth.secret_refresh_token, {
      subject: user_id,
      expiresIn: auth.expires_in_refresh_token_days
    });

    await this.usersTokenRepository.create({
      user_id,
      expires_date: refresh_token_expires_date,
      refresh_token
    });

    const newToken = sign({}, auth.secret_token, {
      subject: user_id,
      expiresIn: auth.expires_in_token
    });

    return {
      refresh_token,
      token: newToken
    };
  }
}
export { RefreshTokenUseCase };