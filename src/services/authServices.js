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

export const changePasswordService = async (id, values) => {
    try {
        const response = await api.patch(`accounts/user/password/${id}/`, values);
        return response.data;
    } catch (error) {
        console.log(error)
    }
};

export const activateUserService = async (id) => {
    try {
        const payload = {
            is_active: true
        }
        const response = await api.patch(`accounts/user/${id}/`, payload);
        return response.data;
    } catch (error) {
        console.log(error)
    }
};

export const deactivateUserService = async (id) => {
    try {
        const payload = {
            is_active: false
        }
        const response = await api.patch(`accounts/user/${id}/`, payload);
        return response.data;
    } catch (error) {
        console.log(error)
    }
};

export const userListService = async () => {
    try {
        const response = await api.get('accounts/user/');
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
