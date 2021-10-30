import { getRepository, Repository } from "typeorm";
import { ICreateUser } from "@modules/user/DTOs/createUserDTO";
import { IUserRepository } from "@modules/user/IRepositories/IUserRepository";
import { User } from "../typeorm/entities/user";


class UserRepository implements IUserRepository {

    private repository: Repository<User>

    constructor(){
        this.repository = getRepository(User);
    }
    async create({
        name,
        password,
        email,
        id,
        avatar,
    }: ICreateUser): Promise<void> {
        const user = this.repository.create
        ({        
            name,
            password,
            email,
            id,
            avatar
        });

        await this.repository.save(user);
    }
    async findByEmail(email: string): Promise<User> {
        return await this.repository.findOne({email})
    }
    async findById(id: string): Promise<User> {      
        return await this.repository.findOne(id)
    }

}

export { UserRepository }