import React, { useState }  from "react";
import ReviewsModal from "./ReviewsModal";
import "./Results.css"
import { Button } from "reactstrap";
import { addFavorite } from "../../utils/apiWrapper";
import { removeFavorite } from "../../utils/apiWrapper";

const GameCard = ( {game, isAdmin} ) => {
    const [show, setShow] = useState(false);
    const [buttontxt, setButtontxt] = useState("Add to favorites");

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleAddFavorite = async ( event, game ) => {
        event.stopPropagation();
        const resp = await addFavorite(game.gameId, "0");
        if (!resp.error) {
            console.log(resp);
            setButtontxt("Added");
        }
    }

    const handleRemoveFavorite = async ( game ) => {
    const resp = await removeFavorite(game.gameId, "0");
    if (!resp.error) {
        console.log(resp);
    }
    window.location.href='/game-searcher/admin'
    }

    return (
        <div className="card-container" onClick={handleShow}>
            <p style={{marginTop: 8, marginBottom: 0}}>{game.name} </p>
            {isAdmin ? <Button className="removeFavs" onClick={ () => handleRemoveFavorite(game) }> Remove</Button> : <Button className="addFavs" onClick={ (event) => handleAddFavorite(event, game)}> {buttontxt} </Button>}
            <ReviewsModal game={game} isModalOpen={show} closeModal={handleClose}></ReviewsModal>
        </div>
    )
}

export default GameCard;