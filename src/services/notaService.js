import {api} from "../utils/api";

export const notaActiveListService = async () => {
    try {
        const response = await api.get('nota/');
        return response.data;
    } catch (error) {
        console.error(error)
    }
};

export const notaListService = async () => {
    try {
        const response = await api.get('nota/all');
        return response.data;
    } catch (error) {
        console.error(error)
    }
};



export const createNotaService = async (values) => {
    try {
        const response = await api.post('nota/', values)
        return response.data;
    } catch (error) {
        console.error(error)
    }
};

export const editNotaService = async (id, values) => {
    try {
        const response = await api.patch(`nota/${id}/`, values)
        return response.data;
    } catch (error) {
        console.error(error)
    }
};