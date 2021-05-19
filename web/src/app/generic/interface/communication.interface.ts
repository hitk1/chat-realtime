export interface ICommunication<T> {
    success: boolean;
    statusCode: number;
    data: T
}