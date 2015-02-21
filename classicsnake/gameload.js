var scriptCount = 0;

function onLoad() {
    //game is started after ajax callback
    $.ajax({
        type: 'POST',
        url: 'get_scripts.php',
        data: 'json',
        success: function(data) {

            loadScripts(JSON.parse(data));
        }
    });

}

//@param file names.ect []
function loadScripts(param) {

    for (var i = 0; i < param.length; i++) {

        $.getScript(param[i], function() {

            scriptCount++;
            if (scriptCount == param.length) {

                startGame();
            }
        });
        //loadjscssfile(param[i], 'js');
    }
    unloadAllJS();

}

function unloadJS(scriptName) {
    var head = document.getElementsByTagName('head').item(0);
    var js = document.getElementById(scriptName);
    js.parentNode.removeChild(js);
}

function unloadAllJS() {
    var jsArray = [];
    jsArray = document.getElementsByTagName('script');
    for (i = 0; i < jsArray.length; i++){
        if (jsArray[i].id){
            unloadJS(jsArray[i].id)
        }else{
            jsArray[i].parentNode.removeChild(jsArray[i]);
        }
    }
}