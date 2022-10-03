export abstract class UseCase<T> {
    abstract execute(...args: any[]): T;
}

export abstract class AsyncUseCase<T> {
    abstract execute(...args: any[]): Promise<T>;
}