import "reflect-metadata";
import {container, inject} from "tsyringe";
import {
    BankAccount,
    CreateBankAccountUseCase, CreateBankAccountUseCaseImpl,
    CreateUserUseCase, CreateUserUseCaseImpl, IBankAccountRepository,
    MakeDepositUseCase, MakeDepositUseCaseImpl,
    User
} from "../../core";
import {BankAccountRepositoryInMemory, UserRepositoryInMemory} from "../../infrastructure";

describe('Make Deposit Use Case Test', () => {
    container.registerInstance("userRepository", new UserRepositoryInMemory());
    const createUserUseCase: CreateUserUseCase = container.resolve(CreateUserUseCaseImpl);
    container.registerInstance("bankAccountRepository", new BankAccountRepositoryInMemory());
    const createBankAccountUseCase: CreateBankAccountUseCase = container.resolve(CreateBankAccountUseCaseImpl);
    const makeDepositUseCase: MakeDepositUseCase = container.resolve(MakeDepositUseCaseImpl);
    const bankAccountRepository: IBankAccountRepository = container.resolve('bankAccountRepository');
    let user: User;
    let bankAccount: BankAccount;

    beforeAll(async () => {
        user = await createUserUseCase.execute("John Doe", "john.doe@mail.com", "123456");
        bankAccount = await createBankAccountUseCase.execute(100, user.id);
    });

    it('should make a deposit', async () => {
        await makeDepositUseCase.execute(100, user.id);
        const tempBankAccount = await bankAccountRepository.getByAccountId(bankAccount.id);
        expect(tempBankAccount).toHaveProperty("id");
        expect(tempBankAccount).toHaveProperty("balance", 200);
        expect(tempBankAccount).toHaveProperty("user_id", user.id);
    });

    it('should not make a deposit on a non-existing bank account', async () => {
        try {
            await makeDepositUseCase.execute(100, "invalid_user_id");
        } catch (error) {
            expect(error).toHaveProperty("message", "Bank account not found");
        }
    });

    it('should not make a deposit if amount is invalid', async () => {
        try {
            await makeDepositUseCase.execute(-100, user.id);
        } catch (error) {
            expect(error).toHaveProperty("message", "Invalid amount");
        }
    });

});