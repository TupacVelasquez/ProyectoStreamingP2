import React, { useEffect, useState } from 'react'
import {Navigate, Route, BrowserRouter as Router, Routes} from 'react-router-dom'
import Navbar from './componentes/Navbar'
import Inicio from './componentes/Inicio'
import Streamings from './componentes/Streaming'
import Series from './componentes/Series'
import Generos from './componentes/Generos'
import AcercaDe from './componentes/AcercaDe'
import Login from './componentes/Login'
import Register from './componentes/Register'
import './App.css'

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

const App: React.FC = () => {

  const [series, setSeries] = useState<Serie[]>([]);
  const [generos, setGeneros] = useState<Genero[]>([]);
  const [streamings, setStreamings] = useState<Streamings[]>([]);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  
  // Manejar login y actualizar estado de autenticación
  const handleLogin = (status: boolean) => {
    setIsAuthenticated(status);
    localStorage.setItem('isAuthenticated', JSON.stringify(status));
  };

  // Manejar logout y eliminar estado de autenticación de localStorage
  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('isAuthenticated');
  };

  //Leer los datos del Local Storage al cargar la aplicación
useEffect (()=>{
  const storedSeries = localStorage.getItem("series");
  const storedGeneros = localStorage.getItem("generos");
  const storedStreamings = localStorage.getItem("streamings")
  const loggedIn = localStorage.getItem("isAuthenticated");


    if(storedSeries){
      setSeries(JSON.parse(storedSeries));
    }

    if(storedGeneros){
      setGeneros(JSON.parse(storedGeneros));
    }

    if(storedStreamings){
      setStreamings(JSON.parse(storedStreamings));
    }
    if(loggedIn==="true"){
      setIsAuthenticated(true);
    }

},[])

useEffect (() => {
  localStorage.setItem("series", JSON.stringify(series))
},[series])

useEffect (() => {
  localStorage.setItem("generos", JSON.stringify(generos))
},[generos])

useEffect (() => {
  localStorage.setItem("streamings", JSON.stringify(streamings))
},[streamings])


  return (
    <Router>
      <Navbar isAuthenticated={isAuthenticated} onLogout={handleLogout} />
      <div style={{ padding: '20px' }}>
      <Routes>
        {/* Página de inicio accesible */}
        <Route 
        path="/" 
        element={<Inicio/>} 
        />
        
        {/* Página de registro solo accesible si NO está autenticado */}
        <Route 
        path="/register" 
        element={isAuthenticated ? <Navigate to="/" /> : <Register />} 
        />
        
        {/* Página de series solo accesible si está autenticado */}
        <Route 
        path="/series" 
        element={isAuthenticated ? (<Series streamings={streamings} series={series} setSeries={setSeries} />) : (<Navigate to="/login" />)} 
        />
        
        {/* Página de géneros solo accesible si está autenticado */}
        <Route 
        path="/generos" 
        element={isAuthenticated ? (
          <Generos streamings={streamings} generos={generos} setGeneros={setGeneros} />
        ) : (
          <Navigate to="/login" />
        )} 
        />
        
        {/* Página de streamings solo accesible si está autenticado */}
        <Route 
        path="/streaming" 
        element={isAuthenticated ? (
          <Streamings series={series} generos={generos} streamings={streamings} setStreamings={setStreamings} />
        ) : (
          <Navigate to="/login" />
        )} 
        />
        
        {/* Página de login accesible siempre */}
        <Route 
        path="/login" 
        element={<Login onLogin={handleLogin} />} 
        />

        {/* Página de acerca de accesible siempre */}
        <Route 
        path="/acercade" 
        element={<AcercaDe />} 
        />
      </Routes>
      </div>
    </Router>
  )
}

export default App
