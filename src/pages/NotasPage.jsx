import { Button, Card, Col, Form, Input, Modal, Row, Select, TimePicker, Typography, notification } from "antd"
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


      <div className="flex flex-wrap">
        {filteredNotas
          .sort((a, b) => b.id - a.id) // Ordenar los elementos de manera descendente por el ID
          .map((nota, innerIndex) => (
            <div key={nota.id} className="w-1/3 px-4 mb-4">
              <Card
                className="hover:border-l-{fuchsia-700} overflow-hidden" // Cambia overflow-auto a overflow-hidden para evitar el desplazamiento horizontal
                style={{ maxHeight: "300px" }}
                title={(<div>{nota.vehiculo_placa}</div>)}
              >
                {nota.nota &&
                  <div style={{ fontSize: "14px", lineHeight: "1.5", width: "100%" }}> {/* Establece el ancho del texto al 100% para evitar el desplazamiento horizontal */}
                    <p className="font-bold">Nota:</p> {nota.nota}
                  </div>
                }
                {nota.registrado_por && <div><p className="font-bold">Autor:</p> {nota.registrado_por}</div>}
                {nota.hora_registro && <div><p className="font-bold">Fecha:</p>
                  {
                    new Date(nota.hora_registro).toLocaleString('es-es', {
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



      <Modal
        title={(<div className="text-2xl">Agregar entrada a taller</div>)}
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