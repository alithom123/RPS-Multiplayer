// $(document).ready(function() {
//   const db = firebase.database();
//   console.log(db);
// });

$(document).ready(function () {

  var config = {
    apiKey: "AIzaSyCZw9l72ctwOAQFlmACJesWLPY1J-vJC0g",
    authDomain: "multiplayer-rockpapersci-d265b.firebaseapp.com",
    databaseURL: "https://multiplayer-rockpapersci-d265b.firebaseio.com",
    projectId: "multiplayer-rockpapersci-d265b",
    storageBucket: "multiplayer-rockpapersci-d265b.appspot.com",
    messagingSenderId: "279340573344"
  };
  firebase.initializeApp(config);

  const db = firebase.database();
  console.log("db:");
  console.log(db);

  // This resets the data in players database.
  // resetData();
  // return;

  var joinTime = moment().format();
  // var playerId = createPlayerId();
  //   $("#playerId").text(playerId);

  // This works.
  db.ref().set({
    test: 100
  });

  $("#addPlayer").on("click", function () {
    console.log("trying to add player");
    var playerId = writeNewPlayerToFirebase(db, joinTime);
    $("#playerId").text(playerId);
  })


  // var opponentId = getOpponent();
  // $("#opponentId").text(opponentId);

  // setPlayersToPlaying(playerId, opponentId);
});

// Put a new player into firebase.
function writeNewPlayerToFirebase(db, joinedTime) {
  // firebase;
  // .database()
  // //   .ref("users/" + userId)
  // .ref("players")
  // .set({
  //   timePressedPlay: joinedTime,
  //   playerId: playerId
  // });

  db.ref('users/').push({
    name: "test",
    email: "asdf",
    age: "23",
    comment: "teasdfa"
  })

  // var playersNode = firebase.database().ref("data/players");
  // var playersRef = db.ref("players");
  // console.log("playersRef:");
  // console.log(playersRef);

  // This overrides data.
  // var key = playersRef.push({
  //   joinedTime: joinedTime,
  //   playing: false
  // }).key;
  // console.log("Created player in firebase with key:" + key);

  // From https://firebase.google.com/docs/database/web/read-and-write

  // Create a new post reference with an auto-generated id
  // var newPlayerRef = playersRef.push();
  // newPlayerRef.set({
  //   a: "apples",
  //   id: createPlayerId()
  // });

  // const dbRef = firebase.database().ref("/pictures");
  // const newPicture = dbRef.push();
  // newPicture.set(record);

  // var postData = {
  //   author: "Test",
  //   uid: "uid",
  //   body: "body",
  //   title: "title",
  //   starCount: 0,
  //   authorPic: "picture"
  // };

  // Get a key for a new Post.
  // var newPlayerId = firebase
  //   .database()
  //   .ref()
  //   .child("players")
  //   .push().key;
  // console.log("newPlayerId = " + newPlayerId);

  // Write the new post's data simultaneously in the posts list and the user's post list.
  // var updates = {};
  // updates["/players/" + newPlayerId] = postData;
  // console.log("updates:");
  // console.log(updates);

  // firebase
  //   .database()
  //   .ref()
  //   .update(updates);

  // console.log("Created player: ");
  // console.log(key);

  // return key;
}

function getOpponent() {
  console.log("getOpponent");
  // var playersNode = firebase.database().ref("data/players");
  const db = firebase.database();
  const playersRef = db.child("players");

  var opponentId = null;

  // console.log(playersRef.orderByKey().limitToFirst(10));

  // playersNode
  //   .orderByChild("playing")
  //   .equalTo(false)
  //   .limitToFirst(1)
  //   .on("value", function(snapshot) {
  //     snapshot.forEach(function(childSnapshot) {
  //       var childKey = childSnapshot.key;
  //       var childData = childSnapshot.val();
  //       console.log(childKey);
  //       console.log(childData);
  //       opponentId = childKey;
  //     });
  //   });

  console.log(opponentId);
  return opponentId;
}

function setPlayersToPlaying(player1Key, player2key) {
  console.log("setPlayersToPlaying");
  console.log(player1Key);
  var playersNode = firebase.database().ref("data/players");
  //   var hopperRef = usersRef.child("gracehop");
  // hopperRef.update({
  //   "nickname": "Amazing Grace"
  // });
  playersNode.child(player1Key).update({
    playing: true
  });
}

// function notifyPlayerIsPlaying() {
//   var playersNode = firebase.database().ref("players/");

//   playersNode
//   .orderByChild("playing")
//   .equalTo(false)
//   .limitToFirst(1)
//   .on("value", function(snapshot) {
//     var opponentId = null;

//     snapshot.forEach(function(childSnapshot) {
//       var childKey = childSnapshot.key;
//       var childData = childSnapshot.val();
//       console.log(childKey);
//       console.log(childData);
//       opponentId = childKey;
//     });

//     $("#opponentId").text(opponentId);
//     console.log("test");
//   });

// console.log(opponentId);

// }

// ref.child('users').orderByChild('name').equalTo('John Doe').on("value", function(snapshot) {
//   console.log(snapshot.val());
//   snapshot.forEach(function(data) {
//       console.log(data.key);
//   });
// });
// https://stackoverflow.com/questions/16637035/in-firebase-when-using-push-how-do-i-pull-the-unique-id

// myDataRef.on('child_added', function(snapshot) {
//     var message = snapshot.val();
//     var id = snapshot.key;
//     displayChatMessage(message.name, message.text, message.category, message.enabled, message.approved);
// });

// UTILITY FUNCTIONS
function createPlayerId() {
  // There's gotta be a better way to generate an id, but for now will use a random number.
  return Math.floor(Math.random() * 10000 + 1);
}

// function resetData() {
//   var playersNode = firebase.database().ref("data");
//   playersNode.remove();
// }