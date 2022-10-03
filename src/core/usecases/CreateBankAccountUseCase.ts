import {IBankAccountRepository} from "../interfaces/IBankAccountRepository";
import {IUserRepository} from "../interfaces/IUserRepository";
import {BankAccount} from "../entities/BankAccount";
import {AsyncUseCase} from "../base/UseCase.abstract";

export abstract class CreateBankAccountUseCase implements AsyncUseCase<BankAccount> {
    abstract execute(balance: number, user_id: string): Promise<BankAccount>;
}

export class CreateBankAccountUseCaseImpl implements CreateBankAccountUseCase {
    constructor(
        private bankAccountRepository: IBankAccountRepository,
        private userRepository: IUserRepository
    ) {}

    async execute(balance: number, user_id: string): Promise<BankAccount> {
        const user = await this.userRepository.getById(user_id);

        if (!user) {
            throw new Error('User not found');
        }

        if (balance < 0) {
            throw new Error('Invalid balance');
        }

        const bankAccount = await this.bankAccountRepository.getByUserId(user_id);

        if (bankAccount) {
            throw new Error('Bank account already exists');
        }

        return this.bankAccountRepository.create(balance, user_id);
    }
}