import React from "react";
import gameboardImage from "../imgs/gameBoard/board.png"; //image path placeholder
import database from "../firebase/firebase";
import char1 from "../imgs/p2char/char1.png";
const playerSpawn = database
  .database()
  .ref("players")
  .orderByChild("position");

export default class BoardAndGrid extends React.Component {
  createGrid = () => {
    let grid = [];
    // length of the grid
    for (let i = 1; i < 13; i++) {
      // width of the grid
      for (let j = 1; j < 18; j++) {
        grid.push(<div className="block" id={`${j},${i}`} key={`${j},${i}`} />);
      }
    }
    return grid;
  };
  grabTasks() {
    var x = [];
    playerSpawn.ref("players.position").on("value", function(snapshot) {
      return (x = snapshot.val());
    });
    this.setState({ position: x });
  }
  render() {
    return (
      <div id="game-container">
        <div id="grid-container">{this.createGrid()}</div>
        <div id="game-image-container">
          {<img src={gameboardImage} className="img-fluid" alt="gameboard" />}
        </div>
        <div>
          {this.state.position.map(position => {
            return (
              <div id={position}>
                {<img src={char1} alt="char" className="img-fluid" />}
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}
