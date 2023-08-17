import '../components/Settings.css';
import Setter from '../components/Setter';
import '../App.css';
import Button from '../components/Button.js';


function SettingsPage(props) {
    let round = 5;
    let discussTimer = 30;
    let responseTimer = 30;
    let votingTimer = 30;


return  (
    <div className="settings">
        <h1 className="header">SETTINGS</h1>
        <form>
            {/* {original} is the default value for each setting */}
            {/* {value} is the increment/decrement value of the buttons for each setting */}
            <div className="number-of-rounds">
                <h3 className= "subtitle">Number of rounds</h3>
                <Setter original={round} value={1} />               
            </div>
            <div className="divider"></div>
            <div className="response-timer">
                <h3 className= "subtitle">Response Timer (+30sec)</h3>
                <Setter original={responseTimer} value={30}/>               
            </div>
            <div className="divider"></div>
            <div className="discussion-timer">
                <h3 className= "subtitle">Discussion Timer (+30sec)</h3>
                <Setter original={discussTimer} value={30}/>               
            </div>
            <div className="divider"></div>
            <div className="voting-timer">
                <h3 className= "subtitle">Voting Timer (+30sec)</h3>
                <Setter original={votingTimer} value={30}/>               
            </div>
            <div className="divider"></div>
            <div className="settings-btns"><Button name="SAVE" /></div>
            <div className="settings-btns"><Button name="CANCEL" press={() => props.setTrigger(false)}/></div>  
        </form>
    </div>
    

)

}

export default SettingsPage
