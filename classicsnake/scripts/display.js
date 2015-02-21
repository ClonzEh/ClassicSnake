/**
 * Created by Travis on 10/4/2014.
 */

function display_init() {

    this.aspectRatio = { x: 4, y: 3 };

    this.background = elem('background');

    this.wrapper = elem('wrapper');
    this.current = null;

    //set resolution
    this.resolution = { x: 800, y: 800 };
    /*var test = this.background.width() < this.background.height() ? this.background.width() : this.background.height();
    this.resolution = { x: test, y: test };*/
    //this.resolution = { x: this.background.width(), y: this.background.height() };

    this.resize;
    window.addEventListener('resize', this.resize.bind(this), false);

}

display_init.prototype.resize = function() {

    // resize background and wrapper here

    var r = this.resolution; //aspect ratio to maintain (background image size)
    //might want to move aspectRatio somewhere else?

    //get maximum screen size
    var max = { x: this.background.width(), y: this.background.height()};

    //figure out maximum resolution while maintaining aspect ratio
    if ((max.x / r.x) * r.y > max.y) {
        max.x = Math.floor( (max.y / r.y) * r.x );
    } //limiting factor is height->adjust width
    else {
        max.y = Math.floor( (max.x / r.x) * r.y );
    } //limiting factor is width->adjust height


    /*max.x = Math.floor(max.x);
    max.y = Math.floor(max.y);

    if (max.x % 2 != 0) { max.x -= 1; }
    if (max.y % 2 != 0) { max.y -= 1; }
    if (this.resolution.x == this.resolution.y && max.x != max.y) {

        max.y =  max.x;
        console.log('resolutions are not the same! fixing...');
    }*/
    //adjust background and wrapper

    this.wrapper.css("width", max.x);
    this.wrapper.css("height",max.y);

    //adjust stage stretch and shrink appropriately

    elem('gameCanvas').css({
        width: max.x,
        height: max.y
    });
    elem('backgroundCanvas').css({
        width: max.x,
        height: max.y
    });
    elem('foregroundCanvas').css({
        width: max.x,
        height: max.y
    });



    switch (display.current) {

        case 'intro' : clonazia.resize(); break;

    }

    if (clonazia.game != null) {

        /*var cct = document.getElementById("gameCanvas");
        var cct1 = document.getElementById("backgroundCanvas");
        var cct2 = document.getElementById("foregroundCanvas");

        cct.style.left = 0 + 'px';
        cct.width = max.x;
        cct.height = max.y;

        cct1.width = max.x;
        cct1.height = max.y;

        cct2.width = max.x;
        cct2.height = max.y;*/

        var rx = (clonazia.game.background.canvas.width / r.x);
        var ry = (clonazia.game.background.canvas.height / r.y);

        clonazia.game.stage.scaleX = rx;
        clonazia.game.stage.scaleY = ry;
        clonazia.game.background.scaleX = rx;
        clonazia.game.background.scaleY = ry;
        clonazia.game.foreground.scaleX = rx;
        clonazia.game.foreground.scaleY = ry;

        clonazia.game.stage.update();
        clonazia.game.background.update();
        clonazia.game.foreground.update();

        clonazia.game.resize();
    }


    //if (clonazia.display[this.current].resize != undefined && clonazia.display[this.current].resize != null) { clonazia.display[this.current].resize(); }
};

display_init.prototype.change = function(newDisplay) {

    if (this.current != null) { elem(this.current).css('visibility', 'hidden'); }
    this.current = newDisplay.id;
    elem(this.current).css('visibility', 'visible');

    if (newDisplay.action != null) { newDisplay.action(); }

};



display_init.prototype.intro = {id: 'intro', action: function() { elem('wrapper').focus(); }};//, resize: null };
display_init.prototype.game =  {id: 'gameView', action: function() { elem('gameCanvas').focus(); }};//, resize: clonazia.game.resize };

function changeScale(currentScale, desiredWidth, desiredHeight) {


}

