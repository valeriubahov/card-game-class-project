import './styles.css';
import React, { useState, useEffect, useRef, useContext } from 'react';
import { useNavigate } from "react-router-dom";
import RedCard from "./images/red-card.jpg";
import BlueCard from "./images/blue-card.jpg";
import BlackCard from "./images/black-card.jpg";
import Blank from './images/blank.png';
import PopUp from '../PopUp/popUp';
import { UserContext } from '../../context/UserContext';

let playerCardValue = 0;
let botCardValue = 0;

const emojis = {
    default: String.fromCodePoint(0x1F9A1),
    bot: String.fromCodePoint(0x1F916),
    draw: String.fromCodePoint(0x1F91D),
    player: String.fromCodePoint(0x1F47D),
    star: String.fromCodePoint(0x2B50),
}

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

    let navigate = useNavigate();

    let playerWins = useRef(0);
    let botWins = useRef(0);

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

    // States for table style
    const [BG, setBG] = useState("game-table1");

    //Statae for deck styles
    const [d1, setD1] = useState(RedCard);
    const [d2, setD2] = useState(RedCard);

    // State to check if deck is ended
    const deckEnded = useRef(false);

    // state object for message animations
    const [animate, setAnimate] = useState({
        round: 1,
        text: user[0].userName && `WELCOME ${user[0].userName.toUpperCase()} !`,
        message: true,
        player: false,
        bot: false,
        draw: false,
        score: {
            player: [0, 0, 0, 0],
            bot: [0, 0, 0, 0]
        }
    });

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
        setAnimate(prev => {
            let obj = { ...prev };
            obj.round++;
            obj.text = `ROUND ${obj.round}`;
            obj.message = true;
            obj.player = obj.bot = obj.draw = false;
            return obj
        });

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
        setAnimate({
            round: 1,
            text: `WELCOME ${user[0].userName.toUpperCase()} !`,
            message: true,
            player: false,
            bot: false,
            draw: false,
            score: {
                player: [0, 0, 0, 0],
                bot: [0, 0, 0, 0]
            }
        });
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

    function goToLogin() {
        navigate('/login');
    }

    /**
     *  Function to set animation states to print message, and to transform/update the score into state for display
     * @param {string} score - current score 
     * @param {string} target - which score we should update
     * @returns void
     */
    function animateScore(score, target) {
        setAnimate(prev => {
            let obj = { ...prev };
            obj.text = '';
            obj.message = obj.player = obj.bot = obj.draw = false;

            if (target === 'bot') {
                while (score.length < 4) {
                    score = '0' + score;
                }
                obj.score.bot = score.split('');
                obj.text = 'BOT WINS';
                obj.bot = true;
                return obj
            } else if (target === 'player') {
                while (score.length < 4) {
                    score = '0' + score;
                }
                obj.score.player = score.split('');
                obj.text = 'YOU WIN!!!';
                obj.player = true;
                return obj
            } else {
                obj.text = 'TIE';
                obj.draw = true;
                return obj
            }
        });
    }

    /**
     * Function to chech who wins the hand, player or bot card value
     * @param none
     * @returns void
     */
    function checkHandWinner() {
        console.log(`
        PREVIOUS ROUND
          BOT SCORE:      ${botScore} 
          PLAYER SCORE:   ${playerScore}
        CURRENT ROUND
          BOT PTS:        ${botCardValue} 
          PLAYER PTS:     ${playerCardValue}
          TOTAL:          ${botCardValue + playerCardValue}
        `);

        if (!deckEnded.current) {
            if (botCardValue > playerCardValue) {
                setBotScore(prevScore => {
                    let mod = (botWins.current >= 2) ? 2 : 1;
                    let score = prevScore + ((botCardValue + playerCardValue) * mod);
                    animateScore(score.toString(), 'bot');
                    return score
                });
            }
            else if (botCardValue < playerCardValue) {
                setPlayerScore(prevScore => {
                    let mod = (playerWins.current >= 2) ? 2 : 1;
                    let score = prevScore + ((botCardValue + playerCardValue) * mod);
                    animateScore(score.toString(), 'player');
                    return score
                });
            }
            else {
                animateScore('', '');
            }
        } else {
            if (botScore > playerScore) {
                botWins.current = botWins.current + 1;
                playerWins.current = 0;
                setBotWinStreak(botWinStreak + 1);
                setWinner("BOT is the winner");
            } else {
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
                setPlayerCard(picUrl);
                let cardValue = playerCard.cards[0].value;
                playerCardValue = isNaN(cardValue) ? cardImageValue.get(cardValue) : parseInt(cardValue);
            }
            else {
                deckEnded.current = true;
            }
        });

        // DRAW CARD FROM BOT DECK
        await getAICard().then(botCard => {
            if (botCard.remaining > 0) {
                const picUrl = botCard.cards[0].image;
                setBotCard(picUrl);
                let cardValue = botCard.cards[0].value;
                botCardValue = isNaN(cardValue) ? cardImageValue.get(cardValue) : parseInt(cardValue);
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
        <>
            {user[0].userName ?
                (<div id={BG} className="game-table">
                    <div className="display-container">
                        <div id='animation-container'
                            className={
                                animate.message ? "animate-message"
                                    : animate.player ? "animate-player"
                                        : animate.bot ? "animate-bot"
                                            : animate.draw ? "animate-draw"
                                                : ""
                            }
                        >
                            {animate.text}
                        </div>
                        <div className="card-container">
                            <div className="bot-cards">
                                {!deckEnded.current ? <img className="deck2" src={d2} alt="card" /> : <img className="deck2" src={Blank} alt="" />}
                                {botCard ? <img src={botCard} className="bot-draw" alt="card" /> : <div className="bot-draw" />}
                            </div>
                            {
                                !deckEnded.current || (botWinStreak === 0 && playerWinStreak === 0)
                                    ? (
                                        animate.player ? <span className="center-emoji">{emojis.player}</span>
                                            : animate.bot ? <span className="center-emoji">{emojis.bot}</span>
                                                : animate.draw ? <span className="center-emoji">{emojis.draw}</span>

                                                    : <div className='center-emoji' 
                                                    style={{ 
                                                        lineHeight: '155px',
                                                         
                                                        }}>

                                                        <span>{emojis.default}</span>
                                                    
                                                    </div>
                                    )
                                    : botWinStreak === 3 || playerWinStreak === 3
                                        ? <PopUp nextRound={newGame} winner="Game Ended" />
                                        : <PopUp nextRound={nextRound} winner={winner} />
                            }
                            <div className="player-cards">
                                {playerCard ? <img src={playerCard} className="player-draw" alt="card" /> : <div className="player-draw" />}
                                {!deckEnded.current ? <img className="deck1" src={d1} alt="card" /> : <img className="deck2" src={Blank} alt="" />}
                            </div>
                        </div>
                        <div id="bottom-container">
                            <div className='badge'>
                                <div className="stats">
                                    <div className='score-container'>
                                        <div className="score-digit">{animate.score.bot[0]}</div>
                                        <div className="score-digit">{animate.score.bot[1]}</div>
                                        <div className="score-digit">{animate.score.bot[2]}</div>
                                        <div className="score-digit">{animate.score.bot[3]}</div>
                                    </div>
                                    <div className='star-container'>
                                        <div className='star'>{(botWinStreak > 0) ? emojis.star : <span className='circle'/>}</div>
                                        <div className='star'>{(botWinStreak > 1) ? emojis.star : <span className='circle'/>}</div>
                                        <div className='star'>{(botWinStreak > 2) ? emojis.star : <span className='circle'/>}</div>
                                    </div>
                                </div>
                                <div className='emoji-fill' id='bot-emoji'>{emojis.bot}</div>
                            </div>
                            <div id="buttons-panel">
                                <div>
                                    <button
                                        id="table-color"
                                        className='btn'
                                        onClick={changeBG}
                                    >TABLE</button>
                                    <button
                                        id="card-color"
                                        className='btn'
                                        onClick={changeDeck}
                                    >DECK</button>
                                </div>
                                <button
                                    id="draw-card"
                                    className='btn'
                                    onClick={draw}
                                >DRAW CARD</button>
                                <button
                                    id="new-game"
                                    className="btn"
                                    onClick={newGame}
                                >RESTART</button>
                            </div>
                            <div className='badge'>
                                <div className='emoji-fill' id='player-emoji'>{emojis.player}</div>
                                <div className="stats">
                                    <div className='score-container'>
                                        <div className="score-digit">{animate.score.player[0]}</div>
                                        <div className="score-digit">{animate.score.player[1]}</div>
                                        <div className="score-digit">{animate.score.player[2]}</div>
                                        <div className="score-digit">{animate.score.player[3]}</div>
                                    </div>
                                    <div className='star-container'>
                                        <div className='star'>{(playerWinStreak > 0) ? emojis.star : <span className='circle'/>}</div>
                                        <div className='star'>{(playerWinStreak > 1) ? emojis.star : <span className='circle'/>}</div>
                                        <div className='star'>{(playerWinStreak > 2) ? emojis.star : <span className='circle'/>}</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>) :
                (<div id={BG} className="game-table">
                    <div className="loginWarning">
                        <span className='loginMsg'>Please Login</span>
                        <button className='loginButton' onClick={goToLogin}>Go to Login page</button>
                    </div>
                </div>)
            }
        </>
    );
}

export default GameDisplay;