import { useEffect, useState } from 'react'
import { EditOutlined, CloseCircleOutlined, CheckCircleOutlined } from '@ant-design/icons';
import { Form, Input, Modal, Table, Tag, Tooltip, notification } from 'antd';
import { editMotivoService, motivoActiveListService } from '../services/carService';
import { openNotificationWithIcon } from '../utils/notification';


const Motivos = () => {

    const [motivos, setMotivos] = useState()
    const [modalActivateVisible, setModalActivateVisible] = useState(false)
    const [formMotivo] = Form.useForm();
    const [modalEditVisible, setModalEditVisible] = useState(false)
    const [selectedMotivo, setSelectedMotivo] = useState(null);
    
    useEffect(() => {
        fetchMotivos();
    }, []);

    const openEditModal = (record) => {
        formMotivo.setFieldsValue({
            nombre: record.nombre
        })
        setSelectedMotivo(record)
        setModalEditVisible(true)
    }

    const editMotivo = async () => {
        try {
            const payload = formMotivo.getFieldsValue();
            await editMotivoService(selectedMotivo.id, payload);
        } catch (error) {
            console.error('Error al editar motivo:', error);
        } finally {
            openNotificationWithIcon(notification, 'success', 'Motivo editado exitosamente', '', 4)
            formMotivo.resetFields()
            fetchMotivos();
            setSelectedMotivo(null);
            setModalEditVisible(false)
        }
    };

    const modalDesactivar = (record) => {
        setSelectedMotivo(record);
        setModalActivateVisible(true)
    };

    const handleActivar = async () => {
        try {
            const payload = {
                is_active: true
            }
            await editMotivoService(selectedMotivo.id, payload);
            fetchMotivos();
        } catch (error) {
            console.error('Error al activar motivo:', error);
        } finally {
            openNotificationWithIcon(notification, 'success', 'Motivo activado correctamente.', '', 4)
            setSelectedMotivo(null);
            setModalActivateVisible(false)
        }
    };

    const handleDesactivar = async () => {
        try {
            const payload = {
                is_active: false
            }
            await editMotivoService(selectedMotivo.id, payload);
            fetchMotivos();
        } catch (error) {
            console.error('Error al desactivar usuario:', error);
        } finally {
            openNotificationWithIcon(notification, 'success', 'Motivo desactivado correctamente.', '', 4)
            setSelectedMotivo(null);
            setModalActivateVisible(false)
        }
    };

    const columns = [
        {
            title: 'Id',
            dataIndex: 'id',
            key: 'id',
            width: '5%',
        },
        {
            title: 'Nombre',
            dataIndex: 'nombre',
            key: 'nombre',
            width: '10%',
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
                        <span key="editar" className="text-[#000000] font-bold hover:bg-gray-100" onClick={() => openEditModal(record)}>
                            <EditOutlined className="text-lg mr-4" />
                        </span>
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
        },

    ]


    const fetchMotivos = async () => {
        try {
            const data = await motivoActiveListService();
            setMotivos(data);
        } catch (error) {
            console.error('Error fetching componentes', error);
        }
    };

    const onCancelEditModal = () => {
        setModalEditVisible(false)
        setSelectedMotivo(null)
    }

    const onCancelActivateModal = () => {
        setModalActivateVisible(false)
        setSelectedMotivo(null)
    }

    return (
        <div>
            <Table
                columns={columns}
                dataSource={motivos}
            />
            <Modal
                title="Editar Motivo"
                open={modalEditVisible}
                onOk={editMotivo}
                onCancel={onCancelEditModal}
            >
                <Form form={formMotivo} layout="vertical">
                    <Form.Item name="nombre" label="Nombre">
                        <Input />
                    </Form.Item>
                </Form>
            </Modal>
            <Modal
                title="Desactivar/Activar Usuario"
                open={modalActivateVisible}
                onOk={selectedMotivo?.is_active ? handleDesactivar : handleActivar}
                onCancel={onCancelActivateModal}
            >
                <p>{selectedMotivo ? '¿Estás seguro que quieres desactivar/activar este usuario?' : ''}</p>
            </Modal>
        </div>
    )
}

export default Motivos