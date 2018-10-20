//定义大红块
var RED_BLOCK = "<div class='red-block list col-lg-4 col-md-6 col-sm-6 col-xs-12' style='background-color: #a12526;'></div>",
    $blockWidth = $(".list").width(),
    $blockHeight = $(".list").css('padding-bottom').replace(/[^0-9]/ig,""),
    $iniHeightOffset = -$blockHeight * 0.03,
    $iniWidthOffset = -$blockWidth * 0.03;

function addRedBlock(length){
  let $screenWidth = $(document).width() + 17,
      remainder;
  
  if(!length){
    length = 1;
    $.ajax({  
      url : "http://65.49.201.60:7777/works",
      type : 'GET',
      async : false,
      error : function(XMLHttpRequest, textStatus, errorThrown) {
              console.log(XMLHttpRequest.status);
              console.log(XMLHttpRequest.readyState);
              console.log(textStatus);
              console.log(this);
        },
      success : function(data) {
        for(let i = 0;i < data.data.length;i++){
          //若数据全不为空为真
          if($.trim(data.data[i].content1) !== "" && $.trim(data.data[i].content2) !== "" && data.data[i].rgba !== null){
            length++;
          }
        }
      }
    });
  }

  if($screenWidth >= 1200){
    remainder = (length - $(".red-block").length) % 3;
    $(".red-block").remove();
    switch(remainder){
      case 1:{
        $("#contact").after(RED_BLOCK + RED_BLOCK);
        break;
      }
      case 2:{
        $("#contact").after(RED_BLOCK);
        break;
      }
      default:{
        break;
      }
    }
  } if ($screenWidth >= 768 && $screenWidth < 1200) {
    remainder = (length - $(".red-block").length) % 2;
    $(".red-block").remove();
    if (remainder === 1) {
      $("#contact").after(RED_BLOCK);
    }
  } if ($screenWidth < 768) {
    $(".red-block").remove();
  }
}

function setData(){
  $.ajax({  
    url : "http://65.49.201.60:7777/works",
    type : 'GET',
    error : function() {
      console.log('请求失败 ');
    },
    success : function(data) {
      console.log(data.data)
      let responseData = data.data,
          currentId;

      for(let i = 0;i < responseData.length;i++){
        currentId = responseData[i].workId;
        //若数据全不为空为真
        if($.trim(responseData[i].content1) !== "" && $.trim(responseData[i].content2) !== "" /*&& responseData[i].img !== null && responseData[i].rgba !== null*/){
          var blockData = "<div id='list" + currentId + "' class='list col-lg-4 col-md-6 col-sm-6 col-xs-12'><div class='bg-pic'><img></div><div id='list" + currentId + "-1' class='list-details'><a href='#'><p class='tit-1'></p><p class='tit-2'></p><img src='../images/icons/details.png' class='tit-3'>  </a></div></div>";
          $("#contact").before(blockData);
        }
      }

      for(let i = 0;i < responseData.length;i++){
        currentId = responseData[i].workId;
        //若数据全不为空为真
        if($.trim(responseData[i].content1) !== "" && $.trim(responseData[i].content2) !== "" /*&& responseData[i].img !== null && responseData[i].rgba !== null*/){
          $("#list" + currentId +  " .tit-1").html(responseData[i].content1);
          $("#list" + currentId +  " .tit-2").html(responseData[i].content2);
          $("#list" + currentId +  " .list-details").css("background",responseData[i].rgba);
          $("#list" + currentId +  " .bg-pic img").attr("src",responseData[i].img);
          $("#list" + currentId +  " a").attr('href', 'details.html?id=' + (i + 1))
        }

        switch(currentId){
          case 1:{
            $("#list" + currentId +  " .tit-1").css("color","#729dfa");
            $("#list" + currentId +  " .tit-2").css("color","#fff");
            break;
          }
          case 2:{
            $("#list" + currentId +  " .tit-1").css("color","#882b30");
            $("#list" + currentId +  " .tit-2").css("color","#fff");
            break;
          }
          case 3:{
            $("#list" + currentId +  " .tit-1").css("color","#dfdfdf");
            $("#list" + currentId +  " .tit-2").css("color","#ce9d76");
            break;
          }
          case 4:{
            $("#list" + currentId +  " .tit-2").css("color","#bba1a1");
            break;
          }
          case 5:{
            $("#list" + currentId +  " .tit-2").css("color","#187ade");
            break;
          }
          case 6:{
            $("#list" + currentId +  " .tit-2").css("color","#f6c020");
            break;
          }
          case 7:{
            $("#list" + currentId +  " .tit-2").css("color","#a4a49d");
            break;
          }
          case 8:{
            $("#list" + currentId +  " .tit-2").css("color","#dec378");
            break;
          }
          case 9:{
            $("#list" + currentId +  " .tit-2").css("color","#cdae44");
            break;
          }
          case 10:{
            $("#list" + currentId +  " .tit-2").css("color","#f0b2c4");
            break;
          }
          case 11:{
            $("#list" + currentId +  " .tit-2").css("color","#accf84");
            break;
          }
          case 12:{
            $("#list" + currentId +  " .tit-2").css("color","#2b2519");
            break;
          }
          case 13:{
            $("#list" + currentId +  " .tit-2").css("color","#8b4d4d");
            break;
          }
          case 14:{
            $("#list" + currentId +  " .tit-2").css("color","#dec378");
            break;
          }
          case 15:{
            $("#list" + currentId +  " .tit-2").css("color","#5b553f");
            break;
          }
          case 16:{
            $("#list" + currentId +  " .tit-2").css("color","#5b553f");
            break;
          }
          case 45:{
            $("#list" + currentId +  " .tit-2").css("color","#313131");
            break;
          }
        }
      }
    }
  });
}

