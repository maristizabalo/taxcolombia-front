import { HomeOutlined, ToolOutlined, SnippetsOutlined, FormOutlined, UserOutlined, LogoutOutlined } from '@ant-design/icons';
import { Avatar, Image, Layout, Menu, theme } from 'antd';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import taxcolombiaIMG from '../assets/taxcolombia.png';
import Logout from './Logout';

const { Header, Content, Footer, Sider } = Layout;

const items = [
  {
    key: 1,
    icon: <HomeOutlined />,
    label: (
      <Link to="/private">
        Inicio
      </Link>
    ),
  },
  {
    key: 2,
    icon: <ToolOutlined />,
    label: (
      <Link to="/private/taller">
        Taller
      </Link>
    ),
  },
  {
    key: 3,
    icon: <FormOutlined />,
    label: (
      <Link to="/private/notas">
        Notas
      </Link>
    ),
  },
  {
    key: 4,
    icon: <SnippetsOutlined />,
    label: (
      <Link to="/private/informe">
        Informe
      </Link>
    ),
  },
  {
    key: 5,
    icon: <SnippetsOutlined />,
    label: (
      <Link to="/private/administrador">
        Administrador
      </Link>
    ),
  },
  {
    label: (<Logout />),
    key: 'salir',
  },
];

const AppLayout = ({ children }) => {
  const nombreUsuario = useSelector((store) => store.userInfo.user.nombre);

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider
        breakpoint="lg"
        collapsedWidth="0"
        width={200}
        style={{
          height: '100vh',
          position: 'fixed',
        }}
      >
        <div className="flex items-center justify-center p-4 mb-4">
          <Avatar size={64} icon={<UserOutlined />} className='bg-[#42bff2]' />
          <span className="ml-2 text-white">{nombreUsuario}</span>
        </div>
        <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']} items={items} className='mt-32' />
      </Sider>
      <Layout style={{ marginLeft: 200 }}>
        <Header
          style={{
            padding: '',
            background: colorBgContainer,
          }}
        >
          <div className="flex items-center justify-center h-full">
            <Image src={taxcolombiaIMG} alt="Logo" width={200} preview={false} />
          </div>
        </Header>
        <Content
          style={{
            margin: '24px 16px 0',
            overflow: 'initial',
          }}
          className='bg-transparent'
        >
          <div
            className="responsive-content"
            style={{
              paddingLeft: 100,
              paddingRight: 70,
              paddingBottom: 80,
              minHeight: 'calc(100vh - 114px)',
              borderRadius: borderRadiusLG,
            }}
          >
            {children}
          </div>
        </Content>
        <Footer
          style={{
            textAlign: 'center',
            position: 'fixed',
            width: '100%',
            bottom: 0,
          }}
        >
          TaxColombia ©{new Date().getFullYear()} Created by Maicol Aristizabal
        </Footer>
      </Layout>
    </Layout>
  );
};

export default AppLayout;
