import { useContext } from 'react'
import { AdminContext } from './AdminContext';
import { Navigate } from 'react-router-dom';

const AdminProtected = ({children}) => {
    const { adminToken } = useContext(AdminContext);
    
    if (!adminToken) {
        return <Navigate to="/admin-login" replace />;
    }

    return children;
}

export default AdminProtected