import {number, object, string} from "yup"

export const cryptoSchema = object().shape({
    user_id: string(),
    action: string(),
    crypto_code: string().
        required("Campo obligatorio"),
    crypto_amount:string()
        .required("Campo obligatorio"),
    money: string(),
    time: string()
})