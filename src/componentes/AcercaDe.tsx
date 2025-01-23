import React from 'react';

const AcercaDe: React.FC = () => {
    // Datos de los estudiantes
    const estudiantes = [
        {
            nombre: 'Tupac Velasquez',
            edad: 22,
            carrera: 'Ingeniería en Tecnologías de la Información',
            descripcion: 'Tupac es un apasionado por la tecnología y la programación. Le gusta aprender nuevos lenguajes de programación y desarrollar proyectos innovadores.',
            imagen: './src/img/tupac.png'
        }
    ];

    return (
        <div className="container">
            <h1>Acerca de los Estudiantes</h1>
            <div className="row">
                {estudiantes.map((estudiante, index) => (
                    <div className="col-md-6" key={index}>
                        <div className="card" style={{ marginBottom: '20px' }}>
                            <img src={estudiante.imagen} className="card-img-top" alt={estudiante.nombre} />
                            <div className="card-body">
                                <h5 className="card-title">{estudiante.nombre}</h5>
                                <p className="card-text">Edad: {estudiante.edad}</p>
                                <p className="card-text">Carrera: {estudiante.carrera}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AcercaDe;
