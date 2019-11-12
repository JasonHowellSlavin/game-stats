import React, { Component } from 'react';
import './GamesView.scss';
import StatsView from './StatsView';
import GamesView from './GamesView';
import GraphView from './GraphView';

class StatsViewer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            nav: 'stats'
        }
    }

    render() {
        return (
            <section className={'data-section wrapper'}>
                <div className={"data-section-nav"}>
                    <ul>
                        <li nav-value={"stats"} onClick={e => this.setState({nav: e.currentTarget.getAttribute('nav-value')})}>{this.props.statsLabel} Stats</li>
                        <li nav-value={"games"} onClick={e => this.setState({nav: e.currentTarget.getAttribute('nav-value')})}>{this.props.statsLabel} Games</li>
                        <li nav-value={"graphs"} onClick={e => this.setState({nav: e.currentTarget.getAttribute('nav-value')})}>{this.props.statsLabel} Graphs</li>
                    </ul>
                </div>
                {this.state.nav === 'stats' && <StatsView stats={this.props.data} title={`${this.props.statsLabel} Stats`} />}
                {this.state.nav === 'games' && <GamesView stats={this.props.data} title={`${this.props.statsLabel} Games`} editGame={this.props.editGame}/>}
                {this.state.nav === 'graphs' && <GraphView stats={this.props.data} title={`${this.props.statsLabel} Graphs`} />}
            </section>
        )
    }
}

export default StatsViewer;
