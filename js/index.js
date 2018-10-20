var $bgPic = $(".bg-pic"),
    $screenHeight = $(window).height(),
    $screenWidth = $(window).width(),
    $iniHeightOffset = -$screenHeight * 0.02,
    $iniWidthOffset = -$screenWidth * 0.02,
    upRotateCounter = 1,
    downRotateCounter = 1,
    rightDistance,
    //用于监听手机端触摸事件
    starX,
    starY,
    //用于判断是否改变背景一图片
    changeBgOne = false,
    //用于对动画进行节流
    _now,
    _lastTime = null;

function setIniOffset(ele){
  var $screenHeight = $(window).height(),
      $screenWidth = $(window).width(),
      $iniHeightOffset = -$screenHeight * 0.02,
      $iniWidthOffset = -$screenWidth * 0.02;

  if($screenWidth > 425){
    ele.css("left",$iniWidthOffset + 'px');
    ele.css("top",$iniHeightOffset + 'px');
  } else {
    ele.css("left",-$screenWidth + 'px');
  }
}

function setData(){
    //查询页面数据
  $.ajax({  
    url : "http://65.49.201.60:7777/home",
    type : 'GET',
    error : function() {
      console.log('请求失败 ');
    },
    success : function(data) {
      let responseData = data.data;

      for(let i = 0;i < 11;i++){
        let currentId = responseData[i].homeId;
        $("#pro-" + currentId + " .can img").attr("src",responseData[i].img);
        $("#text-" + currentId).css("background-color",responseData[i].rgba)
        $("#details-" + currentId).children(".tit-1").html(responseData[i].content1)
                                  .next().html(responseData[i].content2)
                                  .next().html(responseData[i].content3)
                                  .next().next().html(responseData[i].content4);
      }

      if (responseData[0].img.substr(-5,1) === '1'){
        changeBgOne = true
      }

      //设置首页首张图片移动端样式
      if ($screenWidth <= 425) {
        if (changeBgOne) {
          let canWide = $('#pro-1 .can').width(),
              canHigh = $('#pro-1 .can').height(),
              bgHigh = canWide * 1673 / 1066;
          $('#pro-1 .bg-pic').attr('src','../images/background/1s.png');
          $('#pro-1 .bg-pic').css('left',0);
          $('#pro-1 .bg-pic').css('top',(canHigh - bgHigh) / 2);
        }
      }
    }
  });
}

function upRotate(){
  var deg1 = 145 + upRotateCounter * 360,
      deg2 = 35 - upRotateCounter * 360;
  $("#up-1").css("transform","rotateZ(" + deg1 + "deg)");
  $("#up-2").css("transform","rotateZ(" + deg2 + "deg)");
  upRotateCounter++;
}

function downRotate(){
  var deg1 = 145 + downRotateCounter * 360,
      deg2 = 35 - downRotateCounter * 360;
  $("#down-1").css("transform","rotateZ(" + deg2 + "deg)");
  $("#down-2").css("transform","rotateZ(" + deg1 + "deg)");
  downRotateCounter++;
}

