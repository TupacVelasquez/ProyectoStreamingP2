import React from 'react';
import { Link } from 'react-router-dom';

interface Props {
    isAuthenticated: boolean;
    onLogout: () => void;
}

const Navbar: React.FC<Props> = ({ isAuthenticated, onLogout }) => {
    return (
        <nav>
            <Link to="/">Inicio</Link>

            <Link to="/series">Series</Link>

            <Link to="/generos">Géneros</Link>

            <Link to="/streaming">Listado Streaming</Link>

            <Link to="/acercade">Acerca de</Link>

            {!isAuthenticated && <Link to="/login">Iniciar Sesión</Link>}
            {!isAuthenticated && <Link to="/register">Registro</Link>}

            {isAuthenticated && (
                <button onClick={onLogout}>
                    Logout
                </button>
            )}
        </nav>
    );
};

export default Navbar;
