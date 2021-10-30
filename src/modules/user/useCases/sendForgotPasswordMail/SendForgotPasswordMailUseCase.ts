import { IDateProvider } from "@shared/container/providers/DateProvider/IDateProvider";
import { IMailProvider } from "@shared/container/providers/MailProvider/IMailProvider";
import { AppError } from "@shared/errors/appError";
import { inject, injectable } from "tsyringe";
import { v4 as uuidV4 } from "uuid";
import { resolve } from "path";
import { IUserRepository } from "@modules/user/IRepositories/IUserRepository";
import { IUsersTokensRepository } from "@modules/user/IRepositories/IUsersTokensRepository";

@injectable()
class SendForgotPasswordMailUseCase {

  constructor(
    @inject("UserRepository")
    private usersRepository: IUserRepository,
    @inject("UsersTokenRepository")
    private usersTokensRepository: IUsersTokensRepository,
    @inject("DayjsDateProvider")
    private dateProvider: IDateProvider,
    @inject("EtherealMailProvider")
    private mailProvider: IMailProvider

  ) { }

  async execute(email: string) {
    const user = await this.usersRepository.findByEmail(email);

    const templatePath = resolve(__dirname, "..", "..", "views", "emails", "forgotPassword.hbs");
    if (!user) {
      throw new AppError("User does not exists!");
    }
    const token = uuidV4();

    const expires_date = this.dateProvider.addHours(3);
    await this.usersTokensRepository.create({
      refresh_token: token,
      user_id: user.id,
      expires_date
    });

    const variable = {
      name: user.name,
      link: `${process.env.FORGOT_MAIL_URL}${token}`
    };

    await this.mailProvider.sendMail(email, "Recuperação de senha", variable, templatePath);
  }
}

export { SendForgotPasswordMailUseCase };