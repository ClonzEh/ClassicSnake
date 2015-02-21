console.rlog = function(obj) { console.log(JSON.parse(JSON.stringify(obj))); };

//Start game code...
function game() {

    if (navigator.userAgent.toLowerCase().indexOf('chrome') > -1) { console.clear(); }
    console.log('Starting game...');

    //Quick reference for resolution
    this.width = display.resolution.x;
    this.height = display.resolution.y;
    this.fpsTimer = 0;
    //document.body.addEventListener('touchmove', function(e){ e.preventDefault(); });
    this.frameRate = 60;

    /**
     *SETTING CANVAS PIXEL DENSITY
     */
    {

        var cct = document.getElementById("gameCanvas");
        var cct1 = document.getElementById("backgroundCanvas");
        var cct2 = document.getElementById("foregroundCanvas");

        cct.style.left = 0 + 'px';
        cct.width = this.width;
        cct.height = this.height;

        cct1.width = this.width;
        cct1.height = this.height;

        cct2.width = this.width;
        cct2.height = this.height;
    }

    this.stage = new createjs.Stage("gameCanvas");
    this.background = new createjs.Stage("backgroundCanvas");
    this.foreground = new createjs.Stage("foregroundCanvas");

    var update = function(e) { this.tick(e); };
    createjs.Ticker.setFPS(this.frameRate);
    createjs.Ticker.addEventListener("tick", update.bind(this));
    createjs.Touch.enable(this.stage);
    this.stage.enableMouseOver(60); //low number takes more time to respond (mouseover event listener)


    this.background.update();
}
game.prototype.resize = function () {

    var width = $('#gameView').width();
    var height = $('#gameView').height();
};

game.prototype.controller = function () {

    this.gameSize = { x: 35, y: 35 };
    this.blockSize = { width: this.width / this.gameSize.x >> 0, height: this.height / this.gameSize.y >> 0 };

    this.startingDirection = 'left';
    this.spacing = 0;
    this.startLocation = { x: ~~((this.gameSize.x * this.blockSize.width) / 2), y: ~~((this.gameSize.y * this.blockSize.width) / 2) };
    this.startLength = 2;
    this.moveDelay = 100;

    // SCENE COLOR SCHEME
    this.mainColors = {

        snake: 'green',
        food: 'red'
    };
    // ADD LAYERS [See Draw Order for Add/Remove/Order]
    this.layers = {

        snake: new createjs.Container(),
        tail: new createjs.Container(),
        food:  new createjs.Container(),
        border: new createjs.Container()
    };

    // DISPLAY ORDER OF THE LAYERS
    this.drawOrder = [

        this.layers.food,
        this.layers.tail,
        this.layers.snake,
        this.layers.border

    ];

    // ADJUST GRID POSITION (automatic but changeable)
    $('#wrapper').css('background', 'rgba(18,18,18,1');

};

