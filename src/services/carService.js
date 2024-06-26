import {api} from "../utils/api";

export const carListService = async () => {
    try {
        const response = await api.get('car/');
        return response.data;
    } catch (error) {
        console.error(error)
    }
};

export const carsByEstadoService = async (estado) => {
    try {
        const payload = {
            estado: estado
        }
        const response = await api.post(`car/estado/`, payload )
        return response.data;
    } catch (error) {
        console.error(error)
    }
};


export const carAllListService = async () => {
    try {
        const response = await api.get('car/all');
        return response.data;
    } catch (error) {
        console.error(error)
    }
};

export const createCarService = async (values) => {
    try {
        const response = await api.post('car/', values)
        return response.data;
    } catch (error) {
        console.error(error)
    }
};

export const editCarService = async (id, values) => {
    try {
        const response = await api.patch(`car/${id}/`, values)
        return response.data;
    } catch (error) {
        console.error(error)
    }
};

export const mantenimientoActiveListService = async () => {
    try {
        const response = await api.get('mantenimiento/');
        return response.data;
    } catch (error) {
        console.error(error)
    }
};

export const mantenimientoListService = async () => {
    try {
        const response = await api.get('mantenimiento/all');
        return response.data;
    } catch (error) {
        console.error(error)
    }
};

export const createMantenimientoService = async (values) => {
    try {
        const response = await api.post('mantenimiento/', values)
        return response.data;
    } catch (error) {
        console.error(error)
    }
};

export const editMantenimientoService = async (id, values) => {
    try {
        const response = await api.patch(`mantenimiento/${id}/`, values)
        return response.data;
    } catch (error) {
        console.error(error)
    }
};

export const createMecanicoService = async (values) => {
    try {
        const response = await api.post('mantenimiento/mecanico/', values)
        return response.data;
    } catch (error) {
        console.error(error)
    }
};

export const editMecanicoService = async (id, values) => {
    try {
        const response = await api.patch(`mantenimiento/mecanico/${id}/`, values)
        return response.data;
    } catch (error) {
        console.error(error)
    }
};

export const mecanicoListService = async () => {
    try {
        const response = await api.get('mantenimiento/mecanico/');
        return response.data;
    } catch (error) {
        console.error(error)
    }
};

export const mecanicoActiveListService = async () => {
    try {
        const response = await api.get('mantenimiento/mecanico/all');
        return response.data;
    } catch (error) {
        console.error(error)
    }
};

export const motivoListService = async () => {
    try {
        const response = await api.get('mantenimiento/motivo/');
        return response.data;
    } catch (error) {
        console.error(error)
    }
};

export const motivoActiveListService = async () => {
    try {
        const response = await api.get('mantenimiento/motivo/all');
        return response.data;
    } catch (error) {
        console.error(error)
    }
};

export const editMotivoService = async (id, values) => {
    try {
        const response = await api.patch(`mantenimiento/motivo/${id}/`, values)
        return response.data;
    } catch (error) {
        console.error(error)
    }
};

export const informeListService = async () => {
    try {
        const response = await api.get('mantenimiento/informe');
        return response.data;
    } catch (error) {
        console.error(error)
    }
};

export const informeDetailService = async (fecha, placa) => {
    try {
        const payload = {
            fecha: fecha,
            vehiculo: placa
        }
        const response = await api.post('mantenimiento/informe/', payload);
        return response.data;
    } catch (error) {
        console.error(error)
    }
};

export const estadisticasService = async () => {
    try {
        const response = await api.get('mantenimiento/estadisticas/');
        return response.data;
    } catch (error) {
        console.error(error)
    }
};

export const estadoInternoActiveListService = async () => {
    try {
        const response = await api.get('car/estado-interno/');
        return response.data;
    } catch (error) {
        console.error(error)
    }
};


