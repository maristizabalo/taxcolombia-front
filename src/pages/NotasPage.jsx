import { Button, Card, Col, Form, Input, Modal, Row, Select, Table, TimePicker, Typography, notification } from "antd"
import { PlusCircleOutlined } from '@ant-design/icons';
import { carListService, } from '../services/carService';
import { useEffect, useState } from 'react';
import { openNotificationWithIcon } from "../utils/notification";
import { useSelector } from "react-redux";
import { createNotaService, notaListService } from "../services/notaService";

const NotasPage = () => {
  const [notas, setNotas] = useState([])
  const [cars, setCars] = useState([])
  const [notaModalVisible, setNotaModalVisible] = useState(false)
  const [filteredNotas, setFilteredNotas] = useState([]);
  const [idNota, setIdNota] = useState('')
  const [formNota] = Form.useForm();
  const userId = useSelector((store) => store.userInfo.user.user_id)

  useEffect(() => {
    fetchNotas();
    fetchCars();
  }, []);

  const fetchNotas = async () => {
    try {
      const data = await notaListService();
      setNotas(data);
      setFilteredNotas(data);
    } catch (error) {
      console.error('Error fetching componentes', error);
    }
  };

  const columns = [
    {
      title: 'Vehiculo',
      dataIndex: 'vehiculo_placa',
      key: 'placa',
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
    }
  ]



  // Filtra los notas según la placa seleccionada
  const handlePlacaChange = (value) => {
    if (value === "") {
      // Si el valor está vacío, muestra todos los notas
      setFilteredNotas(notas);
    } else {
      // Si hay un valor de placa, filtra los notas por esa placa
      const filtered = notas.filter(nota => nota.vehiculo_placa.toLowerCase().includes(value.toLowerCase()));
      setFilteredNotas(filtered);
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

  const handleOkNota = async () => {
    try {
      const values = formNota.getFieldsValue();
      const payload = {
        ...values,
        registrado_por: userId
      };
      await createNotaService(payload);
      openNotificationWithIcon(notification, 'success', 'Nota agregada correctamente', '', 4)
      setNotaModalVisible(false);
      fetchNotas();
      formNota.resetFields()
    } catch (error) {
      openNotificationWithIcon(notification, 'error', 'Error al agregar nota', '', 4)
    }
  };

  const handleCancelNota = () => {
    setNotaModalVisible(false)
    formNota.resetFields()
  }

  return (
    <div>
      <div className="title flex items-center py-4">
        <Input
          placeholder="Buscar placa en notas..."
          allowClear
          width={200}
          onChange={(e) => handlePlacaChange(e.target.value)}
          size="large"
        />
        <Button
          size="large"
          shape="round"
          className="btn bg-[#42BFF2] text-white hover:bg-pink-500 px-4 py-2 flex items-center ml-4"
          onClick={() => setNotaModalVisible(true)}>
          <PlusCircleOutlined className="mr-2" />
          Agregar Nota
        </Button>
      </div>

      <Table id="miInventarioTable" columns={columns} dataSource={notas} size='small' />


      <Modal
        title={(<div className="text-2xl">Agregar Nota</div>)}
        open={notaModalVisible}
        onOk={handleOkNota}
        onCancel={handleCancelNota}
        width={600}
      >
        <Form
          form={formNota}
          initialValues={{ motivo: '3' }}
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
    </div>
  )
}

export default NotasPage