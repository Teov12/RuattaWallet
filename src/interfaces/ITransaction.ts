export interface ITransaction{
    _id?: string
    user_id: string,
    action: string,
    crypto_code: string,
    crypto_amount: string,
    money: string,
    datetime: string
}