import { Link, useNavigate } from "react-router-dom";
import { BiGame, BiSearchAlt2 } from "react-icons/bi";
import { useState } from "react";
import './Navbar.css'; 

const Navbar = () => {
    const [search, setsearch] = useState("")
    const navigate = useNavigate();
    const handleSubmit = (e) => {
        e.preventDefault();
        
        if(!search) return 
        navigate(`/Search?q=${search}`),
        setsearch("")
    }

    return (
        <nav id="navbar">
            <h2>
                <Link to='/'><BiGame />Gameslib</Link>
            </h2>
            <form onSubmit={handleSubmit}>
                <input type="text" placeholder="Busque um game" onChange={(e) => setsearch(e.target.value)} value={search}/>
                <button type="submit"><BiSearchAlt2 /></button>
            </form>
      </nav>
    );
};

export default Navbar;