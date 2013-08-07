$(document).ready(function () {
  var prog1 = 0.1;
  var lo1 = $('#lo1').percentageLoader({
    width: 100,
    height: 100,
    value: '200MB',
    progress: prog1
  });
  var updatelo1 = setInterval(function() {
    prog1 += .001;
    lo1.setProgress(prog1);
    if (prog1 >= 1.0){
      clearInterval(updatelo1);
    }
  }, 10);
});