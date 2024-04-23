import { Form, Input, Button, Image, notification } from 'antd';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { login, register } from '../services/authServices';
import { jwtDecode } from 'jwt-decode';
import { createUser } from '../redux/states/user';
import { openNotificationWithIcon } from '../utils/notification';
import taxcolombiaIMG from '../assets/taxcolombia.png';
import { ROLES } from '../utils/const';

const Login = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const session = queryParams.get('session');
  // const [formRegisterData, setFormRegisterData] = useState({
  //   username: '',
  //   password: '',
  //   nombre: ''
  // });
  const [loginMode, setLoginMode] = useState(true)

  useEffect(() => {
    if (session === 'expired') {
      // openNotificationWithIcon(notification, 'warning', 'Su sesión ha expirado, por favor vuelva a iniciar sesión.', '', 5);
    }
  }, [session]);

  const onFinish = async (values) => {
    try {
      const result = await login(values);
      const user = jwtDecode(result.access);
      user['auth_tokens'] = result;
      dispatch(createUser(user));
      openNotificationWithIcon(notification, 'success', 'Inicio de sesión exitoso', '', 4);

      // Determinar la ruta de redireccionamiento según el rol del usuario
      if (user.rol === ROLES.VISITANTE) {
        navigate('/private/lock');
      } else if (user.rol === ROLES.ADMIN || user.rol === ROLES.SUPERVISOR) {
        navigate('/private/taller');
      } else if (user.rol === ROLES.GERENCIA) {
        navigate('/private/estadisticas');
      } else if (user.rol === ROLES.BARRIDO) {
        navigate('/private/barrido');
      }
    } catch (error) {
      openNotificationWithIcon(notification, 'error', 'Verifica tu usuario y clave, si el error continúa contacta con el administrador.', '', 4);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-opacity-50 bg-black">
      <div className="bg-white shadow-lg rounded-md p-8">
        <Image preview={false} src={taxcolombiaIMG} sizes="150" className="mx-auto mb-6" />
        <Form
          name="normal_login"
          className="w-80"
          initialValues={{ remember: true }}
          onFinish={onFinish}
        >
          <Form.Item
            name="username"
            type="text"
            className="form-item"
            rules={[{ required: true, message: 'Por favor ingrese su nombre de usuario!' }]}
          >
            <Input placeholder="Nombre de usuario" />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[{ required: true, message: 'Por favor ingrese su contraseña!' }]}
          >
            <Input.Password placeholder="Contraseña" />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" className="w-full">
              Iniciar sesión
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default Login;
