import { useEffect, useState } from "react"
import { useSearchParams } from "react-router-dom"
import Gamecard from "../components/Gamecard"

const GamesUrl = import.meta.env.VITE_API;
const apikey = import.meta.env.VITE_API_KEY;
import './GameGrid.css';

const Search = () => {

    const [searchParams] = useSearchParams();

    const [Games, setGames] = useState([]);
    const query = searchParams.get("q");

  

    const getSearchedGames = async (url) => {
        const res = await fetch(url);
        const data = await res.json();

    setGames(data.results);
    };

    useEffect(() => {

        const searchUrl = `${GamesUrl}?key=${apikey}&search=${query}`;

        getSearchedGames(searchUrl);
    }, [query]);

    return (
        <div className="container">
            <h1 className="title">Resultados para: <span className="query-text">{query}</span></h1>
            <div className="games-container"> 
                {Games.length === 0 && <p className="animation">Carregando...</p>}
                {Games.length > 0 && Games.map((game) => <Gamecard key={game.id} game={game}/>)}
            </div>            
        </div>
    )
}

export default Search
