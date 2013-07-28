$(document).ready(function() {
  //console.log('loaded');
  var cols=$('.col');
  setInterval(function(){
  var bigcolh = 0;
    cols.each(function(){
      var innerheight = 0;
      $(this).children().each(function() {
        innerheight += $(this).height();
      });
      $(this).height(innerheight);
    });
    cols.each(function() {
      var currentHeight = $(this).height();
      if (currentHeight > bigcolh){
        bigcolh = currentHeight;
      }
    });
  cols.height(bigcolh);
}, 1000/30)
});