const states = {
    justLanded: "Just Landed",
    notPlaying: "Not Playing",
    waitingForOpponent: "Waiting for Opponent",
    playing: "Playing",
    wonOrLost: "Won or Lost"
}

const outcomes = {
    tie: 0,
    player1Win: 1,
    player2Win: 2
}

const rockPaperScissors = {
    rock: "Rock",
    paper: "Paper",
    scissors: "Scissors"
}

$(document).ready(function () {

    var state = states.justLanded;
    var playerId = null;
    var opponentId = null;

    $("#rps-buttons").hide();

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

    /* Reset database */
    // deleteUsers(db);
    // return;

    var joinTime = moment().format();

    $("#joinGame").on("click", function () {
        console.log("trying to add player");
        playerId = writeNewPlayerToFirebase(db, joinTime);
        $("#playerId").text(playerId);

        opponentId = findOpponent(db);
        // If can't find opponent notify the user.
        if (!opponentId) {
            $("#status").text("We couldn't find another user to play against.");
            state = states.notPlaying;
            // updateUI(state);
        } else {
            console.log("Chosen opponent id = " + opponentId);
            $("#opponentId").text(opponentId);
            setUserToPlaying(db, playerId);
            setUserToPlaying(db, opponentId);
            $("#rps-buttons").show();
        }
    });

    $("#rock,#paper,#scissor").on("click", function () {
        setUserMove(db, playerId, $(this).attr("data-move"));
    });
});

// Put a new player into firebase.
function writeNewPlayerToFirebase(db, joinedTime) {

    // WORKING
    var key = db.ref('players/').push({
        joinedTime: joinedTime,
        isPlaying: 0
    }).key;

    return key;
}

function findOpponent(db) {

    // Find all dinosaurs whose height is exactly 25 meters.
    // var ref = firebase.database().ref("dinosaurs");
    // ref.orderByChild("height").equalTo(25).on("child_added", function(snapshot) {
    // console.log(snapshot.key);
    // });

    // var key;
    // var ref = db.ref('players/');
    // ref.orderByChild("isPlaying").equalTo(0).on("child_added", function (snapshot) {
    //     console.log("Opponent key = " + snapshot.key);
    //     key = snapshot.key;
    // });

    var key;
    var ref = db.ref('players/');
    ref.orderByChild("isPlaying").equalTo(0).on("child_added", function (snapshot) {
        console.log("Opponent key = " + snapshot.key);
        key = snapshot.key;
    });

    if (key) {
        return key;
    } else {
        // Return false if can't find another player.
        return false;
    }
}

function setUserToPlaying(db, key) {

    var ref = db.ref('players/');
    var result = db.ref('/players/' + key + '/isPlaying').set(1);
    return result;
}

function deleteUsers(db) {
    var playersNode = db.ref('players/');
    playersNode.remove();
}

function setUserMove(db, key, move) {
    console.log("setUserMove " + key + " " + move);
    var ref = db.ref('players/');
    var result = db.ref('/players/' + key + '/move').set(move);
    return result;
}



function determineWinner(db, player1Move, player2Move) {

    if (player1Move === player2Move) {
        return outcomes.tie;
    } else if (player1Move === rockPaperScissors.rock && player2Move === rockPaperScissors.paper) {
        return outcomes.player2Win;
    } else if (player1Move === rockPaperScissors.rock && player2Move === rockPaperScissors.scissors) {
        return outcomes.player1Win;
    } else if (player1Move === rockPaperScissors.paper && player2Move === rockPaperScissors.rock) {
        return outcomes.player1Win;
    } else if (player1Move === rockPaperScissors.paper && player2Move === rockPaperScissors.scissors) {
        return outcomes.player2Win;
    } else if (player1Move === rockPaperScissors.scissors && player2Move === rockPaperScissors.rock) {
        return outcomes.player2Win;
    } else if (player1Move === rockPaperScissors.scissors && player2Move === rockPaperScissors.paper) {
        return outcomes.player2Win;
    } else {
        return null;
    }
}