$(function(){
  setIniOffset($bgPic);
  setData();
  $('#details-1').children('*').css('opacity','1');
  $('#details-1').css('display','block');

  let marg1 = Number($('#details-1 .tit-1').css('margin-top').replace(/[^0-9-.]/ig,"")) - 40 + 'px',
      marg2 = Number($('#details-1 .tit-2').css('margin-top').replace(/[^0-9-.]/ig,"")) - 10 + 'px',
      marg3 = Number($('#details-1 .tit-3').css('margin-top').replace(/[^0-9-.]/ig,"")) - 10 + 'px',
      marg4 = Number($('#details-1 .tit-4').css('margin-top').replace(/[^0-9-.]/ig,"")) - 10 + 'px',
      marg5 = Number($('#details-1 .text-details').css('margin-top').replace(/[^0-9-.]/ig,"")) - 10 + 'px';

  for(let i = 2;i < 12;i++){
    $("#details-" + i + ' .tit-1').css('margin-top',marg1);
    $("#details-" + i + ' .tit-2').css('margin-top',marg2);
    $("#details-" + i + ' .tit-3').css('margin-top',marg3);
    $("#details-" + i + ' .tit-4').css('margin-top',marg4);
    $("#details-" + i + ' .text-details').css('margin-top',marg5);
  }

  $("#pro-list").fullpage({
    scrollingSpeed: 1000,
    easingcss3: 'cubic-bezier(1,0,.5,1)',
    normalScrollElements: '.canner',
    onLeave: function(index, nextIndex, direction){

      var eleHeight = $('.canner').height(),
          y = Number($('#text-lists').css('top').replace(/[^0-9-.]/ig,""));

      if(direction == 'up'){
      let marg1 = Number($('#details-' + index + ' .tit-1').css('margin-top').replace(/[^0-9-.]/ig,"")),
          marg2 = Number($('#details-' + index + ' .tit-2').css('margin-top').replace(/[^0-9-.]/ig,"")),
          marg3 = Number($('#details-' + index + ' .tit-3').css('margin-top').replace(/[^0-9-.]/ig,"")),
          marg4 = Number($('#details-' + index + ' .tit-4').css('margin-top').replace(/[^0-9-.]/ig,"")),
          marg5 = Number($('#details-' + index + ' .text-details').css('margin-top').replace(/[^0-9-.]/ig,"")),

          marg11 = Number($('#details-' + (index - 1) + ' .tit-1').css('margin-top').replace(/[^0-9-.]/ig,"")),
          marg21 = Number($('#details-' + (index - 1) + ' .tit-2').css('margin-top').replace(/[^0-9-.]/ig,"")),
          marg31 = Number($('#details-' + (index - 1) + ' .tit-3').css('margin-top').replace(/[^0-9-.]/ig,"")),
          marg41 = Number($('#details-' + (index - 1) + ' .tit-4').css('margin-top').replace(/[^0-9-.]/ig,"")),
          marg51 = Number($('#details-' + (index - 1) + ' .text-details').css('margin-top').replace(/[^0-9-.]/ig,""));

      upRotate();
      $('#text-lists').css('top',y + eleHeight + 'px');

      setTimeout(function(){
        $('#details-' + index + ' .tit-1').css('margin-top',marg1 - 40 + 'px');
        $('#details-' + index + ' .tit-1').css('opacity','0');
      },250);

      setTimeout(function(){
        $('#details-' + index + ' .tit-2').css('margin-top',marg2 - 10 + 'px');
        $('#details-' + index + ' .tit-2').css('opacity','0');
      },300);

      setTimeout(function(){
        $('#details-' + index + ' .tit-3').css('margin-top',marg3 - 10 + 'px');
        $('#details-' + index + ' .tit-3').css('opacity','0');
      },350);

      setTimeout(function(){
        $('#details-' + index + ' .tit-4').css('margin-top',marg4 - 10 + 'px');
        $('#details-' + index + ' .tit-4').css('opacity','0');
      },400);

      setTimeout(function(){
        $('#details-' + index + ' .text-details').css('margin-top',marg5 - 10 + 'px');
        $('#details-' + index + ' .text-details').css('opacity','0');
      },450);

      setTimeout(function(){
        $('#details-' + (index - 1)).css('display','block');
        $('#details-' + (index - 1) + ' .tit-1').css('margin-top',marg11 + 40 + 'px');
        $('#details-' + (index - 1) + ' .tit-1').css('opacity','1');
      },700);

      setTimeout(function(){
        $('#details-' + (index - 1) + ' .tit-2').css('margin-top',marg21 + 10 + 'px');
        $('#details-' + (index - 1) + ' .tit-2').css('opacity','1');
      },750);

      setTimeout(function(){
        $('#details-' + (index - 1) + ' .tit-3').css('margin-top',marg31 + 10 + 'px');
        $('#details-' + (index - 1) + ' .tit-3').css('opacity','1');
      },800);

      setTimeout(function(){
        $('#details-' + (index - 1) + ' .tit-4').css('margin-top',marg41 + 10 + 'px');
        $('#details-' + (index - 1) + ' .tit-4').css('opacity','1');
      },850);

      setTimeout(function(){
        $('#details-' + (index - 1) + ' .text-details').css('margin-top',marg51 + 10 + 'px');
        $('#details-' + (index - 1) + ' .text-details').css('opacity','1');
      },900);

      setTimeout(function(){
        $('#details-' + index).css('display','none');
      },1000);
      }if(direction == 'down'){
      let marg1 = Number($('#details-' + index + ' .tit-1').css('margin-top').replace(/[^0-9-.]/ig,"")),
          marg2 = Number($('#details-' + index + ' .tit-2').css('margin-top').replace(/[^0-9-.]/ig,"")),
          marg3 = Number($('#details-' + index + ' .tit-3').css('margin-top').replace(/[^0-9-.]/ig,"")),
          marg4 = Number($('#details-' + index + ' .tit-4').css('margin-top').replace(/[^0-9-.]/ig,"")),
          marg5 = Number($('#details-' + index + ' .text-details').css('margin-top').replace(/[^0-9-.]/ig,"")),

          marg11 = Number($('#details-' + (index + 1) + ' .tit-1').css('margin-top').replace(/[^0-9-.]/ig,"")),
          marg21 = Number($('#details-' + (index + 1) + ' .tit-2').css('margin-top').replace(/[^0-9-.]/ig,"")),
          marg31 = Number($('#details-' + (index + 1) + ' .tit-3').css('margin-top').replace(/[^0-9-.]/ig,"")),
          marg41 = Number($('#details-' + (index + 1) + ' .tit-4').css('margin-top').replace(/[^0-9-.]/ig,"")),
          marg51 = Number($('#details-' + (index + 1) + ' .text-details').css('margin-top').replace(/[^0-9-.]/ig,""));

      downRotate();
      $('#text-lists').css('top',y - eleHeight + 'px');
      
      setTimeout(function(){
        $('#details-' + index + ' .tit-1').css('margin-top',marg1 - 40 + 'px');
        $('#details-' + index + ' .tit-1').css('opacity','0');
      },100);

      setTimeout(function(){
        $('#details-' + index + ' .tit-2').css('margin-top',marg2 - 10 + 'px');
        $('#details-' + index + ' .tit-2').css('opacity','0');
      },200);

      setTimeout(function(){
        $('#details-' + index + ' .tit-3').css('margin-top',marg3 - 10 + 'px');
        $('#details-' + index + ' .tit-3').css('opacity','0');
      },350);

      setTimeout(function(){
        $('#details-' + index + ' .tit-4').css('margin-top',marg4 - 10 + 'px');
        $('#details-' + index + ' .tit-4').css('opacity','0');
      },400);

      setTimeout(function(){
        $('#details-' + index + ' .text-details').css('margin-top',marg5 - 10 + 'px');
        $('#details-' + index + ' .text-details').css('opacity','0');
      },550);

      setTimeout(function(){
        $('#details-' + (index + 1)).css('display','block');
        $('#details-' + (index + 1) + ' .tit-1').css('margin-top',marg11 + 40 + 'px');
        $('#details-' + (index + 1) + ' .tit-1').css('opacity','1');
      },700);

      setTimeout(function(){
        $('#details-' + (index + 1) + ' .tit-2').css('margin-top',marg21 + 10 + 'px');
        $('#details-' + (index + 1) + ' .tit-2').css('opacity','1');
      },750);

      setTimeout(function(){
        $('#details-' + (index + 1) + ' .tit-3').css('margin-top',marg31 + 10 + 'px');
        $('#details-' + (index + 1) + ' .tit-3').css('opacity','1');
      },800);

      setTimeout(function(){
        $('#details-' + (index + 1) + ' .tit-4').css('margin-top',marg41 + 10 + 'px');
        $('#details-' + (index + 1) + ' .tit-4').css('opacity','1');
      },850);

      setTimeout(function(){
        $('#details-' + (index + 1) + ' .text-details').css('margin-top',marg51 + 10 + 'px');
        $('#details-' + (index + 1) + ' .text-details').css('opacity','1');
      },900);

      setTimeout(function(){
        $('#details-' + index).css('display','none');
      },1000);
      }

      if ($(".alter-1").length == 0) {
        return;
      } else {
        $.ajax({
          url: "http://65.49.201.60:7777/home/" + index,
          type: "put",
          contentType:"application/json;charset=utf-8",
          dataType:"json",
          data: "{\"content1\":\"" + $(".tit-1")[Number(index) - 1].innerHTML +  
              "\",\"content2\":\"" + $(".tit-2")[Number(index) - 1].innerHTML + 
              "\",\"content3\":\"" + $(".tit-3")[Number(index) - 1].innerHTML + 
              "\",\"content4\":\"" + $(".text-details")[Number(index) - 1].innerHTML + 
              "\",\"rgba\":\"" + $("#text-" + index).css("background-color") + 
                 "\"}",
          error: function(XMLHttpRequest, textStatus, errorThrown) {
              console.log(XMLHttpRequest.status);
              console.log(XMLHttpRequest.readyState);
              console.log(textStatus);
              console.log(this);
          },
          success: function(data) {
          }
        }); 
      }
    }
  });
})

