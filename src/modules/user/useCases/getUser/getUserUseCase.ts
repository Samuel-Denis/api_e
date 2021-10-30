import { IUserRepository } from "@modules/user/IRepositories/IUserRepository";
import { AppError } from "@shared/errors/appError";
import { inject, injectable } from "tsyringe";


interface IResponse {
        name : string;
        avatar : string;
}

@injectable()
class GetUserUseCase {
    
    constructor(
        @inject('UserRepository')
        private usersRepository: IUserRepository,
    ){}

    async execute(id: string): Promise<IResponse> {

        const user = await this.usersRepository.findById(id);

        if(!user){
            throw new AppError("Erro inesperado, tente mais tarde")
        }

        const userReturn: IResponse = {

              name: user.name,
              avatar:`tmp/avatar/${user.avatar}`
            };
      
          return userReturn;

    }

}

export { GetUserUseCase }