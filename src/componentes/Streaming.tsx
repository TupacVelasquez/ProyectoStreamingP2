import React, { useState } from 'react';

interface Streaming {
    id: number;
    opinion: string;
    idSerie: number;
    idGenero: number;
}

interface Serie {
    id: number;
    titulo: string;
    añoPublicacion: number;
    temporadas: number;
}

interface Genero {
    id: number;
    nombre: string;
    descripcion: string;
}

interface StreamingProps {
    series: Serie[];
    generos: Genero[];
    streamings: Streaming[];
    setStreamings: React.Dispatch<React.SetStateAction<Streaming[]>>;
}

const Streaming: React.FC<StreamingProps> = ({ series, generos, streamings, setStreamings }) => {
    const [idGenero, setIdGenero] = useState<number>(0);
    const [idSerie, setSerieId] = useState<number | null>(null);
    const [opinion, setOpinion] = useState<string>('');

    const opcionesOpinion = ['Malo', 'Regular', 'Bueno', 'Excelente'];

    const agregarOActualizarSerie = () => {
        if (idSerie === null || idGenero === 0 || !opinion.trim()) {
            alert('Por favor complete todos los campos.');
            return;
        }

        if (streamings.some(s => s.idSerie === idSerie)) {
            const streamingsActualizadas = streamings.map((streaming) =>
                streaming.idSerie === idSerie
                    ? { ...streaming, idGenero, opinion }
                    : streaming
            );
            setStreamings(streamingsActualizadas);
        } else {
            const nuevoId = streamings.length > 0 ? Math.max(...streamings.map((s) => s.id)) + 1 : 1;
            const nuevoStreaming: Streaming = {
                id: nuevoId,
                idSerie,
                idGenero,
                opinion
            };
            setStreamings([...streamings, nuevoStreaming]);
        }

        setOpinion('');
        setIdGenero(0);
        setSerieId(null);
    };

    const eliminarSerie = (id: number) => {
        const confirmar = window.confirm('¿Está seguro que quiere eliminar la serie?');
        if (confirmar) {
            const seriesFiltradas = streamings.filter((streaming) => streaming.id !== id);
            setStreamings(seriesFiltradas);
        }
    };

    const actualizarSerie = (id: number) => {
        const streaming = streamings.find((s) => s.idSerie === id);
        if (streaming) {
            setOpinion(streaming.opinion);
            setIdGenero(streaming.idGenero);
            setSerieId(streaming.idSerie);
        }
    };

    const obtenerNombreGenero = (id: number) => {
        const genero = generos.find((gen) => gen.id === id);
        return genero ? genero.nombre : 'Desconocido';
    };

    return (
        <div>
            <h1>Streamings</h1>
            <select value={idSerie ?? ''} onChange={(e) => setSerieId(parseInt(e.target.value))}>
                <option value="">Seleccione una serie</option>
                {series.map((serie) => (
                    <option key={serie.id} value={serie.id}>
                        {serie.titulo}
                    </option>
                ))}
            </select>
            <select value={idGenero} onChange={(e) => setIdGenero(parseInt(e.target.value))}>
                <option value={0}>Seleccione un género</option>
                {generos.map((genero) => (
                    <option key={genero.id} value={genero.id}>
                        {genero.nombre}
                    </option>
                ))}
            </select>
            <div>
                <h3>Opinión:</h3>
                {opcionesOpinion.map((op, index) => (
                    <label key={index}>
                        <input
                            type="radio"
                            name="opinion"
                            value={op}
                            checked={opinion === op}
                            onChange={(e) => setOpinion(e.target.value)}
                        />
                        {op}
                    </label>
                ))}
            </div>
            <button onClick={agregarOActualizarSerie}>
                {idSerie !== null ? 'Guardar' : 'Guardar'}
            </button>

            <h2>Lista de Streamings</h2>
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Serie</th>
                        <th>Género</th>
                        <th>Opinión</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {streamings.map((streaming) => (
                        <tr key={streaming.id}>
                            <td>{streaming.id}</td>
                            <td>{series.find((s) => s.id === streaming.idSerie)?.titulo || 'Desconocido'}</td>
                            <td>{obtenerNombreGenero(streaming.idGenero)}</td>
                            <td>{streaming.opinion}</td>
                            <td>
                                <button onClick={() => actualizarSerie(streaming.idSerie)}>Actualizar</button>
                                <button onClick={() => eliminarSerie(streaming.id)}>Eliminar</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Streaming;
