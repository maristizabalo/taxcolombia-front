import {api} from "../utils/api";

export const login = async (values) => {
    try {
        const response = await api.post('accounts/token/', values);
        return response.data;
    } catch (error) {
        console.log(error)
    }
};

export const register = async (values) => {
    try {
        const response = await api.post('accounts/user/', values);
        return response.data;
    } catch (error) {
        console.log(error)
    }
};

export const logout = async () => {
    try {
        const response = await api.get('auth/logout/');
        return response.data.detail
    } catch (error) {
        console.log(error)
    }
};