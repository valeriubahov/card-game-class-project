import UserSearch from '../UserSearch/user-search'
import './styles.css';

const GameDisplay = function (props) {

    return (
        <div className='game-table'>
            <div id="player-deck"></div>
            <div id="bot-deck"></div>
            <div id="player-card"></div>
            <div id="bot-card"></div>
            {/* <UserSearch/> */}
            <p>game will display here.</p>
        </div>


    )
}

export default GameDisplay;