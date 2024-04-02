import { Form, Input, Button, Image, notification } from 'antd';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { login } from '../services/authServices';
import { jwtDecode } from 'jwt-decode';
import { createUser } from '../redux/states/user';
import { openNotificationWithIcon } from '../utils/notification';
import taxcolombiaIMG from '../assets/taxcolombia.png';

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const session = queryParams.get('session');
  const [login, setLogin] = useState(false)

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
      navigate('/private');
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
          layout='vertical'
        >
          <Form.Item
            name="username"
            type="text"
            className="form-item"
            label="Nombre de usuario"
            rules={[{ required: true, message: 'Por favor ingrese su nombre de usuario!' }]}
          >
            <Input placeholder='username'/>
          </Form.Item>

          <Form.Item
            name="password"
            label="Contraseña"
            rules={[{ required: true, message: 'Por favor ingrese su contraseña!' }]}
          >
            <Input.Password placeholder='***'/>
          </Form.Item>
            <Button type="default" htmlType="submit" className="w-full bg-[#f7ec4e]">
              Iniciar sesión
            </Button>
            <Button type="primary" htmlType="submit" className="w-full  mt-3">
              Registrarme
            </Button>
        </Form>
      </div>
    </div>
  );
};

export default Login;
