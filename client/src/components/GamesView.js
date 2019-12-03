import React, { Component } from 'react';
import './GamesView.scss';
import EditGameInline from './EditGameInline';

class GamesView extends Component {
    constructor(props) {
        super(props);
        this.state= {
            isEditable: false,
            kills: 'kills',
            damage: 'damage',
            place: 'place',
            time: 'titme',
        }
        this.toggleEditable = this.toggleEditable.bind(this);
    }

    toggleEditable(event) {
        this.setState({isEditable: !this.state.isEditable});
    }

    componentDidMount() {
        let initialValues = this.props.stats;
        console.log(initialValues, 'initialValues');

        this.setState({
            kills: initialValues.kills,
            damage: initialValues.damage,
            place: initialValues.place,
            time: initialValues.time,
        })
    }

    render() {
        return (
                <div>
                    <div>
                        <h2>{this.props.title}</h2>
                    </div>
                    <div className={'todays-games'}>
                        {this.props.stats.length > 0 && this.props.stats.map((item, index) => {
                            if (this.state.isEditable === false) {
                                return (
                                    <div key={`id:${item.ID}`} data-item-id={item.ID} className={"stat-block"}>
                                        <p>Kills: {item.kills}</p>
                                        <p>Damage: {item.damage}</p>
                                        <p>Place: {item.place}</p>
                                        <p>Time: {item.time}</p>
                                        <p>Date: {item.date.substr(0, item.date.indexOf('T'))}</p>
                                        <button
                                            onClick={(e) => {
                                                this.toggleEditable(e);
                                            }}
                                            >
                                            Edit</button>
                                    </div>
                                )
                            } else {
                                return (
                                    <EditGameInline
                                        kills={item.kills}
                                        damage={item.damage}
                                        place={item.place}
                                        time={item.time}
                                        id={item.ID}
                                        key={`id:${item.ID}`}
                                        toggleEditable={this.toggleEditable}
                                        editGame={this.props.editGame}
                                        ></EditGameInline>
                                )
                            }
                        })}
                    </div>
                </div>
        );
    }
}

export default GamesView;
