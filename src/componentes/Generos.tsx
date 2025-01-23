import React, { useState } from 'react';

interface Genero {
    id: number;
    nombre: string;
    descripcion: string;
}

interface GenerosProps {
    generos: Genero[];
    setGeneros: React.Dispatch<React.SetStateAction<Genero[]>>;
}

const Generos: React.FC<GenerosProps> = ({ generos, setGeneros }) => {
    const [nombre, setNombre] = useState<string>('');
    const [descripcion, setDescripcion] = useState<string>('');
    const [generoId, setGeneroId] = useState<number | null>(null);

    const agregarGenero = () => {
        if (nombre.trim() && descripcion.trim()) {
            if (generoId !== null) {
                // Actualizar género existente
                const generosActualizados = generos.map((genero) =>
                    genero.id === generoId ? { ...genero, nombre, descripcion } : genero
                );
                setGeneros(generosActualizados);
            } else {
                // Agregar nuevo género
                const nuevoId = generos.length > 0 ? Math.max(...generos.map(g => g.id)) + 1 : 1;
                const nuevoGenero: Genero = {
                    id: nuevoId,
                    nombre,
                    descripcion,
                };
                setGeneros([...generos, nuevoGenero]);
            }
            setNombre('');
            setDescripcion('');
            setGeneroId(null);
        } else {
            alert('Todos los campos son requeridos');
        }
    };

    const eliminarGenero = (id: number) => {
        // Confirmar eliminación
        const confirmar = window.confirm('¿Estás seguro de que deseas eliminar este género?');
        if (confirmar) {
            const generosFiltrados = generos.filter((genero) => genero.id !== id);
            setGeneros(generosFiltrados);
        }
    };

    const actualizarGenero = (id: number) => {
        const generoActualizado = generos.find((genero) => genero.id === id);
        if (generoActualizado) {
            setNombre(generoActualizado.nombre);
            setDescripcion(generoActualizado.descripcion);
            setGeneroId(id);
        }
    };

    return (
        <div>
            <h1>Gestión de Géneros</h1>
            <div className="formulario">
                <input
                    type="text"
                    placeholder="Nombre"
                    value={nombre}
                    onChange={(e) => setNombre(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="Descripción"
                    value={descripcion}
                    onChange={(e) => setDescripcion(e.target.value)}
                />
                <button onClick={agregarGenero}>
                    {generoId !== null ? 'Actualizar' : 'Guardar'}
                </button>
            </div>

            <h2>Lista de Géneros</h2>
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nombre</th>
                        <th>Descripción</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {generos.map((genero) => (
                        <tr key={genero.id}>
                            <td>{genero.id}</td>
                            <td>{genero.nombre}</td>
                            <td>{genero.descripcion}</td>
                            <td>
                                <button onClick={() => actualizarGenero(genero.id)}>Actualizar</button>
                                <button onClick={() => eliminarGenero(genero.id)}>Eliminar</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Generos;