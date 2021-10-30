import { hash } from "bcryptjs";
import { inject, injectable } from "tsyringe";
import { ICreateUser } from "@modules/user/DTOs/createUserDTO";
import { IUserRepository } from "@modules/user/IRepositories/IUserRepository";
import { AppError } from "@shared/errors/appError";

@injectable()
class CreateUserUseCase {

    constructor(
        @inject('UserRepository')
        private usersRepository: IUserRepository,
    ){}
    async execute({
        name,
        password,
        email,
    }: ICreateUser): Promise<void> {
console.log('1')
        const userAlreadyExists = await this.usersRepository.findByEmail(email);
        console.log(password)
        if (userAlreadyExists) {
          throw new AppError('User Already Exists');
        }
        console.log('2')
     const passwordHash = await hash(password, 8);
     console.log('3')
      await  this.usersRepository.create({
            name,
            password: passwordHash,
            email,
        });
        console.log('4')
    }
}

export { CreateUserUseCase }