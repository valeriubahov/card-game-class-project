import './styles.css';
import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';

const GameDisplay = function (props) {

    // State for Player DeckID
    const [playerDeckID, setPlayerDeckID] = useState(null);
    // State for BOT DeckID
    const [botDeckID, setBotDeckID] = useState(null);

    const [playerCard, setPlayerCard] = useState(null);

    const [botCard, setBotCard] = useState(null);


    useEffect(() => {
        fetch('https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1')
            .then(res => res.json())
            .then(botDeckID => {
                console.log(botDeckID.deck_id)
                setBotDeckID(botDeckID.deck_id);
            });
    }, []);

    useEffect(() => {
        fetch('https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1')
            .then(res => res.json())
            .then(playerDeckID => {
                setPlayerDeckID(playerDeckID.deck_id);
            });
    }, []);


    const API_URL_PLAYER = `https://deckofcardsapi.com/api/deck/${playerDeckID}/draw/?count=1`
    const API_URL_BOT = `https://deckofcardsapi.com/api/deck/${botDeckID}/draw/?count=1`

    const draw = () => {
        // DRAW CARD FROM THE PLAYER DECK
        fetch(API_URL_PLAYER).then(response => response.json())
            .then(playerCard => {
                const picUrl = playerCard.cards[0].image;
                const cardValue = playerCard.cards[0].value;
                setPlayerCard(picUrl);
            });

        // DRAW CARD FROM BOT DECK
        fetch(API_URL_BOT).then(response => response.json())
            .then(botCard => {
                const picUrl = botCard.cards[0].image;
                const cardValue = botCard.cards[0].value;
                setBotCard(picUrl);
            });


    }


    return (
        <div className='game-table'>


            <div className='card-display'>

                <div className="bot-cards">
                    <p>Computer</p>
                    <img className='deck2' ></img>
                    <img src={botCard} className='bot-draw' ></img>
                    <p>Score</p>
                </div>


                <div className="player-cards">
                    <p>Player Name</p>
                    <img src={playerCard} className='player-draw' ></img>
                    <img className='deck1' ></img>
                    <p>Score</p>
                </div>
            </div>


            <button className='drawButton' onClick={draw}>Draw</button>

        </div>


    )

}

export default GameDisplay;