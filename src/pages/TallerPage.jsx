import { Button, Card, Col, Row } from "antd"
import { PlusCircleOutlined } from '@ant-design/icons';
import { mantenimientoListService } from '../services/carService';
import { useEffect, useState } from 'react';

const TallerPage = () => {
  const [mantenimientos, setMantenimientos] = useState([])

  useEffect(() => {
    fetchMantenimientos();
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

  const dividirEnGruposDeTres = (mantenimientos) => {
    const grupos = [];
    for (let i = 0; i < mantenimientos.length; i += 3) {
      grupos.push(mantenimientos.slice(i, i + 3));
    }
    return grupos;
  };

  return (
    <div>
      <div className="title flex items-center py-4">
        <Button size="large" shape="round" className="btn bg-pink-600 text-white hover:bg-pink-500 px-4 py-2 flex items-center ml-4">
          <PlusCircleOutlined className="mr-2" />
          Agregar entrada
        </Button>
      </div>

      {dividirEnGruposDeTres(mantenimientos).map((grupo, index) => (
        <Row gutter={16} key={index}>
          {grupo.map((mantenimiento) => (
            <Col span={8} key={mantenimiento.id}>
              <Card className="mt-6 hover:border-l-{fuchsia-700}"
                    style={{ backgroundColor: mantenimiento.motivo === 1 ? '#FFF7E6' : mantenimiento.motivo === 2 ? '#FFE6E6' : '' }}>
                <div className="font-semibold">Placa: {mantenimiento.vehiculo_placa}</div>
                {mantenimiento.motivo && <div>Motivo: {mantenimiento.motivo}</div>}
                {mantenimiento.observacion && <div>Observación: {mantenimiento.observacion}</div>}
                {mantenimiento.hora_ingreso && <div>Hora de ingreso: {mantenimiento.hora_ingreso}</div>}
                <Button className="absolute top-0 right-0 bg-[#d44a80] text-white py-1 px-3 rounded-tr" onClick={((e) => console.log(e))}>Dar salida</Button>
              </Card>
            </Col>
          ))}
        </Row>
      ))}
    </div>
  )
}

export default TallerPage