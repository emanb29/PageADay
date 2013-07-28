$(document).ready(function () {
  d = $('<div id="mquerybar"></div>')
    .css('position', 'fixed')
    .css('bottom', '100px')
    .css('width', '100%')
    .css('text-align', 'center')
    .css('padding-top', '20px')
    .css('padding-bottom', '20px')
    .css('z-index', '200000')
    .appendTo('body');
  setInterval(function(){
    $('#mquerybar')[0].innerHTML = document.width;
    if (document.width > 1200){
      $('#mquerybar').css('background-color', 'hotpink');
    } else if ((document.width <= 1200) && (document.width > 640)) {
      $('#mquerybar').css('background-color', 'purple');
    } else if (document.width <= 640) {
      $('#mquerybar').css('background-color', 'indigo');
    }
  }, 10);
});