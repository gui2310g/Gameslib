import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import parse from 'html-react-parser';
import './Game.css'; 

const GamesUrl = import.meta.env.VITE_API;
const apikey = import.meta.env.VITE_API_KEY;

const Games = () => {
    const {id} = useParams();
    const [game, setGame] = useState(null);
    const [Screenshot, setScreenshot] = useState("");

    useEffect(() => {
        const GameUrl = `${GamesUrl}/${id}?key=${apikey}`;
        const ScreenshotUrl = `${GamesUrl}/${id}/screenshots?key=${apikey}`;

        const getGame = async (url) => {
            const res = await fetch(url);
            const data = await res.json();
            setGame(data);
        };

        const GetScreenshot = async (url) => {
            const res = await fetch(url);
            const data = await res.json();
            setScreenshot(data.results);
        }

        getGame(GameUrl);
        GetScreenshot(ScreenshotUrl)
    }, [id]);

    return (
        <div id='game-fundo' style={{ backgroundImage: `url(${game && game.background_image_additional})`}}>
            <div className='game-page'>
                {game && (
                    <>
                        <div className='game-page-left'>
                            <img src={game.background_image} />
                            <h1>{game.name}</h1>

                            <div className='game-page-left-description'>
                                <p>Plataforma(s): {game.platforms.map((platform) => (platform.platform.name)).join(' | ')} </p>
                                <p>Desenvolvedor(s): {game.developers.map((developer)  => (developer.name)).join(' | ')}</p>
                                <p>Distribuidora(s): {game.publishers.map((publisher) => (publisher.name)).join(' | ')}</p>
                                <p>Genero(s): {game.genres.map((genre) => (genre.name)).join(' | ')}</p> 
                            </div> 
                        </div>
                       
                       <div className='game-page-right'>
                            {Screenshot.map((screenshot) => (
                                <img key={screenshot.id} src={screenshot.image} alt={`Screenshot ${screenshot.id}`}/>    
                            )).slice(0,1)}

                            <p>{parse(game.description)}</p>
                       </div>
                    </>    
                )}
            </div>
        </div>
    )
}

export default Games;
