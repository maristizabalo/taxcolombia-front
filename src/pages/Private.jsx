import { useEffect, useState } from 'react';
import AppLayout from '../components/AppLayout';
import { useSelector } from 'react-redux';
import { Loading } from '../components/Loading';
import HomePage from './HomePage';
import { Route, Routes } from 'react-router-dom';
import TallerPage from './TallerPage';
import InformePage from './InformePage';
import AdministradorPage from './AdministradorPage';
import NotasPage from './NotasPage';
import PerfilPage from './PerfilPage';

const Private = () => {

    const userRole = useSelector((store) => store.userInfo.user.rol)

    // Define un nuevo estado para manejar la carga de la autenticación
    const [isAuthLoaded, setIsAuthLoaded] = useState(false);

    useEffect(() => {
        if (userRole !== undefined) {
            // Cuando el rol del usuario ya está disponible, actualiza el estado
            setIsAuthLoaded(true);
        }
    }, [userRole]);

    // Si la autenticación aún no se ha cargado, renderiza un componente de carga
    if (!isAuthLoaded) {
        return <Loading />;
    }

    console.log(userRole)
    // Si la autenticación ya se ha cargado, renderiza las rutas como antes

    return (
        <AppLayout>
            <Routes>
                <Route path="/taller" element={<TallerPage />} />
                <Route path="/notas" element={<NotasPage />} />
                <Route path="/informe" element={<InformePage />} />
                <Route path="/administrador" element={<AdministradorPage />} />
                <Route path="/perfil" element={<PerfilPage />} />
            </Routes>
        </AppLayout>
    )
}

export default Private
