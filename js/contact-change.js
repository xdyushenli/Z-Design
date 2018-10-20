//input元素常量
var INPUT_ELE = "<input>",
//定义元素内容节点
    TIT_INI,
//定义reg常量
    REG = /\<(\S*?)[^>]*\>.*?|\<.*? \>/g;

$('#text-1,#text-2 p').dblclick(function(){
  let wide = $(this).width();

  TIT_INI = $(this).html();
  $(this).html(INPUT_ELE)
         .find('input')
         .css("width",wide)
         .focus()
         .attr("placeholder",TIT_INI);
});

//给未来生成的input元素添加失去焦点事件，替换文本的值
$('#text-1,#text-2 p').on("blur","input",function(){
  if ($.trim($(this).val()) == "" || REG.test($(this).val())) {
    $(this).parent().html(TIT_INI);
  }
  else {
    let text = $.trim($(this).val());
    //将新输入的值填写到页面中
    $(this).parent().html(text);
    $.ajax({  
      url : "http://65.49.201.60:7777/home/contact", 
      type : 'put', 
      contentType:'application/json;charset=UTF-8',
      dataType: "json",
      data : "{\"content1\":\"" + $("#text-1")[0].innerHTML +  
            "\",\"content2\":\"" + $("#text-2 p")[0].innerHTML + 
            "\",\"content3\":\"" + $("#text-2 p")[1].innerHTML + 
            "\",\"content4\":\"" + $("#text-2 p")[2].innerHTML + 
            "\",\"content5\":\"" + $("#text-2 p")[3].innerHTML + 
               "\"}",
      error : function(XMLHttpRequest, textStatus, errorThrown) {
        console.log(XMLHttpRequest.status);
        console.log(XMLHttpRequest.readyState);
        console.log(textStatus);
        console.log(this);
      },
      success : function(data) {
      }
    });
  }
});

//更改背景图片
$(".file").change(function(){
  let file = document.getElementsByClassName("file")[0].files[0];
  $.ajax({  
      url : "http://65.49.201.60:7777/home/contact", 
      type : 'POST', 
      processData : false,
      contentType : false,
      cache: false,
      data : new FormData($(this).parent()[0]),
      mimeType: "multipart/form-data",
      error : function(XMLHttpRequest, textStatus, errorThrown) {
            console.log(XMLHttpRequest.status);
            console.log(XMLHttpRequest.readyState);
            console.log(textStatus);
            console.log(this);
      },
      success : function(data) {
          $(".map-img").attr("src",JSON.parse(data).data.imageUrl);
      }
    });
});

//阻止事件冒泡
$(".file").click(function(event){
  event.stopPropagation();
});

//给图片上传按钮添加单击事件
$(".alter").click(function(){
  $(this).children().children().trigger("click");
});