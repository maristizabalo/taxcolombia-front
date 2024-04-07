import { useEffect, useState } from 'react'
import { EditOutlined, CloseCircleOutlined } from '@ant-design/icons';
import { Table, Tag } from 'antd';
import { useSelector } from 'react-redux';
import { ROLES } from '../utils/const';
import { mecanicoListService } from '../services/carService';


const Mecanicos = () => {

    const [mecanicos, setMecanicos] = useState()
    const userRol = useSelector((store) => store.userInfo.user.rol)


    useEffect(() => {
        fetchMecanicos();
    }, []);

    const isAdmin = ROLES.ADMIN || ROLES.SUPERVISOR === userRol;

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
              if (isAdmin) {
                return (
                  <>
                    <span key="editar" className="text-[#000000] font-bold hover:bg-gray-100" onClick={() => openEditModal(record)}>
                      <EditOutlined className="text-lg mr-4" />
                    </span>
                    <span key="eliminar" className="text-[#d44a80] font-bold hover:bg-gray-100" onClick={() => modalEliminar(record.id)}>
                      <CloseCircleOutlined className="text-lg mr-1" />
                    </span>
                  </>
                );
              }
      
              return null;
            },
          },
    
    ]
    

    const fetchMecanicos = async () => {
        try {
            const data = await mecanicoListService();
            setMecanicos(data);
        } catch (error) {
            console.error('Error fetching componentes', error);
        }
    };

    return (
        <div>
            <Table
                columns={columns}
                dataSource={mecanicos}
            />
        </div>
    )
}

export default Mecanicos