import {api} from "../utils/api";

export const notaListService = async () => {
    try {
        const response = await api.get('nota/');
        return response.data;
    } catch (error) {
        console.log(error)
    }
};

export const createNotaService = async (values) => {
    try {
        const response = await api.post('nota/', values)
        return response.data;
    } catch (error) {
        console.log(error)
    }
};

export const editNotaService = async (id, values) => {
    try {
        const response = await api.put(`nota/${id}/`, values)
        return response.data;
    } catch (error) {
        console.log(error)
    }
};