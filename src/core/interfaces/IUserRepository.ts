import { User } from "../entities/User";

export interface IUserRepository {
    create(name: string, email: string, password: string): Promise<User>;
    getById(id: string): Promise<User | null>;
    getByEmail(email: string): Promise<User | null>;
}