import {AsyncUseCase} from "../base/UseCase.abstract";
import {User} from "../entities/User";
import {IUserRepository} from "../interfaces/IUserRepository";
import {inject, injectable} from "tsyringe";

export abstract class CreateUserUseCase implements AsyncUseCase<User> {
    abstract execute(name: string, email: string, password: string): Promise<User>;
}

@injectable()
export class CreateUserUseCaseImpl implements CreateUserUseCase {

    constructor(@inject("userRepository") private userRepository: IUserRepository) {}

    async execute(name: string, email: string, password: string): Promise<User> {
        const user = await this.userRepository.getByEmail(email);
        if (user) {
            throw new Error('User already exists');
        }
        return this.userRepository.create(name, email, password);
    }
}