import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Button, notification } from "antd";
import { logout } from "../services/authServices";
import { resetUser } from "../redux/states/user";
import { openNotificationWithIcon } from "../utils/notification";

const Logout = () => {

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const exit = async () => {
    try {
      dispatch(resetUser())
      openNotificationWithIcon(notification, 'success', 'Cerro sesión con exito', '', 4)
      navigate('/')
    } catch (error) {
      dispatch(resetUser())
      console.error(error)
      navigate('/')
    }
  }
  return (
    <>
      <Button onClick={exit} style={{ color: '' }}>Cerrar Sesion</Button>
    </>
  )
}
export default Logout