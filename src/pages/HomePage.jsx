import { Card, Col, Row, } from 'antd';
import { carListService } from '../services/carService';
import { useEffect, useState } from 'react';

const HomePage = () => {

  const [car, setCar] = useState([])

  useEffect(() => {
    fetchCar();
  }, []);
  const fetchCar = async () => {
    try {
      const data = await carListService();
      setCar(data);
    } catch (error) {
      console.error('Error fetching componentes', error);
    }
  };
  return (
    <div>
      {car.map(c => (
        <Card key={c.id} title={c.placa}>

        </Card>
      ))}
      <Row gutter={16}>
        <Col span={8}>
          <Card title="Card title" bordered={false}>
            Card content
          </Card>
        </Col>
        <Col span={8}>
          <Card title="Card title" bordered={false}>
            Card content
          </Card>
        </Col>
        <Col span={8}>
          <Card title="Card title" bordered={false}>
            Card content
          </Card>
        </Col>
      </Row>
    </div>
  );
};
export default HomePage;