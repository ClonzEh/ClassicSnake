/**
 * Created by Travis on 10/4/2014.
 */

//accesses an array.something.something... or array.something.
function findProto(list, value) {

    var current;

    if (typeof value == typeof ["1", "2"]) { current = list[value[0]]; } else { return list[value]; }
    for (var i = 1; i < value.length; i++){

        current = current[value[i]];
    }

    return current;
}
//returns the list[array] object
function findListValue(list, value, proto) {


    if (proto != undefined) {

        for (var i = 0; i < list.length; i++) {


            if (findProto(list[i], proto) === value) {

                return {object: list[i], number: i };
            }
        }

    } else {

        for (var i = 0; i < list.length; i++) {

            if (list[i] === value) {

                return {object: list[i], number: i };
            }
        }
    }
    return null;
}

function distance(p1, p2) {

    if(p1.x == undefined) { return Math.sqrt(Math.pow((p1 - p2), 2)); }
    var dx = p2.x - p1.x;
    var dy = p2.y - p1.y;
    var x = dx * dx;
    var y = dy * dy;
    return Math.sqrt( x + y );
}

function rcon(tog) {
    var toggle = tog || true;
    var visibility = toggle == true ? 'visible' : 'hidden';
    $('#console').css({ visibility: visibility });

}

function moveArrayTo(array, old_index, new_index) {

    if (new_index >= array.length) {
        var k = new_index - array.length;
        while ((k--) + 1) {
            array.push(undefined);
        }
    }
    array.splice(new_index, 0, array.splice(old_index, 1)[0]);
}

function rect(x, y, width, height) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
}

function stretch(imageOrSize, width, height) {

    var img = imageOrSize;
   /* if (imageOrSize.image != undefined) { img = imageOrSize.image; }
    else { img = imageOrSize; }*/

    var currentWidth = img.image.width;
    var currentHeight = img.image.height;

    var desiredWidth = width;
    var desiredHeight = height;

    var scaleX = desiredWidth / currentWidth;
    var scaleY = desiredHeight / currentHeight;

    return {x: scaleX, y: scaleY };
}



//@params - { element, func }
/*// add ready click event
 varelementClick = function(event) {
 if (!event.isPropagationStopped()) {

 // stop event from propagating to parents
 event.stopPropagation();

 // do something here
 }
 }
 $('#id').click( elementClick.bind(this) );*/
function addClick(info) {

    var flag = false;
    var func = info.func;

    info.element.bind('touchstart click', function(){
        if (!flag) {
            flag = true;
            setTimeout(function(){ flag = false; }, 100);
            func($(this));
        }
        //return false;
    });

    /*info.element.on('touchstart click', function(){

     info.func();
     });*/
}

//@params - { element, func }
function addMouseDown(info) {

    var flag = false;
    var func = info.func;
    info.element.bind('touchstart mousedown', function(){
        if (!flag) {
            flag = true;
            setTimeout(function(){ flag = false; }, 100);
            func($(this));
        }
        return false
    });
}

//@params - { element, func }
function addMouseUp(info) {

    var flag = false;
    var func = info.func;
    info.element.bind('touchend mouseup', function(){
        if (!flag) {
            flag = true;
            setTimeout(function(){ flag = false; }, 100);
            func($(this));
        }
        return false
    });
}