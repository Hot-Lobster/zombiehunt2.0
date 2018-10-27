import firebase from "firebase";

var config = {
  apiKey: "AIzaSyDARGoHM-6pSo0Fa6NZRKMxvRRPq9TDQDY",
  authDomain: "brainzzz-dbec8.firebaseapp.com",
  databaseURL: "https://brainzzz-dbec8.firebaseio.com",
  projectId: "brainzzz-dbec8",
  storageBucket: "",
  messagingSenderId: "720576195403"
};

firebase.initializeApp(config);

const database = firebase.database();
export default database;

// Click event for dynamically added <li> elements || Option Selection
// export function playerMovement() {
//   this.state.x;
//   this.state.y;
//   // Grabs text from li choice
//   // var clickChoice = $(this).text();
//   console.log(playerRef);

//   // Sets the choice in the current player object in firebase
//   // playerRef.child("choice").set(clickChoice);

//   // Increments turn. Turn goes from:
//   // 1 - player 1
//   // 2 - player 2
//   // 3 - determine winner
//   // currentTurnRef.transaction(function(turn) {
//   //   return turn + 1;
//   // });
// }
