$(document).ready(function () {
  $('nav ul li a').click(function () {
    $('li.active').removeClass('active');
    $(this).parent().addClass('active');
  });
  $('#searchicon').click(function () {
    alert('Searching');
  });
});