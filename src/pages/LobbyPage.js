import React from 'react';
import '../App.css';
import { useLocation } from 'react-router-dom';
import {configureAbly, usePresence} from "@ably-labs/react-hooks";
import style from '../styles/LobbyPage.module.css';
import Button from '../components/Button.js'

const LobbyPage = (props) => {
    const location = useLocation();
    const identity = location.state?.identity;
    const gamePin  = location.state?.gamePin;
    const url = window.location.href;
    

    configureAbly({key: "yqb0VQ.Av_Gmg:pItSDLVHuUqgEGYCqdOhVSr4Ypktm7764_a0mhpwbEY", clientId: identity.playerId});    

    const channelName = gamePin + "";
    const [presenceUsers] = usePresence(channelName, { nickname: identity.nickname });

    const copyUrl = () =>{
        navigator.clipboard.writeText(window.location.href).then(function(){
            alert("Copied Link!")
        });
    };

    return (
        <div className="App">
            <span className={style.lobby}>
                <div className={style.subtitle}>Chaos</div>

                <div className={style.pin}>
                    <span className={style.label}>GAME PIN: <br/></span>
                    <span className={style.number}>{channelName}</span>
                </div>

                <div className={style.container}>
                    <div className={style.players}>
                        {presenceUsers.map((user, index) => (
                            // index % 2 === 0 
                            //     ? <div className={style.grid_cell} key={user.clientId}>{user.data.nickname}</div>
                            //     : <div className={style.grid_cell}  style={{ textAlign: 'right' }} key={user.clientId}>{user.data.nickname}</div>)
                            <div className={style.grid_cell} key={user.clientId}>{user.data.nickname}</div>
                        ))}
                    </div>
                </div>

                <div className={style.buttons}>
                    {/*<NavLink to="/">*/}
                        <Button press={copyUrl} name="INVITE"/>
                    {/*</NavLink>*/}
                </div>

                <div className={style.buttons}>
                    {/*<NavLink to="/">*/}
                        <Button name="PLAY"/>
                    {/*</NavLink>*/}
                </div>

                <div>
                    <p>[DEBUG] This lobby has {presenceUsers.length} { presenceUsers.length > 1 ? `members.` : `member.` }</p>
                </div>
            </span>
        </div>
    );
}

export default LobbyPage;