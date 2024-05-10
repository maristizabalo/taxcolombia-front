import { Button, Card, Col, Form, Input, Modal, Row, Select, Table, Tag, TimePicker, notification, Space, Tooltip, Spin } from "antd"
import { PlusCircleOutlined } from '@ant-design/icons';
import { carListService, createMantenimientoService, createMecanicoService, editCarService, editMantenimientoService, mantenimientoActiveListService, mantenimientoListService, mecanicoListService, motivoListService } from '../services/carService';
import { useEffect, useRef, useState } from 'react';
import { ESTADO_MANTENIMIENTO, MOTIVO } from "../utils/const";
import { CloseCircleOutlined, EditOutlined, CheckCircleOutlined, LeftCircleOutlined, SearchOutlined, LoadingOutlined } from '@ant-design/icons';
import { openNotificationWithIcon } from "../utils/notification";
import { useSelector } from "react-redux";
import moment from "moment";
import Highlighter from 'react-highlight-words';

const colorMap = {
  1: 'gold', // EN PROCESO
  2: 'green', // TERMINADO
  3: 'red',   // CANCELADO
};

const TallerPage = () => {
  const [mantenimientos, setMantenimientos] = useState([])
  const [cars, setCars] = useState([])
  const [tallerActual, setTallerActual] = useState(true);
  const [mecanicos, setMecanicos] = useState([])
  const [motivos, setMotivos] = useState([])
  const [entradaModalVisible, setEntradaModalVisible] = useState(false)
  const [mecanicoModalVisible, setMecanicoModalVisible] = useState(false)
  const [salidaModalVisible, setSalidaModalVisible] = useState(false)
  const [confirmDeleteModalVisible, setConfirmDeleteModalVisible] = useState(false);
  const [filteredMantenimientos, setFilteredMantenimientos] = useState([]);
  const [idSalida, setIdSalida] = useState('')
  const [idCarSalida, setIdCarSalida] = useState('')
  const [editingMantenimiento, setEditingMantenimiento] = useState(null);
  const searchInput = useRef(null);
  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');
  const [formEntrada] = Form.useForm();
  const [formMecanico] = Form.useForm();
  const [formSalida] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const userId = useSelector((store) => store.userInfo.user.user_id)


  const getColumnSearchProps = (dataIndex, placeholder) => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
      <div style={{ padding: 8 }}>
        <Input
          ref={searchInput}
          placeholder={`Buscar ${placeholder}`}
          value={selectedKeys[0]}
          onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{ marginBottom: 8, display: 'block' }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90 }}
          >
            Buscar
          </Button>
          <Button onClick={() => handleReset(clearFilters)} size="small" style={{ width: 90 }}>
            Restablecer
          </Button>
        </Space>
      </div>
    ),
    filterIcon: filtered => <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />,
    onFilter: (value, record) => record[dataIndex]
      ? record[dataIndex].toString().toLowerCase().includes(value.toLowerCase())
      : '',
    render: text =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ''}
        />
      ) : (
        text
      ),
  });

  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const handleReset = clearFilters => {
    clearFilters();
    setSearchText('');
  };

  const columns = [
    {
      title: 'Placa',
      dataIndex: 'vehiculo_placa',
      key: 'placa',
      width: '5%',
      ...getColumnSearchProps('vehiculo_placa', 'Placa'),
    },
    {
      title: 'Movil',
      dataIndex: 'vehiculo_movil',
      key: 'movil',
      width: '5%',
      ...getColumnSearchProps('vehiculo_movil', 'Movil'),
    },
    {
      title: 'Motivo',
      dataIndex: 'motivo_nombre',
      key: 'motivo',
      width: '5%',
      ...getColumnSearchProps('motivo_nombre', 'Motivo'),
    },
    {
      title: 'Observacion',
      dataIndex: 'observacion',
      key: 'observacion',
      width: '39%',
    },
    {
      title: 'Observacion Salida',
      dataIndex: 'observacion_salida',
      key: 'observacion',
      width: '39%',
    },
    {
      title: 'Ingreso',
      dataIndex: 'fecha_ingreso',
      key: 'fecha_ingreso',
      width: '8%',
      render: fecha_ingreso => moment(fecha_ingreso).format('YYYY-MM-DD h:mm A')
    },
    {
      title: 'Salida',
      dataIndex: 'fecha_salida',
      key: 'fecha_salida',
      width: '8%',
      render: fecha_salida => moment(fecha_salida).format('YYYY-MM-DD h:mm A')
    },
    {
      title: 'Registrado',
      dataIndex: 'hora_registro',
      key: 'hora_registro',
      width: '8%',
      render: hora_registro => moment(hora_registro).format('YYYY-MM-DD h:mm A')
    },
    {
      title: 'Autor',
      dataIndex: 'autor_nombre',
      key: 'autor',
      width: '10%',
      ...getColumnSearchProps('autor_nombre', 'Autor'),
    },
    {
      title: 'Estado',
      dataIndex: 'estado_mantenimiento',
      key: 'estado',
      width: '8%',
      filters: [
        { text: 'EN PROCESO', value: 1 },
        { text: 'TERMINADO', value: 2 },
        { text: 'CANCELADO', value: 3 }
      ],
      onFilter: (value, record) => record.estado_mantenimiento === value,
      render: estado => (
        <Tag color={colorMap[estado]}>
          {ESTADO_MANTENIMIENTO[estado]}
        </Tag>
      )
    },
    {
      title: 'Accion',
      key: 'accion',
      width: '4%',
      render: (text, record) => {
        const fechaSalida = new Date(record.fecha_salida);
        const diferenciaTiempo = Date.now() - fechaSalida.getTime();
        const horasTranscurridas = diferenciaTiempo / (1000 * 60 * 60);
        const botonVisible = horasTranscurridas < 1 && record.estado_mantenimiento === 2;
        return (
          <>
            {botonVisible && (
              <Tooltip title={'Devolver a taller'}>
                <span key="editar" className="text-[#000000] font-bold hover:bg-gray-100" onClick={() => comeBackTaller(record)}>
                  <LeftCircleOutlined className="text-lg mr-4" />
                </span>
              </Tooltip>
            )}
          </>
        );
      },
    },
  ]
  useEffect(() => {
    if (tallerActual) {
      fetchMantenimientosActivos();
      fetchCars();
      fetchMecanicos();
      fetchMotivos();
    } else {
      fetchMantenimientos();
    }
  }, [tallerActual]);

  const fetchMantenimientosActivos = async () => {
    try {
      setLoading(true)
      const data = await mantenimientoActiveListService();
      setMantenimientos(data);
      setFilteredMantenimientos(data);
      setLoading(false)
    } catch (error) {
      console.error('Error fetching componentes', error);
    }
  };

  const fetchMantenimientos = async () => {
    try {
      setLoading(true)
      const data = await mantenimientoListService();
      setMantenimientos(data);
      setLoading(false)
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

  const fetchMotivos = async () => {
    try {
      const data = await motivoListService();
      setMotivos(data);
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
      setFilteredMantenimientos(filtered);
    }
  };

  const comeBackTaller = async (record) => {
    const payload = {
      fecha_salida: null,
      observacion_salida: "",
      realizado_por: "",
      estado_mantenimiento: 1
    };
    await editMantenimientoService(record.id, payload);
    openNotificationWithIcon(notification, 'success', 'Devuelto a taller exitosamente', '', 4)
    fetchMantenimientos();
  };

  const openEditModal = (mantenimiento) => {
    setEditingMantenimiento(mantenimiento);
    setEntradaModalVisible(true);
    formEntrada.setFieldValue("motivo", mantenimiento.motivo)
    formEntrada.setFieldValue("vehiculo", mantenimiento.vehiculo)
    const fechaIngreso = moment(mantenimiento.fecha_ingreso);
    formEntrada.setFieldValue("fecha_ingreso", fechaIngreso)
    formEntrada.setFieldValue("observacion", mantenimiento.observacion)
  };

  const fetchCars = async () => {
    try {
      const data = await carListService();
      setCars(data);
    } catch (error) {
      console.error('Error fetching componentes', error);
    }
  };

  const handleOkEntrada = async () => {
    try {
      // Validar los campos del formulario antes de continuar
      formEntrada
        .validateFields()
        .then(async (values) => {
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
            const idCar = formEntrada.getFieldValue('vehiculo')
            const payloadStateCar = {
              estado_interno: 8
            };
            await editCarService(idCar, payloadStateCar);
            openNotificationWithIcon(notification, 'success', 'Entrada a taller registrada exitosamente', '', 4);
          }
          setEntradaModalVisible(false);
          fetchMantenimientosActivos();
          formEntrada.resetFields();
          setEditingMantenimiento(null);
        })
        .catch((error) => {
          console.error('Error en la validación del formulario:', error);
          openNotificationWithIcon(notification, 'error', 'Por favor complete todos los campos requeridos', '', 4);
        });
    } catch (error) {
      console.error(error);
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
      // Validar los campos del formulario antes de continuar
      formMecanico
        .validateFields()
        .then(async (values) => {
          const payload = {
            nombre: values.nombre
          };
          await createMecanicoService(payload);
          openNotificationWithIcon(notification, 'success', 'Mecanico registrado de forma exitosa', '', 4)
          setMecanicoModalVisible(false);
          fetchMecanicos();
          formMecanico.resetFields();
        })
        .catch((error) => {
          openNotificationWithIcon(notification, 'error', 'Por favor complete todos los campos requeridos', '', 4);
          console.error('Error en la validación del formulario:', error);
        });
    } catch (error) {
      console.error(error)
      openNotificationWithIcon(notification, 'error', 'Error al registrar mecanico', '', 4)
    }
  };

  const handleOkSalida = async () => {
    try {
      // Validar los campos del formulario antes de continuar
      formSalida
        .validateFields()
        .then(async (values) => {
          const payload = {
            ...values,
            realizado_por: values.realizado_por,
            estado_mantenimiento: 2
          };
          await editMantenimientoService(idSalida, payload);
          const payloadStateCar = {
            estado_interno: 7
          };
          await editCarService(idCarSalida, payloadStateCar);
          openNotificationWithIcon(notification, 'success', 'Salida de taller registrada correctamente.', '', 4)
          setSalidaModalVisible(false);
          fetchMantenimientosActivos();
          formSalida.resetFields()
          setIdSalida('')
          setIdCarSalida('')
        })
        .catch((error) => {
          openNotificationWithIcon(notification, 'error', 'Por favor complete todos los campos requeridos', '', 4);
          console.error('Error en la validación del formulario:', error);
        });
    } catch (error) {
      console.error(error)
      openNotificationWithIcon(notification, 'error', 'Error al registrar salida', '', 4)
    }
  };

  const modalSalida = (record) => {
    setSalidaModalVisible(true)
    setIdSalida(record.id)
    setIdCarSalida(record.vehiculo)
  }

  const modalEliminar = (record) => {
    setConfirmDeleteModalVisible(true)
    setIdSalida(record.id)
    setIdCarSalida(record.vehiculo)
  }

  const handleCancelSalida = () => {
    setSalidaModalVisible(false)
    formSalida.resetFields()
    setIdSalida('')
    setIdCarSalida('')
  }

  const handleDeleteConfirm = async () => {
    try {
      await editMantenimientoService(idSalida, { estado_mantenimiento: 3 });
      const payloadStateCar = {
        estado_interno: 7
      };
      await editCarService(idCarSalida, payloadStateCar);
      openNotificationWithIcon(notification, 'success', 'Entrada al taller cancelada exitosamente', '', 4);
      setConfirmDeleteModalVisible(false);
      fetchMantenimientosActivos(); // Actualiza la lista de mantenimientos
      setIdSalida('')
      setIdCarSalida('')
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
        {

          loading ?
            <div className="flex justify-center items-center h-full">
              <Spin indicator={<LoadingOutlined style={{ fontSize: 24 }} spin />} />
            </div>
            :


            tallerActual ?
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
                            <span key="salida" className="text-[#42bff2] font-bold hover:bg-gray-100" onClick={() => modalSalida(mantenimiento)}>
                              <CheckCircleOutlined className="text-lg mr-1" /> Salida
                            </span>,
                            <span key="eliminar" className="text-[#d44a80] font-bold hover:bg-gray-100" onClick={() => modalEliminar(mantenimiento)}>
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
              <Table columns={columns} dataSource={mantenimientos} size='small' pagination={{ defaultPageSize: 100 }} />
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
          initialValues={{ motivo: 3 }}
          layout="vertical"
          className="mt-6"
        >
          <Row gutter={16} >
            <Col span={12}>
              <Form.Item
                name="motivo"
                label="Motivo"
                rules={[{ required: true, message: 'Por seleccione un motivo' }]}
              >
                <Select>
                  {motivos.filter(motivo => motivo.is_active).map((motivo) => (
                    <Select.Option key={motivo.id} value={motivo.id}>{motivo.nombre}</Select.Option>
                  ))}
                </Select>
              </Form.Item>
              <Form.Item name="vehiculo" label="Vehiculo" rules={[{ required: true, message: 'Por seleccione un vehiculo' }]}>
                <Select
                  showSearch
                  placeholder="Busca por movil o placa"
                  optionFilterProp="children"
                  filterOption={(input, option) =>
                    option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                  }
                >
                  {cars.filter(car => car.is_active).map(car => (
                    <Select.Option key={car.id} value={car.id} >{`${car.placa} - ${car.movil}`}</Select.Option>
                  ))}
                </Select>
              </Form.Item>
              <Form.Item name="fecha_ingreso" label="Hora de ingreso" rules={[{ required: true, message: 'Por seleccione una hora de ingreso' }]}>
                <TimePicker use12Hours minuteStep={15} format='hh:mm A' changeOnScroll needConfirm={false} />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="observacion" label="Observación" rules={[{ required: true, message: 'Por favor escriba una observacion' }]}>
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
          <Form.Item name="nombre" label="Nombre mecanico" rules={[{ required: true, message: 'Por escriba el nombre del mecanico' }]}>
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
          <Form.Item name="realizado_por" label="Mecanico" rules={[{ required: true, message: 'Por seleccione un mecanico' }]}>
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
          <Form.Item name="fecha_salida" label="Hora de salida" rules={[{ required: true, message: 'Por seleccione una fecha de salida' }]}>
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