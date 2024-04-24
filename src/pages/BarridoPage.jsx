import React, { useState, useEffect } from 'react';
import { LogoutOutlined } from '@ant-design/icons';
import { resetUser } from '../redux/states/user';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { openNotificationWithIcon } from '../utils/notification';
import { carListService } from '../services/carService';
import { Select } from 'antd';

const { Option } = Select;

const Sweeper = () => {
  const [cars, setCars] = useState([]);
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

  useEffect(() => {
    fetchCars();
  }, []);

  const [selectedCategory, setSelectedCategory] = useState('BodegaPorConductor');
  const [newVehicle, setNewVehicle] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [selectedPlateIndex, setSelectedPlateIndex] = useState(null);

  const handleAddVehicle = () => {
    setVehicles(prevState => ({
      ...prevState,
      [selectedCategory]: [...prevState[selectedCategory], newVehicle]
    }));
    setNewVehicle('');
  };

  const handleDeleteVehicle = () => {
    const updatedList = vehicles[selectedCategory].filter((_, index) => index !== selectedPlateIndex);
    setVehicles(prevState => ({
      ...prevState,
      [selectedCategory]: updatedList
    }));
    setShowModal(false);
  };

  console.log(vehicles[selectedCategory])

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex mb-4">
        <h1 className="text-3xl font-bold text-center mb-4">Barrido</h1>
        <LogoutOutlined className='text-2xl ml-auto' onClick={() => exit()} />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {Object.keys(vehicles[selectedCategory]).map((plate, index) => (
          <div key={index} className="bg-gray-200 p-4 rounded-md">
            <h2 className="text-xl font-semibold mb-2">{plate}</h2>
            <ul>
              {vehicles[selectedCategory].map((vehicle, index) => (
                <li key={index} className="flex justify-between items-center">
                  <span>{vehicle}</span>
                  <button
                    className="text-red-500"
                    onClick={() => {
                      setSelectedPlateIndex(index);
                      setShowModal(true);
                    }}
                  >
                    x
                  </button>
                </li>
              ))}
            </ul>

          </div>
        ))}
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
      )}
      <div className="fixed bottom-0 left-0 right-0 bg-white shadow-md">
        <div className="container mx-auto px-4 py-2">
          <div className="flex flex-wrap justify-between">
            <div className="w-1/2 md:w-auto mb-2 md:mb-0">
              <button
                className={`w-full py-2 text-gray-600 focus:outline-none rounded-md ${selectedCategory === 'BodegaPorConductor' ? 'bg-blue-400 text-white' : ''}`}
                onClick={() => setSelectedCategory('BodegaPorConductor')}
              >
                Bodega
              </button>
            </div>
            <div className="w-1/2 md:w-auto mb-2 md:mb-0">
              <button
                className={`w-full py-2 text-gray-600 focus:outline-none rounded-md ${selectedCategory === 'BodegaRionegro' ? 'bg-blue-400 text-white' : ''}`}
                onClick={() => setSelectedCategory('BodegaRionegro')}
              >
                Rionegro
              </button>
            </div>
            <div className="w-1/3 md:w-auto mb-2 md:mb-0">
              <button
                className={`w-full py-2 text-gray-600 focus:outline-none rounded-md ${selectedCategory === 'Chatarrizacion' ? 'bg-blue-400 text-white' : ''}`}
                onClick={() => setSelectedCategory('Chatarrizacion')}
              >
                Chatarrización
              </button>
            </div>
            <div className="w-1/3 md:w-auto mb-2 md:mb-0">
              <button
                className={`w-full py-2 text-gray-600 focus:outline-none rounded-md ${selectedCategory === 'Cartagena' ? 'bg-blue-400 text-white' : ''}`}
                onClick={() => setSelectedCategory('Cartagena')}
              >
                Cartagena
              </button>
            </div>
            <div className="w-1/3 md:w-auto mb-2 md:mb-0">
              <button
                className={`w-full py-2 text-gray-600 focus:outline-none rounded-md ${selectedCategory === 'Vitrina' ? 'bg-blue-400 text-white' : ''}`}
                onClick={() => setSelectedCategory('Vitrina')}
              >
                Vitrina
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sweeper;
