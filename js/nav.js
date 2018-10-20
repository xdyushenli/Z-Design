$('.nav').click(function(){
  $('.nav').hide();
  $('.canner').css('z-index','999');
  $('.text').animate({right:'-100%'},{duration: "slow",easing:'easeInQuart'});
  $('.nav-list').animate({left:'0'},{duration: "slow",easing:'easeInQuart'});
});

$('.close').click(function(){
  $('.text').animate({right:'0'},{duration: "slow",easing:'easeInQuart'});
  $('.nav-list').animate({left:'-100%'},"slow",'easeInQuart',function(){
    $('.nav').show();
    $('.canner').css('z-index','0');
  });
});