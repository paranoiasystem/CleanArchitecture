import "reflect-metadata"
import {BankAccount, IBankAccountRepository} from "../../core";
import {BankAccountRepositoryInMemory} from "../../infrastructure";

describe('Bank Account Repository Test', () => {
    const bankAccountRepositoryInMemory: IBankAccountRepository = new BankAccountRepositoryInMemory();
    let bankAccount: BankAccount;

    it('should create a new bank account', async () => {
        bankAccount = await bankAccountRepositoryInMemory.create(100, "user_id");
        expect(bankAccount).toHaveProperty("id");
        expect(bankAccount).toHaveProperty("balance", 100);
        expect(bankAccount).toHaveProperty("user_id", "user_id");
    });

    it('should get a bank account by account id', async () => {
        const tempBankAccount = await bankAccountRepositoryInMemory.getByAccountId(bankAccount.id);
        expect(tempBankAccount).toHaveProperty("id");
        expect(tempBankAccount).toHaveProperty("balance", 100);
        expect(tempBankAccount).toHaveProperty("user_id", "user_id");
    });

    it('should get a bank account by user id', async () => {
        const tempBankAccount = await bankAccountRepositoryInMemory.getByUserId(bankAccount.user_id);
        expect(tempBankAccount).toHaveProperty("id");
        expect(tempBankAccount).toHaveProperty("balance", 100);
        expect(tempBankAccount).toHaveProperty("user_id", "user_id");
    });


    it('should update a bank account', async () => {
        const tempBankAccount = await bankAccountRepositoryInMemory.update(bankAccount.id, 200);
        expect(tempBankAccount).toHaveProperty("id");
        expect(tempBankAccount).toHaveProperty("balance", 200);
        expect(tempBankAccount).toHaveProperty("user_id", "user_id");
    });

    it('should not get a bank account by account id if bank account does not exists', async () => {
        const bankAccountFound = await bankAccountRepositoryInMemory.getByAccountId("invalid_account_id");
        expect(bankAccountFound).toBeNull();
    });

    it('should not get a bank account by user id if bank account does not exists', async () => {
        const bankAccountFound = await bankAccountRepositoryInMemory.getByUserId("invalid_user_id");
        expect(bankAccountFound).toBeNull();
    });

    it('should not update a bank account if bank account does not exists', async () => {
        const bankAccountUpdated = await bankAccountRepositoryInMemory.update("invalid_account_id", 200);
        expect(bankAccountUpdated).toBeNull();
    });

});