//图片跟随鼠标移动
$("body").mousemove(function(event){
  event =  event || window.event;
  var x = event.clientX,
      y = event.clientY,
      $screenHeight = $(window).height(),
      $screenWidth = $(window).width(),
      $iniHeightOffset = -$screenHeight * 0.02,
      $iniWidthOffset = -$screenWidth * 0.02,
      positionX = x/$screenWidth * $iniWidthOffset,
      positionY = y/$screenHeight * $iniHeightOffset;
  if($screenWidth > 525){
    $bgPic.css("left",positionX + 'px')
          .css("top",positionY+ 'px');
  }
});

//上键整屏切换
$("#up,#up-min").click(function(){
  _now = + new Date;
  if (_now - _lastTime > 1000 || !_lastTime) {
    $.fn.fullpage.moveSectionUp();
    _lastTime = _now
  } else {
    return
  }
});

//下键整屏切换
$("#down,#down-min").click(function(){
  _now = + new Date;
  if (_now - _lastTime > 1000 || !_lastTime) {
    $.fn.fullpage.moveSectionDown();
    _lastTime = _now
  } else {
    return
  }
});

//手机端滑动
$('#text-list').on('touchstart',function (event) {
  var touch = event.touches[0];
  starX = touch.screenX;
  starY = touch.screenY;
});

