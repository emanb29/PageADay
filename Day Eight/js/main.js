$(document).ready(function() {
  var s=0;
  var songs = [];
  songs[0] = new buzz.sound('sounds/01 - On The Radio (Live In London).mp3');
  songs[1] = new buzz.sound('sounds/02 - Eet (Live In London).mp3');
  songs[2] = new buzz.sound('sounds/03 - Folding Chair (Live In London).mp3');
  songs[3] = new buzz.sound('sounds/04 - Sailor Song (Live In London).mp3');
  songs[4] = new buzz.sound('sounds/05 - Blue Lips (Live In London).mp3');
  songs[5] = new buzz.sound('sounds/06 - Apres Moi (Live In London).mp3');
  songs[6] = new buzz.sound('sounds/07 - Dance Anthem Of The 80\'s (Live In London).mp3');
  songs[7] = new buzz.sound('sounds/08 - Silly Eye-Color Generalizations (Live In London).mp3');
  songs[8] = new buzz.sound('sounds/09 - Bobbing For Apples (Live In London).mp3');
  songs[9] = new buzz.sound('sounds/10 - Wallet (Live In London).mp3');
  songs[10] = new buzz.sound('sounds/11 - Ode To Divorce (Live In London).mp3');
  songs[11] = new buzz.sound('sounds/12 - That Time (Live In London).mp3');
  songs[12] = new buzz.sound('sounds/13 - The Calculation (Live In London).mp3');
  songs[13] = new buzz.sound('sounds/14 - Machine (Live In London).mp3');
  songs[14] = new buzz.sound('sounds/15 - Laughing With (Live In London).mp3');
  songs[15] = new buzz.sound('sounds/16 - Man Of A Thousand Faces (Live In London).mp3');
  songs[16] = new buzz.sound('sounds/17 - Hotel Song (Live In London).mp3');
  songs[17] = new buzz.sound('sounds/18 - Us (Live In London).mp3');
  songs[18] = new buzz.sound('sounds/19 - Fidelity (Live In London).mp3');
  songs[19] = new buzz.sound('sounds/20 - Samson (Live In London).mp3');
  songs[20] = new buzz.sound('sounds/21 - The Call (Live In London).mp3');
  songs[21] = new buzz.sound('sounds/22 - Love, You\'re A Whore (Live In London).mp3');
  var titles = [
    'On The Radio',
    'Eet',
    'Folding Chair',
    'Sailor Song',
    'Blue Lips',
    'Apres Moi',
    'Dance Anthem of the 80\'s',
    'Silly Eye-Color Generalizations',
    'Bobbing for Apples',
    'Wallet',
    'Ode to Divorce',
    'That Time',
    'The Calculation',
    'Machine',
    'Laughing With',
    'Man Of A Thousand Faces',
    'Hotel Song',
    'Us',
    'Fidelity',
    'Samson',
    'The Call',
    'Love, You\'re a Whore'
  ];
  songs[s].bind('ended', function (e) {
    $('#next')[0].click();
    songs[s].play();
  });
  $('#pp').click(function() {
    $('#songTitle').html(titles[s]);
    songs[s].togglePlay();
    if(songs[s].isPaused()) {
      this.innerHTML = "Play";
    } else {
      this.innerHTML = "Pause";
    }
  });
  $('#next').click(function() {
    var waspaused = songs[s].isPaused();
    songs[s].stop();
    if (s < songs.length - 1) s++;
    if (!waspaused) songs[s].play();
  });
  $('#prev').click(function() {
    var waspaused = songs[s].isPaused();
    songs[s].stop();
    if (s > 0) s--;
    if (!waspaused) songs[s].play();
  });
  setInterval(function () {
    var t = buzz.toTimer(songs[s].getTime());
    var d = buzz.toTimer(songs[s].getDuration());
    var p = t+'/'+d;
    $('#percent')[0].innerHTML = p;
    $('#songTitle')[0].innerHTML = titles[s];
    $('#rate').slider('option', 'value', songs[s].getPercent());
  }, 1000);

  $('#rate').slider({
    max: 100,
    step: .1,
    stop: function (event, ui) {
      songs[s].setPercent(ui.value);
    }
  });
});