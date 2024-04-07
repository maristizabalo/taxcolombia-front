import { useEffect, useState } from 'react'
import { CloseCircleOutlined, CheckCircleOutlined, PlusCircleOutlined } from '@ant-design/icons';
import { Button, Form, Input, Modal, Table, Tag, Tooltip, notification } from 'antd';
import { carListService, createCarService, editCarService } from '../services/carService';
import { openNotificationWithIcon } from '../utils/notification';
const Vehiculos = () => {

    const [cars, setCars] = useState()
    const [modalActivateVisible, setModalActivateVisible] = useState(false)
    const [selectedCar, setSelectedCar] = useState(null);
    const [carModalVisible, setCarModalVisible] = useState(false)
    const [formCar] = Form.useForm();

    useEffect(() => {
        fetchCars();
    }, []);

    const modalDesactivar = (record) => {
        setSelectedCar(record);
        setModalActivateVisible(true)
    };

    const columns = [
        {
            title: 'Id',
            dataIndex: 'id',
            key: 'id',
            width: '5%',
        },
        {
            title: 'Placa',
            dataIndex: 'placa',
            key: 'placa',
            width: '10%',
        },
        {
            title: 'Movil',
            dataIndex: 'movil',
            key: 'username',
            width: '5%',
        },
        {
            title: 'Estado',
            dataIndex: 'is_active',
            key: 'estado',
            render: is_active => (
                <Tag color={is_active ? 'green' : 'red'}>
                    {is_active ? 'Activo' : 'Inactivo'}
                </Tag>
            ),
            width: '5%',
        },
        {
            title: 'Acciones',
            key: 'acciones',
            width: '5%',
            render: (text, record) => {
                return (
                    <>
                        {record.is_active ? (
                            <span key="desactivar" className="text-[#d44a80] font-bold hover:bg-gray-100" onClick={() => modalDesactivar(record)}>
                                <Tooltip title={'Desactivar'}>
                                    <CloseCircleOutlined className="text-lg mr-1" />
                                </Tooltip>
                            </span>
                        ) : (
                            <span key="activar" className="text-[#42bff2] font-bold hover:bg-gray-100" onClick={() => modalDesactivar(record)}>
                                <Tooltip title={'Activar'}>
                                    <CheckCircleOutlined className="text-lg mr-1" />
                                </Tooltip>
                            </span>
                        )}
                    </>
                );
            },
        }
    ]


    const fetchCars = async () => {
        try {
            const data = await carListService();
            setCars(data);
        } catch (error) {
            console.error('Error fetching componentes', error);
        }
    };

    const handleActivar = async () => {
        try {
            const payload = {
                is_active: true
            }
            await editCarService(selectedCar.id, payload);
            fetchCars(); // Actualizar lista de usuarios después de activar
        } catch (error) {
            console.error('Error al activar usuario:', error);
        } finally {
            setSelectedCar(null);
            setModalActivateVisible(false)
        }
    };

    const handleDesactivar = async () => {
        try {
            const payload = {
                is_active: false
            }
            await editCarService(selectedCar.id, payload);
            fetchCars(); // Actualizar lista de usuarios después de desactivar
        } catch (error) {
            console.error('Error al desactivar usuario:', error);
        } finally {
            setSelectedCar(null);
            setModalActivateVisible(false)
        }
    };

    const onCancelActivateModal = () => {
        setModalActivateVisible(false)
        setSelectedCar(null)
    }

    const onCancelCar = () => {
        setCarModalVisible(false)
    }

    const onOkCar = async () => {
        try {
            const values = formCar.getFieldsValue()
            const payload = {
                ...values,
                is_active: true
            }
            await createCarService(payload);
            fetchCars(); // Actualizar lista de usuarios después de desactivar
        } catch (error) {
            console.error('Error crear vehiculo:', error);
        } finally {
            openNotificationWithIcon(notification, 'success', 'Vehiculo creado exitosamente', '', 4)
            setCarModalVisible(false)
            formCar.resetFields()
        }
    };



    return (
        <div>
            <div className="title flex justify-center py-4">
                <Button
                    size="large"
                    shape="round"
                    className="btn bg-[#42BFF2] text-white hover:bg-pink-500 px-4 py-2 flex items-center ml-4"
                    onClick={() => setCarModalVisible(true)}>
                    <PlusCircleOutlined className="mr-2" />
                    Agregar Vehiculo
                </Button>
            </div>
            <Table
                columns={columns}
                dataSource={cars}
            />
            <Modal
                title="Editar Usuario"
                open={carModalVisible}
                onOk={onOkCar}
                onCancel={onCancelCar}
            >
                <Form form={formCar} layout="vertical">
                    <Form.Item name="placa" label="Placa">
                        <Input />
                    </Form.Item>
                    <Form.Item name="movil" label="Movil">
                        <Input />
                    </Form.Item>
                </Form>
            </Modal>
            <Modal
                title="Desactivar/Activar Vehiculo"
                open={modalActivateVisible}
                onOk={selectedCar?.is_active ? handleDesactivar : handleActivar}
                onCancel={onCancelActivateModal}
            >
                <p>{selectedCar ? '¿Estás seguro que quieres desactivar/activar este vehiculo?' : ''}</p>
            </Modal>
        </div>
    )
}

export default Vehiculos