document.getElementById('text-list').addEventListener('touchmove', function () {
  event.preventDefault()
}, { passive: false })

$('#text-list').on('touchend',function (event) {
  var touch = event.originalEvent.changedTouches[0],
      endX = touch.screenX,
      endY = touch.screenY,
      disX = endX - starX,
      disY = endY - starY;

  _now = + new Date;

  if (_now - _lastTime > 1000 || !_lastTime) {
    if (Math.abs(disX) < 50 && disY > 70) {
      $.fn.fullpage.moveSectionUp();
      _lastTime = _now;
      return;
    } if (Math.abs(disX) < 50 && disY < -70) {
      $.fn.fullpage.moveSectionDown();
      _lastTime = _now;
      return;
    } else {
      return;
    }
  }
});

//弹出菜单
$('.nav').click(function(){
  $('.nav').hide();
  $('.alter-1').hide();
  $('#text-lists').css('right','-100%');
  $('.details').animate({right:'-100%'},'slow','easeInQuart',function(){
    $('.copyright').hide();
    $('.logo').hide();
  });
});

//关闭菜单
$('.close').click(function(){ 
  let screenWidth = $(window).width();

  $('#text-lists').css('right','0');
  $('.details').animate({right:'0'},'slow','easeInQuart',function(){
    $('.nav').show();
    $('.alter-1').show();
    $('.copyright').show();
    if(screenWidth > 582){
      $('.logo').show();
    }
  });
})

window.onresize = function(){
  $.fn.fullpage.reBuild();
  
  var $screenWidth = $(window).width();

  if($(".text").css("width") == 0){
    if($screenWidth > 768){
      $(".text").css("width","35%");
    }if($screenWidth > 425 && $screenWidth <= 768){
      $(".text").css("width","40%");
    }if($screenWidth > 320 && $screenWidth <= 425){
      $(".text").css("width","50%");
    }if($screenWidth <= 320){
      $(".text").css("width","60%");
    }
  }

  //设置首页首张图片移动端样式
  if ($screenWidth < 425) {
    if (changeBgOne) {
      let canWide = $('#pro-1 .can').width(),
          canHigh = $('#pro-1 .can').height(),
          bgHigh = canWide * 1673 / 1066;
      $('#pro-1 .bg-pic').attr('src','../images/background/1s.png');
      $('#pro-1 .bg-pic').css('left',0);
      $('#pro-1 .bg-pic').css('top',(canHigh - bgHigh) / 2);
    }
  }
}