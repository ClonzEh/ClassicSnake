var clonazia;
var display;

//initial code
function startGame() {

    clonazia = new start();

    clonazia.initiateFunctions();
}

function addGameElements(parent) {

    parent.append('<div id="background" style="overflow: hidden; position: absolute; width: 100%; height: 100%; background-color: black; "/>');
    $('#background').append('<div id="wrapper" style="background-color: black; overflow: hidden; margin: auto; position: absolute; top: 0; left: 0;bottom: 0; right: 0; "/>');
    $('#wrapper').append('<div class="splittershow" id="gameView" style=""/>');
    $('#gameView').append('<canvas id="backgroundCanvas" style="position: absolute; width: 100%; height: 100%; "/>');
    $('#gameView').append('<canvas id="gameCanvas" style="position: absolute; transform: translateZ(0);"></canvas>');
    $('#gameView').append('<canvas id="foregroundCanvas" style="pointer-events: none; position: absolute; transform: translateZ(0);"></canvas>');
}

function start() {

    console.log('starting code...');
    addGameElements($('body'));
    this.name = null;
    this.loading = true;
    this.connecting = false;
    this.retry = 0; //server connect

    this.game;
}

start.prototype.initiateFunctions = function() {

    this.ready = function() { clonazia.game = new game(); };
    display = new display_init();
    display.resize();

    display.change(display.intro);

    this.loader = new load_init();
    /*new startSocket();*/

    this.resize();
};

start.prototype.resize = function() {

    /*$('#load_text').css('font-size', $('#intro').height() * 0.04 + 'px');
    $('#load_title').css('font-size', $('#intro').height() * 0.1 + 'px');
    $('#load_subtext').css('font-size', $('#intro').height() * 0.02 + 'px');
    $('#load_createdby').css('font-size', $('#intro').height() * 0.02 + 'px');
    $('#load_play').css('font-size', $('#intro').height() * 0.029 + 'px');*/

};

start.prototype.finishLoading = function() {

    clonazia.loading = false;
    console.log('loading is finished!');
   // if (clonazia.connecting == true) { return; }
    clonazia.startGame();
};

//Attempts to start game (requires connectivity and loaded assets)
start.prototype.startGame = function () {

    if (clonazia.connecting == false && clonazia.loading == false) {
        clonazia.game = new game();
        clonazia.game.begin();
    }

};

start.prototype.finishConnecting = function() {

    console.log('testing connection...');
    //Connecting to server...
    sendPacket({id: 'testconnect'});
    setTimeout(function() {

        if (clonazia.connecting == true) {

            console.log('connection failed, retrying...');
            socket.close();
            //socket = null;
            //new startSocket();
        }
    }, 4500);
};

start.prototype.retryConnection = function() {

    clonazia.restart();
};

start.prototype.connected = function() {

    console.log('connection test completed!');
    clonazia.connecting = false;
    // if (clonazia.loading == true) { return; }
    $('#retry').css('visibility', 'hidden');
    clonazia.startGame();
};

start.prototype.restart = function() {

    clonazia.game = null;
    clonazia.connecting = true;
    //if (connected()) { socket.close(); }

    console.log('game restarted');
    this.name = null;

    new startSocket(this.finishConnecting);

};
