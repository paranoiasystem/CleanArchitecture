import {IUserRepository} from "../../core";
import {UserRepositoryInMemory} from "../../infrastructure";
import {CreateUserUseCase, CreateUserUseCaseImpl} from "../../core";

describe('Create User Use Case Test', () => {
    const userRepositoryInMemory: IUserRepository = new UserRepositoryInMemory();
    const createUserUseCase: CreateUserUseCase = new CreateUserUseCaseImpl(userRepositoryInMemory);

    it('should create a new user', async () => {
        const user = await createUserUseCase.execute("John Doe", "john.doe@mail.com", "123456");
        expect(user).toHaveProperty("id");
        expect(user).toHaveProperty("name", "John Doe");
        expect(user).toHaveProperty("email", "john.doe@mail.com");
        expect(user).toHaveProperty("password", "123456");
    });

    it('should not create a new user if email already exists', async () => {
        try {
            await createUserUseCase.execute("John Doe", "john.doe@mail.com", "123456");
        } catch (error) {
            expect(error).toHaveProperty("message", "User already exists");
        }
    });

});