export class BankAccount {
    id: string;
    balance: number;
    user_id: string;

    constructor(id: string, balance: number, user_id: string) {
        this.id = id;
        this.balance = balance;
        this.user_id = user_id;
    }
}