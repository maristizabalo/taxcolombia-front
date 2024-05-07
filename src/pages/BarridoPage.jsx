import React, { useState, useEffect } from 'react';
import { LogoutOutlined, WarningOutlined, PlusOutlined, EyeOutlined, LoadingOutlined } from '@ant-design/icons';
import { resetUser } from '../redux/states/user';
import { useDispatch } from 'react-redux';
import { Form, useNavigate } from 'react-router-dom';
import { openNotificationWithIcon } from '../utils/notification';
import { carListService, carsByEstadoService, editCarService, estadoInternoActiveListService } from '../services/carService';
import { Select, notification, Spin } from 'antd';

const { Option } = Select;

const BarridoPage = () => {
  const [carsLaborando, setCarsLaborando] = useState([]);
  const [selectedCar, setSelectedCar] = useState([])
  const [carsByEstado, setCarsByEstado] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState({
    id: 7,
    nombre: "LABORANDO",
    nombre_corto: "LABORANDO",
    descripcion: "Estado para los vehiculos que se encuentran laborando normalmente",
    is_active: true
  });
  const [estados, setEstados] = useState([]);
  const [showContent, setShowContent] = useState(true);
  const [loading, setLoading] = useState(false);

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

  const fetchCars = async () => {
    try {
      const data = await carsByEstadoService(7);
      setCarsLaborando(data);
    } catch (error) {
      console.error('Error fetching componentes', error);
    }
  };

  const fetchEstadosInternos = async () => {
    try {
      const data = await estadoInternoActiveListService();
      setEstados(data);
    } catch (error) {
      console.error('Error fetching componentes', error);
    }
  };

  const fetchCarsByEstado = async (estado) => {
    try {
      setLoading(true);
      const data = await carsByEstadoService(estado);
      setCarsByEstado(data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching componentes', error);
    }
  };

  useEffect(() => {
    fetchCars();
    fetchEstadosInternos();
    fetchCarsByEstado(selectedCategory.id);
  }, [selectedCategory]);

  const handleAddVehicle = async () => {
    try {
      const payload = {
        estado_interno: selectedCategory.id
      }
      await editCarService(selectedCar, payload);
      openNotificationWithIcon(notification, 'success', `Vehiculo agregado correctamente a estado por ${selectedCategory.nombre_corto}`, '', 1)
      setSelectedCar([]);
      fetchCars();
      fetchCarsByEstado(selectedCategory.id);
    } catch (error) {
      console.error('Error fetching componentes', error);
    }
  };

  const handleDeleteVehicle = async (carId) => {
    try {
      const payload = {
        estado_interno: 7
      }
      await editCarService(carId, payload);
      openNotificationWithIcon(notification, 'success', `Vehiculo en estado LABORANDO`, '', 1)
      setSelectedCar([]);
      fetchCars();
      fetchCarsByEstado(selectedCategory.id);
    } catch (error) {
      console.error('Error fetching componentes', error);
    }
  };

  const toggleContent = () => {
    setShowContent(!showContent);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex">
        <h1 className="text-3xl font-bold text-center">Barrido</h1>
        <EyeOutlined onClick={toggleContent} className={`text-2xl ml-auto cursor-pointer ${showContent ? 'text-black' : 'text-red-500'}`} />
        <LogoutOutlined className='text-2xl ml-auto cursor-pointer' onClick={() => exit()} />
      </div>

      {selectedCategory.id !== 7 &&
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-2">
          <div className="flex items-center">
            <Select
              showSearch
              placeholder="Selecciona un vehículo"
              optionFilterProp="children"
              filterOption={(input, option) =>
                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
              }
              onChange={setSelectedCar}
              value={selectedCar}
            >
              {carsLaborando.filter(car => car.is_active).map(car => (
                <Option key={car.id} value={car.id}>{`${car.placa} - ${car.movil}`}</Option>
              ))}
            </Select>
            <button
              className="ml-2 bg-blue-500 hover:bg-blue-600 text-white py-1 px-4 rounded-md"
              onClick={handleAddVehicle}
            >
              <PlusOutlined />
            </button>
          </div>
        </div>
      }

      {loading ?
        <div className="flex justify-center items-center h-full">
          <Spin indicator={<LoadingOutlined style={{ fontSize: 24 }} spin />} />
        </div>
        :

        carsByEstado ?
          <>
            <div className="flex justify-center items-center mb-4 mt-2">
              <div className='font-bold text-2xl'>
                {selectedCategory.nombre_corto}
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4 mb-48">
              {carsByEstado.map((car, index) => (
                <div key={car.id} className="relative">
                  <div className="border border-gray-300 p-4 rounded-md">
                    <p className="font-bold">
                      <span>{car.movil}</span> - <span className="font-normal">{car.placa}</span>
                    </p>
                    {car.estado_interno !== 7 && (
                      <button
                        className="absolute bottom-4 right-3 w-6 h-6 flex justify-center items-center rounded-full bg-red-700 text-white"
                        onClick={() => handleDeleteVehicle(car.id)}
                      >
                        ×
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </>
          :
          <div className="flex justify-center items-center h-full">
            <div className="flex flex-col items-center mt-24">
              <WarningOutlined style={{ fontSize: '48px', marginBottom: '16px' }} />
              <div className="font-bold text-blue-600 text-center">
                No hay vehiculos en el estado seleccionado.
              </div>
            </div>
          </div>
      }



      {showContent &&
        <div className="fixed bottom-0 left-0 right-0 bg-white shadow-md">
          <div className="container mx-auto px-4 py-2">
            <div className="flex flex-wrap justify-between">
              {estados.map((estado) => (
                <div key={estado.id} className="w-1/2 md:w-auto mb-2 md:mb-0">
                  <button
                    className={`w-full py-2 text-gray-600 text-[10px] border-blue-400 border-2 focus:outline-none rounded-md ${selectedCategory.id === estado.id ? 'bg-blue-400 text-white' : ''}`}
                    onClick={() => setSelectedCategory(estado)}
                  >
                    {estado.nombre_corto}
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      }

    </div>
  );
};

export default BarridoPage;
