import { useEffect, useState } from 'react';
import { Table, Modal, Tooltip, Tag, Form, Input, Select, notification } from 'antd';
import { EditOutlined, CloseCircleOutlined, CheckCircleOutlined } from '@ant-design/icons';
import { userListService, deactivateUserService, activateUserService, editUserService, rolListService } from '../services/authServices';
import { useSelector } from 'react-redux';
import { ROLES, ROLES_TEXT } from '../utils/const';
import { openNotificationWithIcon } from '../utils/notification';

const Usuarios = () => {
    const [users, setUsers] = useState([]);
    const [roles, setRoles] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);
    const [modalActivateVisible, setModalActivateVisible] = useState(false)
    const [modalEditVisible, setModalEditVisible] = useState(false)
    const userRol = useSelector((store) => store.userInfo.user.rol);
    const isAdmin = ROLES.ADMIN === userRol;
    const [formUser] = Form.useForm();

    useEffect(() => {
        fetchUsers();
        fetchRoles();
    }, []);

    const openEditModal = (record) => {
        formUser.setFieldsValue({
            username: record.username,
            nombre: record.nombre,
            rol: record.rol
        })
        setSelectedUser(record)
        setModalEditVisible(true)
    };

    const modalDesactivar = (record) => {
        setSelectedUser(record);
        setModalActivateVisible(true)
    };

    const handleDesactivar = async () => {
        try {
            await deactivateUserService(selectedUser.id);
            console.log('Usuario desactivado:', selectedUser);
            fetchUsers(); // Actualizar lista de usuarios después de desactivar
        } catch (error) {
            console.error('Error al desactivar usuario:', error);
        } finally {
            setSelectedUser(null);
            setModalActivateVisible(false)
        }
    };

    const editUser = async () => {
        try {
            const payload = formUser.getFieldsValue();
            console.log(payload)
            await editUserService(selectedUser.id, payload);
        } catch (error) {
            console.error('Error al editar usuario:', error);
        } finally {
            openNotificationWithIcon(notification, 'success', 'Usuario editado exitosamente', '', 4)
            setSelectedUser(null);
            formUser.resetFields()
            fetchUsers();
            setModalEditVisible(false)
        }
    };


    const handleActivar = async () => {
        try {
            await activateUserService(selectedUser.id);
            console.log('Usuario activado:', selectedUser);
            fetchUsers(); // Actualizar lista de usuarios después de activar
        } catch (error) {
            console.error('Error al activar usuario:', error);
        } finally {
            setSelectedUser(null);
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
            title: 'Username',
            dataIndex: 'username',
            key: 'username',
            width: '5%',
        },
        {
            title: 'Rol',
            dataIndex: 'rol',
            key: 'rol',
            width: '5%',
            render: (rol) => ROLES_TEXT[rol],
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
                if (isAdmin) {
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
                }
                // Si no es un administrador, no muestra ningún botón de acción
                return null;
            },
        },
    ];

    const fetchUsers = async () => {
        try {
            const data = await userListService();
            console.log(data);
            setUsers(data);
        } catch (error) {
            console.error('Error al obtener lista de usuarios:', error);
        }
    };

    const fetchRoles = async () => {
        try {
            const data = await rolListService();
            setRoles(data);
        } catch (error) {
            console.error('Error al obtener lista de usuarios:', error);
        }
    };

    const onCancelActivateModal = () => {
        setModalActivateVisible(false)
        setSelectedUser(null)
    }

    const onCancelEditModal = () => {
        setModalEditVisible(false)
        setSelectedUser(null)
    }


    return (
        <div>
            <Table columns={columns} dataSource={users} />
            <Modal
                title="Editar Usuario"
                open={modalEditVisible}
                onOk={editUser}
                onCancel={onCancelEditModal}
            >
                <Form form={formUser} layout="vertical">
                    <Form.Item name="username" label="Username">
                        <Input />
                    </Form.Item>
                    <Form.Item name="nombre" label="Nombre">
                        <Input />
                    </Form.Item>
                    <Form.Item name="rol" label="Rol">
                        <Select>
                            {roles.map((rol) => (
                                <Select.Option key={rol.id} value={rol.id}>{rol.nombre}</Select.Option>
                            ))}
                        </Select>
                    </Form.Item>
                </Form>
            </Modal>
            <Modal
                title="Desactivar/Activar Usuario"
                open={modalActivateVisible}
                onOk={selectedUser?.is_active ? handleDesactivar : handleActivar}
                onCancel={onCancelActivateModal}
            >
                <p>{selectedUser ? '¿Estás seguro que quieres desactivar/activar este usuario?' : ''}</p>
            </Modal>
        </div>
    );
};

export default Usuarios;