game.prototype.begin = function () {

    console.log('begin');
    this.controller(); //quick control

    //Properties
    this.moveTimer = 0; //moveTick tracker
    this.score = 0;


    //Deal with layers & containers...
    for (var i = 0; i < this.drawOrder.length; i++){ this.stage.addChild(this.drawOrder[i]); }

    createUserInterface();
    //run events
    this.events();

    //game code
    createShape({x: this.blockSize.width / 2, y: this.blockSize.height / 2, width: this.width - this.blockSize.width - 7, height: this.height - this.blockSize.height - 7 }
        , 'white', 'border', this.layers.border, true);

    this.scoreText = new createjs.Text(this.score, "20px Arial", "white");
    this.layers.border.addChild(this.scoreText);
    this.scoreText.x = this.width / 2;
    this.scoreText.y = 30;

    this.tail;
    this.snake = createShape(
        { x: 0, y: 0, width: this.blockSize.width, height: this.blockSize.height }
        , this.mainColors.snake
        , 'snake'
        , this.layers.snake
    );

    this.food = createShape(
        { x: 0, y: 0, width: this.blockSize.width, height: this.blockSize.height }
        , this.mainColors.food
        , 'food'
        , this.layers.food
    );
    this.spawnFood();

    this.snake.direction = this.startingDirection;
    this.snake.lastDirection = 'left';
    this.snake.spacing = this.spacing;

    var game = this;
    this.snake.eat = function() {

        var newTail = createShape(
            { x: 0, y: 0, width: game.blockSize.width, height: game.blockSize.height }
            , game.mainColors.snake
            , 'tail'
            , game.layers.tail
        );
        game.score++;
        game.scoreText.text = game.score;
        newTail.x = game.tail[0].x;
        newTail.y = game.tail[0].y;
        game.tail.push(newTail);
        game.spawnFood();
    };

    this.snake.move = function () {
        //console.log(this);

        var lastTail = game.tail[game.tail.length - 1];
        lastTail.x = this.x;
        lastTail.y = this.y;
        moveArrayTo(game.tail, game.tail.length - 1, 0);

        switch (this.direction) {

            case 'right' : this.x += this.width + game.spacing; break;
            case 'left' : this.x -= this.width + game.spacing; break;

            case 'up' : this.y -= this.height + game.spacing; break;
            case 'down' : this.y += this.height + game.spacing; break;
        }
        this.lastDirection = this.direction;
        if (this.contains(game.food)) {

            this.eat();
        }

        for (var i = game.tail.length; i--;) {

            if (this.contains(game.tail[i])) { game.restart(); return; }
        }
        if ((this.x - this.width / 2 <= 0 || this.x + this.width / 2 >= game.width) ||
            (this.y - this.height / 2 <= 0 || this.y + this.height / 2 >= game.height)) {
            game.restart();
        }
    };

    this.restart();

};

game.prototype.spawnFood = function() {

    var x = Math.random() * (this.gameSize.x - 2) >> 0; x += 1;
    var y = Math.random() * (this.gameSize.y - 2) >> 0; y += 1;
    x *= this.blockSize.width;
    y *= this.blockSize.height;
    this.food.x = x;
    this.food.y = y;
    /*this.moveOnGrid(this.food, x, y);*/
};

game.prototype.restart = function() {

    this.score = 0;
    this.scoreText.text = this.score;
    this.moveOnGrid(this.snake, this.startLocation.x, this.startLocation.y);
    this.tail = [];
    this.layers.tail.removeAllChildren();
    for (var i = 0; i < this.startLength; i++) {

        var tail = createShape(
            { x: 0, y: 0, width: this.blockSize.width, height: this.blockSize.height }
            , this.mainColors.snake
            , 'tail'
            , this.layers.tail
        );
        if (i == 0) { tail.x = this.snake.x - this.snake.width; }
        else { tail.x = this.tail[i - 1].x - this.snake.width; }
        tail.y = this.snake.y;

        this.tail.push(tail);
    }

    this.snake.direction = 'right';
    this.snake.lastDirection = 'left';
    this.spawnFood();

};

game.prototype.moveOnGrid = function(object, x, y) {

    object.x = x + this.blockSize.width / 2 - this.spacing;
    object.y = y + this.blockSize.height / 2 - this.spacing;
};

//Deal with Shapes
function createShape(rect, color, name, container, stroke) {

    var shape = new createjs.Shape();
    shape.name = name || 'none';
    if (stroke != undefined) {
        shape.graphics.setStrokeStyle(1).beginStroke(color).drawRect(0, 0, rect.width, rect.height);
    } else {
        shape.graphics.beginFill(color).drawRect(0, 0, rect.width, rect.height);
    }
    shape.width = rect.width;
    shape.height = rect.height;
    shape.regX = rect.width / 2;
    shape.regY = rect.height / 2;
    shape.x = rect.x + shape.width / 2;
    shape.y = rect.y + shape.height / 2;
    shape.topLeft = function() {

        return { x: this.x - this.width / 2, y: this.y - this.height / 2 };
    };

    shape.rect = rect;
    shape.contains = function(point) {
        var tl = this.topLeft();
        return point.x >= tl.x && point.x < tl.x + this.width && point.y >= tl.y && point.y <= tl.y + this.height;
    };
    if (container != undefined) {

        container.addChild(shape);
    }

    return shape;
}

