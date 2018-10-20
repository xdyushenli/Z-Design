function setData(){
  //查询页面数据
  $.ajax({  
    url : "http://65.49.201.60:7777/home/inner",
    type : 'GET',
    error : function() {
      console.log('请求失败 ');
    },
    success : function(data) {
      let responseData = data.data;
      
      $(".team-text").html(responseData.content);
      setMargin();

      
      $("#img1").attr("src",responseData.images[0].imageUrl);
      $("#img2").attr("src",responseData.images[1].imageUrl);
      $("#img3").attr("src",responseData.images[2].imageUrl);
      
      for(let j = 1;j < 5;j++){
        for(let i = 0;i < (responseData.images.length - 3)/4;i++){
          $(".logo-list1 #carsous" + j + " .item").first().append("<img class='logo-item' src='" + responseData.images[i * 4 + 3].imageUrl + "'>")
                                .next().append("<img class='logo-item' src='" + responseData.images[i * 4 + 4].imageUrl + "'>")
                                .next().append("<img class='logo-item' src='" + responseData.images[i * 4 + 5].imageUrl + "'>")
                                .next().append("<img class='logo-item' src='" + responseData.images[i * 4 + 6].imageUrl + "'>")
        }
      }

      for(let j = 1;j < 3;j++){
        for(let i = 0;i < (responseData.images.length - 3);i++){
          var imgId = i + 3;
          if(i % 2 === 0){
            $(".logo-list2 #logo-unit" + j + " .item").first().append("<img class='logo-item' src='" + responseData.images[i + 3].imageUrl + "'>") 
          }else{
            $(".logo-list2 #logo-unit" + j + " .item").last().append("<img class='logo-item' src='" + responseData.images[i + 3].imageUrl + "'>")
          }
        }
      }
    }
  });
}

function setMargin(){
  let textHigh,
      screenWidth = $(window).width() + 17;
  if(screenWidth >= 768){
    textHigh = $('.team-text').height();
    $('.team-text').css('margin-top',(500 - textHigh)/2 + 'px');
  }else{
    $('.team-text').css('margin-top','inherit');
  }
}

$(function(){
  if($('#alter1').length == 0){
    setData();
  }

  $(".carous").carousel({
    interval: 5000,
    pause: "none"
  });

  $(window).resize(function(){
    let textHigh,
      screenWidth = $(window).width();
    if(screenWidth >= 768){
      textHigh = $('.team-text').height();
      $('.team-text').css('margin-top',(500 - textHigh)/2 + 'px');
    }else{
    $('.team-text').css('margin-top','inherit');
    }
  })
})