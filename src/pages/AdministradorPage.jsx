import { Tabs } from "antd";
import Usuarios from "../components/Usuarios";
import Vehiculos from "../components/Vehiculos";
import Mecanicos from "../components/Mecanicos";
import Motivos from "../components/Motivos";
import { useSelector } from "react-redux";
import { ROLES } from "../utils/const";

const AdministradorPage = () => {
  const userRol = useSelector((store) => store.userInfo.user.rol)
  const isAdmin = ROLES.ADMIN === userRol;

  let tabsItems = [
    {
      label: "Vehiculos",
      key: 2,
      children: (<Vehiculos />)
    },
    {
      label: "Mecanicos",
      key: 3,
      children: (<Mecanicos />)
    },
    {
      label: "Motivos de entrada a taller",
      key: 4,
      children: (<Motivos />)
    }
  ];

  // Verificar si el usuario es administrador
  if (isAdmin) {
    // Si es administrador, agregar el elemento de Usuarios al principio de tabsItems
    tabsItems = [
      {
        label: "Usuarios",
        key: 1,
        children: (<Usuarios />)
      },
      ...tabsItems
    ];
  }

  return (
    <div>
      <Tabs
        defaultActiveKey="1"
        type="card"
        size="large"
        items={tabsItems}
      />
    </div>
  )
}

export default AdministradorPage;
