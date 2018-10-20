//input元素常量
var INPUT_ELE = "<input>",
    INPUT_ELE_BG = "<input class='input-alter-1'>",
//textarea元素常量
    TEXTAREA_ELE = "<textarea></textarea>",
//定义元素内容节点
    TIT_INI,
//定义修改按键元素常量
    ALTER_BTN,
//获取事件发生ID
    CURRENT_ID,
//定义reg常量
    REG = /\<(\S*?)[^>]*\>.*?|\<.*? \>/g;

$(function(){
  //给标题定义双击事件，双击后原来文本由输入框代替
  $('.tit').dblclick(function(){
    TIT_INI = $(this).html();
    $(this).html(INPUT_ELE)
           .find('input').focus()
           .attr("placeholder",TIT_INI);
  });

  //给未来生成的input元素添加失去焦点事件，替换文本的值
  $('.tit').on("blur","input",function(){
    if ($.trim($(this).val()) == "" || REG.test($(this).val())) {
      $(this).parent().html(TIT_INI);
    }
    else {
      let text = $.trim($(this).val());
      //将新输入的值填写到页面中
      $(this).parent().html(text);
    }
  });

  //给文本定义双击事件，双击后原来文本由输入框代替
  $('.text-details').dblclick(function(){
    TIT_INI = $(this).html();
    $(this).html(TEXTAREA_ELE)
           .find('textarea').focus();
  });

  //给未来生成的textarea元素添加失去焦点事件，替换文本的值
  $('.text-details').on("blur","textarea",function(){
    if ($.trim($(this).val()) == "" || REG.test($(this).val())) {
      $(this).parent().html(TIT_INI);
    }
    else {
      let text = $.trim($(this).val());
      //将新输入的值填写到页面中
      $(this).parent().html(text);
    }
  });

  //给按钮一添加单击事件，更改文本背景色及透明度
  $(".alter-1").click(function(){
    //获取事件发生未知
    CURRENT_ID = Number($(this).parents(".text").attr("id").replace(/[^0-9]/ig,""));
    //克隆被替换元素
    ALTER_BTN = $(this).clone(true);
    //替换元素
    $(this).replaceWith(INPUT_ELE_BG);
    //替换后元素自动获取焦点
    $('.input-alter-1').focus();
  });

  //给未来生成的input元素添加失去焦点事件，改变背景和不透明度
  $('body').on("blur",".input-alter-1",function(){
    //获取输入框value
    let RGBA = $.trim($(this).val());
    //若输入不为空，设置text背景色
    if (!(RGBA == "" || REG.test($(this).val()))) {
      $("#text-" + CURRENT_ID).css("background-color","rgba(" + RGBA + ")");
    }
    //将元素换回之前的元素
    $(this).replaceWith(ALTER_BTN);
  });

   //给文件添加按钮设置改变事件，改变背景图片
  $("#alter-2 input").change(function(){
    let file = document.getElementById("file").files[0];
    CURRENT_ID = Number($('body').attr("class").replace(/[^0-9]/ig,"")) + 1;
    $.ajax({
        url : "http://65.49.201.60:7777/home/" + CURRENT_ID + "/photos", 
        type : 'POST', 
        processData : false,
        contentType : false,
        cache: false,
        data : new FormData($("#uploadform")[0]),
        mimeType: "multipart/form-data",
        error : function(XMLHttpRequest, textStatus, errorThrown) {
              console.log(XMLHttpRequest.status);
              console.log(XMLHttpRequest.readyState);
              console.log(textStatus);
              console.log(this);
        },
        success : function(data) {
            $(".bg-pic")[CURRENT_ID - 1].src = JSON.parse(data).data;
        }
      });
  });

  //阻止添加文件按钮事件冒泡
  $("#alter-2 input").click(function(event){
    event.stopPropagation();
  });

  //给按钮二添加单击事件，更改背景图片
  $("#alter-2").click(function(){
    $("#alter-2 input").trigger("click");
  });
})