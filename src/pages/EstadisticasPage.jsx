import React, { useEffect, useState } from 'react';
import taxcolombiaIMG from '../assets/taxcolombia.png';
import { estadisticasService } from '../services/carService';
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { resetUser } from '../redux/states/user';
import { openNotificationWithIcon } from '../utils/notification';
import { LogoutOutlined } from '@ant-design/icons';
import { notification } from 'antd';

const EstadisticasPage = () => {
  const [estadisticas, setEstadisticas] = useState([]);
  const [filtro, setFiltro] = useState('SEMANA');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const exit = async () => {
    try {
      dispatch(resetUser());
      openNotificationWithIcon(notification, 'success', 'Cerró sesión con éxito', '', 4);
      navigate('/');
    } catch (error) {
      dispatch(resetUser());
      console.error(error);
      navigate('/');
    }
  };

  useEffect(() => {
    fetchEstadisticas();
  }, []);

  const fetchEstadisticas = async () => {
    try {
      const data = await estadisticasService();
      setEstadisticas(data);
    } catch (error) {
      console.error('Error fetching componentes', error);
    }
  };

  const handleFiltroChange = (filtroSeleccionado) => {
    setFiltro(filtroSeleccionado);
  };

  const filteredData = filtro === 'SEMANA' ? estadisticas.filter(item => item.mantenimientos_semana > 0).slice(0, 10) : estadisticas.filter(item => item.mantenimientos_mes > 0).slice(0, 15);

  return (
    <div className="p-4">
      <div className="flex items-center mb-4">
        <img src={taxcolombiaIMG} alt="Logo" className="w-30 h-8 mr-2" />
        <h1 className="text-xl font-bold">Estadísticas</h1>
        <LogoutOutlined className='text-2xl ml-auto' onClick={() => exit()} />
      </div>
      <div className="flex justify-center mt-4 mb-4">
        <button onClick={() => handleFiltroChange('SEMANA')} className={`mr-6 rounded-lg px-3 py-1 bg-blue-500 hover:bg-blue-600 text-white focus:outline-none ${filtro === 'SEMANA' && 'opacity-10'}`}>Semana</button>
        <button onClick={() => handleFiltroChange('MES')} className={`rounded-lg px-3 py-1 bg-red-500 hover:bg-red-600 text-white focus:outline-none ${filtro === 'MES' && 'opacity-10'}`}>Mes</button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredData.map((item, index) => (
          <div key={index} className="bg-gradient-to-r bg-black bg-opacity-50 rounded-lg p-4 text-white">
            <h2 className="text-lg font-bold">{item.placa} - Movil {item.movil}</h2>
            <p className="mt-2">Mantenimientos {filtro === 'SEMANA' ? 'esta semana' : 'este mes'}: {filtro === 'SEMANA' ? item.mantenimientos_semana : item.mantenimientos_mes}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EstadisticasPage;
