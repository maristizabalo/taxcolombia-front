import { Button, Col, Form, Input, Modal, Row, Select, Table, Tag, notification } from "antd"
import { PlusCircleOutlined, EditOutlined, CloseCircleOutlined } from '@ant-design/icons';
import { carListService, } from '../services/carService';
import { useEffect, useState } from 'react';
import { openNotificationWithIcon } from "../utils/notification";
import { useSelector } from "react-redux";
import { createNotaService, editNotaService, notaActiveListService, notaListService } from "../services/notaService";
import moment from "moment";

const NotasPage = () => {
  const [notasActive, setNotasActive] = useState([])
  const [notas, setNotas] = useState([])
  const [cars, setCars] = useState([])
  const [notasActual, setNotasActual] = useState(true);
  const [notaModalVisible, setNotaModalVisible] = useState(false)
  const [confirmDeleteModalVisible, setConfirmDeleteModalVisible] = useState(false)
  const [editingNota, setEditingNota] = useState(null);
  const [idNota, setIdNota] = useState('')
  const [formNota] = Form.useForm();
  const userId = useSelector((store) => store.userInfo.user.user_id)

  useEffect(() => {
    if (notasActual) {
      fetchNotasActive();
      fetchCars();
    } else {
      fetchNotas();
    }
  }, [notasActual]);
  
  const openEditModal = (nota) => {
    setEditingNota(nota);
    setNotaModalVisible(true)
    formNota.setFieldValue("vehiculo", nota.vehiculo)
    formNota.setFieldValue("nota", nota.nota)
  };

  const fetchNotasActive = async () => {
    try {
      const data = await notaActiveListService();
      setNotasActive(data);
    } catch (error) {
      console.error('Error fetching componentes', error);
    }
  };

  const fetchNotas = async () => {
    try {
      const data = await notaListService();
      setNotas(data);
    } catch (error) {
      console.error('Error fetching componentes', error);
    }
  };


  const columns = [
    {
      title: 'Placa',
      dataIndex: 'vehiculo_placa',
      key: 'placa',
      width: '10%',
    },
    {
      title: 'Movil',
      dataIndex: 'vehiculo_movil',
      key: 'movil',
      width: '10%',
    },
    {
      title: 'Nota',
      dataIndex: 'nota',
      key: 'nota',
      width: '80%',
      style: { textWrap: 'word-break' },
    },
    {
      title: 'Autor',
      dataIndex: 'autor_nombre',
      key: 'autor',
      width: '10%',
    },
    {
      title: 'Acciones',
      key: 'acciones',
      render: (text, record) => {
        // Verifica si la nota fue registrada por el usuario actual
        const esRegistradoPorUsuarioActual = record.registrado_por === userId;

        // Si es registrado por el usuario actual, muestra los botones de editar y eliminar
        if (esRegistradoPorUsuarioActual) {
          return (
            <>
              <span key="editar" className="text-[#000000] font-bold hover:bg-gray-100" onClick={() => openEditModal(record)}>
                <EditOutlined className="text-lg mr-4" />
              </span>
              <span key="eliminar" className="text-[#d44a80] font-bold hover:bg-gray-100" onClick={() => modalEliminar(record.id)}>
                <CloseCircleOutlined className="text-lg mr-1" />
              </span>
            </>
          );
        }

        // Si no es registrado por el usuario actual, no muestra ningún botón
        return null;
      },
    },
  ]

  const columnsAll = [
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
      title: 'Nota',
      dataIndex: 'nota',
      key: 'nota',
      width: '60%',
      style: { textWrap: 'word-break' },
    },
    {
      title: 'Autor',
      dataIndex: 'autor_nombre',
      key: 'autor',
      width: '10%',
    },
    {
      title: 'Fecha de registro',
      dataIndex: 'hora_registro',
      key: 'hora',
      width: '10%',
      render: hora_registro => moment(hora_registro).format('YYYY-MM-DD h:mm A')
    },
    {
      title: 'Estado',
      dataIndex: 'is_active',
      key: 'active',
      width: '10%',
      render: is_active => (
        <Tag color={is_active ? 'green' : 'red'}>
          {is_active ? 'Registrado' : 'Cancelado'}
        </Tag>
      )
    },
  ]

  const fetchCars = async () => {
    try {
      const data = await carListService();
      setCars(data);
    } catch (error) {
      console.error('Error fetching componentes', error);
    }
  };

  const handleOkNota = async () => {
    try {
      const values = formNota.getFieldsValue();
      const payload = {
        ...values,
        registrado_por: userId
      };

      if (editingNota) {
        await editNotaService(editingNota.id, payload);
        openNotificationWithIcon(notification, 'success', 'Nota actualizada exitosamente', '', 4);
        setNotaModalVisible(false);
        fetchNotasActive();
        formNota.resetFields()
      } else {
        await createNotaService(payload);
        openNotificationWithIcon(notification, 'success', 'Nota agregada correctamente', '', 4)
        setNotaModalVisible(false);
        fetchNotasActive();
        formNota.resetFields()
      }

      setEditingNota(null); // Limpiar el mantenimiento en edición
    } catch (error) {
      console.log(error);
      openNotificationWithIcon(notification, 'error', 'Error al registrar nota', '', 4);
    }
  };

  const handleCancelNota = () => {
    setNotaModalVisible(false)
    formNota.resetFields()
  }

  const modalEliminar = (record) => {
    setConfirmDeleteModalVisible(true)
    setIdNota(record)
  }

  const handleDeleteConfirm = async () => {
    try {
      await editNotaService(idNota, { is_active: false });
      openNotificationWithIcon(notification, 'success', 'Nota cancelada exitosamente', '', 4);
      setConfirmDeleteModalVisible(false);
      fetchNotasActive();
      setIdNota('')
    } catch (error) {
      console.error('Error al cancelar la entrada al taller', error);
      openNotificationWithIcon(notification, 'error', 'Error al cancelar la nota', '', 4);
    }
  };

  return (
    <div className="container">
      <div className="flex justify-around">
        <Button
          size="large"
          shape="round"
          className={`w-full btn ${notasActual ? 'text-white' : 'text-[#42BFF2]'} px-4 py-2 items-center ${notasActual ? 'bg-[#d44a80]' : 'bg-white'}`}
          onClick={() => setNotasActual(true)}
        >
          NOTAS DE HOY
        </Button>
        <Button
          size="large"
          shape="round"
          className={`w-full btn ${notasActual ? 'text-[#42BFF2]' : 'text-white'} px-4 py-2 items-center ml-4 ${!notasActual ? 'bg-[#d44a80]' : 'bg-white'}`}
          onClick={() => setNotasActual(false)}
        >
          NOTAS HISTORICO
        </Button>
      </div>
      <div className="content-container mt-4 p-6">
        {
          notasActual ?
            <>
              <div className="title flex justify-center py-4">
                <Button
                  size="large"
                  shape="round"
                  className="btn bg-[#42BFF2] text-white hover:bg-pink-500 px-4 py-2 flex items-center ml-4"
                  onClick={() => setNotaModalVisible(true)}>
                  <PlusCircleOutlined className="mr-2" />
                  Agregar Nota
                </Button>
              </div>

              <Table columns={columns} dataSource={notasActive} size='small' />
            </>
            :
            <Table columns={columnsAll} dataSource={notas} size='small' className="mt-4" />
        }
      </div>

      <Modal
        title={(<div className="text-2xl">{editingNota ? 'Editar nota' : 'Agregar nota'}</div>)}
        open={notaModalVisible}
        onOk={handleOkNota}
        onCancel={handleCancelNota}
        width={600}
      >
        <Form
          form={formNota}
          layout="vertical"
          className="mt-6"
        >
          <Row gutter={16} >
            <Col span={12}>
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
            </Col>
            <Col span={12}>
              <Form.Item name="nota" label="Nota">
                <Input.TextArea rows={8} />
              </Form.Item>
            </Col>
          </Row>
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

export default NotasPage