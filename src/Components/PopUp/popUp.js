//TODO: Pop up box will appear at the end of the game
//      informing who won the game
//      button to go to next round
import './popUp.css';
const PopUp = function(props){
    return(
        <div className="popup-box">
            <div className="box">
                <h1>{props.winner}</h1>
                <button className="next-round" onClick={props.nextRound}>Next Round</button>
            </div>
        </div>
    )
}

export default PopUp;