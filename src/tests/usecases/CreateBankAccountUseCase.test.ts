import {IBankAccountRepository, IUserRepository, User,  CreateBankAccountUseCase, CreateBankAccountUseCaseImpl, CreateUserUseCase, CreateUserUseCaseImpl } from "../../core";
import { BankAccountRepositoryInMemory, UserRepositoryInMemory } from "../../infrastructure";


describe('Create Bank Account Use Case Test', () => {
    const bankAccountRepositoryInMemory: IBankAccountRepository = new BankAccountRepositoryInMemory();
    const userRepositoryInMemory: IUserRepository = new UserRepositoryInMemory();
    const createUserUseCase: CreateUserUseCase = new CreateUserUseCaseImpl(userRepositoryInMemory);
    const createBankAccountUseCase: CreateBankAccountUseCase = new CreateBankAccountUseCaseImpl(bankAccountRepositoryInMemory, userRepositoryInMemory);
    let user: User;

    beforeAll(async () => {
        user = await createUserUseCase.execute("John Doe", "john.doe@mail.com", "123456");
    });

    it('should create a new bank account', async () => {
        const bankAccount = await createBankAccountUseCase.execute(100, user.id);
        expect(bankAccount).toHaveProperty("id");
        expect(bankAccount).toHaveProperty("balance", 100);
        expect(bankAccount).toHaveProperty("user_id", user.id);
    });

    it('should not create a new bank account if user does not exists', async () => {
        try {
            await createBankAccountUseCase.execute(100, "invalid_user_id");
        } catch (error) {
            expect(error).toHaveProperty("message", "User not found");
        }
    });

    it('should not create a new bank account if balance is invalid', async () => {
        try {
            await createBankAccountUseCase.execute(-100, user.id);
        } catch (error) {
            expect(error).toHaveProperty("message", "Invalid balance");
        }
    });

    it('should not create a new bank account if bank account already exists', async () => {
        try {
            await createBankAccountUseCase.execute(100, user.id);
        } catch (error) {
            expect(error).toHaveProperty("message", "Bank account already exists");
        }
    });

});