import { HomeOutlined, ToolOutlined, SnippetsOutlined } from '@ant-design/icons';
import { Layout, Menu, theme } from 'antd';
import { Link } from 'react-router-dom';
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
    icon: <SnippetsOutlined />,
    label: (
      <Link to="/private/informe">
        Informe
      </Link>
    ),
  },
  {
    key: 4,
    icon: <SnippetsOutlined />,
    label: (
      <Link to="/private/administrador">
        Administrador
      </Link>
    ),
  },

]

const AppLayout = (props) => {


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
          overflow: 'auto',
          height: '100vh', 
          position: 'fixed', 
          left: 0,
        }}
      >
        <div className="demo-logo-vertical" />
        <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']} items={items} className='mt-32' />
      </Sider>
      <Layout style={{ marginLeft: 200 }}> 
        <Header
          style={{
            padding: 0,
            background: colorBgContainer,
          }}
        />
        <Content
          style={{
            margin: '24px 16px 0',
            overflow: 'initial', 
          }}
          className='bg-transparent'
        >
          <div
            style={{
              padding: 24,
              minHeight: 'calc(100vh - 114px)',
              borderRadius: borderRadiusLG,
            }}
          >
            {props.children}
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