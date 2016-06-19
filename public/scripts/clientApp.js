var todo= [];
var completed= [];

$(document).ready(function(){
  console.log("the bling works!");

  $(document).on('click', '#subTask', function(){
    var inItem = $('#taskIn').val();
    console.log('button clicked! And now we have ' + inItem );
    var objToSend = {
      "toDo": inItem
    };
    $.ajax({
      type: 'POST',
      url: '/sendItem',
      data: objToSend
    });
$.ajax({
  type: 'GET',
  url: '/getList',
  success: function(data){
    writeList(data);
    console.log(data);
  }
});

  });

  var writeList = function(items){
    console.log("In writeList");
    $('#list').empty();
    
  };

});
