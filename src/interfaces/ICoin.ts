import type {IPrices} from "./IPrices"

export interface ICoin{
    name: string,
    value: string,
    prices: IPrices
}