function setContactData(){
  $.ajax({  
    url : "http://65.49.201.60:7777/home/contact",
    type : 'GET',
    error : function() {
      console.log('请求失败 ');
    },
    success : function(data) {
      $(".contact-text p").first().html(data.data.content1)
                          .next().html(data.data.content2)
                          .next().html(data.data.content3)
                          .next().html(data.data.content4)
                          .next().html(data.data.content5)
    }
  });
}

$(window).resize(function (){
  addRedBlock($('.list').length);
});


$(function(){
  if($("#add").length == 0){
    setData();
  }
  setContactData();

  //设置初始偏移量
  $(".bg-pic").css("left",$iniWidthOffset + 'px')
              .css("top",$iniHeightOffset + 'px');

//图片动画
  $(document).on("mousemove",".list",function(event){
    event =  event || window.event;
    let $screenWidth = $(window).width() + 17,
        x = event.pageX - $(this).offset().left,
        y = event.pageY - $(this).offset().top,
        positionX = x/$blockWidth * $iniWidthOffset,
        positionY = y/$blockHeight * $iniHeightOffset,
        number = $(this).index() - 1,
        up = $(this).index() - 1,
        down = $(this).index() - 1;

    function setOffsetLeft(){
      if (up > 0) {
        $(".list")[up - 1].children[0].style.left = positionX + 'px';
      }
      if (down < ($(".list").length - $(".red-block").length)) {
        $(".list")[down - 1].children[0].style.left = positionX + 'px';
      }
    }

    $(this).children(".bg-pic").css("left",positionX + 'px')
                               .css("top",positionY + 'px');
    
    //设置上下元素的left值
    if($screenWidth >= 1200){
      number %= 3;
      while(down < ($(".list").length - $(".red-block").length) || up > 0){
        up -= 3;
        down += 3;
        setOffsetLeft();
      }
      //设置左右元素的top值
      switch(number){
        case 0:{
          $(this).prev().children(".bg-pic").css("top",positionY);
          $(this).prev().prev().children(".bg-pic").css("top",positionY);
          break;
        }
        case 1:{
          $(this).next().children(".bg-pic").css("top",positionY);
          $(this).next().next().children(".bg-pic").css("top",positionY);
          break;
        }
        case 2:{
          $(this).prev().children(".bg-pic").css("top",positionY);
          $(this).next().children(".bg-pic").css("top",positionY);
          break;
        }
      }
    } if ($screenWidth >= 768 && $screenWidth < 1200) {
      number %= 2;
      while(down < ($(".list").length - $(".red-block").length) || up > 0){
        up -= 2;
        down += 2;
        setOffsetLeft();
      }
      //设置左右元素的top值
      switch(number){
        case 0:{
          $(this).prev().children(".bg-pic").css("top",positionY);
          break;
        }
        case 1:{
          $(this).next().children(".bg-pic").css("top",positionY);
          break;
        }
      }
    } if ($screenWidth < 768) {
      $(".bg-pic").css("left",positionX + 'px');
    }
  });
})