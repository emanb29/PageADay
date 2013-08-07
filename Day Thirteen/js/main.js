var cwidth = 640;
var cheight = 480;
var FPS = 60;
var drawh = 480 - 40;
$(document).ready(function () {
  c = $("<canvas width ='" + cwidth + "' height='" + cheight + "'></canvas>");
  $(c).appendTo('#game');
  $(c)[0].oncontextmenu = function () {
    return false;
  }
  ctx = $(c)[0].getContext('2d');

  
});


var ar=new Array(33,34,35,36,37,38,39,40,32); //PgUp(33), PgDn(34), End(35), Home(36), Left(37), Up(38), Right(39), Down(40), Space(32)

$(document).keydown(function(e) {
     var key = e.which;
      //console.log(key);
      if($.inArray(key,ar) > -1) {
          e.preventDefault();
          return false;
      }
      return true;
});