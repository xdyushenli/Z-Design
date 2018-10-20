//input元素常量
var TEXTAREA_ELE = "<textarea></textarea>",
//定义元素内容节点
    TIT_INI,
//定义reg常量
    REG = /\<(\S*?)[^>]*\>.*?|\<.*? \>/g;

function setChangeData(){
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
      
      for(let i = 0;i < (responseData.images.length - 3);i++){
        var ids = i + 3,
            id = responseData.images[ids].id,
            dataBlock = "<div id='" + id + "' class='logo-units col-lg-3 col-md-3 col-sm-4 col-xs-6'><div class='alter" + id + " alter btns'><form class='uploadform' enctype='multipart/form-data' style='display: none;'><input class='file' type='file' name='file'></form></div><img class='logo-img' src=" + responseData.images[ids].imageUrl + "><img class='delete btns' src='../../images/icons/delete.png'></div>";
        $("#locate").before(dataBlock);
      }
    }
  });
}

//给文本定义双击事件，双击后原来文本由输入框代替
$('.team-text').dblclick(function(){
  TIT_INI = $(this).html();
  $(this).html(TEXTAREA_ELE)
         .find('textarea')
         .css("height","150px")
         .css("width","700px")
         .focus();
});

//给未来生成的textarea元素添加失去焦点事件，替换文本的值
$('.team-text').on("blur","textarea",function(){
  if ($.trim($(this).val()) == "" || REG.test($(this).val())) {
    $(this).parent().html(TIT_INI);
  }
  else {
    let text = $.trim($(this).val());
    //将新输入的值填写到页面中
    $(this).parent().html(text);
    $.ajax({  
      url : "http://65.49.201.60:7777/home/inner/content", 
      type : 'put', 
      contentType:'application/json;charset=UTF-8',
      dataType: "json",
      data : "{\"content\":\"" + text + "\"}",
      error : function(XMLHttpRequest, textStatus, errorThrown) {
        console.log(XMLHttpRequest.status);
        console.log(XMLHttpRequest.readyState);
        console.log(textStatus);
        console.log(this);
      },
      success : function(data){
      }
    });
  }
});

//给文件添加按钮设置改变事件，改变背景图片
$("#alter1 input,#alter2 input,#alter3 input").change(function(){
  let id = $(this).parent().parent().attr("id").replace(/[^0-9]/ig,"") - 1,
      file = document.getElementsByClassName("file")[id].files[0];
  $.ajax({  
      url : "http://65.49.201.60:7777/home/inner/images/" + (id + 1), 
      type : 'POST', 
      processData : false,
      contentType : false,
      cache: false,
      data : new FormData($(".uploadform")[id]),
      mimeType: "multipart/form-data",
      error : function(XMLHttpRequest, textStatus, errorThrown) {
            console.log(XMLHttpRequest.status);
            console.log(XMLHttpRequest.readyState);
            console.log(textStatus);
            console.log(this);
      },
      success : function(data) {
        $("#img" + (id + 1)).attr("src",JSON.parse(data).data);
      }
    });
});

//阻止添加文件按钮事件冒泡
$("#alter1 input,#alter2 input,#alter3 input").click(function(event){
  event.stopPropagation();
});

//给按钮二添加单击事件，更改背景图片
$("#alter1,#alter2,#alter3").click(function(){
  let id = $(this).attr("id").replace(/[^0-9]/ig,"");
  $("#alter" + id + " input").trigger("click");
});

//给文件添加按钮设置改变事件，改变背景图片
$(document).on("change",".alter input",function(){
  let id = $(this).parent().parent().attr("class").replace(/[^0-9]/ig,"") - 1,
      file = document.getElementsByClassName("file")[id].files[0];
  $.ajax({  
      url : "http://65.49.201.60:7777/home/inner/images/" + (id + 1), 
      type : 'POST', 
      processData : false,
      contentType : false,
      cache: false,
      data : new FormData($(".uploadform")[id]),
      mimeType: "multipart/form-data",
      error : function(XMLHttpRequest, textStatus, errorThrown) {
            console.log(XMLHttpRequest.status);
            console.log(XMLHttpRequest.readyState);
            console.log(textStatus);
            console.log(this);
      },
      success : function(data) {
        $(".logo-img")[id - 3].setAttribute("src",JSON.parse(data).data);
      }
    });
});

//阻止添加文件按钮事件冒泡
$(document).on("click",".alter input",(function(event){
    event.stopPropagation();
  })
);

//给按钮二添加单击事件，更改背景图片
$(document).on("click",".alter",function(){
  let id = $(this).attr("class").replace(/[^0-9]/ig,"");
  $(".alter" + id + " input").trigger("click");
});

//给文件添加按钮设置改变事件，改变背景图片
$("#add input").change(function(){
  let file = document.getElementById("adds").files[0];
  $.ajax({  
      url : "http://65.49.201.60:7777/home/inner/images", 
      type : 'POST', 
      processData : false,
      contentType : false,
      cache: false,
      data : new FormData($(".uploadform").last()[0]),
      mimeType: "multipart/form-data",
      error : function(XMLHttpRequest, textStatus, errorThrown) {
            console.log(XMLHttpRequest.status);
            console.log(XMLHttpRequest.readyState);
            console.log(textStatus);
            console.log(this);
      },
      success : function(data) {
        dataBlock = "<div id='" + JSON.parse(data).data.id + "' class='logo-units col-lg-3 col-md-3 col-sm-4 col-xs-6'><div class='alter" + JSON.parse(data).data.id + " alter btns'><form class='uploadform' enctype='multipart/form-data' style='display: none;'><input class='file' type='file' name='file'></form></div><img class='logo-img' src=" + JSON.parse(data).data.imageUrl + "><img class='delete btns' src='../../images/icons/delete.png'></div>";
        $("#locate").before(dataBlock);
      }
    });
});

//阻止添加文件按钮事件冒泡
$("#add input").click(function(event){
  event.stopPropagation();
});

//给按钮二添加单击事件，更改背景图片
$("#add").click(function(){
  $("#add input").trigger("click");
});

$(document).on("click",".delete",function(){
  var id = $(this).parent().attr("id");

  $.ajax({  
      url : "http://65.49.201.60:7777/home/inner/images/" + id, 
      type : 'delete', 
      error : function(XMLHttpRequest, textStatus, errorThrown) {
            console.log(XMLHttpRequest.status);
            console.log(XMLHttpRequest.readyState);
            console.log(textStatus);
            console.log(this);
      },
      success : function(data) {
        $("#" + id).remove();
      }
    });
})

function setMargin(){
  let textHigh,
      screenWidth = $(window).width();
  if(screenWidth >= 768){
    textHigh = $('.team-text').height();
    $('.team-text').css('margin-top',(500 - textHigh)/2 + 'px');
  }else{
    $('.team-text').css('margin-top','inherit');
  }
}

$(function(){
  setChangeData();
})