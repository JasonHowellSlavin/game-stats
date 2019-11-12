import React, { Component } from 'react';
import './App.scss';
import GraphView from './components/GraphView';
import StatsViewer from './components/StatsViewer';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            dailyStats: [],
            dailyNav: 'daily-stats',
            overallNav: 'overall-stats',
        };
        this.postRequest = this.postRequest.bind(this);
        this.createPost = this.createPost.bind(this);
        this.checkForEmptyFields = this.checkForEmptyFields.bind(this);
        this.resetFields = this.resetFields.bind(this);
        this.editStat = this.editStat.bind(this);
    }

    checkForEmptyFields() {
        let inputs = document.querySelector('#input-form').querySelectorAll('input');
        let dataEntered = [];

        inputs.forEach(input => dataEntered.push(input.value !== ""));


        return dataEntered.includes(false);
    }

    resetFields () {
        let inputs = document.querySelector('#input-form').querySelectorAll('input');

        inputs.forEach(input => input.value = '');
    }

    editStat(requestObject) {
        console.log(requestObject);
        let dateObj = new Date();
        let dateString = `${dateObj.getUTCFullYear()}-${dateObj.getUTCMonth() + 1}-${dateObj.getDate()}`;

        (async () => {
            const update = await fetch('/update/edit', {
                method: 'POST',
                headers: {
                  'Accept': 'application/json',
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify(requestObject),
            });

            const dailyStats = await fetch('/stats/daily-stats', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({date: dateString}),
            })
            .then(response => response.json());

            const stats = await fetch('/stats')
            .then(response => response.json())
            .catch(err => console.log(err));

            this.setState({data: stats, dailyStats: dailyStats});
        })();
    }

    createPost() {
        let postObject = {};

        let form = document.querySelector('#input-form');
        let dateObj = new Date();
        let dateString = `${dateObj.getUTCFullYear()}-${dateObj.getUTCMonth() + 1}-${dateObj.getDate()}`;
        let timeString = `${dateObj.getHours()}:${dateObj.getMinutes()}:${dateObj.getSeconds()}`;

        form.querySelectorAll('input').forEach((input) => {
            postObject[input.getAttribute('id')] = input.value;
        })

        postObject['date'] = dateString;
        postObject['time'] = timeString;

        return postObject;
    }

    postRequest() {
        if (this.checkForEmptyFields()) {
            console.warn('Empty fields are present, please fill out all fields');
            return;
        } else {
            let postObject = this.createPost();

            (async () => {
                const rawResponse = await fetch('/update', {
                    method: 'POST',
                    headers: {
                      'Accept': 'application/json',
                      'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(postObject),
                });

                const content = await rawResponse.json();

            })().then(() => {
                (async () => {
                    let dateObj = new Date();
                    let dateString = `${dateObj.getUTCFullYear()}-${dateObj.getUTCMonth() + 1}-${dateObj.getDate()}`;

                    const rawResponse = await fetch('/stats/daily-stats', {
                        method: 'POST',
                        headers: {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({date: dateString}),
                    });

                    let dailyStats = await rawResponse.json();
                    this.setState({dailyStats: dailyStats});
                })();
            }).then(() => {
                this.resetFields();
            });
        }
    }

    componentDidMount() {
        let overAllStats;
        let dailyStats;

        let dateObj = new Date();
        let dateString = `${dateObj.getUTCFullYear()}-${dateObj.getUTCMonth() + 1}-${dateObj.getDate()}`;

        (async () => {
            const rawResponse = await fetch('/stats/daily-stats', {
            method: 'POST',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({date: dateString}),
          });

          const stats = fetch('/stats')
          .then(response => response.json())
          .catch(err => console.log(err));

          overAllStats = await stats;
          dailyStats = await rawResponse.json();

          await this.setState({data: overAllStats, dailyStats: dailyStats});
        })();
    }

    render() {
        return (
            <div className="App">
                <link href="https://fonts.googleapis.com/css?family=Teko&display=swap" rel="stylesheet"></link>
                <article>
                    <section className={'wrapper'}>
                        <div>
                            <h2>Input scores</h2>
                        </div>
                        <form id="input-form">
                            <label htmlFor="kills">Kills</label>
                            <input id="kills" type="number"></input>
                            <label htmlFor="damage">Damage</label>
                            <input id="damage" type="number"></input>
                            <label htmlFor="place">Place</label>
                            <input id="place" type="number"></input>
                        </form>
                        <div>
                            <button onClick={() => {this.postRequest()}}>Post</button>
                        </div>
                    </section>
                    {/* Componentize these sections */}
                    <StatsViewer data={this.state.dailyStats} statsLabel={"Today's"} editGame={this.editStat} />
                    <StatsViewer data={this.state.data} statsLabel={"Overall"} editGame={this.editStat} />
                </article>
                {this.state.dailyNav === 'overall-graphs' && <GraphView stats={this.state.data} title={"Overall's Graphs"} />}
                <button onClick={() => {this.editStat({id: '334', damage: '1450', kills: '153', place: '1', time: '07:34:09'})}}>Edit Stat Button</button>
            </div>
        );
    }
}

export default App;
