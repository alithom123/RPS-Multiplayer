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

    var joinTime = moment().format();

    $("#addPlayer").on("click", function () {
        console.log("trying to add player");
        var playerId = writeNewPlayerToFirebase(db, joinTime);
        $("#playerId").text(playerId);
    })

});

// Put a new player into firebase.
function writeNewPlayerToFirebase(db, joinedTime) {

    db.ref('users/').push({
        joinedTime: joinTime
    });

}