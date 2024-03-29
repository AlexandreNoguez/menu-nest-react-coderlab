import { Navigate, Route, Routes } from 'react-router-dom'
import { Login } from '../pages/Login'
import { Home } from '../pages/Home'
import { useAuth } from '../shared/contexts/AuthContext';
import { RegisterProcucts } from '../pages/admin/RegisterProducts';
import { ReactNode } from 'react';
import { SignUp } from '../pages/SignUp';
import { ProductDetails } from '../pages/product/ProductDetails';

interface IChildren {
    children: ReactNode
}

export const AppRoutes = () => {
    function Private({ children }: IChildren) {
        const { authenticated, loading } = useAuth();

        if (loading) {
            return <div className="isLoadingTrue">Carregando...</div>;
        }

        if (!authenticated) {
            return <Navigate to="/" />;
        }
        return children;
    }
    return (
        <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/product/:id' element={<ProductDetails />} />
            <Route path='/auth/login' element={<Login />} />
            <Route path='/auth/sign-up' element={<SignUp />} />
            <Route path='*' element={<Home />} />
            <Route
                path="/admin"
                element={
                    <Private>
                        <RegisterProcucts />
                    </Private>
                }
            />
        </Routes>
    )
}