import React, { Component } from 'react';
import './GraphView.scss';
import Plot from 'react-plotly.js';

class GraphView extends Component {
    constructor(props){
        super(props);
        this.state = {
            dates: [],
            kills: [],
            games: [],
            kdRatio: [],
        };
        this.deDupeDates = this.deDupeDates.bind(this);
    }

    deDupeDates(data) {
        let dates = data.reduce((accum, item) => {
            accum.push(item.date.substr(0, item.date.indexOf('T')));
            return accum;
        }, []);


        let deDuped = [...new Set(dates)];

        console.log(dates, deDuped);

        return deDuped;
    }

    getKDForDay(data) {
        let dates = this.deDupeDates(data);
        let kPerDay = {};
        let numGamesPerDay = {};
        let ratioPerDay = {};

        dates.forEach((date) => {
            let totalK = data.reduce((accum, stat) => {
                if (stat.date.indexOf(date) > -1) {
                    console.log(date, stat.date.indexOf(date));
                    accum.kills += stat.kills;
                    accum.games++;
                }

                return accum;
            }, {kills: 0, games: 0});

            kPerDay[date] = totalK.kills;
            numGamesPerDay[date] = totalK.games;
            ratioPerDay[date] = totalK.kills / totalK.games;
        })

        console.log(kPerDay);
        return {kd: kPerDay, numGames: numGamesPerDay, ratio: ratioPerDay};
    }

    componentDidMount() {
        console.log('stats!: ', this.props.stats)
        this.deDupeDates(this.props.stats);
        let kdDayObj = this.getKDForDay(this.props.stats);

        this.setState({
            kills: Object.values(kdDayObj.kd),
            dates: Object.keys(kdDayObj.kd),
            games: Object.values(kdDayObj.numGames),
            kdRatio: Object.values(kdDayObj.ratio)
        });

        return true;
    }

    render () {
        return (
                <div style={{width: '1000px'}}>
                    <h3>Graph go here </h3>
                    <p>{this.props.title}</p>
                    <Plot
                        data={[
                          {
                            x: this.state.dates,
                            y: this.state.kills,
                            type: 'scatter',
                            mode: 'lines+points',
                            marker: {color: 'red'},
                          },
                          {type: 'bar', x: this.state.dates, y: this.state.games},
                          {
                            x: this.state.dates,
                            y: this.state.kdRatio,
                            type: 'scatter',
                            mode: 'lines+points',
                            marker: {color: 'green'},
                          },
                        ]}
                        layout={ {width: 640, height: 480, title: 'A Fancy Plot'} }
                     />
                </div>
        );
    }
}

export default GraphView;
