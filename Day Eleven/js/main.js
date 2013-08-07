var cwidth = 640;
var cheight = 480;
var FPS = 30;
var drawh = 480 - 40;
$(document).ready(function () {
  c = $("<canvas width ='" + cwidth + "' height='" + cheight + "'></canvas>");
  $(c).appendTo('#game');
  $(c)[0].oncontextmenu = function () {
    return false;
  }
  ctx = $(c)[0].getContext('2d');
  setInterval(update, 1000/FPS);
  function update() {
    draw();
    for (var i = parts.length - 1; i >= 0; i--) {
      parts[i].move();
    };
  }
  function draw(){
    ctx.fillStyle = '#ccc';
    ctx.fillRect(0,0,cwidth,cheight);
    for (var i = parts.length - 1; i >= 0; i--) {
      parts[i].draw();
    };
  }
  parts = [];
  function Sugar (x, y) {
    var sugar = {
      x: x,
      y: y,
      width: 1,
      height: 1,
      active: true,
      draw: function() {
        ctx.fillStyle = '#000';
        ctx.fillRect(this.x, this.y, this.width, this.height);
      },
      move: function () {
        if (this.active){
          if (this.y < cheight-this.height){
            this.y+=5;
          } else{
            this.y = cheight-this.height;
            this.active = false;
          }
          for (var i = parts.length - 1; i >= 0; i--) {
            if (this.x == parts[i].x && this.y >= parts[i].y-this.height && !parts[i].active) {
              this.y = parts[i].y-this.height;
              this.active = false;
            }
          };
        }
      }
    };
    return sugar;
  }
  /*c.click(function (e) {
    var s = new Sugar(e.offsetX, e.offsetY);
    parts.push(s);
  });*/
  c.mousedown(function (e) {
    if (e.button == 2) {
      //console.log(e);
      var cx, cy;
      cx = e.offsetX;
      cy = e.offsetY;
      var md = setInterval(function () {
        var s = new Sugar(cx, cy);
        parts.push(s);
      }, 50);
      c.mousemove(function (e) {
        cx = e.offsetX;
        cy = e.offsetY;
      });
      c.mouseup(function (e){
        clearInterval(md);
      });
    }
  });

});