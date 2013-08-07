var cwidth = 640;
var cheight = 480;
var FPS = 60;
$(document).ready(function () {
  c = $("<canvas width ='" + cwidth + "' height='" + cheight + "'></canvas>");
  $(c).appendTo('#game');
  $(c)[0].oncontextmenu = function () {
    return false;
  }
  ctx = $(c)[0].getContext('2d');

  lvl1();
});
var playersprite = $('<img>').attr('src', 'image/player.png').width(60).height(60);
var goalsprite = $('<img>').attr('src', 'image/goal.png').width(60).height(60);

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

function hittest(a, b){
  return (a.x < (b.x + b.width)) &&
  ((a.x + a.width) > b.x) &&
  (a.y < (b.y + b.height)) &&
  ((a.y + a.height) > b.y);
}

function lvl1() {
  var player = {
    x: 100,
    y: 232,
    speed: 3,
    sprite: playersprite[0],
    width: playersprite.width(),
    height: playersprite.height(),
    move: function () {
      if (keydown.right){
        this.x+=this.speed;
      }
      if (keydown.left){
        this.x-=this.speed;
      }
      if (keydown.up){
        this.y-=this.speed;
      }
      if (keydown.down){
        this.y+=this.speed;
      }
      if (this.x <= 0) this.x = 0;
      if (this.y <= 0) this.y = 0;
      if (this.x >= cwidth-this.width) this.x = cwidth-this.width;
      if (this.y >= cheight-this.height) this.y = cheight-this.height;
    },
    draw: function () {
      ctx.drawImage(player.sprite, player.x, player.y);
    }
  }

  var goal = {
    x: 580,
    y: 232,
    speed: 3,
    sprite: goalsprite[0],
    width: goalsprite.width(),
    height: goalsprite.height(),
    draw: function () {
      ctx.drawImage(goal.sprite, goal.x, goal.y);
    },
    checkwin: function () {
      if (hittest(this, player)){
        lvl2();
        clearInterval(l1i);
      }
    }
  }

  var l1i = setInterval(update, 1000/FPS);

  function update() {
    player.move();
    draw();
    goal.checkwin();
  }
  function draw() {
    cls();
    goal.draw();
    player.draw();
  }
  function cls() {
    ctx.fillStyle = '#fff';
    ctx.fillRect(0,0,cwidth,cheight);
  }
}
function lvl2() {
  var player = {
    x: 100,
    y: 232,
    speed: 3,
    sprite: playersprite[0],
    width: playersprite.width(),
    height: playersprite.height(),
    move: function () {
      var oldx =this.x;
      var oldy = this.y;
      if (keydown.right){
        this.x+=this.speed;
      }
      if (keydown.left){
        this.x-=this.speed;
      }
      if (keydown.up){
        this.y-=this.speed;
      }
      if (keydown.down){
        this.y+=this.speed;
      }
      for (var i =barriers.length - 1; i >= 0; i--) {
        if (barriers[i].block()) {
          this.x = oldx;
          this.y = oldy;
        }
      };
      if (this.x <= 0) this.x = 0;
      if (this.y <= 0) this.y = 0;
      if (this.x >= cwidth-this.width) this.x = cwidth-this.width;
      if (this.y >= cheight-this.height) this.y = cheight-this.height;
    },
    draw: function () {
      ctx.drawImage(player.sprite, player.x, player.y);
    }
  }

  var goal = {
    x: 580,
    y: 232,
    speed: 3,
    sprite: goalsprite[0],
    width: goalsprite.width(),
    height: goalsprite.height(),
    draw: function () {
      ctx.drawImage(goal.sprite, goal.x, goal.y);
    },
    checkwin: function () {
      if (hittest(this, player)){
        lvl3();
        clearInterval(l2i);
      }
    }
  }

  var l2i = setInterval(update, 1000/FPS);

  function update() {
    player.move();
    draw();
    goal.checkwin();
  }
  function draw() {
    cls();
    goal.draw();
    player.draw();
    for (var i = barriers.length - 1; i >= 0; i--) {
      //console.log(barriers[i]);
      barriers[i].draw();
    };
  }
  function cls() {
    ctx.fillStyle = '#eee';
    ctx.fillRect(0,0,cwidth,cheight);
  }
  var barriers = [];
  function Barrier(x1, y1, width, height) {
    var b = {
      x: x1,
      y: y1,
      height: height,
      width: width,
      draw: function () {
        ctx.fillStyle="#000";
        ctx.fillRect(x1, y1, width, height);
      },
      block: function () {
        return (hittest(this, player));
      }
    }
    barriers.push(b);
  }

  new Barrier(300, 0, 30, 300);
  //console.log(barriers[0]);
}
function lvl3() {
  var player = {
    x: 100,
    y: 232,
    speed: 3,
    sprite: playersprite[0],
    width: playersprite.width(),
    height: playersprite.height(),
    move: function () {
      var oldx =this.x;
      var oldy = this.y;
      if (keydown.right){
        this.x+=this.speed;
      }
      if (keydown.left){
        this.x-=this.speed;
      }
      if (keydown.up){
        this.y-=this.speed;
      }
      if (keydown.down){
        this.y+=this.speed;
      }
      for (var i =barriers.length - 1; i >= 0; i--) {
        if (barriers[i].block()) {
          this.x = oldx;
          this.y = oldy;
        }
      };
      if (this.x <= 0) this.x = 0;
      if (this.y <= 0) this.y = 0;
      if (this.x >= cwidth-this.width) this.x = cwidth-this.width;
      if (this.y >= cheight-this.height) this.y = cheight-this.height;
    },
    draw: function () {
      ctx.drawImage(player.sprite, player.x, player.y);
    }
  }

  var goal = {
    x: 580,
    y: 232,
    speed: 3,
    sprite: goalsprite[0],
    width: goalsprite.width(),
    height: goalsprite.height(),
    draw: function () {
      ctx.drawImage(goal.sprite, goal.x, goal.y);
    },
    checkwin: function () {
      if (hittest(this, player)){
        lvl4();
        clearInterval(l3i);
      }
    }
  }

  var l3i = setInterval(update, 1000/FPS);

  function update() {
    player.move();
    draw();
    goal.checkwin();
  }
  function draw() {
    cls();
    goal.draw();
    player.draw();
    for (var i = barriers.length - 1; i >= 0; i--) {
      //console.log(barriers[i]);
      barriers[i].draw();
    };
  }
  function cls() {
    ctx.fillStyle = '#ddd';
    ctx.fillRect(0,0,cwidth,cheight);
  }
  var barriers = [];
  function Barrier(x1, y1, width, height) {
    var b = {
      x: x1,
      y: y1,
      height: height,
      width: width,
      draw: function () {
        ctx.fillStyle="#000";
        ctx.fillRect(x1, y1, width, height);
      },
      block: function () {
        return (hittest(this, player));
      }
    }
    barriers.push(b);
  }

  new Barrier(200, 0, 10, 300);
  new Barrier(400, 200, 10, 300);
  //console.log(barriers[0]);
}
function lvl4() {
  var player = {
    x: 100,
    y: 232,
    speed: 3,
    sprite: playersprite[0],
    width: playersprite.width(),
    height: playersprite.height(),
    move: function () {
      var oldx =this.x;
      var oldy = this.y;
      if (keydown.d){
        this.x+=this.speed;
      }
      if (keydown.a){
        this.x-=this.speed;
      }
      if (keydown.w){
        this.y-=this.speed;
      }
      if (keydown.s){
        this.y+=this.speed;
      }
      for (var i =barriers.length - 1; i >= 0; i--) {
        if (barriers[i].block()) {
          this.x = oldx;
          this.y = oldy;
        }
      };
      if (this.x <= 0) this.x = 0;
      if (this.y <= 0) this.y = 0;
      if (this.x >= cwidth-this.width) this.x = cwidth-this.width;
      if (this.y >= cheight-this.height) this.y = cheight-this.height;
    },
    draw: function () {
      ctx.drawImage(player.sprite, player.x, player.y);
    }
  }

  var goal = {
    x: 580,
    y: 232,
    speed: 3,
    sprite: goalsprite[0],
    width: goalsprite.width(),
    height: goalsprite.height(),
    draw: function () {
      ctx.drawImage(goal.sprite, goal.x, goal.y);
    },
    checkwin: function () {
      if (hittest(this, player)){
        lvl5();
        clearInterval(l4i);
      }
    }
  }

  var l4i = setInterval(update, 1000/FPS);

  function update() {
    player.move();
    draw();
    goal.checkwin();
  }
  function draw() {
    cls();
    goal.draw();
    player.draw();
    for (var i = barriers.length - 1; i >= 0; i--) {
      //console.log(barriers[i]);
      barriers[i].draw();
    };
  }
  function cls() {
    ctx.fillStyle = '#ccc';
    ctx.fillRect(0,0,cwidth,cheight);
  }
  var barriers = [];
  function Barrier(x1, y1, width, height) {
    var b = {
      x: x1,
      y: y1,
      height: height,
      width: width,
      draw: function () {
        ctx.fillStyle="#000";
        ctx.fillRect(x1, y1, width, height);
      },
      block: function () {
        return (hittest(this, player));
      }
    }
    barriers.push(b);
  }

  new Barrier(200, 0, 10, 300);
  new Barrier(400, 200, 10, 300);
  //console.log(barriers[0]);
}
function lvl5() {
  var player = {
    x: 100,
    y: 232,
    speed: 3,
    sprite: playersprite[0],
    width: playersprite.width(),
    height: playersprite.height(),
    move: function () {
      var oldx =this.x;
      var oldy = this.y;
      if (keydown.right){
        this.x+=this.speed;
      }
      if (keydown.left){
        this.x-=this.speed;
      }
      if (keydown.up){
        this.y-=this.speed;
      }
      if (keydown.down){
        this.y+=this.speed;
      }
      for (var i =barriers.length - 1; i >= 0; i--) {
        if (barriers[i].block()) {
          this.x = oldx;
          this.y = oldy;
        }
      };
      if (this.x <= 0) this.x = 0;
      if (this.y <= 0) this.y = 0;
      if (this.x >= cwidth-this.width) this.x = cwidth-this.width;
      if (this.y >= cheight-this.height) this.y = cheight-this.height;
    },
    draw: function () {
      ctx.drawImage(player.sprite, player.x, player.y);
    }
  }
  var isDragging = false;
  $(c).mousedown(function (e) {
    var clickzone = {
      x: e.offsetX,
      y: e.offsetY,
      width: 1,
      height: 1
    };

    if (hittest(clickzone, player)) isDragging = true;
    $(c).mouseup(function (e) {
      isDragging = false;
    });
  });


  var goal = {
    x: 580,
    y: 232,
    speed: 3,
    sprite: goalsprite[0],
    width: goalsprite.width(),
    height: goalsprite.height(),
    draw: function () {
      ctx.drawImage(goal.sprite, goal.x, goal.y);
    },
    checkwin: function () {
      if (hittest(this, player)){
        lvl6();
        clearInterval(l5i);
      }
    }
  }

  var l5i = setInterval(update, 1000/FPS);

  function update() {
    draw();
    goal.checkwin();
    $(c).mousemove(function (e) {

      if (isDragging) {
      //console.log(e);
        player.x = e.offsetX-(player.width/2);
        player.y = e.offsetY-(player.height/2);
      }
    });
    player.move();
  }
  function draw() {
    cls();
    goal.draw();
    player.draw();
    for (var i = barriers.length - 1; i >= 0; i--) {
      //console.log(barriers[i]);
      barriers[i].draw();
    };
  }
  function cls() {
    ctx.fillStyle = '#bbb';
    ctx.fillRect(0,0,cwidth,cheight);
  }
  var barriers = [];
  function Barrier(x1, y1, width, height) {
    var b = {
      x: x1,
      y: y1,
      height: height,
      width: width,
      draw: function () {
        ctx.fillStyle="#000";
        ctx.fillRect(x1, y1, width, height);
      },
      block: function () {
        return (hittest(this, player));
      }
    }
    barriers.push(b);
  }

  new Barrier(200, 0, 10, 500);
  //console.log(barriers[0]);
}
function lvl6() {
  var player = {
    x: 100,
    y: 232,
    speed: 3,
    sprite: playersprite[0],
    width: playersprite.width(),
    height: playersprite.height(),
    move: function () {
      var oldx = this.x;
      var oldy = this.y;
      if (keydown.right){
        this.x+=this.speed;
      }
      if (keydown.left){
        this.x-=this.speed;
      }
      if (keydown.up){
        this.y-=this.speed;
      }
      if (keydown.down){
        this.y+=this.speed;
      }
      for (var i =barriers.length - 1; i >= 0; i--) {
        if (barriers[i].block()) {
          this.x = oldx;
          this.y = oldy;
        }
      };
      if (this.x <= 0){
        this.x = cwidth-this.width;
        //console.log('whoop');
      }else if (this.x >= cwidth-this.width){
        this.x = 0;
        //console.log('whoop');
      }
      if (this.y <= 0){
        this.y = cheight-this.height;
        //console.log('whoop');
        //console.log(this.y);
      }else if (this.y >= cheight-this.height){
        this.y = 0;
        //console.log('whoop');
      }
    },
    draw: function () {
      ctx.drawImage(player.sprite, player.x, player.y);
    }
  }

  var goal = {
    x: 580,
    y: 232,
    speed: 3,
    sprite: goalsprite[0],
    width: goalsprite.width(),
    height: goalsprite.height(),
    draw: function () {
      ctx.drawImage(goal.sprite, goal.x, goal.y);
    },
    checkwin: function () {
      if (hittest(this, player)){
        lvl7();
        clearInterval(l6i);
      }
    }
  }

  var l6i = setInterval(update, 1000/FPS);

  function update() {
    player.move();
    draw();
    goal.checkwin();
  }
  function draw() {
    cls();
    goal.draw();
    player.draw();
    for (var i = barriers.length - 1; i >= 0; i--) {
      //console.log(barriers[i]);
      barriers[i].draw();
    };
  }
  function cls() {
    ctx.fillStyle = '#aaa';
    ctx.fillRect(0,0,cwidth,cheight);
  }
  var barriers = [];
  function Barrier(x1, y1, width, height) {
    var b = {
      x: x1,
      y: y1,
      height: height,
      width: width,
      draw: function () {
        ctx.fillStyle="#000";
        ctx.fillRect(x1, y1, width, height);
      },
      block: function () {
        return (hittest(this, player));
      }
    }
    barriers.push(b);
  }

  new Barrier(200, 0, 10, 500);
  //console.log(barriers[0]);
}
function lvl7() {
  var player = {
    x: 100,
    y: 232,
    speed: 3,
    sprite: playersprite[0],
    width: playersprite.width(),
    height: playersprite.height(),
    move: function () {
      var oldx =this.x;
      var oldy = this.y;
      if (keydown.right){
        this.x+=this.speed;
      }
      if (keydown.left){
        this.x-=this.speed;
      }
      if (keydown.up){
        this.y-=this.speed;
      }
      if (keydown.down){
        this.y+=this.speed;
      }
      for (var i =barriers.length - 1; i >= 0; i--) {
        if (barriers[i].block()) {
          this.x = oldx;
          this.y = oldy;
        }
      };
      if (this.x <= 0) this.x = 0;
      if (this.y <= 0) this.y = 0;
      if (this.x >= cwidth-this.width) this.x = cwidth-this.width;
      if (this.y >= cheight-this.height) this.y = cheight-this.height;
    },
    draw: function () {
      ctx.drawImage(player.sprite, player.x, player.y);
    }
  }

  var goal = {
    x: 580,
    y: 232,
    speed: 3,
    sprite: goalsprite[0],
    width: goalsprite.width(),
    height: goalsprite.height(),
    draw: function () {
      ctx.drawImage(goal.sprite, goal.x, goal.y);
    },
    checkwin: function () {
      if (hittest(this, player)){
        lvl8();
        clearInterval(l7i);
      }
    }
  }

  var l7i = setInterval(update, 1000/FPS);

  function update() {
    player.move();
    draw();
    goal.checkwin();
  }
  function draw() {
    cls();
    goal.draw();
    player.draw();
    for (var i = barriers.length - 1; i >= 0; i--) {
      //console.log(barriers[i]);
      barriers[i].draw();
    };
  }
  function cls() {
    ctx.fillStyle = '#fff';
    ctx.fillRect(0,0,cwidth,cheight);
  }
  var barriers = [];
  function Barrier(x1, y1, width, height) {
    var b = {
      x: x1,
      y: y1,
      height: height,
      width: width,
      draw: function () {
        if (Math.abs(Math.random()*100 - 1)<.5) ctx.fillStyle="#000";
        else ctx.fillStyle="#fff";
        ctx.fillRect(x1, y1, width, height);
      },
      block: function () {
        return (hittest(this, player));
      }
    }
    barriers.push(b);
  }

  new Barrier(200, 200, 10, 300);
  new Barrier(400, 0, 10, 300);
  //console.log(barriers[0]);
}
function lvl8() {
  var player = {
    x: 100,
    y: 232,
    speed: 3,
    sprite: playersprite[0],
    width: playersprite.width(),
    height: playersprite.height(),
    move: function () {
      var oldx =this.x;
      var oldy = this.y;
      if (keydown.right){
        this.x+=this.speed;
      }
      if (keydown.left){
        this.x-=this.speed;
      }
      if (keydown.up){
        this.y-=this.speed;
      }
      if (keydown.down){
        this.y+=this.speed;
      }
      for (var i =barriers.length - 1; i >= 0; i--) {
        if (barriers[i].block()) {
          this.x = oldx;
          this.y = oldy;
        }
      };
      if (this.x <= 0) this.x = 0;
      if (this.y <= 0) this.y = 0;
      if (this.x >= cwidth-this.width) this.x = cwidth-this.width;
      if (this.y >= cheight-this.height) this.y = cheight-this.height;
    },
    draw: function () {
      ctx.drawImage(player.sprite, player.x, player.y);
    }
  }

  var goal = {
    x: 580,
    y: 232,
    speed: 3,
    sprite: goalsprite[0],
    width: goalsprite.width(),
    height: goalsprite.height(),
    draw: function () {
      ctx.drawImage(goal.sprite, goal.x, goal.y);
    },
    checkwin: function () {
      if (hittest(this, player)){
        lvl9();
        clearInterval(l8i);
        clearInterval(i2);
        clearInterval(i3);
        clearInterval(i4);
      }
    }
  }

  var l8i = setInterval(update, 1000/FPS);

  function update() {
    player.move();
    draw();
    goal.checkwin();
  }
  function draw() {
    cls();
    goal.draw();
    player.draw();
    for (var i = barriers.length - 1; i >= 0; i--) {
      //console.log(barriers[i]);
      barriers[i].draw();
    };
  }
  function cls() {
    ctx.fillStyle = '#eee';
    ctx.fillRect(0,0,cwidth,cheight);
  }
  var barriers = [];
  function Barrier(x1, y1, width, height) {
    var b = {
      x: x1,
      y: y1,
      height: height,
      width: width,
      draw: function () {
        ctx.fillStyle="#000";
        ctx.fillRect(x1, y1, width, height);
      },
      block: function () {
        return (hittest(this, player));
      }
    }
    barriers.push(b);
  }
  var bx = 1;
  var i2 = setInterval(function () {
    new Barrier(bx, 0, 1, 500);
    bx++;
    if (bx >= player.x){
      lvl8();
      clearInterval(l8i);
      clearInterval(i2);
      clearInterval(i3);
      clearInterval(i4);
    }
  },1000/FPS);
  var by = 1;
  var i3 = setInterval(function () {
    new Barrier(0, by, 700, 1);
    by++;
    if (by >= player.y){
      lvl8();
      clearInterval(l8i);
      clearInterval(i2);
      clearInterval(i3);
      clearInterval(i4);
    }
  },1000/FPS);
  var by2 = cheight;
  var i4 = setInterval(function () {
    new Barrier(0, by2, 700, 1);
    by2--;
    if (by2 <= player.y+player.height){
      lvl8();
      clearInterval(l8i);
      clearInterval(i2);
      clearInterval(i3);
      clearInterval(i4);
    }
  },1000/FPS);
  //console.log(barriers[0]);
}
function lvl9() {
  var player = {
    x: 100,
    y: 232,
    speed: 3,
    sprite: playersprite[0],
    width: playersprite.width(),
    height: playersprite.height(),
    move: function () {
      var oldx =this.x;
      var oldy = this.y;
      if (keydown.right){
        this.x+=this.speed;
      }
      if (keydown.left){
        this.x-=this.speed;
      }
      if (keydown.up){
        this.y-=this.speed;
      }
      if (keydown.down){
        this.y+=this.speed;
      }
      for (var i =barriers.length - 1; i >= 0; i--) {
        if (barriers[i].block()) {
          this.x = oldx;
          this.y = oldy;
        }
      };
      if (this.x <= 0) this.x = 0;
      if (this.y <= 0) this.y = 0;
      if (this.x >= cwidth-this.width) this.x = cwidth-this.width;
      if (this.y >= cheight-this.height) this.y = cheight-this.height;
    },
    draw: function () {
      ctx.drawImage(player.sprite, player.x, player.y);
    }
  }

  goal = {
    x: 580,
    y: 232,
    speed: 3,
    sprite: goalsprite[0],
    width: goalsprite.width(),
    height: goalsprite.height(),
    sol: 0,
    draw: function () {
      ctx.drawImage(goal.sprite, goal.x, goal.y);
    },
    checkwin1: function () {
      if (hittest(this, player) && !this.sol){
        this.sol++;
        this.x = 0;
        this.y = 100;
      }
    },
    checkwin2: function () {
      if (hittest(this, player) && this.sol == 1){
        this.sol++;
        this.x = 0;
        this.y = 300;
      }
    },
    checkwin3: function () {
      if (hittest(this, player) && this.sol == 2){
        this.sol++;
        this.x = 300;
        this.y = 100;
      }
    },
    checkwin4: function () {
      if (hittest(this, player) && this.sol == 3){
        clearInterval(l9i);
        lvl10();
      } 
    },
  }

  var l9i = setInterval(update, 1000/FPS);

  function update() {
    player.move();
    draw();
    goal.checkwin1();
    goal.checkwin2();
    goal.checkwin3();
    goal.checkwin4();
  }
  function draw() {
    cls();
    goal.draw();
    player.draw();
    for (var i = barriers.length - 1; i >= 0; i--) {
      //console.log(barriers[i]);
      barriers[i].draw();
    };
  }
  function cls() {
    ctx.fillStyle = '#ddd';
    ctx.fillRect(0,0,cwidth,cheight);
  }
  var barriers = [];
  function Barrier(x1, y1, width, height) {
    var b = {
      x: x1,
      y: y1,
      height: height,
      width: width,
      draw: function () {
        ctx.fillStyle="#000";
        ctx.fillRect(x1, y1, width, height);
      },
      block: function () {
        return (hittest(this, player));
      }
    }
    barriers.push(b);
  }

  //console.log(barriers[0]);
}
function lvl10() {
  var player = {
    x: 100,
    y: 232,
    speed: 3,
    sprite: playersprite[0],
    width: playersprite.width(),
    height: playersprite.height(),
    move: function () {
      var oldx =this.x;
      var oldy = this.y;
      if (keydown.right){
        this.x+=this.speed;
      }
      if (keydown.left){
        this.x-=this.speed;
      }
      if (keydown.up){
        this.y-=this.speed;
      }
      if (keydown.down){
        this.y+=this.speed;
      }
      for (var i =barriers.length - 1; i >= 0; i--) {
        if (barriers[i].block()) {
          this.x = oldx;
          this.y = oldy;
        }
      };
      if (this.x <= 0) this.x = 0;
      if (this.y <= 0) this.y = 0;
      if (this.x >= cwidth-this.width) this.x = cwidth-this.width;
      if (this.y >= cheight-this.height) this.y = cheight-this.height;
    },
    draw: function () {
      ctx.drawImage(player.sprite, player.x, player.y);
    }
  }

  var goal = {
    x: 580,
    y: 232,
    speed: 3,
    sprite: goalsprite[0],
    width: goalsprite.width(),
    height: goalsprite.height(),
    draw: function () {
      ctx.drawImage(goal.sprite, goal.x, goal.y);
    },
    checkwin: function () {
      if (hittest(this, player)){
        lvl11();
        clearInterval(l10i);
      }
    }
  }

  var l10i = setInterval(update, 1000/FPS);

  function update() {
    player.move();
    draw();
    goal.checkwin();
  }
  function draw() {
    cls();
    
    ctx.fillStyle='#000';
    ctx.fillRect(300, 300, 5, 700);
    ctx.fillRect(400, 0, 5, 300);
    ctx.fillRect(500, 300, 5, 700);
    ctx.fillRect(600, 0, 5, 300);
    ctx.fillRect(700, 300, 5, 700);
    ctx.fillRect(800, 0, 5, 300);
    goal.draw();
    player.draw();
    for (var i = barriers.length - 1; i >= 0; i--) {
      //console.log(barriers[i]);
      barriers[i].draw();
    };
  }
  function cls() {
    ctx.fillStyle = '#ccc';
    ctx.fillRect(0,0,cwidth,cheight);
  }
  var barriers = [];
  function Barrier(x1, y1, width, height, real) {
    var b = {
      x: x1,
      y: y1,
      height: height,
      width: width,
      draw: function () {
        ctx.fillStyle="#000";
        ctx.fillRect(x1, y1, width, height);
      },
      block: function () {
        return (hittest(this, player));
      }
    }
    barriers.push(b);
  }
  new Barrier(300, 0, 5, 300);
  new Barrier(500, 0, 5, 300);
  new Barrier(700, 0, 5, 300);
  new Barrier(400, 300, 5, 700);
  new Barrier(600, 300, 5, 700);
  new Barrier(800, 300, 5, 700);
  //console.log(barriers[0]);
}
function lvl11() {
  var player = {
    x: 100,
    y: 232,
    speed: 3,
    sprite: playersprite[0],
    width: playersprite.width(),
    height: playersprite.height(),
    move: function () {
      var oldx =this.x;
      var oldy = this.y;
      if (keydown.right){
        this.y-=this.speed;
      }
      if (keydown.left){
        this.y+=this.speed;
      }
      if (keydown.up){
        this.x-=this.speed;
      }
      if (keydown.down){
        this.x+=this.speed;
      }
      for (var i =barriers.length - 1; i >= 0; i--) {
        if (barriers[i].block()) {
          this.x = oldx;
          this.y = oldy;
        }
      };
      if (this.x <= 0) this.x = 0;
      if (this.y <= 0) this.y = 0;
      if (this.x >= cwidth-this.width) this.x = cwidth-this.width;
      if (this.y >= cheight-this.height) this.y = cheight-this.height;
    },
    draw: function () {
      ctx.drawImage(player.sprite, player.x, player.y);
    }
  }

  var goal = {
    x: 580,
    y: 232,
    speed: 3,
    sprite: goalsprite[0],
    width: goalsprite.width(),
    height: goalsprite.height(),
    draw: function () {
      ctx.drawImage(goal.sprite, goal.x, goal.y);
    },
    checkwin: function () {
      if (hittest(this, player)){
        lvl12();
        clearInterval(l11i);
      }
    }
  }

  var l11i = setInterval(update, 1000/FPS);

  function update() {
    player.move();
    draw();
    goal.checkwin();
  }
  function draw() {
    cls();
    goal.draw();
    player.draw();
    for (var i = barriers.length - 1; i >= 0; i--) {
      //console.log(barriers[i]);
      barriers[i].draw();
    };
  }
  function cls() {
    ctx.fillStyle = '#bbb';
    ctx.fillRect(0,0,cwidth,cheight);
  }
  var barriers = [];
  function Barrier(x1, y1, width, height) {
    var b = {
      x: x1,
      y: y1,
      height: height,
      width: width,
      draw: function () {
        ctx.fillStyle="#000";
        ctx.fillRect(x1, y1, width, height);
      },
      block: function () {
        return (hittest(this, player));
      }
    }
    barriers.push(b);
  }

  new Barrier(200, 0, 10, 300);
  new Barrier(400, 200, 10, 300);
  //console.log(barriers[0]);
}
function lvl12() {
  var left = true;
  var player = {
    x: 100,
    y: 232,
    speed: 3,
    sprite: playersprite[0],
    width: playersprite.width(),
    height: playersprite.height(),
    move: function () {
      var oldx =this.x;
      var oldy = this.y;
      if (keydown.right){
        this.x+=this.speed;
      }
      if (keydown.left){
        this.x-=this.speed;
      }
      if (keydown.up){
        this.y-=this.speed;
      }
      if (keydown.down){
        this.y+=this.speed;
      }
      for (var i =barriers.length - 1; i >= 0; i--) {
        if (barriers[i].block()) {
          this.x = oldx;
          this.y = oldy;
        }
      };
      if (this.x <= 0) this.x = 0;
      if (this.y <= 0) this.y = 0;
      if (this.x >= cwidth-this.width) this.x = cwidth-this.width;
      if (this.y >= cheight-this.height) this.y = cheight-this.height;
      if (left) goal.x -= 2;
      else goal.x +=2;
      if (goal.x <= 0) left = false;
      if (goal.x >= cwidth-goal.width) left = true;
    },
    draw: function () {
      ctx.drawImage(player.sprite, player.x, player.y);
    }
  }

  var goal = {
    x: 580,
    y: 232,
    speed: 3,
    sprite: goalsprite[0],
    width: goalsprite.width(),
    height: goalsprite.height(),
    draw: function () {
      ctx.drawImage(goal.sprite, goal.x, goal.y);
    },
    checkwin: function () {
      if (hittest(this, player)){
        lvl13();
        clearInterval(l12i);
      }
    }
  }

  var l12i = setInterval(update, 1000/FPS);

  function update() {
    player.move();
    draw();
    goal.checkwin();
  }
  function draw() {
    cls();
    goal.draw();
    player.draw();
    for (var i = barriers.length - 1; i >= 0; i--) {
      //console.log(barriers[i]);
      barriers[i].draw();
    };
  }
  function cls() {
    ctx.fillStyle = '#bbb';
    ctx.fillRect(0,0,cwidth,cheight);
  }
  var barriers = [];
  function Barrier(x1, y1, width, height) {
    var b = {
      x: x1,
      y: y1,
      height: height,
      width: width,
      draw: function () {
        ctx.fillStyle="#000";
        ctx.fillRect(x1, y1, width, height);
      },
      block: function () {
        return (hittest(this, player));
      }
    }
    barriers.push(b);
  }

  new Barrier(200, 0, 10, 300);
  new Barrier(400, 200, 10, 300);
  //console.log(barriers[0]);
}
function lvl13() {
  var player = {
    x: 100,
    y: 232,
    speed: 3,
    sprite: playersprite[0],
    width: playersprite.width(),
    height: playersprite.height(),
    move: function () {
      var oldx =this.x;
      var oldy = this.y;
      if (keydown.right){
        this.x+=this.speed;
      }
      if (keydown.left){
        this.x-=this.speed;
      }
      if (keydown.up){
        this.y-=this.speed;
      }
      if (keydown.down){
        this.y+=this.speed;
      }
      for (var i =barriers.length - 1; i >= 0; i--) {
        if (barriers[i].block()) {
          this.x = oldx;
          this.y = oldy;
        }
      };
      if (this.x <= 0) this.x = 0;
      if (this.y <= 0) this.y = 0;
      if (this.x >= cwidth-this.width) this.x = cwidth-this.width;
      if (this.y >= cheight-this.height) this.y = cheight-this.height;
    },
    draw: function () {
      ctx.drawImage(player.sprite, player.x, player.y);
    }
  }

  var goal = {
    x: 580,
    y: 232,
    speed: 3,
    sprite: goalsprite[0],
    width: goalsprite.width(),
    height: goalsprite.height(),
    draw: function () {
      ctx.drawImage(goal.sprite, goal.x, goal.y);
    },
    checkwin: function () {
      if (hittest(this, player)){
        lvl14();
        clearInterval(l13i);
      }
    }
  }

  var l13i = setInterval(update, 1000/FPS);

  function update() {
    player.move();
    draw();
    goal.checkwin();
  }
  function draw() {
    cls();
    goal.draw();
    player.draw();
    for (var i = barriers.length - 1; i >= 0; i--) {
      //console.log(barriers[i]);
      barriers[i].draw();
    };
  }
  function cls() {
    ctx.fillStyle = '#aaa';
    ctx.fillRect(0,0,cwidth,cheight);
  }
  var barriers = [];
  function Barrier(x1, y1, width, height) {
    var b = {
      x: x1,
      y: y1,
      height: height,
      width: width,
      draw: function () {
        ctx.fillStyle="#000";
        ctx.fillRect(x1, y1, width, height);
      },
      block: function () {
        return (hittest(this, player));
      }
    }
    barriers.push(b);
  }
  new Barrier(400, 0, 10, 700);
  //console.log(barriers[0]);
  kcode = [];
  $(document).keydown(function (e){
    kcode.push(e.which);
    var code = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65, 13];
    if (e.which == 13 && kcode.splice(kcode.length-11, 11).toString() == code.toString()){
      barriers = [];
    }
  })
}
function lvl14() {
  var player = {
    x: 100,
    y: 232,
    speed: 3,
    sprite: playersprite[0],
    width: playersprite.width(),
    height: playersprite.height(),
    move: function () {
      var oldx =this.x;
      var oldy = this.y;
      if (keydown.right){
        this.x+=this.speed;
      }
      if (keydown.left){
        this.x-=this.speed;
      }
      if (keydown.up){
        this.y-=this.speed;
      }
      if (keydown.down){
        this.y+=this.speed;
      }
      for (var i =barriers.length - 1; i >= 0; i--) {
        if (barriers[i].block()) {
          this.x = oldx;
          this.y = oldy;
        }
      };
      /*if (this.x <= 0) this.x = 0;
      if (this.y <= 0) this.y = 0;
      if (this.x >= cwidth-this.width) this.x = cwidth-this.width;
      if (this.y >= cheight-this.height) this.y = cheight-this.height;*/
    },
    draw: function () {
      ctx.drawImage(player.sprite, player.x, player.y);
    }
  }


  var goal = {
    x: 580,
    y: 232,
    speed: 3,
    sprite: goalsprite[0],
    width: goalsprite.width(),
    height: goalsprite.height(),
    draw: function () {
      ctx.drawImage(goal.sprite, goal.x, goal.y);
    },
    checkwin: function () {
      if (hittest(this, player)){
        lvl15();
        clearInterval(l14i);
      }
    }
  }

  var l14i = setInterval(update, 1000/FPS);

  function update() {
    draw();
    goal.checkwin();
    player.move();
  }
  function draw() {
    cls();
    goal.draw();
    player.draw();
    for (var i = barriers.length - 1; i >= 0; i--) {
      //console.log(barriers[i]);
      barriers[i].draw();
    };
  }
  function cls() {
    ctx.fillStyle = '#bbb';
    ctx.fillRect(0,0,cwidth,cheight);
  }
  var barriers = [];
  function Barrier(x1, y1, width, height) {
    var b = {
      x: x1,
      y: y1,
      height: height,
      width: width,
      draw: function () {
        ctx.fillStyle="#000";
        ctx.fillRect(x1, y1, width, height);
      },
      block: function () {
        return (hittest(this, player));
      }
    }
    barriers.push(b);
  }

  new Barrier(200, 0, 10, 500);
  //console.log(barriers[0]);
}
function lvl15() {
  var player = {
    x: 100,
    y: 232,
    speed: 3,
    sprite: playersprite[0],
    width: playersprite.width(),
    height: playersprite.height(),
    move: function () {
      var oldx =this.x;
      var oldy = this.y;
      if (keydown.right){
        this.x+=this.speed;
      }
      if (keydown.left){
        this.x-=this.speed;
      }
      if (keydown.up){
        this.y-=this.speed;
      }
      if (keydown.down){
        this.y+=this.speed;
      }
      for (var i =barriers.length - 1; i >= 0; i--) {
        if (barriers[i].block()) {
          this.x = oldx;
          this.y = oldy;
        }
      };
      if (this.x <= 0) this.x = 0;
      if (this.y <= 0) this.y = 0;
      if (this.x >= cwidth-this.width) this.x = cwidth-this.width;
      if (this.y >= cheight-this.height) this.y = cheight-this.height;
    },
    draw: function () {
      ctx.drawImage(player.sprite, player.x, player.y);
    }
  }

  var goal = {
    x: 580,
    y: 232,
    speed: 3,
    sprite: goalsprite[0],
    width: goalsprite.width(),
    height: goalsprite.height(),
    draw: function () {
      ctx.drawImage(goal.sprite, goal.x, goal.y);
    },
    checkwin: function () {
      if (hittest(this, player)){
        lvl16();
        clearInterval(l15i);
      }
    }
  }

  var l15i = setInterval(update, 1000/FPS);

  function update() {
    player.move();
    draw();
    goal.checkwin();
  }
  function draw() {
    cls();
    goal.draw();
    player.draw();
    for (var i = barriers.length - 1; i >= 0; i--) {
      //console.log(barriers[i]);
      barriers[i].draw();
    };
  }
  function cls() {
    ctx.fillStyle = '#ddd';
    ctx.fillRect(0,0,cwidth,cheight);
  }
  var barriers = [];
  function Barrier(x1, y1, width, height) {
    var b = {
      x: x1,
      y: y1,
      height: height,
      width: width,
      draw: function () {
        ctx.fillStyle="#000";
        ctx.fillRect(x1, y1, width, height);
      },
      block: function () {
        if (!keydown.space) return (hittest(this, player));
        else return false;
      }
    }
    barriers.push(b);
  }

  new Barrier(0, 100, 10, 300);
  new Barrier(0, 400, 310, 10);
  new Barrier(0, 100, 300, 10);
  new Barrier(300, 100, 10, 300);
  //console.log(barriers[0]);
}
function lvl16() {
  ctx.fillStyle = '#fff';
  ctx.fillRect(0,0,cwidth,cheight);
  ctx.fillStyle = '#000';
  ctx.font = '48pt Vernada';
  ctx.fillText('You win!', 200, 300);
  $(c).click(function () {
    lvl1();
    $(c).click(function() {return false;});
  });
}