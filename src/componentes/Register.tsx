import React, { useState, useEffect } from 'react';

interface Usuario {
    id: number;
    username: string;
    password: string;
}

const Register: React.FC = () => {
    const [usuarios, setUsuarios] = useState<Usuario[]>([]);
    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [usuarioId, setUsuarioId] = useState<number | null>(null);
    const [mensaje, setMensaje] = useState<string>('');

    useEffect(() => {
        const usuariosGuardados = localStorage.getItem('usuarios');
        if (usuariosGuardados) {
            setUsuarios(JSON.parse(usuariosGuardados));
        }
    }, []);

    const agregarUsuario = () => {
        if (username.trim() && password.trim()) {
            let usuariosActualizados = [...usuarios];

            if (usuarioId !== null) {
                usuariosActualizados = usuariosActualizados.map((usuario) =>
                    usuario.id === usuarioId ? { ...usuario, username, password } : usuario
                );
            } else {
                const nuevoUsuario: Usuario = {
                    id: Date.now(),
                    username,
                    password
                };
                usuariosActualizados.push(nuevoUsuario);
            }

            setUsuarios(usuariosActualizados);
            localStorage.setItem('usuarios', JSON.stringify(usuariosActualizados));
            setUsername('');
            setPassword('');
            setUsuarioId(null);
            setMensaje('Usuario registrado exitosamente');
            setTimeout(() => setMensaje(''), 3000);
        } else {
            alert('Nombre de usuario y contraseña son requeridos');
        }
    };

    const eliminarUsuario = (id: number) => {
        const usuariosFiltrados = usuarios.filter((usuario) => usuario.id !== id);
        setUsuarios(usuariosFiltrados);
        localStorage.setItem('usuarios', JSON.stringify(usuariosFiltrados));
    };

    const actualizarUsuario = (id: number) => {
        const usuarioActualizado = usuarios.find((usuario) => usuario.id === id);
        if (usuarioActualizado) {
            setUsername(usuarioActualizado.username);
            setPassword(usuarioActualizado.password);
            setUsuarioId(id);
        }
    };

    return (
        <div>
            <h1>Registro de Usuarios</h1>
            <div className="formulario">
                <input
                    type="text"
                    placeholder="Nombre de usuario"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="Contraseña"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button onClick={agregarUsuario}>Guardar</button>
            </div>

            {mensaje && <p>{mensaje}</p>}

            <h2>Lista de Usuarios</h2>
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nombre de usuario</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {usuarios.map((usuario) => (
                        <tr key={usuario.id}>
                            <td>{usuario.id}</td>
                            <td>{usuario.username}</td>
                            <td>
                                <button onClick={() => actualizarUsuario(usuario.id)}>Actualizar</button>
                                <button onClick={() => eliminarUsuario(usuario.id)}>Eliminar</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Register;
