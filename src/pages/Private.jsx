import { useEffect, useState } from 'react';
import AppLayout from '../components/AppLayout';
import { useSelector } from 'react-redux';
import { Loading } from '../components/Loading';
import { Route, Routes } from 'react-router-dom';
import TallerPage from './TallerPage';
import InformePage from './InformePage';
import AdministradorPage from './AdministradorPage';
import NotasPage from './NotasPage';
import PerfilPage from './PerfilPage';
import EstadisticasPage from './EstadisticasPage';
import LockPage from './LockPage';
import { ROLES } from '../utils/const';
import BarridoPage from './BarridoPage';

const Private = () => {
    const userRole = useSelector((store) => store.userInfo.user.rol);
    const [isAuthLoaded, setIsAuthLoaded] = useState(false);

    useEffect(() => {
        if (userRole !== undefined) {
            setIsAuthLoaded(true);
        }
    }, [userRole]);

    if (!isAuthLoaded) {
        return <Loading />;
    }

    // Definir las rutas disponibles según el rol del usuario
    let routes;
    if (userRole === ROLES.GERENCIA) {
        routes = (
            <Route path="/estadisticas" element={<EstadisticasPage />} />
        );
    } else if (userRole === ROLES.VISITANTE) {
        routes = (
            <Route path="/lock" element={<LockPage />} />
        );
    } else if (userRole === ROLES.BARRIDO) {
        routes = (
            <Route path="/barrido" element={<BarridoPage />} />
        );
    } else {
        routes = (
            <>
                <Route path="/taller" element={<TallerPage />} />
                <Route path="/informe" element={<InformePage />} />
                <Route path="/administrador" element={<AdministradorPage />} />
                <Route path="/perfil" element={<PerfilPage />} />
                <Route path="/notas" element={<NotasPage />} />
            </>
        );
    }

    // Mostrar el AppLayout solo si el rol es 2 o 3
    const showAppLayout = userRole === ROLES.ADMIN || userRole === ROLES.SUPERVISOR;

    return (
        <>
            {showAppLayout ?
                <AppLayout>
                    <Routes>
                        {routes}
                    </Routes>
                </AppLayout>
                :
                <Routes>
                    {routes}
                </Routes>
            }
        </>
    );
}

export default Private;