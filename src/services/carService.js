import {api} from "../utils/api";

export const carListService = async () => {
    try {
        const response = await api.get('car/');
        return response.data;
    } catch (error) {
        console.log(error)
    }
};

export const createCarService = async (values) => {
    try {
        const response = await api.post('car/', values)
        return response.data;
    } catch (error) {
        console.log(error)
    }
};

export const editCarService = async (id, values) => {
    try {
        const response = await api.put(`car/${id}/`, values)
        return response.data;
    } catch (error) {
        console.log(error)
    }
};

export const mantenimientoListService = async () => {
    try {
        const response = await api.get('mantenimiento/');
        return response.data;
    } catch (error) {
        console.log(error)
    }
};

export const createMantenimientoService = async (values) => {
    try {
        const response = await api.post('mantenimiento/', values)
        return response.data;
    } catch (error) {
        console.log(error)
    }
};

export const editMantenimientoService = async (id, values) => {
    try {
        const response = await api.put(`mantenimiento/${id}/`, values)
        return response.data;
    } catch (error) {
        console.log(error)
    }
};

export const createMecanicoService = async (values) => {
    try {
        const response = await api.post('mantenimiento/mecanico/', values)
        return response.data;
    } catch (error) {
        console.log(error)
    }
};

export const mecanicoListService = async () => {
    try {
        const response = await api.get('mantenimiento/mecanico/');
        return response.data;
    } catch (error) {
        console.log(error)
    }
};

