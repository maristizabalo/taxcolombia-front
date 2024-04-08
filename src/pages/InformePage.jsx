import React, { useEffect, useState } from 'react';
import { Table, DatePicker, Button, Form, Select } from 'antd';
import { carListService, informeDetailService, informeListService } from '../services/carService';

const InformePage = () => {
  const [informe, setInforme] = useState([]);
  const [cars, setCars] = useState([])
  const [form] = Form.useForm();

  useEffect(() => {
    fetchInforme();
    fetchCars();
  }, []);

  const fetchCars = async () => {
    try {
      const data = await carListService();
      setCars(data);
      console.log(data)
    } catch (error) {
      console.error('Error fetching componentes', error);
    }
  };

  const fetchInforme = async () => {
    try {
      const data = await informeListService();
      setInforme(data);
    } catch (error) {
      console.error('Error fetching informe', error);
    }
  };

  const handleFilterApply = async () => {
    try {
      const values = await form.validateFields();
      const { fecha, placa } = values;
      const data = await informeDetailService(fecha, placa);
      setInforme(data);
    } catch (error) {
      console.error('Error applying filter', error);
    }
  };

  const handleDownloadFilteredReport = () => {
    console.log('Descargar informe con filtros');
  };

  const handleDownloadTodayReport = () => {
    console.log('Descargar informe de hoy');
  };

  const columns = [
    { title: 'AÑO', dataIndex: 'AÑO', key: 'year' },
    { title: 'MES', dataIndex: 'MES', key: 'month' },
    { title: 'DIA', dataIndex: 'DIA', key: 'day' },
    { title: 'PLACA', dataIndex: 'PLACA', key: 'placa' },
    { title: 'MOVIL', dataIndex: 'MOVIL', key: 'movil' },
    { title: 'NOVEDAD', dataIndex: 'NOVEDAD', key: 'novedad' },
  ];

  return (
    <div className="container">
      <h1 className="text-center my-4">Informe Seleccionador de Filtros</h1>
      <div className="flex justify-center my-4">
        <Form form={form} layout="inline">
          <Form.Item name="fecha">
            <DatePicker />
          </Form.Item>
          <Form.Item name="placa">
            <Select
              showSearch
              placeholder="Busca por movil o placa"
              optionFilterProp="children"
              filterOption={(input, option) =>
                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
              }
            >
              {cars.filter(car => car.is_active).map(car => (
                <Select.Option key={car.id} value={car.id}>
                  {`${car.placa} - ${car.movil}`}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item>
            <Button type="primary" onClick={handleFilterApply}>
              Aplicar filtros
            </Button>
          </Form.Item>
        </Form>


        <Button type="primary" onClick={handleDownloadFilteredReport}>
          Descargar informe con filtros
        </Button>
        <Button type="primary" className="ml-4" onClick={handleDownloadTodayReport}>
          Descargar informe de hoy
        </Button>
      </div>

      <Table columns={columns} dataSource={informe} />
    </div>
  );
};

export default InformePage;
