import { Button, Card, Col, Form, Input, Modal, Row, Select, Table, TimePicker, notification } from "antd"
import { PlusCircleOutlined } from '@ant-design/icons';
import { carListService, createMantenimientoService, createMecanicoService, editMantenimientoService, mantenimientoActiveListService, mantenimientoListService, mecanicoListService } from '../services/carService';
import { useEffect, useState } from 'react';
import { ESTADO_MANTENIMIENTO, MOTIVO } from "../utils/const";
import { CloseCircleOutlined, EditOutlined, CheckCircleOutlined } from '@ant-design/icons';
import { openNotificationWithIcon } from "../utils/notification";
import { useSelector } from "react-redux";
import moment from "moment";

const TallerPage = () => {
  const [mantenimientos, setMantenimientos] = useState([])
  const [cars, setCars] = useState([])
  const [tallerActual, setTallerActual] = useState(true);
  const [mecanicos, setMecanicos] = useState([])
  const [entradaModalVisible, setEntradaModalVisible] = useState(false)
  const [mecanicoModalVisible, setMecanicoModalVisible] = useState(false)
  const [salidaModalVisible, setSalidaModalVisible] = useState(false)
  const [confirmDeleteModalVisible, setConfirmDeleteModalVisible] = useState(false);
  const [filteredMantenimientos, setFilteredMantenimientos] = useState([]);
  const [idSalida, setIdSalida] = useState('')
  const [editingMantenimiento, setEditingMantenimiento] = useState(null);
  const [formEntrada] = Form.useForm();
  const [formMecanico] = Form.useForm();
  const [formSalida] = Form.useForm();
  const userId = useSelector((store) => store.userInfo.user.user_id)

  const columns = [
    {
      title: 'Placa',
      dataIndex: 'vehiculo_placa',
      key: 'placa',
      width: '5%',
    },
    {
      title: 'Movil',
      dataIndex: 'vehiculo_movil',
      key: 'movil',
      width: '5%',
    },
    {
      title: 'Motivo',
      dataIndex: 'motivo_nombre',
      key: 'motivo',
      width: '5%',
    },
    {
      title: 'Observacion',
      dataIndex: 'observacion',
      key: 'observacion',
      width: '15%',
    },
    {
      title: 'Ingreso',
      dataIndex: 'fecha_ingreso',
      key: 'fecha_ingreso',
      width: '4%',
      render: fecha_ingreso => moment(fecha_ingreso).format('YYYY-MM-DD h:mm A')
    },
    {
      title: 'Salida',
      dataIndex: 'fecha_salida',
      key: 'fecha_salida',
      width: '4%',
      render: fecha_salida => moment(fecha_salida).format('YYYY-MM-DD h:mm A')
    },
    {
      title: 'Registrado',
      dataIndex: 'hora_registro',
      key: 'hora_registro',
      width: '4%',
      render: hora_registro => moment(hora_registro).format('YYYY-MM-DD h:mm A')
    },
    {
      title: 'Autor',
      dataIndex: 'autor_nombre',
      key: 'autor',
      width: '10%',
    },
    {
      title: 'Estado',
      dataIndex: 'estado_mantenimiento',
      key: 'estado',
      width: '5%',
      render: estado => ESTADO_MANTENIMIENTO[estado]
    }
  ]
  useEffect(() => {
    if (tallerActual) {
      fetchMantenimientosActivos();
      fetchCars();
      fetchMecanicos();
    } else {
      fetchMantenimientos();
    }
  }, [tallerActual]);

  const fetchMantenimientosActivos = async () => {
    try {
      const data = await mantenimientoActiveListService();
      setMantenimientos(data);
      setFilteredMantenimientos(data);
    } catch (error) {
      console.error('Error fetching componentes', error);
    }
  };

  const fetchMantenimientos = async () => {
    try {
      const data = await mantenimientoListService();
      setMantenimientos(data);
    } catch (error) {
      console.error('Error fetching componentes', error);
    }
  };

  const fetchMecanicos = async () => {
    try {
      const data = await mecanicoListService();
      setMecanicos(data);
    } catch (error) {
      console.error('Error fetching componentes', error);
    }
  };

  // Filtra los mantenimientos según la placa seleccionada
  const handlePlacaChange = (value) => {
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

  const openEditModal = (mantenimiento) => {
    setEditingMantenimiento(mantenimiento);
    setEntradaModalVisible(true);
    formEntrada.setFieldValue("motivo", mantenimiento.motivo)
    formEntrada.setFieldValue("vehiculo", mantenimiento.vehiculo)
    console.log(mantenimiento.fecha_ingreso)
    const fechaIngreso = moment(mantenimiento.fecha_ingreso);
    formEntrada.setFieldValue("fecha_ingreso", fechaIngreso)
    formEntrada.setFieldValue("observacion", mantenimiento.observacion)
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

      if (editingMantenimiento) {
        // Si hay un mantenimiento en edición, se actualiza en lugar de crear uno nuevo
        await editMantenimientoService(editingMantenimiento.id, payload);
        openNotificationWithIcon(notification, 'success', 'Mantenimiento actualizado exitosamente', '', 4);
      } else {
        // Si no hay un mantenimiento en edición, se crea uno nuevo
        await createMantenimientoService(payload);
        openNotificationWithIcon(notification, 'success', 'Entrada a taller registrada exitosamente', '', 4);
      }

      // Se cierra el modal y se actualiza la lista de mantenimientos
      setEntradaModalVisible(false);
      fetchMantenimientosActivos();
      formEntrada.resetFields();
      setEditingMantenimiento(null); // Limpiar el mantenimiento en edición
    } catch (error) {
      console.log(error);
      openNotificationWithIcon(notification, 'error', 'Error al registrar entrada', '', 4);
    }
  };

  const handleCancelEntrada = () => {
    setEntradaModalVisible(false);
    formEntrada.resetFields();
    setEditingMantenimiento(null);
  };

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
        ...values,
        realizado_por: values.realizado_por,
        estado_mantenimiento: 2
      };
      console.log(payload)
      await editMantenimientoService(idSalida, payload);
      openNotificationWithIcon(notification, 'success', 'Salida de taller registrada correctamente.', '', 4)
      setSalidaModalVisible(false);
      fetchMantenimientosActivos();
      formSalida.resetFields()
      setIdSalida('')
    } catch (error) {
      console.log(error)
      openNotificationWithIcon(notification, 'error', 'Error al registrar entrada', '', 4)
    }
  };

  const modalSalida = (record) => {
    setSalidaModalVisible(true)
    setIdSalida(record)
  }

  const modalEliminar = (record) => {
    setConfirmDeleteModalVisible(true)
    setIdSalida(record)
  }

  const handleCancelSalida = () => {
    setSalidaModalVisible(false)
    formSalida.resetFields()
    setIdSalida('')
  }

  const handleDeleteConfirm = async () => {
    try {
      // Ejecuta el servicio editMantenimientoService con estado_mantenimiento = 3
      await editMantenimientoService(idSalida, { estado_mantenimiento: 3 });
      openNotificationWithIcon(notification, 'success', 'Entrada al taller cancelada exitosamente', '', 4);
      setConfirmDeleteModalVisible(false);
      fetchMantenimientosActivos(); // Actualiza la lista de mantenimientos
      setIdSalida('')
    } catch (error) {
      console.error('Error al cancelar la entrada al taller', error);
      openNotificationWithIcon(notification, 'error', 'Error al cancelar la entrada al taller', '', 4);
    }
  };

  return (
    <div className="container">
      <div className="flex justify-around">
        <Button
          size="large"
          shape="round"
          className={`w-full btn ${tallerActual ? 'text-white' : 'text-[#42BFF2]'} px-4 py-2 items-center ${tallerActual ? 'bg-[#d44a80]' : 'bg-white'}`}
          onClick={() => setTallerActual(true)}
        >
          TALLER ACTUAL
        </Button>
        <Button
          size="large"
          shape="round"
          className={`w-full btn ${tallerActual ? 'text-[#42BFF2]' : 'text-white'} px-4 py-2 items-center ml-4 ${!tallerActual ? 'bg-[#d44a80]' : 'bg-white'}`}
          onClick={() => setTallerActual(false)}
        >
          TALLER HISTÓRICO
        </Button>
      </div>
      <div className="content-container mt-4 p-6">
        {tallerActual ?
          <div>
            <div className="flex py-4">
              <Input
                placeholder="Buscar placa en taller..."
                allowClear
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
                .map((mantenimiento) => (
                  <div key={mantenimiento.id} className="w-1/3 mb-4 px-7">
                    <Card
                      className="hover:border-l-{fuchsia-700}"
                      title={(<>
                        <div>
                          {mantenimiento.vehiculo_placa} - {mantenimiento.vehiculo_movil}
                        </div>
                        <div>
                          {MOTIVO[mantenimiento.motivo]}
                        </div>
                      </>)}
                      style={{
                        backgroundColor: mantenimiento.motivo === 1 ? '#FFF7E6' : mantenimiento.motivo === 2 ? '#FFE6E6' : '',
                      }}
                      actions={[
                        <span key="editar" className="text-[#000000] font-bold hover:bg-gray-100" onClick={() => openEditModal(mantenimiento)}>
                          <EditOutlined className="text-lg mr-1" /> Editar
                        </span>,
                        <span key="salida" className="text-[#42bff2] font-bold hover:bg-gray-100" onClick={() => modalSalida(mantenimiento.id)}>
                          <CheckCircleOutlined className="text-lg mr-1" /> Salida
                        </span>,
                        <span key="eliminar" className="text-[#d44a80] font-bold hover:bg-gray-100" onClick={() => modalEliminar(mantenimiento.id)}>
                          <CloseCircleOutlined className="text-lg mr-1" /> Eliminar
                        </span>,
                      ]}
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
                    </Card>
                  </div>

                ))}
            </div>
          </div>
          :
          <Table id="miInventarioTable" columns={columns} dataSource={mantenimientos} size='small' />
        }
      </div>




      <Modal
        title={(<div className="text-2xl">{editingMantenimiento ? 'Editar entrada' : 'Agregar entrada'}</div>)}
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
          <Form.Item name="observacion_salida" label="¿Que se le hizo al carro?">
            <Input.TextArea rows={8} />
          </Form.Item>
        </Form>
      </Modal>

      <Modal
        title="Confirmar eliminación"
        open={confirmDeleteModalVisible}
        onOk={handleDeleteConfirm}
        onCancel={() => setConfirmDeleteModalVisible(false)}
      >
        <p>¿Estás seguro que quieres cancelar este ingreso al taller?</p>
      </Modal>

    </div>
  )
}

export default TallerPage