import { async } from "@firebase/util";
import axios from "axios";

export const apiClient = axios.create({
	baseURL: 'https://laboratorio3-f36a.restdb.io/rest',
	headers: {'x-apikey': '60eb09146661365596af552f'}
});

export const postTransactions = async (body) => {
	return await apiClient
		.post(`/transactions`, body)
		.then((res) => {
			return res.status;
		})
		.catch((err) => console.log(err));
}

export const getTransactions = async(user_id) => {
	return await apiClient
	.get(`/transactions?q={"user_id": "${user_id}"}`)
	.then((res) =>{
		return res.data;
	})
	.catch((err) => console.log(err));
}