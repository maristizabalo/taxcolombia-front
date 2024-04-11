import React, { useEffect, useState } from 'react';
import { Table, DatePicker, Button, Form, Select } from 'antd';
import { carListService, informeDetailService, informeListService } from '../services/carService';
import * as XLSX from "xlsx"
import { saveAs } from 'file-saver';

const InformePage = () => {
  const [informe, setInforme] = useState([]);
  const [cars, setCars] = useState([])
  const [form] = Form.useForm();
  const [filtroAplicado, setFiltroAplicado] = useState(false); // Estado para controlar si se ha aplicado algún filtro

  useEffect(() => {
    fetchInforme();
    fetchCars();
  }, []);

  const fetchCars = async () => {
    try {
      const data = await carListService();
      setCars(data);
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

      // Verificar si ambos campos están vacíos
      if (!fecha && !placa) {
        // Si ambos campos están vacíos, restablecer el estado del informe y desactivar el estado de filtro aplicado
        fetchInforme()
        setFiltroAplicado(false);
        return;
      }

      // Si al menos un campo tiene valor, aplicar los filtros y actualizar el estado del informe
      const data = await informeDetailService(fecha, placa);
      setInforme(data);
      setFiltroAplicado(true); // Activar el estado de filtro aplicado
    } catch (error) {
      console.error('Error applying filter', error);
    }
  };

  const handleDownloadTodayReport = () => {
    const today = new Date().toLocaleDateString('es-ES').split('/').reverse().join('-');

    const data = [
      ["AÑO", "MES", "DIA", "PLACA", "MOVIL","NOVEDAD"],
      ...informe.map(inform => [inform.AÑO, inform.MES, inform.DIA, inform.PLACA, inform.MOVIL, inform.NOVEDAD])
    ];

    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.aoa_to_sheet(data);

    XLSX.utils.book_append_sheet(wb, ws, "Sheet 1");

    const wbout = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
    const blob = new Blob([wbout], { type: 'application/octet-stream' });

    // Nombrar el archivo con el nombre "INFORME" seguido de la fecha de hoy
    saveAs(blob, `INFORME ${today}.xlsx`);
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
              allowClear
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

        <Button type="primary" onClick={handleDownloadTodayReport} className="ml-4 bg-[#d44a80]">
          Descargar informe
        </Button>
      </div>

      <Table columns={columns} dataSource={informe} />
    </div>
  );
};

export default InformePage;