game.prototype.events = function () {

    var self = this;
    $(window).keydown(function(evt) {

        switch (evt.keyCode) {

            case 87 :
            case 38 :
                if (self.snake.lastDirection != 'down' ) self.snake.direction = 'up'; break;

            case 83 :
            case 40 :
                if (self.snake.lastDirection != 'up' ) self.snake.direction = 'down'; break;

            case 65 :
            case 37 :
                if (self.snake.lastDirection != 'right' ) self.snake.direction = 'left'; break;

            case 68 :
            case 39 :
                if (self.snake.lastDirection != 'left' )self.snake.direction = 'right'; break;
        }
        if (evt.keyCode == 13) {

            /*startPathFinding();*/
        }
    });
};

function pointRectangleIntersection(p, y) {
    var q = y.rect;
    var r = { x: y.x - q.width / 2, y: y.y - q.height / 2 };
    return (p.x > r.x && p.x < r.x + q.width && p.y > r.y && p.y < r.y + q.height);

}

//Create User-Interface CSS elements
function createUserInterface() {

    //imageview-in-game css relativeposition
    var layout = $('#gameView');
   /* $('body').append('<div id="debugger" style="z-index: 800; color:rgba(255,50,50,0.8);position: absolute;width: 17%; min-width: 70px; height:auto; right: 0; background-color: rgba(40,40,40,0.5); font-size: 14px; visibility: visible;"></div>');
    $('#debugger').append('<div id="fps" style="text-align: center;"><p>FPS: <b>20</b></p></div>');
    layout.append('<div id="interface" style="bottom: 0; position: absolute; z-index: 900; width: 92%; margin-left: 8%; min-width: 460px; height: 18%;"></div>');
    var interface = $('#interface');

    interface.append('<div class="interfaceSwitches"><input type="checkbox" id="quadtree" class="switch"/><label for="quadtree">Quad Tree</label></div>');
    addClick({ element: $('#quadtree'), func:
        function(e) { clonazia.game.quadIsOn = clonazia.game.quadIsOn ? false: true; }
    });

    interface.append('<div class="interfaceSwitches"><input type="checkbox" id="render" class="switch"/><label for="render">Render Objects</label></div>');
    addClick({ element: $('#render'), func:
        function(e) { clonazia.game.render = clonazia.game.render ? false: true;
            var a = clonazia.game.stage.canvas.getContext('2d');
            setTimeout(function(){a.clearRect(0,0,clonazia.game.width,clonazia.game.height);},20);
        }
    });

    interface.append('<div class="interfaceSwitches"><input type="checkbox" id="quads" class="switch"/><label for="quads">Render Quads</label></div>');
    addClick({ element: $('#quads'), func:
        function(e) { clonazia.game.renderQuads = clonazia.game.renderQuads ? false: true; }
    });

    interface.append('<div class="interfaceSwitches"><input type="checkbox" id="move" class="switch"/><label for="move">Motion</label></div>');
    addClick({ element: $('#move'), func:
        function(e) { clonazia.game.motion = clonazia.game.motion ? false: true; }
    });

    *//*interface.append('<div class="interfaceSwitches"><input type="range" min=0 max=1000 step=1 value=100 id="spawnables" /><label for="spawnables">objects</label></div>');*//*
*/
    clonazia.game.resize();
}

//Update loop, e for delta time
game.prototype.tick = function (e) {

    if (this.fpsTimer < e.timeStamp) {
        this.fpsTimer = e.timeStamp + 1000;
        $('#fps').html('<p>FPS: <b>' + ~~(createjs.Ticker.getMeasuredFPS() * 10) / 10 + '</b><br>Set to: ' + this.frameRate + '</p>');

    }
    if (this.moveTimer < e.timeStamp) {

        this.moveTimer = e.timeStamp + this.moveDelay;
        this.snake.move();
    }

    this.stage.update();
};

