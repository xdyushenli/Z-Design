//设置页面
function setChangeData(){
  var id = window.location.href.split('=')[1];

  $.ajax({  
    url : "http://65.49.201.60:7777/works/" + id + "/images",
    type : 'GET',
    error : function() {
      console.log('请求失败 ');
    },
    success : function(data) {
      console.log(data.data)
      if(data.data.length == 0){
        $("#locate").before("<div class='father'><img class='btns delete' src='../images/icons/delete.png'><div class='alter-1 btns'><form id='uploadform1' enctype='multipart/form-data' style='display: none;'><input id='file1' type='file' name='file'></form></div><img class='text'></div>");
      }

      for(let i = 0;i < data.data.length;i++){
        if(data.data[i].workId == id){
          var blockData = "<div class='father' id='" + data.data[i].id + "'><img class='btns delete' src='../images/icons/delete.png'><div class='alter-1 btns'><form id='uploadform1' enctype='multipart/form-data' style='display: none;'><input id='file1' type='file' name='file'></form></div><img class='text'></div>";
          $("#locate").before(blockData);
          $("#" + data.data[i].id + " .text").attr("src",data.data[i].imageUrl);
        }
      }
    
      $(".father").last().append("<div class='alter-2 btns'><form id='uploadform2' enctype='multipart/form-data' style='display: none;'><input id='file2' type='file' name='file'></form></div>");
    
      if(data.data.length == 0) {
        $('.alter-2').css('position', 'fixed')
      }
    }
  });
};

//删除
$(document).on("click",".delete",function(){
  var workId = window.location.href.split('=')[1],
      imgId = $(this).parents(".father").attr("id");

  $(this).parents(".father").remove();
  $(".father").last().append("<div class='alter-2 btns'><form id='uploadform2' enctype='multipart/form-data' style='display: none;'><input id='file2' type='file' name='file'></form></div>");
  $.ajax({  
      url : "http://65.49.201.60:7777/works/" + workId + "/images/" + imgId, 
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
});

//更改背景图片
$(document).on("change","#file1",function(){
  let file = document.getElementById("file1").files[0],
      workId = window.location.href.split('=')[1],
      imgId = $(this).parents(".father").attr("id");

  console.log(workId)
  $.ajax({  
      url : "http://65.49.201.60:7777/works/" + workId + "/images/" + imgId,
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
          $("#" + imgId + " .text").attr("src",JSON.parse(data).data)
      }
    });
});

//添加背景图片
$(document).on("change","#file2",function(){
  let file = document.getElementById("file2").files[0],
      workId = window.location.href.split('=')[1];
  $.ajax({  
      url : "http://65.49.201.60:7777/works/" + workId + "/images",
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
            console.log(file);
      },
      success : function(data) {
          $("#locate").before("<div class='father' id='" + JSON.parse(data).data.id + "'><img class='btns delete' src='../images/icons/delete.png'><div class='alter-1 btns'><form id='uploadform1' enctype='multipart/form-data' style='display: none;'><input id='file1' type='file' name='file'></form></div><img class='text'></div>");
          $(".alter-2").remove();
          $(".father").last().append("<div class='alter-2 btns'><form id='uploadform2' enctype='multipart/form-data' style='display: none;'><input id='file2' type='file' name='file'></form></div>");
          $("#" + JSON.parse(data).data.id + " .text").attr("src",JSON.parse(data).data.imageUrl);
      }
    });
});

//阻止事件冒泡
$(document).on("click","#file1,#file2",function(event){
  event.stopPropagation();
});

//给图片上传按钮添加单击事件
$(document).on("click",".alter-1,.alter-2",function(){
  $(this).children().children().trigger("click");
});

$(function(){
  setChangeData();
})