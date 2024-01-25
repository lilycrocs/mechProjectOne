// receives osc messages from chataigne websocket
// micro sends osc messages to chataigne websocket
// chataigne maps osc to this code 
// this code 
// p5js draws using the coordinates from OSC.


var notes = ["03C" , "03D" , "03E" , "03G" , "04A" , "04C"]; // array of note values
    // to assign wave height values to and then send to pilot
var host = '127.0.0.1:8888'; // address of the websockets server
var socket; // the websocket connection
var note;
var noteAsString;

function setup() {
    // connect to server...
    socket = new WebSocket('ws://' + host);
    socket.onopen = openHandler;
    socket.onmessage = messageHandler;
    createCanvas(1500,750);
}

function openHandler() {
    console.log("Connected to socket server at " + host);
}

function messageHandler(event) {
    var msg = event.data; // read data from the onmessage event
    //waveHeights = msg; // puts osc message in wave number variable
    var note = notes[int(msg*6)] // converts received message to a note value
    console.log(note);
    playNote(note);
}



function playNote(note) {
    noteAsString = note.toString();

    // send the note to the websocket server
    // (if the socket is open and ready)
    if (socket.readyState == 1) {
        socket.send(noteAsString);
        //console.log("Sent: " + note);
        console.log(noteAsString)
    } else {
        console.log("Socket not ready.");
    }
}


function draw() { //function to assign a hexcode to the background color
    // based on the note that's being sent to chataigne
    if (noteAsString == "03C") {
        background('#f74a5c'); // red for 03C
        } else if (noteAsString == "03D") {
        background('#f7b54a'); // orange for 03D
        } else if (noteAsString == "03E") {
        background('#f7e04a'); // yellow for 03E
        } else if (noteAsString == "03G") {
        background('#4af75c'); // green for 03G
        } else if (noteAsString == "04A") {
        background('#4ae6f7'); // blue for 04A
        } else if (noteAsString == "04B") {
        background('#a74af7'); // purple for 04B
        }
}
