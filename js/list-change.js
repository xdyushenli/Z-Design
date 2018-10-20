function setData(){
  $.ajax({  
    url : "http://65.49.201.60:7777/works",
    type : 'GET',
    error : function() {
      console.log('请求失败 ');
    },
    success : function(data) {
      let responseData = data.data,
          currentId;

      for(let i = 0;i < responseData.length;i++){
        currentId = responseData[i].workId;
        //若数据全不为空为真
        if($.trim(responseData[i].content1) !== "" && $.trim(responseData[i].content2) !== "" && responseData[i].rgba !== null){
          var blockData = "<div id='list" + currentId + "' class='list col-lg-4 col-md-6 col-sm-6 col-xs-12'><div class='bg-pic'><img></div><div id='list" + currentId + "-1' class='list-details'><div class='alter user-btn pic-change'><form class='uploadform' enctype='multipart/form-data' style='display: none;'><input class='file' type='file' name='file'></form></div><img class='user-btn delete' src='../images/icons/delete.png'><p class='tit-1'></p><p class='tit-2'></p><img src='../images/icons/details.png' class='tit-3'><img src='../images/icons/alter.png' class='tit-3 user-btn color-change'></div></div>";
          $("#contact").before(blockData);
        }
      }

      $(".list .pic-change").first().addClass("fir-pic-change");
      $(".list .delete").first().addClass("fir-delete");

      for(let i = 0;i < responseData.length;i++){
        currentId = responseData[i].workId;
        //若数据全不为空为真
        if($.trim(responseData[i].content1) !== "" && $.trim(responseData[i].content2) !== "" && responseData[i].rgba !== null){
          $("#list" + currentId +  " .tit-1").html(responseData[i].content1);
          $("#list" + currentId +  " .tit-2").html(responseData[i].content2);
          $("#list" + currentId +  " .list-details").css("background",responseData[i].rgba);
          $("#list" + currentId +  " .bg-pic img").attr("src",responseData[i].img);
        }

        switch(currentId){
          case 1:{
            $("#list" + currentId +  " .tit-1").css("color","#729dfa");
            $("#list" + currentId +  " .tit-2").css("color","#fff");
            $("#list" + currentId +  " a").attr("href","#");
            break;
          }
          case 2:{
            $("#list" + currentId +  " .tit-1").css("color","#882b30");
            $("#list" + currentId +  " .tit-2").css("color","#fff");
            $("#list" + currentId +  " a").attr("href","#");
            break;
          }
          case 3:{
            $("#list" + currentId +  " .tit-1").css("color","#dfdfdf");
            $("#list" + currentId +  " .tit-2").css("color","#ce9d76");
            $("#list" + currentId +  " a").attr("href","#");
            break;
          }
          case 4:{
            $("#list" + currentId +  " .tit-2").css("color","#bba1a1");
            $("#list" + currentId +  " a").attr("href","#");
            break;
          }
          case 5:{
            $("#list" + currentId +  " .tit-2").css("color","#187ade");
            $("#list" + currentId +  " a").attr("href","#");
            break;
          }
          case 6:{
            $("#list" + currentId +  " .tit-2").css("color","#f6c020");
            $("#list" + currentId +  " a").attr("href","#");
            break;
          }
          case 7:{
            $("#list" + currentId +  " .tit-2").css("color","#a4a49d");
            $("#list" + currentId +  " a").attr("href","#");
            break;
          }
          case 8:{
            $("#list" + currentId +  " .tit-2").css("color","#dec378");
            $("#list" + currentId +  " a").attr("href","#");
            break;
          }
          case 9:{
            $("#list" + currentId +  " .tit-2").css("color","#cdae44");
            $("#list" + currentId +  " a").attr("href","#");
            break;
          }
          case 10:{
            $("#list" + currentId +  " .tit-2").css("color","#f0b2c4");
            $("#list" + currentId +  " a").attr("href","#");
            break;
          }
          case 11:{
            $("#list" + currentId +  " .tit-2").css("color","#accf84");
            $("#list" + currentId +  " a").attr("href","#");
            break;
          }
          case 12:{
            $("#list" + currentId +  " .tit-2").css("color","#2b2519");
            $("#list" + currentId +  " a").attr("href","#");
            break;
          }
          case 13:{
            $("#list" + currentId +  " .tit-2").css("color","#8b4d4d");
            $("#list" + currentId +  " a").attr("href","#");
            break;
          }
          case 14:{
            $("#list" + currentId +  " .tit-2").css("color","#dec378");
            $("#list" + currentId +  " a").attr("href","#");
            break;
          }
          case 15:{
            $("#list" + currentId +  " .tit-2").css("color","#5b553f");
            $("#list" + currentId +  " a").attr("href","#");
            break;
          }
          case 16:{
            $("#list" + currentId +  " .tit-2").css("color","#5b553f");
            $("#list" + currentId +  " a").attr("href","#");
            break;
          }
          case 45:{
            $("#list" + currentId +  " .tit-2").css("color","#313131");
            $("#list" + currentId +  " a").attr("href","#");
            break;
          }
        }
      }
    }
  });
}

