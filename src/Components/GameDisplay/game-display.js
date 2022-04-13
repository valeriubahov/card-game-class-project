import './styles.css';
import React, { useState, useEffect, useRef, useContext } from 'react';
import RedCard from "./images/red-card.jpg";
import BlueCard from "./images/blue-card.jpg";
import BlackCard from "./images/black-card.jpg";
import Blank from './images/blank.png';
import PopUp from '../PopUp/popUp';
import { UserContext } from '../../context/UserContext';

let playerCardValue = 0;
let botCardValue = 0;

const cardImageValue = new Map();
cardImageValue.set('JACK', 11);
cardImageValue.set('QUEEN', 12);
cardImageValue.set('KING', 13);
cardImageValue.set('ACE', 14);

/**
 * GameDisplay component, used as main component for the gameplay, show, draw, calculate score and win streaks
 * @param {*} props 
 * @returns GameDisplay component
 */
const GameDisplay = function (props) {

    const user = useContext(UserContext);

    // State for final winner
    const [winner, setWinner] = useState('');

    // State for Deck IDs
    const [playerDeckID, setPlayerDeckID] = useState(null);
    const [botDeckID, setBotDeckID] = useState(null);

    //States for cards
    const [playerCard, setPlayerCard] = useState(null);
    const [botCard, setBotCard] = useState(null);

    // State for scores
    const [botScore, setBotScore] = useState(0);
    const [playerScore, setPlayerScore] = useState(0);

    // States for win streaks
    const [playerWinStreak, setPlayerWinStreak] = useState(0);
    const [botWinStreak, setBotWinStreak] = useState(0);

    let playerWins = useRef(0);
    let botWins = useRef(0);

    // States for table style
    const [BG, setBG] = useState("game-table1");

    //Statae for deck styles
    const [d1, setD1] = useState(RedCard);
    const [d2, setD2] = useState(RedCard);

    // State to check if deck is ended
    const deckEnded = useRef(false);

    // State to show if bot wins the hand or the player
    const [drawResult, setDrawResult] = useState('');

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

    // Called only when the botWinStreak or playerWinStreak are modified => check if === 3 then end the game and save the score
    useEffect(() => {
        if (botWinStreak === 3 || playerWinStreak === 3) {
            const userScore = new FormData()
            userScore.append("_id", user[0]._id)
            userScore.append("score", playerScore)
            fetch("http://localhost:5000/userScore/add", {
                method: "POST",
                body: userScore
            });
        }
    }, [botWinStreak, playerWinStreak])

    const API_URL_PLAYER = `https://deckofcardsapi.com/api/deck/${playerDeckID}/draw/?count=1`;
    const API_URL_BOT = `https://deckofcardsapi.com/api/deck/${botDeckID}/draw/?count=1`;

    /**
     * Function to start a new round, reset the deck and use the previous score to track the progress
     * @param none
     * @returns void
     */
    function nextRound() {
        fetch('https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1')
            .then(res => res.json())
            .then(botDeckID => {
                setBotDeckID(botDeckID.deck_id);
            });

        // GET PLAYER DECK ID - THE ID IS USED TO KNOW FROM WHICH DECK TO DRAW
        fetch('https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1')
            .then(res => res.json())
            .then(playerDeckID => {
                setPlayerDeckID(playerDeckID.deck_id);
            });
        deckEnded.current = false;
        setPlayerCard(null);
        setBotCard(null);
        setDrawResult('');
        playerCardValue = 0;
        botCardValue = 0;
    }

    /**
     * Function to reset all states and start a new game
     * @param none
     * @returns void
     */
    function newGame() {
        nextRound();
        setPlayerScore(0);
        setBotScore(0);
        setBotWinStreak(0);
        setPlayerWinStreak(0);
        playerWins.current = 0;
        botWins.current = 0;
    }

    /**
     * Function to fetch and get the card from the player deck
     * @param none
     * @returns Player Card
     */
    async function getPlayerCard() {
        const callAPi = await fetch(API_URL_PLAYER);
        const card = callAPi.json();
        return card;
    }

    /**
     *  Function to fetch and get the card from the BOT deck
     * @param none
     * @returns Bot Card
     */
    async function getAICard() {
        const callAPi = await fetch(API_URL_BOT);
        const card = callAPi.json();
        return card;
    }

    /**
     * Function to chech who wins the hand, player or bot card value
     * @param none
     * @returns void
     */
    function checkHandWinner() {
        let count = 0;
        console.log(count++);
        if (!deckEnded.current) {
            if (parseInt(botCardValue) > parseInt(playerCardValue)) {
                if (botWins.current >= 2) {
                    setBotScore(botScore => botScore + (parseInt(botCardValue) * 2 + parseInt(playerCardValue) * 2));
                }
                else {
                    setBotScore(botScore => botScore + parseInt(botCardValue) + parseInt(playerCardValue));
                }
                setDrawResult('BOT WINS');
            }
            else if (parseInt(botCardValue) < parseInt(playerCardValue)) {
                if (playerWins.current >= 2) {
                    setPlayerScore(playerScore => playerScore + (parseInt(botCardValue) + parseInt(playerCardValue)) * 2);
                }
                else {
                    setPlayerScore(playerScore => playerScore + parseInt(botCardValue) + parseInt(playerCardValue));
                }
                setDrawResult('PLAYER WINS');
            }
            else {
                setDrawResult('DRAW');
            }
        }
        else {
            if (botScore > playerScore) {
                botWins.current = botWins.current + 1;
                playerWins.current = 0;
                setBotWinStreak(botWinStreak + 1);
                setWinner("BOT is the winner");
            }
            else {
                playerWins.current = playerWins.current + 1;
                botWins.current = 0;
                setPlayerWinStreak(playerWinStreak + 1);

                setWinner("YOU are the winner");
            }
        }
    }

    /**
     * Function called when Draw button is clicked - draw cards from both decks
     * @param none
     * @returns void
     */
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
                deckEnded.current = true;
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
                deckEnded.current = true;
            }
        });
        checkHandWinner();
    }

    /**
     * Function called when Card Color button is pressed - change the style of background deck
     * @param none
     * @returns none
     */
    const changeDeck = () => {
        if (d1 === RedCard) {
            setD1(BlueCard)
            setD2(BlueCard)
        }
        else if (d1 === BlueCard) {
            setD1(BlackCard)
            setD2(BlackCard)
        }
        else {
            setD1(RedCard)
            setD2(RedCard)
        }
    }

    /**
     * Function called when Table Color button is pressed - change table css style
     * @param none
     * @returns void
     */
    const changeBG = () => {
        if (BG === "game-table1") {
            setBG("game-table2");
        }
        else if (BG === "game-table2") {
            setBG("game-table3");
        }
        else if (BG === "game-table3") {
            setBG("game-table4");
        } else {
            setBG("game-table1");
        }
    }

    return (
        <div id={BG} className="game-table">
            <div className='display-container'>

                <div id="welcome-container">
                    <p id='welcome-text'>WELCOME {user[0].userName.toUpperCase()}!</p>
                </div>

                <div className="card-container">
                    <div className="bot-cards">
                        <p>COMPUTER - WINS {botWinStreak}</p>
                        {!deckEnded.current ? <img className='deck2' src={d2} alt='card'></img> : <img className='deck2' src={Blank} alt=''></img>}
                        {botCard ? <img src={botCard} className='bot-draw' alt='card'></img> : <div className='bot-draw'></div>}
                        <p>SCORE: {botScore}</p>
                    </div>

                    {
                        !deckEnded.current || (botWinStreak === 0 && playerWinStreak === 0) ?
                            <div className='game-process'>
                                <div className='draw-result'>{drawResult}</div>
                                <button className='drawButton' onClick={draw}>Draw</button>
                            </div> 
                            : (botWinStreak === 3 || playerWinStreak === 3)
                                ? <PopUp nextRound={newGame} winner="Game Ended" />
                                : <PopUp nextRound={nextRound} winner={winner} />
                    }

                    <div className="player-cards">
                        <p>{user[0].userName.slice(0, 20).toUpperCase()} - WINS {playerWinStreak}</p>
                        { playerCard ? <img src={playerCard} className='player-draw' alt='card'></img> : <div className='player-draw'></div>}
                        {!deckEnded.current ? <img className='deck1' src={d1} alt='card'></img> : <img className='deck2' src={Blank} alt=''></img>}
                        <p>SCORE: {playerScore}</p>
                    </div>
                </div>

                <div id="arcade-buttons-container">
                    <div id='arcade-buttons-panel'>
                        <div className='button-label-container'>
                            <button 
                                id='change-table-btn' 
                                className='arcade-button' 
                                onClick={changeBG}
                            />
                            <p className='arcade-button-label'>TABLE</p>
                        </div>
                        <div className='button-label-container'>
                            <button 
                                id='change-card-btn' 
                                className='arcade-button' 
                                onClick={changeDeck}
                            />
                            <p className='arcade-button-label'>CARD</p>
                        </div>
                        <div className='button-label-container'>
                            <button 
                                id='new-game-btn' 
                                className='arcade-button' 
                                onClick={newGame}
                            />
                            <p className='arcade-button-label'>RESTART</p>
                        </div>                        
                    </div>
                </div>
                
            </div>
        </div>
    )
}

export default GameDisplay;