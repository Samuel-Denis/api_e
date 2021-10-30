import { ICreateUser } from "@modules/user/DTOs/createUserDTO";
import { User } from "@modules/user/infra/typeorm/entities/user";

interface IUserRepository {

    create(data: ICreateUser): Promise<void>
    findByEmail(email: string): Promise<User>
    findById(id: string): Promise<User>
}

export { IUserRepository }