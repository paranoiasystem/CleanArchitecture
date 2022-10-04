import { IBankAccountRepository } from "../../core";
import { BankAccount } from "../../core";
import { v4 as uuidV4 } from 'uuid';
import {injectable} from "tsyringe";

@injectable()
export class BankAccountRepositoryInMemory implements IBankAccountRepository {
    private bankAccounts: BankAccount[] = [];

    async create(balance: number, user_id: string): Promise<BankAccount> {
        const bankAccount: BankAccount = new BankAccount(uuidV4(), balance, user_id);
        this.bankAccounts.push(bankAccount);
        return bankAccount;
    }

    async getByAccountId(id: string): Promise<BankAccount | null> {
        const bankAccount = this.bankAccounts.find(bankAccount => bankAccount.id === id);
        return (bankAccount) ? bankAccount : null;
    }

    async getByUserId(userId: string): Promise<BankAccount | null> {
        const bankAccount = this.bankAccounts.find(bankAccount => bankAccount.user_id === userId);
        return (bankAccount) ? bankAccount : null;
    }

    async update(id: string, balance: number): Promise<BankAccount | null> {
        const bankAccount = await this.getByAccountId(id);
        if (bankAccount) {
            bankAccount.balance = balance;
            const index = this.bankAccounts.findIndex(bankAccount => bankAccount.id === id);
            this.bankAccounts[index] = bankAccount;
            return bankAccount;
        }
        return null;
    }
}