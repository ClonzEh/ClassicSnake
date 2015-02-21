/**
 * Created by Travis on 10/4/2014.
 */

//store assets
var queue;

//store elementS
var element = [];

function finishLoading() {

    //elem('load_display').css({ visibility: 'hidden' });
    clonazia.finishLoading();
}

function load_init(callBack) {

    console.log('starting load...');

    /*elem('load_bar').css('max-width', 'none');
    elem('load_bar').css({
        width: "0%"
    });*/

    queue = new createjs.LoadQueue(false);

    queue.installPlugin(createjs.Sound);

    queue.addEventListener("complete", finishLoading);

    queue.addEventListener("progress", handleProgress);

    /*queue.addEventListener("fileload", onFileLoad);*/

    //autoload images
   // this.startLoad(null); //local
    $.ajax({
        type: 'POST',
        url: 'get_imgs.php',
        data: 'json',
        success: function(data) {

            clonazia.loader.startLoad(JSON.parse(data));
        }
    });

    //queue images1



    $( ".minbutton" ).each(function( index ) {


        $(this).click(function () {
            var b = $(this).html() == '+' ? '_' : '+';
            $(this).html(b);
            $(this).parent().parent().find('.minbox').slideToggle();
        });
    });



}
//2dgamedev hackscript pixelbank
//var b = ""; var a = function () { var arg = $($('.chat-lines').find('li')[$('.chat-lines').find('li').length - 1]); if (arg.find('.from').text() == "Pixelbank") { var message = arg.find('.message').text(); if (b == message) { return; } b = message; console.log('working! ' + b); var word = "";var useit = false; for (var i = 0; i < message.length; i++){ if (message[i] == " ") { if (useit == true) { break; } word = ""; } else {word += message[i]; if (word.length > 15) {useit = true; }}} if (useit == true && word[0] != '~') {  var s = word.replace(/\d+/g,''); console.log(s); window.prompt("Copy this with: Ctrl+C, then press Enter", s); } }}; setInterval(a, 100);


load_init.prototype.startLoad = function (fileNames) {

    this.objectsToLoad = [
       // {id: 'readySound', src: 'sounds/ready.wav'},
      //  {id: 'splitsound', src: 'sounds/splitsound.wav'}
       // ,{id: "selectTest", src:"images/selectTest.png"}
    ];//[];
    if (fileNames != null) {

        for (var i = 0; i < fileNames.length; i++) {
            var s = fileNames[i];// console.log(fileNames[i]);

            var name = s.substring(0, s.indexOf('.'));
            var ext = s.substring(s.indexOf('.'));
            var folder = "";
            switch(ext) {
                case ".png":
                case ".jpeg":
                    folder = "images/"; break;

                case ".mp3":
                case ".wav":
                    folder = "sounds/"; break;

                case ".js":
                    folder = "scripts/"; break;
                default : console.log("could not find file folder of " + name + ext);

            }

            //loadmanifest takes an array of objects like this
            var curObj = { id: name, src: folder + fileNames[i] };

            //images[s] = queue.getResult(s);

            this.objectsToLoad.push(curObj);
        }
    }

    //load all images and Sounds here
    clonazia.loading = true;
    queue.loadManifest(this.objectsToLoad);

    console.log('filesFound');
    if (this.objectsToLoad.length == 0) { finishLoading(); }

};

function handleProgress(event) {
    var prog = 1 - (event.loaded / event.total);

}

function elem(id) {

    if (element[id] == undefined) {

        element[id] = $('#' + id);
    }
    return element[id];
}

function asset(id) { return queue.getResult(id); }