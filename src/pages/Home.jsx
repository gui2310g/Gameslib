import { useState, useEffect } from "react";
import Gamecard from "../components/Gamecard";
import './GameGrid.css';

const GamesUrl = import.meta.env.VITE_API;
const apikey = import.meta.env.VITE_API_KEY;

const Home = () => {
    const [topGames, setTopGames] = useState([]);
  
    
    useEffect(() => {
    const topRatedUrl = `${GamesUrl}?key=${apikey}`;
   

    const getTopGames = async (url) => {
        const res = await fetch(url);
        const data = await res.json();

        setTopGames(data.results);
        
    };

        getTopGames(topRatedUrl);
    }, []);

    return (
        <div>
            <h1 className="title">Melhores Jogos:</h1>
            <div className="games-container">
                {topGames.length === 0 && <p className="animation">Carregando...</p>} 
                {topGames.length > 0 && topGames.map((game) => <Gamecard key={game.id} game={game}/>)}
            </div>     
        </div>
    )
}


export default Home;