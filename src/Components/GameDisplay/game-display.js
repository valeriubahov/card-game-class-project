import './styles.css';
import React, { useState, useEffect } from 'react';
import RedCard from "./red-card.jpg";
import BlueCard from "./blue-card.jpg";
import BlackCard from "./black-card.jpg";

let playerCardValue = 0;
let playerScore = 0;
let botCardValue = 0;
let botScore = 0;

const cardImageValue = new Map();
cardImageValue.set('JACK', 11);
cardImageValue.set('QUEEN', 12);
cardImageValue.set('KING', 13);
cardImageValue.set('ACE', 14);

const GameDisplay = function (props) {

    // State for Player DeckID
    const [playerDeckID, setPlayerDeckID] = useState(null);
    // State for BOT DeckID
    const [botDeckID, setBotDeckID] = useState(null);

    const [playerCard, setPlayerCard] = useState(null);

    const [botCard, setBotCard] = useState(null);

    const [deckEnded, setDeckEnded] = useState(false);



    // GET AI DECK ID - THE ID IS USED TO KNOW FROM WHICH DECK TO DRAW
    useEffect(() => {
        fetch('https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1')
            .then(res => res.json())
            .then(botDeckID => {
                setBotDeckID(botDeckID.deck_id);
            });
    }, []);

    // GET PLAYER DECK ID - THE ID IS USED TO KNOW FROM WHICH DECK TO DRAW
    useEffect(() => {
        fetch('https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1')
            .then(res => res.json())
            .then(playerDeckID => {
                setPlayerDeckID(playerDeckID.deck_id);
            });
    }, []);


    const API_URL_PLAYER = `https://deckofcardsapi.com/api/deck/${playerDeckID}/draw/?count=1`
    const API_URL_BOT = `https://deckofcardsapi.com/api/deck/${botDeckID}/draw/?count=1`




    async function getPlayerCard() {
        const callAPi = await fetch(API_URL_PLAYER);
        const card = await callAPi.json();
        return card;
    }

    async function getAICard() {
        const callAPi = await fetch(API_URL_BOT);
        const card = await callAPi.json();
        return card;
    }

    async function checkHandWinner() {
        if (!deckEnded) {
            if (botCardValue > playerCardValue) {
                botScore += parseInt(botCardValue) + parseInt(playerCardValue);
                console.log(`BOT WINS`);
            }
            else if (botCardValue < playerCardValue) {
                playerScore += parseInt(botCardValue) + parseInt(playerCardValue);
                console.log(`PLAYER WINS`);
            }
            else {
                console.log(`DRAW`);
            }
        }
        else {
            console.log('Saving to DB')
        }
    }


    async function draw() {
        // DRAW CARD FROM THE PLAYER DECK
        await getPlayerCard().then(playerCard => {
            if (playerCard.remaining > 0) {
                const picUrl = playerCard.cards[0].image;
                playerCardValue = playerCard.cards[0].value;
                setPlayerCard(picUrl);
                if (isNaN(playerCardValue)) {
                    playerCardValue = cardImageValue.get(playerCardValue);
                }
            }
            else {
                setDeckEnded(true);
            }
        });

        // DRAW CARD FROM BOT DECK
        await getAICard().then(botCard => {
            if (botCard.remaining > 0) {
                const picUrl = botCard.cards[0].image;
                botCardValue = botCard.cards[0].value;
                setBotCard(picUrl);
                if (isNaN(botCardValue)) {
                    botCardValue = cardImageValue.get(botCardValue);
                }
            }
            else {
                setDeckEnded(true);
            }
        });

        await checkHandWinner();
    }

    const [BG, setBG] = useState("game-table1")

    const [d1, setD1] = useState(RedCard)
    const [d2, setD2] = useState(RedCard)

    const changeDeck = () => {
        if(d1 === RedCard) {
            setD1 (BlueCard)
            setD2 (BlueCard)
        }
        else if(d1 === BlueCard){
            setD1(BlackCard)
            setD2(BlackCard)
        }
        else{
            setD1(RedCard)
            setD2(RedCard)
        }
    }

    const changeBG = () => {
        if (BG == "game-table1"){
            setBG("game-table2")
        }
        else if(BG == "game-table2"){
            setBG("game-table3")
        }
        else{
            setBG("game-table1")
        }
    }

    return (
        <div className={BG}>

            <div className='card-display'>

                <div className="bot-cards">
                    <p>Computer</p>
                    <img className='deck2' src={d2}></img>
                    <img src={botCard} className='bot-draw' ></img>
                    <p>Score: {botScore}</p>
                </div>

                <button className='drawButton' onClick={draw}>Draw</button>

                <div className="player-cards">
                    <p>Player Name</p>
                    <img src={playerCard} className='player-draw' ></img>
                    <img className='deck1' src={d1}></img>
                    <p>Score: {playerScore}</p>
                </div>
            </div>

            <button className='colorButton' onClick={changeBG}>Table Color</button>
            <button className='cardColor' onClick={changeDeck}>Card Color</button>
        </div>
    )
}

export default GameDisplay;