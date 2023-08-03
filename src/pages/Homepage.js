import React from 'react';
import '../App.css';
import Button from '../components/Button.js'
import Input from '../components/Input.js'
import { NavLink } from 'react-router-dom';

const Homepage = () => {

    return (
        <div className="App">
            <div className="title">Chaos</div>
            <div className="container">
                <Input placeholder="Game PIN" />
                <NavLink to="/ably">
                    <Button name="JOIN"/>
                </NavLink>
            </div>     
            <div className="button">
                <NavLink to="/nickname">
                    <Button name="HOST" />
                </NavLink>              
            </div>
        </div>
    );
}

export default Homepage;