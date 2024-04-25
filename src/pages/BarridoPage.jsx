import React, { useState, useEffect } from 'react';
import { LogoutOutlined } from '@ant-design/icons';
import { resetUser } from '../redux/states/user';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { openNotificationWithIcon } from '../utils/notification';
import { carListService, carsByEstadoService, estadoInternoActiveListService } from '../services/carService';
import { Select } from 'antd';

const { Option } = Select;

const BarridoPage = () => {
  const [cars, setCars] = useState([]);
  const [carsByEstado, setCarsByEstado] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(1);
  const [estados, setEstados] = useState([]);
  const [vehicles, setVehicles] = useState({
    BodegaPorConductor: [],
    BodegaRionegro: [],
    Chatarrizacion: [],
    Cartagena: [],
    Vitrina: [],
  });

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
      const data = await carListService();
      setCars(data);
    } catch (error) {
      console.error('Error fetching componentes', error);
    }
  };

  const fetchEstadosInternos = async () => {
    try {
      const data = await estadoInternoActiveListService();
      setEstados(data);
      console.log(data)
    } catch (error) {
      console.error('Error fetching componentes', error);
    }
  };

  const fetchCarsByEstado = async (estado) => {
    try {
      const data = await carsByEstadoService(estado);
      setCarsByEstado(data);
      console.log(data)
    } catch (error) {
      console.error('Error fetching componentes', error);
    }
  };

  useEffect(() => {
    fetchCars();
    fetchEstadosInternos();
    fetchCarsByEstado(selectedCategory.id);
  }, [selectedCategory]);

  
  // const [newVehicle, setNewVehicle] = useState('');
  // const [showModal, setShowModal] = useState(false);
  // const [selectedPlateIndex, setSelectedPlateIndex] = useState(null);

  // const handleAddVehicle = () => {
  //   setVehicles(prevState => ({
  //     ...prevState,
  //     [selectedCategory]: [...prevState[selectedCategory], newVehicle]
  //   }));
  //   setNewVehicle('');
  // };

  // const handleDeleteVehicle = () => {
  //   const updatedList = vehicles[selectedCategory].filter((_, index) => index !== selectedPlateIndex);
  //   setVehicles(prevState => ({
  //     ...prevState,
  //     [selectedCategory]: updatedList
  //   }));
  //   setShowModal(false);
  // };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex mb-4">
        <h1 className="text-3xl font-bold text-center mb-4">Barrido</h1>
        <LogoutOutlined className='text-2xl ml-auto' onClick={() => exit()} />
      </div>
      {/* <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <Select
          showSearch
          placeholder="Selecciona un vehículo"
          optionFilterProp="children"
          filterOption={(input, option) =>
            option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
          }
          onChange={(value) => setNewVehicle(value)}
          value={newVehicle}
        >
          {cars.filter(car => car.is_active).map(car => (
            <Option key={car.id} value={`${car.placa} - ${car.movil}`}>{`${car.placa} - ${car.movil}`}</Option>
          ))}
        </Select>
        <button
          onClick={handleAddVehicle}
          className="mt-2 bg-blue-500 hover:bg-blue-600 text-white py-1 px-4 rounded-md"
        >
          Añadir
        </button>
      </div>
      {showModal && (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-4 rounded-md">
            <p>¿Estás seguro de que deseas eliminar este vehículo?</p>
            <div className="mt-4 flex justify-end">
              <button
                onClick={() => setShowModal(false)}
                className="bg-gray-500 hover:bg-gray-600 text-white py-1 px-4 rounded-md mr-2"
              >
                Cancelar
              </button>
              <button
                onClick={handleDeleteVehicle}
                className="bg-red-500 hover:bg-red-600 text-white py-1 px-4 rounded-md"
              >
                Eliminar
              </button>
            </div>
          </div>
        </div>
      )} */}
      <div>
        <div className='font-bold'>
          {selectedCategory.nombre}
        </div>
      </div>
      <div className="fixed bottom-0 left-0 right-0 bg-white shadow-md">
        <div className="container mx-auto px-4 py-2">
          <div className="flex flex-wrap justify-between">
            {estados.map((estado) => (
              <div className="w-1/2 md:w-auto mb-2 md:mb-0">
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
    </div>
  );
};

export default BarridoPage;
