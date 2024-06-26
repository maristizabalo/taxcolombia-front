import { useEffect, useState } from 'react'
import { EditOutlined, CloseCircleOutlined, CheckCircleOutlined } from '@ant-design/icons';
import { Form, Input, Modal, Table, Tag, Tooltip, notification } from 'antd';
import { editMecanicoService, mecanicoActiveListService, mecanicoListService } from '../services/carService';
import { openNotificationWithIcon } from '../utils/notification';


const Mecanicos = () => {

    const [mecanicos, setMecanicos] = useState()
    const [modalActivateVisible, setModalActivateVisible] = useState(false)
    const [formMecanico] = Form.useForm();
    const [modalEditVisible, setModalEditVisible] = useState(false)
    const [selectedMecanico, setSelectedMecanico] = useState(null);
    
    useEffect(() => {
        fetchMecanicos();
    }, []);

    const openEditModal = (record) => {
        formMecanico.setFieldsValue({
            nombre: record.nombre
        })
        setSelectedMecanico(record)
        setModalEditVisible(true)
    }

    const editMecanico = async () => {
        try {
            const payload = formMecanico.getFieldsValue();
            await editMecanicoService(selectedMecanico.id, payload);
        } catch (error) {
            console.error('Error al editar mecanico:', error);
        } finally {
            openNotificationWithIcon(notification, 'success', 'Mecanico editado exitosamente', '', 4)
            formMecanico.resetFields()
            fetchMecanicos();
            setSelectedMecanico(null);
            setModalEditVisible(false)
        }
    };

    const modalDesactivar = (record) => {
        setSelectedMecanico(record);
        setModalActivateVisible(true)
    };

    const handleActivar = async () => {
        try {
            const payload = {
                is_active: true
            }
            await editMecanicoService(selectedMecanico.id, payload);
            fetchMecanicos();
        } catch (error) {
            console.error('Error al activar mecanico:', error);
        } finally {
            openNotificationWithIcon(notification, 'success', 'Mecanico activado correctamente.', '', 4)
            setSelectedMecanico(null);
            setModalActivateVisible(false)
        }
    };

    const handleDesactivar = async () => {
        try {
            const payload = {
                is_active: false
            }
            await editMecanicoService(selectedMecanico.id, payload);
            fetchMecanicos();
        } catch (error) {
            console.error('Error al desactivar usuario:', error);
        } finally {
            openNotificationWithIcon(notification, 'success', 'Mecanico desactivado correctamente.', '', 4)
            setSelectedMecanico(null);
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


    const fetchMecanicos = async () => {
        try {
            const data = await mecanicoActiveListService();
            setMecanicos(data);
        } catch (error) {
            console.error('Error fetching componentes', error);
        }
    };

    const onCancelEditModal = () => {
        setModalEditVisible(false)
        setSelectedMecanico(null)
    }

    const onCancelActivateModal = () => {
        setModalActivateVisible(false)
        setSelectedMecanico(null)
    }

    return (
        <div>
            <Table
                columns={columns}
                dataSource={mecanicos}
            />
            <Modal
                title="Editar Mecanico"
                open={modalEditVisible}
                onOk={editMecanico}
                onCancel={onCancelEditModal}
            >
                <Form form={formMecanico} layout="vertical">
                    <Form.Item name="nombre" label="Nombre">
                        <Input />
                    </Form.Item>
                </Form>
            </Modal>
            <Modal
                title="Desactivar/Activar Usuario"
                open={modalActivateVisible}
                onOk={selectedMecanico?.is_active ? handleDesactivar : handleActivar}
                onCancel={onCancelActivateModal}
            >
                <p>{selectedMecanico ? '¿Estás seguro que quieres desactivar/activar este usuario?' : ''}</p>
            </Modal>
        </div>
    )
}

export default Mecanicos