import { useState } from 'react';
import { Form, Input, Button, notification } from 'antd';
import { changePasswordService } from '../services/authServices';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { resetUser } from '../redux/states/user';

const PerfilPage = () => {
    const [loading, setLoading] = useState(false);
    const userId = useSelector((store) => store.userInfo.user.user_id)
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const onFinishPassword = async (values) => {
        try {
            setLoading(true);
            const payload = {
                password: values.password
            }
            await changePasswordService(userId, payload);
            dispatch(resetUser())
            navigate('/')
            notification.success({ message: 'Contraseña actualizada correctamente' });
        } catch (error) {
            console.error('Error al cambiar la contraseña', error);
            notification.error({ message: 'Error al cambiar la contraseña' });
        } finally {
            setLoading(false);
        }
    };

    const validatePasswordConfirmation = ({ getFieldValue }) => ({
        validator(_, value) {
            if (!value || getFieldValue('password') === value) {
                return Promise.resolve();
            }
            return Promise.reject(new Error('Las contraseñas no coinciden'));
        },
    });

    return (
        <div className="max-w-xl mx-auto p-6">
            <h1 className="text-2xl font-bold mb-4">Mi perfil</h1>
            <div>
                <h2 className="text-lg font-semibold mb-2">Cambiar contraseña</h2>
                <Form name="changePassword" onFinish={onFinishPassword}>
                    <Form.Item name="password" label="Nueva contraseña" rules={[{ required: true, message: 'Por favor ingresa tu nueva contraseña' }]}>
                        <Input.Password />
                    </Form.Item>
                    <Form.Item
                        name="confirmPassword"
                        label="Confirmar contraseña"
                        dependencies={['password']}
                        rules={[
                            { required: true, message: 'Por favor confirma tu contraseña' },
                            validatePasswordConfirmation
                        ]}
                    >
                        <Input.Password />
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit" loading={loading}>
                            Cambiar contraseña
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        </div>
    );
};

export default PerfilPage;

