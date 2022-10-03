import {IUserRepository, User} from "../../core";
import {UserRepositoryInMemory} from "../../infrastructure";

describe('User Repository Test', () => {
    const userRepositoryInMemory: IUserRepository = new UserRepositoryInMemory();
    let user: User;

    it('should create a new user', async () => {
        user = await userRepositoryInMemory.create("John Doe", "john.doe@mail.com", "123456");
        expect(user).toHaveProperty("id");
        expect(user).toHaveProperty("name", "John Doe");
        expect(user).toHaveProperty("email", "john.doe@mail.com");
        expect(user).toHaveProperty("password", "123456");
    });

    it('should get a user by id', async () => {
        const userFound = await userRepositoryInMemory.getById(user.id);
        expect(userFound).toHaveProperty("id", user.id);
        expect(userFound).toHaveProperty("name", user.name);
        expect(userFound).toHaveProperty("email", user.email);
        expect(userFound).toHaveProperty("password", user.password);
    });

    it('should get a user by email', async () => {
        const userFound = await userRepositoryInMemory.getByEmail(user.email);
        expect(userFound).toHaveProperty("id", user.id);
        expect(userFound).toHaveProperty("name", user.name);
        expect(userFound).toHaveProperty("email", user.email);
        expect(userFound).toHaveProperty("password", user.password);
    });

    it('should not get a user by id if user does not exists', async () => {
        const userFound = await userRepositoryInMemory.getById("invalid_user_id");
        expect(userFound).toBeNull();
    });

    it('should not get a user by email if user does not exists', async () => {
        const userFound = await userRepositoryInMemory.getByEmail("invalid_user_email");
        expect(userFound).toBeNull();
    });

});