import { IUserRepository } from "../../core";
import { User } from "../../core";
import { v4 as uuidV4 } from 'uuid';
import {injectable} from "tsyringe";

@injectable()
export class UserRepositoryInMemory implements IUserRepository {
    private users: User[] = [];

    async create(name: string, email: string, password: string): Promise<User> {
        const user: User = new User(uuidV4(), name, email, password);
        this.users.push(user);
        return user;
    }

    async getById(id: string): Promise<User | null> {
        const user = this.users.find(user => user.id === id);
        return (user) ? user : null;
    }

    async getByEmail(email: string): Promise<User | null> {
        const user = this.users.find(user => user.email === email);
        return (user) ? user : null;
    }
}