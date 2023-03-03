import Axios, { AxiosError, AxiosResponse } from 'axios';

export const axios = Axios.create({
	timeout: 30 * 1000, // 30 seconds
});

axios.interceptors.response.use(responseInterceptor);

function responseInterceptor(value: AxiosResponse) {
	return value.data;
}

export type ApiError = AxiosError;
