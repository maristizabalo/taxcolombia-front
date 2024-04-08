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

const Private = () => {

    const userRole = useSelector((store) => store.userInfo.user.rol)

    const [isAuthLoaded, setIsAuthLoaded] = useState(false);

    useEffect(() => {
        if (userRole !== undefined) {
            setIsAuthLoaded(true);
        }
    }, [userRole]);

    if (!isAuthLoaded) {
        return <Loading />;
    }

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
