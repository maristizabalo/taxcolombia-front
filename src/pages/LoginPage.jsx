import { Form, Input, Button, Image, notification } from 'antd';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { login, register } from '../services/authServices';
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
  const formLogin = Form.useForm()
  const formRegister = Form.useForm()
  const [loginMode, setLoginMode] = useState(true)

  useEffect(() => {
    if (session === 'expired') {
      // openNotificationWithIcon(notification, 'warning', 'Su sesión ha expirado, por favor vuelva a iniciar sesión.', '', 5);
    }
  }, [session]);

  const onFinishLogin = async () => {
    try {
      const values = formLogin.getFieldsValue();
      const result = await login(values);
      const user = jwtDecode(result.access);
      user['auth_tokens'] = result;
      dispatch(createUser(user));
      openNotificationWithIcon(notification, 'success', 'Inicio de sesión exitoso', '', 4);
      setLoginMode(false)
    } catch (error) {
      openNotificationWithIcon(notification, 'error', 'Verifica tu usuario y clave, si el error continúa contacta con el administrador.', '', 4);
    }
  };

  const onFinishRegister = async () => {
    try {
      const values = formRegister.getFieldsValue();
      await register(values);
      openNotificationWithIcon(notification, 'success', 'Registrado exitosamente', '', 4);
      setLoginMode(true)
    } catch (error) {
      openNotificationWithIcon(notification, 'error', 'No se ha podido registrar correctamente, vuela a intentarlo y si el error persiste entonces comuniquese con el administrador.', '', 4);
    }
  };

  const handleLoginMode = () => {
    setLoginMode(!loginMode)
  }

  return (
    <div className="flex justify-center items-center h-screen bg-opacity-50 bg-black">
      <div className="bg-white shadow-lg rounded-md p-8">
        <Image preview={false} src={taxcolombiaIMG} sizes="150" className="mx-auto mb-6" />
        {
          loginMode ?
            <>
              <Form
                className="w-80"
                layout='vertical'
                form={formLogin}
              >
                <Form.Item
                  name="username"
                  type="text"
                  className="form-item"
                  label="Nombre de usuario"
                  rules={[{ required: true, message: 'Por favor ingrese su nombre de usuario!' }]}
                >
                  <Input placeholder='username' />
                </Form.Item>

                <Form.Item
                  name="password"
                  label="Contraseña"
                  rules={[{ required: true, message: 'Por favor ingrese su contraseña!' }]}
                >
                  <Input.Password placeholder='***' />
                </Form.Item>
              </Form>
              <Button type="primary" onClick={onFinishLogin} className="w-full">
                Iniciar sesión
              </Button>
              <Button type="link" onClick={handleLoginMode} className="w-full  mt-3">
                Registrarme
              </Button>
            </>
            :
            <>
              <Form
                className="w-80"
                layout='vertical'
                form={formRegister}
              >
                <Form.Item
                  name="username"
                  type="text"
                  className="form-item"
                  label="Nombre de usuario"
                  rules={[{ required: true, message: 'Por favor ingrese su nombre de usuario!' }]}
                >
                  <Input placeholder='username' />
                </Form.Item>

                <Form.Item
                  name="password"
                  label="Contraseña"
                  className="form-item"
                  rules={[{ required: true, message: 'Por favor ingrese su contraseña!' }]}
                >
                  <Input.Password placeholder='***' />
                </Form.Item>

                <Form.Item
                  name="nombre"
                  className="form-item"
                  label="Nombre completo"
                  rules={[{ required: true, message: 'Por favor ingrese su nombre y apellido' }]}
                >
                  <Input placeholder='Pepito Perez' />
                </Form.Item>
              </Form>
              <Button type="primary" onClick={onFinishRegister} className="w-full">
                Registrarme
              </Button>
              <Button type="link" onClick={handleLoginMode} className="w-full  mt-3">
                Iniciar <Sesion-></Sesion->
              </Button>
            </>
        }

      </div>
    </div>
  );
};

export default Login;
