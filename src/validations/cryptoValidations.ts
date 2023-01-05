import {number, object, string} from "yup"

export const cryptoSchema = object().shape({
    user_id: string(),
    action: string(),
    crypto_code: string().
        required("Campo obligatorio"),
    crypto_amount:number()
        .positive("El numero tiene que ser mayor a 0")
        .required("Campo obligatorio"),
    money: number(),
    time: string()
})