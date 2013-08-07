$(document).ready(function () {
  if (!location.hash){
    $('#main').show();
  } else {
    $(location.hash).show();
  }
  $('a').click(function () {
    location.href = this.href;
    $('div.page').hide();
    $(location.hash).show();
  });
});