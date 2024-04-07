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
        const response = await api.patch(`car/${id}/`, values)
        return response.data;
    } catch (error) {
        console.log(error)
    }
};

export const mantenimientoActiveListService = async () => {
    try {
        const response = await api.get('mantenimiento/');
        return response.data;
    } catch (error) {
        console.log(error)
    }
};

export const mantenimientoListService = async () => {
    try {
        const response = await api.get('mantenimiento/all');
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
        const response = await api.patch(`mantenimiento/${id}/`, values)
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

export const editMecanicoService = async (id, values) => {
    try {
        const response = await api.patch(`mantenimiento/mecanico/${id}/`, values)
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

export const motivoListService = async () => {
    try {
        const response = await api.get('mantenimiento/motivo/');
        return response.data;
    } catch (error) {
        console.log(error)
    }
};



