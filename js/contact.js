var $screenHeight = $(window).height(),
    $screenWidth = $(window).width(),
    $iniHeightOffset = -$screenHeight * 0.02,
    $iniWidthOffset = -$screenWidth * 0.02;

//给地图以鼠标移动效果
$(".map").mousemove(function(event){
  event =  event || window.event;
  var x = event.clientX,
      y = event.clientY,
      positionX = x/$screenWidth * $iniWidthOffset,
      positionY = y/$screenHeight * $iniHeightOffset;
  $(".map-img").css("left",positionX + 'px')
        .css("top",positionY+ 'px');
});

function setContactData(){
  $.ajax({  
    url : "http://65.49.201.60:7777/home/contact",
    type : 'GET',
    error : function() {
      console.log('请求失败 ');
    },
    success : function(data) {
      $("#text-1").first().html(data.data.content1);
      $("#text-2 p").first().html(data.data.content2)
                    .next().html(data.data.content3)
                    .next().html(data.data.content4)
                    .next().html(data.data.content5);
      $(".map-img").attr("src",data.data.imageUrl);
    }
  });
}

$(function(){
  setContactData();
})