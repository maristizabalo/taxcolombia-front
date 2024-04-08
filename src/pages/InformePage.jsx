import React from 'react';
import { Table, DatePicker, Input, Button } from 'antd'; // Importa los componentes necesarios de Ant Design
import moment from 'moment'; // Importa moment para el manejo de fechas

const { RangePicker } = DatePicker; // Obtén el componente RangePicker de Ant Design

const InformePage = () => {
  // Función para manejar el cambio de fecha en el RangePicker
  const handleDateChange = (dates, dateStrings) => {
    // Aquí puedes manejar el cambio de fecha y enviarlo como parámetro al backend
    console.log('Fechas seleccionadas:', dateStrings);
  };

  // Función para descargar el informe con filtros
  const handleDownloadFilteredReport = () => {
    // Aquí puedes implementar la lógica para descargar el informe con los filtros aplicados
    console.log('Descargar informe con filtros');
  };

  // Función para descargar el informe de hoy
  const handleDownloadTodayReport = () => {
    // Aquí puedes implementar la lógica para descargar el informe del día actual
    console.log('Descargar informe de hoy');
  };

  // Configuración de columnas para la tabla
  const columns = [
    { title: 'AÑO', dataIndex: 'year', key: 'year' },
    { title: 'MES', dataIndex: 'month', key: 'month' },
    { title: 'DIA', dataIndex: 'day', key: 'day' },
    { title: 'PLACA', dataIndex: 'placa', key: 'placa' },
    { title: 'MOVIL', dataIndex: 'movil', key: 'movil' },
    { title: 'NOVEDAD', dataIndex: 'novedad', key: 'novedad' },
    { title: 'TD', dataIndex: 'td', key: 'td' },
    { title: 'TN', dataIndex: 'tn', key: 'tn' },
  ];

  // Datos de ejemplo para la tabla
  const data = [
    { year: '2024', month: 'Abril', day: '7', placa: 'ABC123', movil: '001', novedad: 'Cambio de aceite', td: '10', tn: '20' },
    // Agrega más datos aquí según tus necesidades
  ];

  return (
    <div className="container">
      {/* Título centrado */}
      <h1 className="text-center my-4">Informe Seleccionador de Filtros</h1>

      {/* Selector de fechas */}
      <div className="flex justify-center my-4">
        <RangePicker
          format="YYYY-MM-DD"
          onChange={handleDateChange}
        />
      </div>

      {/* Botones de descarga */}
      <div className="flex justify-center my-4">
        <Button type="primary" onClick={handleDownloadFilteredReport}>Descargar informe con filtros</Button>
        <Button type="primary" className="ml-4" onClick={handleDownloadTodayReport}>Descargar informe de hoy</Button>
      </div>

      {/* Tabla de datos */}
      <Table columns={columns} dataSource={data} />
    </div>
  );
};

export default InformePage;
