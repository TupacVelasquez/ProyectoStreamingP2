import React, { useEffect, useState } from 'react'
import {Route, BrowserRouter as Router, Routes} from 'react-router-dom'
import Navbar from './componentes/Navbar'
import Inicio from './componentes/Inicio'
import Streamings from './componentes/Streaming'
import Series from './componentes/Series'
import Generos from './componentes/Generos'
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


  //Leer los datos del Local Storage al cargar la aplicación
useEffect (()=>{
  const storedSeries = localStorage.getItem("series");
  const storedGeneros = localStorage.getItem("generos");
  const storedStreamings = localStorage.getItem("streamings")

    if(storedSeries){
      setSeries(JSON.parse(storedSeries));
    }

    if(storedGeneros){
      setGeneros(JSON.parse(storedGeneros));
    }

    if(storedStreamings){
      setStreamings(JSON.parse(storedStreamings));
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
      <Navbar />
      <div style={{padding: '20px'}}>
        <Routes>
          <Route path='/' element={<Inicio/>} />
          <Route path='/series' element={<Series series={series} setSeries={setSeries} />} />
          <Route path='/generos' element={<Generos generos={generos} setGeneros={setGeneros} />} />
          <Route path='/streaming' element={<Streamings series={series} generos={generos} streamings={streamings} setStreamings={setStreamings} />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
