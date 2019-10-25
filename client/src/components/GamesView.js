import React from 'react';
import './GamesView.scss';

export default ({stats, title}) => {
    return (
            <div>
                <div>
                    <h2>{title}</h2>
                </div>
                <div className={'todays-games'}>
                    {stats.length > 0 && stats.reverse().map((item, index) => {
                        return (
                            <div key={`index:${index}-${index + item.damage}`} className={"stat-block"}>
                                <p>Kills: {item.kills}</p>
                                <p>Damage: {item.damage}</p>
                                <p>Place: {item.place}</p>
                                <p>Time: {item.time}</p>
                            </div>
                        )
                    })}
                </div>
            </div>
    );
}
