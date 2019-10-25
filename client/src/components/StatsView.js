import React from 'react';
import './StatsView.scss';

export default ({stats, title}) => {
    return (
            <div>
                <div>
                    <h2>{title}</h2>
                </div>
                <div className={'stats'}>
                    <div>
                        <p>Total kills: {stats.reduce((accum, stat) => {
                            accum += stat.kills;
                            return accum;
                        }, 0)}</p>
                        <p>Total damage: {stats.reduce((accum, stat) => {
                            accum += stat.damage;
                            return accum;
                        }, 0)}</p>
                        <p>Number of Games: {stats.length}</p>
                        <p>Avg Place: {stats.reduce((accum, stat) => {
                            accum += stat.place;
                            return accum;
                        }, 0) / stats.length}</p>
                        <p> K/D Ratio: {stats.reduce((accum, stat) => {
                            accum += stat.kills;
                            return accum;
                        }, 0) / stats.length}</p>
                    </div>
                </div>
            </div>
    );
}
