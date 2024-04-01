import { Button, Card, Col, DatePicker, Form, Input, Modal, Row, Select, TimePicker, Typography, notification } from "antd"
import { PlusCircleOutlined } from '@ant-design/icons';
import { carListService, createMantenimientoService, createMecanicoService, editMantenimientoService, mantenimientoListService, mecanicoListService } from '../services/carService';
import { useEffect, useState } from 'react';
import { MOTIVO } from "../utils/const";
import { openNotificationWithIcon } from "../utils/notification";
import { useSelector } from "react-redux";

const NotasPage = () => {
  const [mantenimientos, setMantenimientos] = useState([])
  const [cars, setCars] = useState([])
  const [mecanicos, setMecanicos] = useState([])
  const [entradaModalVisible, setEntradaModalVisible] = useState(false)
  const [mecanicoModalVisible, setMecanicoModalVisible] = useState(false)
  const [salidaModalVisible, setSalidaModalVisible] = useState(false)
  const [filteredMantenimientos, setFilteredMantenimientos] = useState([]);
  const [idSalida, setIdSalida] = useState('')
  const [formEntrada] = Form.useForm();
  const [formMecanico] = Form.useForm();
  const [formSalida] = Form.useForm();
  const userId = useSelector((store) => store.userInfo.user.user_id)
  console.log(userId)


  useEffect(() => {
    fetchMantenimientos();
    fetchCars();
    fetchMecanicos();
  }, []);

  const fetchMantenimientos = async () => {
    try {
      const data = await mantenimientoListService();
      setMantenimientos(data);
      setFilteredMantenimientos(data);
      console.log(data)
    } catch (error) {
      console.error('Error fetching componentes', error);
    }
  };

  const fetchMecanicos = async () => {
    try {
      const data = await mecanicoListService();
      setMecanicos(data);
      console.log(data)
    } catch (error) {
      console.error('Error fetching componentes', error);
    }
  };

  // Filtra los mantenimientos según la placa seleccionada
  const handlePlacaChange = (value) => {
    console.log(value)
    if (value === "") {
      // Si el valor está vacío, muestra todos los mantenimientos
      setFilteredMantenimientos(mantenimientos);
    } else {
      // Si hay un valor de placa, filtra los mantenimientos por esa placa
      const filtered = mantenimientos.filter(mantenimiento => mantenimiento.vehiculo_placa.toLowerCase().includes(value.toLowerCase()));
      console.log(filtered)
      setFilteredMantenimientos(filtered);
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
        registrado_por: userId
      };
      await createMantenimientoService(payload);
      openNotificationWithIcon(notification, 'success', 'Entrada a taller registrada exitosamente', '', 4)
      setEntradaModalVisible(false);
      fetchMantenimientos();
      formEntrada.resetFields()
    } catch (error) {
      console.log(error)
      openNotificationWithIcon(notification, 'error', 'Error al registrar entrada', '', 4)
    }
  };

  const handleCancelEntrada = () => {
    setEntradaModalVisible(false)
    formEntrada.resetFields()
  }

  const handleOkMecanico = async () => {
    try {
      const values = formMecanico.getFieldsValue();
      const payload = {
        nombre: values.nombre
      };
      console.log(payload)
      await createMecanicoService(payload);
      openNotificationWithIcon(notification, 'success', 'Mecanico registrado de forma exitosa', '', 4)
      setMecanicoModalVisible(false);
      fetchMecanicos();
      formMecanico.resetFields()
    } catch (error) {

      console.log(error)
      openNotificationWithIcon(notification, 'error', 'Error al registrar entrada', '', 4)
    }
  };

  const handleOkSalida = async () => {
    try {
      const values = formSalida.getFieldsValue();
      const payload = {
        realizado_por: values.realizado_por,
        estado_mantenimiento: 2
      };
      console.log(payload)
      await editMantenimientoService(idSalida, payload);
      openNotificationWithIcon(notification, 'success', 'Salida de taller registrada correctamente.', '', 4)
      setSalidaModalVisible(false);
      fetchMantenimientos();
      formSalida.resetFields()
      setIdSalida('')
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
    console.log(grupos)
    return grupos;
  };

  const modalSalida = (record) => {
    setSalidaModalVisible(true)
    setIdSalida(record)
  }

  const handleCancelSalida = () => {
    setSalidaModalVisible(false)
    formSalida.resetFields()
    setIdSalida('')
  }

  return (
    <div>
      <div className="title flex items-center py-4">
        <Input
          placeholder="Buscar placa en taller..."
          allowClear
          width={200}
          onChange={(e) => handlePlacaChange(e.target.value)}
          size="large"
        />
        <Button
          size="large"
          shape="round"
          className="btn bg-[#42BFF2] text-white hover:bg-pink-500 px-4 py-2 flex items-center ml-4"
          onClick={() => setEntradaModalVisible(true)}>
          <PlusCircleOutlined className="mr-2" />
          Agregar entrada
        </Button>
        <Button
          size="large"
          shape="round"
          className="btn bg-[#42BFF2] text-white hover:bg-pink-500 px-4 py-2 flex items-center ml-4"
          onClick={() => setMecanicoModalVisible(true)}>
          <PlusCircleOutlined className="mr-2" />
          Agregar mecanico
        </Button>
      </div>


      <div className="flex flex-wrap">
        {filteredMantenimientos
          .sort((a, b) => b.id - a.id) // Ordenar los elementos de manera descendente por el ID
          .map((mantenimiento, innerIndex) => (
            <div key={mantenimiento.id} className="w-1/3 px-4 mb-4">
              <Card
                className="hover:border-l-{fuchsia-700}"
                title={(<div>{mantenimiento.vehiculo_placa} - {MOTIVO[mantenimiento.motivo]}</div>)}
                style={{
                  backgroundColor: mantenimiento.motivo === 1 ? '#FFF7E6' : mantenimiento.motivo === 2 ? '#FFE6E6' : '',
                }}
              >
                {mantenimiento.observacion && <div><p className="font-bold">Observación:</p> {mantenimiento.observacion}</div>}
                {mantenimiento.fecha_ingreso && <div><p className="font-bold">Fecha de ingreso:</p>
                  {
                    new Date(mantenimiento.fecha_ingreso).toLocaleString('es-es', {
                      weekday: "long",
                      month: "long",
                      day: "numeric",
                      hour: 'numeric',
                      minute: 'numeric',
                      hour12: true
                    })
                  }
                </div>}
                <Button className="absolute top-0 right-0 bg-[#d44a80] text-white py-1 px-3 rounded-tr" onClick={() => modalSalida(mantenimiento.id)}>Dar salida</Button>
              </Card>
            </div>
          ))}
      </div>



      <Modal
        title={(<div className="text-2xl">Agregar entrada a taller</div>)}
        open={entradaModalVisible}
        onOk={handleOkEntrada}
        onCancel={handleCancelEntrada}
        width={600}
      >
        <Form
          form={formEntrada}
          initialValues={{ motivo: '3' }}
          layout="vertical"
          className="mt-6"
        >
          <Row gutter={16} >
            <Col span={12}>
              <Form.Item name="motivo" label="Motivo">
                <Select>
                  {Object.entries(MOTIVO).map(([key, value]) => (
                    <Select.Option key={key} value={key}>{value}</Select.Option>
                  ))}
                </Select>
              </Form.Item>
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
              <Form.Item name="fecha_ingreso" label="Hora de ingreso">
                <TimePicker use12Hours minuteStep={15} format='hh:mm A' changeOnScroll needConfirm={false} />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="observacion" label="Observación">
                <Input.TextArea rows={8} />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Modal>
      <Modal
        title="Agregar mecanico"
        open={mecanicoModalVisible}
        onOk={handleOkMecanico}
        onCancel={() => setMecanicoModalVisible(false)}
      >
        <Form form={formMecanico} layout="vertical">
          <Form.Item name="nombre" label="Nombre mecanico">
            <Input />
          </Form.Item>
        </Form>
      </Modal>
      <Modal
        title="Dar salida de taller"
        open={salidaModalVisible}
        onOk={handleOkSalida}
        onCancel={handleCancelSalida}

      >
        <Form form={formSalida} layout="vertical">
          <Form.Item name="realizado_por" label="Mecanico">
            <Select
              showSearch
              placeholder="Busca mecanico"
              optionFilterProp="children"
              filterOption={(input, option) =>
                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
              }
            >
              {mecanicos.map(mecanico => (
                <Select.Option key={mecanico.id} value={mecanico.id}>{`${mecanico.nombre}`}</Select.Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item name="fecha_salida" label="Hora de salida">
            <TimePicker use12Hours minuteStep={15} format='hh:mm A' changeOnScroll needConfirm={false} />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  )
}

export default NotasPage