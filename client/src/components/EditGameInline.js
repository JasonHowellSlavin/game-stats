import React, { useState } from 'react';
import './StatsView.scss';

export default ({kills, damage, place, time, id, toggleEditable, editGame}) => {
    const [currentKills, setKills] = useState(kills);
    const [currentDamage, setDamage] = useState(damage);
    const [currentPlace, setPlace] = useState(place);
    const [currentTime, setTime] = useState(time);

    return (
        <div key={`id:${id}`} data-item-id={id} className={"stat-block"}>
            <div className={'input-holder'}>
                <label htmlFor={'kills'}>Kills: </label>
                <input type={'text'}
                       id={'kills'}
                       value={currentKills}
                       placeholder={currentKills}
                       onChange={(e) => {setKills(e.target.value)}}></input>
            </div>
            <div className={'input-holder'}>
                <label htmlFor={'damage'}>Damage:</label>
                <input type={'text'}
                       id={'damage'}
                       value={currentDamage}
                       placeholder={currentDamage}
                       onChange={(e) => {setDamage(e.target.value)}}></input>
            </div>
            <div className={'input-holder'}>
                <label htmlFor={'place'}>Place:</label>
                <input type={'text'}
                       id={'place'}
                       value={currentPlace}
                       placeholder={currentPlace}
                       onChange={(e) => {setPlace(e.target.value)}}></input>
            </div>
            <div className={'input-holder'}>
                <label htmlFor={'time'}>Time:</label>
                <input type={'text'}
                       id={'time'}
                       value={currentTime}
                       placeholder={currentTime}
                       onChange={(e) => {setTime(e.target.value)}}></input>
            </div>
            <button
                style={{'border': '2px solid black', 'padding': '2px', 'margin': '24px 0', 'fontSize': '16px'}}
                onClick={(e) => {
                    let parentDiv = e.target.parentNode;
                    let id = e.target.parentNode.getAttribute('data-item-id');

                    let request = {
                        id: id,
                        kills: currentKills,
                        damage: currentDamage,
                        place: currentPlace,
                        time: currentTime,
                    }
                    editGame(request);
                    toggleEditable(e);
                }}
                >
                Done?</button>
        </div>
    );
}