$(function(){
  //input元素常量
  var INPUT_ELE = "<input>",
      INPUT_ELE_BG = "<input class='input-alter-1'>",
  //textarea元素常量
      TEXTAREA_ELE = "<textarea></textarea>",
  //定义当前ID
      CURRENT_ID,
  //定义元素内容节点
      TIT_INI,
  //定义reg常量
      REG = /\<(\S*?)[^>]*\>.*?|\<.*? \>/g;

  setData();

  //给标题定义双击事件，双击后原来文本由输入框代替
  $(document).on("dblclick",".list-details p",function(){
    CURRENT_ID = Number($(this).parents(".list").attr("id").replace(/[^0-9]/ig,""));
    TIT_INI = $(this).html();
    $(this).html(INPUT_ELE)
           .find('input').focus()
           .attr("placeholder",TIT_INI);
  });

  //给未来生成的input元素添加失去焦点事件，替换文本的值
  $(document).on("blur",".list-details p input",function(){
    if ($.trim($(this).val()) == "" || REG.test($(this).val())) {
      $(this).parent().html(TIT_INI);
      $(this).parent().html($.trim($(this).val()));
    }
    else {
      $(this).parent().html($.trim($(this).val()));
      $.ajax({  
        url : "http://65.49.201.60:7777/works/" + CURRENT_ID, 
        type : 'put', 
        contentType:'application/json;charset=UTF-8',
        data : "{\"content1\":\"" + $("#list" + CURRENT_ID + " .tit-1").html() +  
              "\",\"content2\":\"" + $("#list" + CURRENT_ID + " .tit-2").html() + 
              "\",\"rgba\":\"" + $("#list" + CURRENT_ID + "-1").css("background-color") + 
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

  //给颜色改变按钮添加单击事件，更改文本背景色及透明度
  $(document).on("click",".color-change",function(){
    //获取事件发生未知
    CURRENT_ID = Number($(this).parents(".list").attr("id").replace(/[^0-9]/ig,""));
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
      $("#list" + CURRENT_ID + "-1").css("background-color","rgba(" + RGBA + ")");
      $.ajax({  
        url : "http://65.49.201.60:7777/works/" + CURRENT_ID, 
        type : 'put', 
        contentType:'application/json;charset=UTF-8',
        data : "{\"rgba\":\"" + "rgba(" + RGBA + ")" + "\"}",
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
    //将元素换回之前的元素
    $(this).replaceWith(ALTER_BTN);
  });

  //删除
  $(document).on("click",".delete",function(){
    $(this).parents(".list").remove();
    $(".list .pic-change").first().addClass("fir-pic-change");
    $(".list .delete").first().addClass("fir-delete");
    CURRENT_ID = Number($(this).parents(".list").attr("id").replace(/[^0-9]/ig,""));
    $.ajax({  
        url : "http://65.49.201.60:7777/works/" + CURRENT_ID, 
        type : 'delete',
        error : function(XMLHttpRequest, textStatus, errorThrown) {
              console.log(XMLHttpRequest.status);
              console.log(XMLHttpRequest.readyState);
              console.log(textStatus);
              console.log(this);
        },
        success : function(data) {
        }
      });
    addRedBlock($(".list").length);
  });

  //更改背景图片
  $(document).on("change",".file",function(){
    let file = document.getElementsByClassName("file")[0].files[0];
    CURRENT_ID = Number($(this).parents(".list").attr("id").replace(/[^0-9]/ig,""));
    $.ajax({  
        url : "http://65.49.201.60:7777/works/" + CURRENT_ID + "/photos", 
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
            $("#list" + CURRENT_ID + " .bg-pic img").attr("src",JSON.parse(data).data);
        }
      });
  });

  //阻止事件冒泡
  $(document).on("click",".file",function(event){
    event.stopPropagation();
  });

  //给图片上传按钮添加单击事件
  $(document).on("click",".alter",function(){
    $(this).children().children().trigger("click");
  });

  //新建模块
  $("#add").click(function(){
    var tit_1 = prompt("新建模块主标题",""),
        tit_2 = prompt("新建模块副标题",""),
        rgba = prompt("背景色","");
    $.ajax({  
        url : "http://65.49.201.60:7777/works", 
        type : 'POST',
        data : "{\"content1\":\"" + tit_1 +  
              "\",\"content2\":\"" + tit_2 + 
              "\",\"rgba\":\"" + "rgba(" + rgba + ")" + 
                 "\"}",
        contentType : "application/json;charset=UTF-8",
        error : function(XMLHttpRequest, textStatus, errorThrown) {
              console.log(XMLHttpRequest.status);
              console.log(XMLHttpRequest.readyState);
              console.log(textStatus);
              console.log(this);
        },
        success : function(data) {
          var currentId = data.data.workId,
              blockData = "<div id='list" + currentId + "' class='list col-lg-4 col-md-6 col-sm-6 col-xs-12'><div class='bg-pic'><img></div><div id='list" + currentId + "-1' class='list-details'><div class='alter user-btn pic-change'><form class='uploadform' enctype='multipart/form-data' style='display: none;'><input class='file' type='file' name='file'></form></div><img class='user-btn delete' src='../images/icons/delete.png'><p class='tit-1'></p><p class='tit-2'></p><img src='../images/icons/details.png' class='tit-3'><img src='../images/icons/alter.png' class='tit-3 user-btn color-change'></div></div>";
          $("#contact").before(blockData);
          $("#list" + currentId + " .tit-1").html(tit_1);
          $("#list" + currentId + " .tit-2").html(tit_2);
          $("#list" + currentId + " .list-details").css("background","rgba(" + rgba + ")");
          $(".list .pic-change").first().addClass("fir-pic-change");
          $(".list .delete").first().addClass("fir-delete");
          addRedBlock($(".list").length);
        }
      });
  });
})