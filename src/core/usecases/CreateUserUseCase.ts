import {AsyncUseCase} from "../base/UseCase.abstract";
import {User} from "../entities/User";
import {IUserRepository} from "../interfaces/IUserRepository";

export abstract class CreateUserUseCase implements AsyncUseCase<User> {
    abstract execute(name: string, email: string, password: string): Promise<User>;
}

export class CreateUserUseCaseImpl implements CreateUserUseCase {

    constructor(private userRepository: IUserRepository) {}

    async execute(name: string, email: string, password: string): Promise<User> {
        const user = await this.userRepository.getByEmail(email);
        if (user) {
            throw new Error('User already exists');
        }
        return this.userRepository.create(name, email, password);
    }
}