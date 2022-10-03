import { BankAccount } from "../entities/BankAccount";

export interface IBankAccountRepository {
    create(balance: number, user_id: string): Promise<BankAccount>;
    getByAccountId(id: string): Promise<BankAccount | null>;
    getByUserId(userId: string): Promise<BankAccount | null>;
    update(id: string, balance: number): Promise<BankAccount | null>;
}