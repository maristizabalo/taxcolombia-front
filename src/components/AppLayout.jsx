import { HomeOutlined, ToolOutlined, SnippetsOutlined, FormOutlined, UserOutlined } from '@ant-design/icons';
import { Avatar, Image, Layout, Menu, theme } from 'antd';
import { Link } from 'react-router-dom';
const { Header, Content, Footer, Sider } = Layout;
import { useSelector } from 'react-redux';
import taxcolombiaIMG from '../assets/taxcolombia.png';

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

]

const AppLayout = ({ children }) => {

  const username = useSelector((store) => store.userInfo.user.username)
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider
        breakpoint="lg"
        collapsedWidth="0"
        onBreakpoint={(broken) => {
          console.log(broken);
        }}
        onCollapse={(collapsed, type) => {
          console.log(collapsed, type);
        }}
        width={200}
        style={{
          height: '100vh',
          position: 'fixed',
        }}
      >
        <div className="flex items-center justify-center  bg-transparent p-4 mb-4">
          <Avatar size={64} icon={<UserOutlined />} />
          <span className="ml-2 text-white">{username}</span>
        </div>
        <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']} items={items} className='mt-32' />
      </Sider>
      <Layout style={{ marginLeft: 200 }}>
      <Header
          style={{
            padding: '60px 50px', // Aumenta el padding para hacer el header más grande
            background: colorBgContainer,
          }}
        >
          <div className="flex items-center justify-center h-full"> {/* Añade mt-4 para bajar la imagen */}
            <Image src={taxcolombiaIMG} alt="Logo" className="h-12" />{/* Aumenta la altura de la imagen */}
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
            style={{
              paddingLeft: 100,
              paddingRight:70,
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