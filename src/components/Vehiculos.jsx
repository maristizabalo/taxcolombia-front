import { useEffect, useState } from 'react'
import { EditOutlined, CloseCircleOutlined } from '@ant-design/icons';
import { Table, Tag } from 'antd';
import { useSelector } from 'react-redux';
import { ROLES } from '../utils/const';
import { carListService } from '../services/carService';
const Vehiculos = () => {

    const [cars, setCars] = useState()
    const userRol = useSelector((store) => store.userInfo.user.rol)


    useEffect(() => {
        fetchCars();
    }, []);

    const columns = [
        {
            title: 'Id',
            dataIndex: 'id',
            key: 'id',
            width: '5%',
        },
        {
            title: 'Placa',
            dataIndex: 'placa',
            key: 'placa',
            width: '10%',
        },
        {
            title: 'Movil',
            dataIndex: 'movil',
            key: 'username',
            width: '5%',
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
            render: () => {(
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
            }
    ]
    

    const fetchCars = async () => {
        try {
            const data = await carListService();
            setCars(data);
        } catch (error) {
            console.error('Error fetching componentes', error);
        }
    };

    return (
        <div>
            <Table
                columns={columns}
                dataSource={cars}
            />
        </div>
    )
}

export default Vehiculos