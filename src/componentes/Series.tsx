import React, { useState } from 'react';

interface Serie {
    id: number;
    titulo: string;
    añoPublicacion: number;
    temporadas: number;
}

interface PropsSerie {
    series: Serie[];
    setSeries: React.Dispatch<React.SetStateAction<Serie[]>>;
}

const Series: React.FC<PropsSerie> = ({ series, setSeries }) => {
    const [titulo, setTitulo] = useState<string>('');
    const [añoPublicacion, setAñoPublicacion] = useState<number | ''>('');
    const [temporadas, setTemporadas] = useState<number | ''>('');
    const [serieId, setSerieId] = useState<number | null>(null);

    const agregarSerie = () => {
        if (titulo.trim() && añoPublicacion && temporadas) {
            if (serieId !== null) {
                // Actualizar serie existente
                const seriesActualizadas = series.map((serie) =>
                    serie.id === serieId ? { ...serie, titulo, añoPublicacion, temporadas } : serie
                );
                setSeries(seriesActualizadas);
            } else {
                // Agregar nueva serie
                const nuevoId = series.length > 0 ? Math.max(...series.map(s => s.id)) + 1 : 1;
                const nuevaSerie: Serie = {
                    id: nuevoId,
                    titulo,
                    añoPublicacion: Number(añoPublicacion),
                    temporadas: Number(temporadas),
                };
                setSeries([...series, nuevaSerie]);
            }
            setTitulo('');
            setAñoPublicacion('');
            setTemporadas('');
            setSerieId(null);
        } else {
            alert('Todos los campos son requeridos');
        }
    };

    const eliminarSerie = (id: number) => {
        // Confirmar eliminación
        const confirmar = window.confirm('¿Estás seguro de que deseas eliminar esta serie?');
        if (confirmar) {
            const seriesFiltradas = series.filter((serie) => serie.id !== id);
            setSeries(seriesFiltradas);
        }
    };

    const actualizarSerie = (id: number) => {
        const serieActualizada = series.find((serie) => serie.id === id);
        if (serieActualizada) {
            setTitulo(serieActualizada.titulo);
            setAñoPublicacion(serieActualizada.añoPublicacion);
            setTemporadas(serieActualizada.temporadas);
            setSerieId(id);
        }
    };

    return (
        <div>
            <h1>Gestión de Series</h1>
            <div className="formulario">
                <input
                    type="text"
                    placeholder="Título"
                    value={titulo}
                    onChange={(e) => setTitulo(e.target.value)}
                />
                <input
                    type="number"
                    placeholder="Año de Publicación"
                    value={añoPublicacion}
                    onChange={(e) => setAñoPublicacion(Number(e.target.value))}
                />
                <input
                    type="number"
                    placeholder="Temporadas"
                    value={temporadas}
                    onChange={(e) => setTemporadas(Number(e.target.value))}
                />
                <button onClick={agregarSerie}>
                    {serieId !== null ? 'Actualizar' : 'Guardar'}
                </button>
            </div>

            <h2>Lista de Series</h2>
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Título</th>
                        <th>Año de Publicación</th>
                        <th>Temporadas</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {series.map((serie) => (
                        <tr key={serie.id}>
                            <td>{serie.id}</td>
                            <td>{serie.titulo}</td>
                            <td>{serie.añoPublicacion}</td>
                            <td>{serie.temporadas}</td>
                            <td>
                                <button onClick={() => actualizarSerie(serie.id)}>Actualizar</button>
                                <button onClick={() => eliminarSerie(serie.id)}>Eliminar</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Series;