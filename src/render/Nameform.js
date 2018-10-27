import React from "react";
import database from "../firebase/firebase";

const spawns = ["2,2", "16,2", "2,11", "16,11"];

let spawn = spawns[Math.floor(Math.random() * spawns.length)];

// let selectedSpawn = chooseSpawn();

const playerRef = database.ref("players");
const currentTurnRef = database.ref("turn");
const username = "Guest";
let currentPlayers = 0;
// const currentTurn = null;
// const playerOneExists = false;
// const playerTwoExists = false;
const playerOneData = null;
const playerTwoData = null;

export default class NameForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // submitted: false,
      // isHidden: false,
      name: null,
      infected: false,
      position: spawn,
      choice: "",
      playerOneExists: false,
      playerTwoExists: false,
      currentPlayers: 0,
      players: []
    };

    this.handleSpawn = this.handleSpawn.bind(this);
    this.GetInGame = this.GetInGame.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  GetInGame = () => {
    playerRef.on("value", snapshot => {
      console.log("snapshot val " + snapshot.val());
    });
    playerRef.on("value", snapshot => {
      let players = snapshot.val();
      const FUCKINGINT = snapshot.numChildren();
      console.log("Players count " + FUCKINGINT);
      let newState = [];
      for (let player in players) {
        newState.push({
          id: player,
          name: players[player].name,
          infected: players[player].infected,
          choice: players[player].choice,
          currentPlayers: FUCKINGINT
        });
      }
      this.setState({
        players: newState
      });
      console.log("new state " + newState);
    });
    // On disconnect remove this user's player object
    playerRef.onDisconnect().remove();
  };

  handleChange = event => {
    this.setState({ name: event.target.value });
  };

  handleSpawn = event => {
    console.log("this is a spawn " + spawn);
    this.setState(function() {
      return {
        position: this.spawn
      };
    });
  };

  handleSubmit = event => {
    // const player = {
    //   name: this.state.name,
    //   infected: this.state.infected,
    //   position: this.state.position,
    //   choice: this.state.choice,
    //   playerOneExists: this.state.playerOneExists,
    //   playerTwoExists: this.state.playerTwoExists,
    //   currentPlayers: 0
    // };

    event.preventDefault();

    this.GetInGame();
    this.handleSpawn();
    playerRef.push(this.state);
    console.log("handle submit after GetInGame " + this.state.position);
  };

  renderUserInfo = () => {
    return this.state.name;
  };

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <label className="Sub-heading">
            Username:
            <input
              type="text"
              id="jhs"
              name={this.state.name}
              onChange={this.handleChange}
            />
          </label>
          <input type="submit" value="Submit" id="playerSubmit" />
        </form>
        <section className="display-item">
          <div className="wrapper">
            <ul>
              {this.state.players.map(player => {
                return (
                  <li key={player.id}>
                    <h3>{player.name}</h3>
                  </li>
                );
              })}
            </ul>
          </div>
        </section>
      </div>
    );
  }
}
