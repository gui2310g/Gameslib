import { Link } from "react-router-dom";
import { FaStar } from "react-icons/fa";

const Gamecard = ({ game, showLink = true}) => {
    return (
       <div className='game-card'>
            <img src={game.background_image} alt={game.name} />

            <h2>{game.name}</h2>

            <p><FaStar /> {game.metacritic}</p>

            {showLink && <Link to={`/Games/${game.id}`}>Detalhes</Link>}
       </div>
    )
}

export default Gamecard;