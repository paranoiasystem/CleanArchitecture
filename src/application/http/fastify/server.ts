import fastify from 'fastify'
import {
    CreateBankAccountUseCase, CreateBankAccountUseCaseImpl,
    CreateUserUseCase,
    CreateUserUseCaseImpl,
    IBankAccountRepository,
    IUserRepository, MakeDepositUseCase, MakeDepositUseCaseImpl
} from "../../../core";
import {BankAccountRepositoryInMemory, UserRepositoryInMemory} from "../../../infrastructure";

const server = fastify()

const userRepository: IUserRepository = new UserRepositoryInMemory();
const createUserUseCase: CreateUserUseCase = new CreateUserUseCaseImpl(userRepository);
const bankAccountRepository: IBankAccountRepository = new BankAccountRepositoryInMemory();
const createBankAccountUseCase: CreateBankAccountUseCase = new CreateBankAccountUseCaseImpl(bankAccountRepository, userRepository);
const makeDepositUseCase: MakeDepositUseCase = new MakeDepositUseCaseImpl(bankAccountRepository);

server.post<{
    Body: {
        name: string;
        email: string;
        password: string;
    }
}>('/createUser', async (request, reply) => {
    const {name, email, password} = request.body;
    reply.send(await createUserUseCase.execute(name, email, password));
})

server.post<{
    Body: {
        balance: number;
        user_id: string;
    }
}>('/createBankAccount', async (request, reply) => {
    const {balance, user_id} = request.body;
    reply.send(await createBankAccountUseCase.execute(balance, user_id));
})

server.post<{
    Body: {
        amount: number;
        user_id: string;
    }
}>('/makeDeposit', async (request, reply) => {
    const {amount, user_id} = request.body;
    reply.send(makeDepositUseCase.execute(amount, user_id));
})

server.listen({ host: '0.0.0.0', port: 3000 }, (err, address) => {
    if (err) {
        console.error(err)
        process.exit(1)
    }
    console.log(`Server listening at ${address}`)
})