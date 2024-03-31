import { Button, Card, Col, DatePicker, Form, Input, Modal, Row, Select, TimePicker, notification } from "antd"
import { PlusCircleOutlined } from '@ant-design/icons';
import { carListService, createMantenimientoService, mantenimientoListService } from '../services/carService';
import { useEffect, useState } from 'react';
import { MOTIVO } from "../utils/const";
import { openNotificationWithIcon } from "../utils/notification";
import moment from 'moment';

const TallerPage = () => {
  const [mantenimientos, setMantenimientos] = useState([])
  const [cars, setCars] = useState([])
  const [entradaModalVisible, setEntradaModalVisible] = useState(false)
  const [formEntrada] = Form.useForm();


  useEffect(() => {
    fetchMantenimientos();
    fetchCars();
  }, []);

  const fetchMantenimientos = async () => {
    try {
      const data = await mantenimientoListService();
      setMantenimientos(data);
      console.log(data)
    } catch (error) {
      console.error('Error fetching componentes', error);
    }
  };

  const fetchCars = async () => {
    try {
      const data = await carListService();
      setCars(data);
      console.log(data)
    } catch (error) {
      console.error('Error fetching componentes', error);
    }
  };

  const handleOkEntrada = async () => {
    try {
      const values = formEntrada.getFieldsValue();
      const payload = {
        ...values,
        fecha_ingreso: values.fecha_ingreso ? moment(values.fecha_ingreso).format('YYYY-MM-DD') : null,
        hora_ingreso: values.hora_ingreso ? moment(values.hora_ingreso).format('HH:mm') : null,
      };
      console.log(payload)
      // await createMantenimientoService(payload);
      openNotificationWithIcon(notification, 'success', 'Entrada a taller registrada exitosamente', '', 4)
      setEntradaModalVisible(false);
      fetchMantenimientos();
    } catch (error) {
      console.log(error)
      openNotificationWithIcon(notification, 'error', 'Error al registrar entrada', '', 4)
    }
  };

  const dividirEnGruposDeTres = (mantenimientos) => {
    const grupos = [];
    for (let i = 0; i < mantenimientos.length; i += 3) {
      grupos.push(mantenimientos.slice(i, i + 3));
    }
    return grupos;
  };

  const onChange = (time, timeString) => {
    console.log(time, timeString);
  };

  const todayDate = moment().format('YYYY-MM-DD');

  return (
    <div>
      <div className="title flex items-center py-4">
        <Button
          size="large"
          shape="round"
          className="btn bg-[#42BFF2] text-white hover:bg-pink-500 px-4 py-2 flex items-center ml-4"
          onClick={() => setEntradaModalVisible(true)}>
          <PlusCircleOutlined className="mr-2" />
          Agregar entrada
        </Button>
      </div>

      {dividirEnGruposDeTres(mantenimientos).map((grupo, index) => (
        <Row gutter={16} key={index}>
          {grupo.map((mantenimiento) => (
            <Col span={8} key={mantenimiento.id}>
              <Card
                className="mt-6 hover:border-l-{fuchsia-700}"
                title={mantenimiento.vehiculo_placa}
                style={{ backgroundColor: mantenimiento.motivo === 1 ? '#FFF7E6' : mantenimiento.motivo === 2 ? '#FFE6E6' : '' }}>
                {/* Mostrar el texto del motivo en lugar del ID */}
                {mantenimiento.motivo && <div>Motivo: {MOTIVO[mantenimiento.motivo]}</div>}
                {mantenimiento.observacion && <div>Observación: {mantenimiento.observacion}</div>}
                {mantenimiento.hora_ingreso && <div>Fecha de ingreso: {mantenimiento.fecha_ingreso}</div>}
                {mantenimiento.hora_ingreso && <div>Hora de ingreso: {mantenimiento.hora_ingreso}</div>}
                <Button className="absolute top-0 right-0 bg-[#d44a80] text-white py-1 px-3 rounded-tr" onClick={((e) => console.log(e))}>Dar salida</Button>
              </Card>
            </Col>
          ))}
        </Row>
      ))}
      <Modal
        title="Agregar entrada al taller"
        open={entradaModalVisible}
        onOk={handleOkEntrada}
        onCancel={() => setEntradaModalVisible(false)}
      >
        <Form form={formEntrada} initialValues={{ fecha_ingreso: moment(todayDate), motivo: '3' }}>
          <Form.Item name="vehiculo" label="Vehiculo">
            <Select
              showSearch
              placeholder="Busca por movil o placa"
              optionFilterProp="children"
              filterOption={(input, option) =>
                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
              }
            >
              {cars.map(car => (
                <Select.Option key={car.id} value={car.id}>{`${car.placa} - ${car.movil}`}</Select.Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item name="motivo" label="Motivo">
            <Select>
              {Object.entries(MOTIVO).map(([key, value]) => (
                <Select.Option key={key} value={key}>{value}</Select.Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item name="observacion" label="Observación">
            <Input />
          </Form.Item>
          <Form.Item name="fecha_ingreso" label="Fecha de ingreso">
            <DatePicker />
          </Form.Item>
          <Form.Item name="Hora de ingreso" label="Hora de ingreso">
            <TimePicker use12Hours format="h:mm a" minuteStep={15} hourStep={1} />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  )
}

export default TallerPage