//设置页面
function setData(){
  var id = window.location.href.split('=')[1];

  $.ajax({  
    url : "http://65.49.201.60:7777/works/" + id + "/images",
    type : 'GET',
    error : function() {
      console.log('请求失败 ');
    },
    success : function(data) {
      for(let i = 0;i < data.data.length;i++){
        if(data.data[i].workId == id){
          $("#locate").before("<img class='text' src=" + data.data[i].imageUrl + ">")
        }
      }
    }
  });
};

$(function(){
  if($(".index").length === 1){
    setData();
  }
})