export interface ITransactionBTC{
    _id: string
    user_id: string,
    action: string,
    crypto_code: string,
    crypto_amount: number,
    money: number,
    datetime: string
}