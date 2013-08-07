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

  function boundcheck(v){
    if (v.x < 0) v.x = 0;
    if (v.y < 0) v.y = 0;
    if (v.x > cwidth-v.width) v.x = cwidth-v.width;
    if (v.y > cheight-v.width) v.y = cheight-v.width;
    return v;
  }

  var player = {
    width: 20,
    height: 20,
    x: cwidth/2,
    y: (cheight - 20),
    speed: 2,
    bullets: [],
    draw: function () {
      //console.log(this);
      ctx.fillStyle = '#000';
      ctx.fillRect(this.x, this.y, this.width, this.height);
      for (var i = this.bullets.length - 1; i >= 0; i--) {
        this.bullets[i].draw();
      };
    },
    move: function () {
      if (keydown.up || keydown.w){
        this.y -= this.speed;
      }
      if (keydown.down || keydown.s){
        this.y += this.speed;
      }
      if (keydown.left || keydown.a){
        this.x -= this.speed;
      }
      if (keydown.right || keydown.d){
        this.x += this.speed;
      }
      player = boundcheck(this);
      for (var i = this.bullets.length - 1; i >= 0; i--) {
        this.bullets[i].move();
      };
    }
  }
  $(c).mousedown(function (e) {
    var b = new Bullet(player.x+player.width/2, player.y+player.height/2, e.offsetX, e.offsetY);
    console.log(b);
    player.bullets.push(b);
  })
  function Bullet(x, y, cx, cy) {
    var b = {
      x: x,
      y: y,
      width: 5,
      height: 5,
      speed: 1/10,
      move: function () {
        this.life++;
        this.x += (cx-x)*this.speed;
        this.y += (cy-y)*this.speed;
        this.handlecollisions();
      },
      draw: function() {
        ctx.fillStyle = '#000';
        ctx.fillRect(this.x, this.y, this.width, this.height);
      },
      handlecollisions: function () {
        if (Math.abs(this.x-cx) < 2 || Math.abs(this.y-cy) < 2){
          player.bullets.splice(player.bullets.indexOf(this), 1);
        }
      }
    }


    return b;
  }
  var onFrameUpdate = setInterval(update, 1000/FPS);
  function update() {
    player.move();
    draw();
  }
  function draw() {
    cls();
    player.draw();
  }
  function cls() {
    ctx.fillStyle = '#fff';
    ctx.fillRect(0,0,cwidth,cheight);
  }
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