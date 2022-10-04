import {IBankAccountRepository} from "../interfaces/IBankAccountRepository";
import {AsyncUseCase} from "../base/UseCase.abstract";
import {inject, injectable} from "tsyringe";

export abstract class MakeDepositUseCase implements AsyncUseCase<void> {
    abstract execute(amount: number, bank_account_id: string): Promise<void>;
}

@injectable()
export class MakeDepositUseCaseImpl implements MakeDepositUseCase {
    constructor(
        @inject("bankAccountRepository") private bankAccountRepository: IBankAccountRepository
    ) {}

    async execute(amount: number, user_id: string): Promise<void> {

        const bankAccount = await this.bankAccountRepository.getByUserId(user_id)

        if (!bankAccount) {
            throw new Error('Bank account not found');
        }

        if (amount < 0) {
            throw new Error('Invalid amount');
        }

        bankAccount.balance += amount;

        await this.bankAccountRepository.update(bankAccount.id, bankAccount.balance);

        return Promise.resolve();
    }
}