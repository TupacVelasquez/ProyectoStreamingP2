import React from "react";
import { Link} from "react-router-dom";

const Navbar: React.FC = () => {
    return (
        <nav>
            <Link to="/">Inicio</Link>
            <Link to="/series">Series</Link>
            <Link to="/generos">Géneros</Link>
            <Link to="/streaming">Listado Streaming</Link>
        </nav>
    )
}

export default Navbar;
