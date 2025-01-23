import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface LoginProps {
    onLogin: (login: boolean) => void;
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {
    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [error, setError] = useState<string>('');

    const navigate = useNavigate();

    const handleLogin = () => {
        // Recuperar los usuarios del localStorage
        const usuariosGuardados = localStorage.getItem('usuarios');
        if (usuariosGuardados) {
            const usuarios = JSON.parse(usuariosGuardados) as { username: string; password: string; role: string }[];
            // Buscar el usuario que coincide con el nombre de usuario y la contraseña
            const user = usuarios.find((usuario) => usuario.username === username && usuario.password === password);
            
            if (user) {
                // Guardar el estado de autenticación y el rol en localStorage
                localStorage.setItem('isAuthenticated', 'true');
                localStorage.setItem('userRole', user.role);

                onLogin(true); // Cambiar el estado de autenticación en el componente principal
                navigate('/'); // Redirigir al inicio o página deseada
            } else {
                setError('Usuario o contraseña incorrecta');
            }
        } else {
            setError('No hay usuarios registrados');
        }
    };

    return (
        <div className="container">
            <h1>Login</h1>

            <input
                type="text"
                value={username}
                placeholder="Username"
                onChange={(e) => setUsername(e.target.value)}
            />
            <br /><br />
            <input
                type="password"
                value={password}
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
            />
            <br /><br />
            {error && <div style={{ color: 'red' }}>{error}</div>}
            <button onClick={handleLogin}>Iniciar Sesion</button>
        </div>
    );
};

export default Login;
