var todo= [];
var completed= [];

$(document).ready(function(){
  console.log("the bling works!");

  $(document).on('click', '#subTask', function(){
    var inItem = $('#taskIn').val();
    console.log('button clicked! And now we have ' + inItem );
    var objToSend = {
      "todo": inItem
    };
    $.ajax({
      type: 'POST',
      url: '/sendItem',
      data: objToSend
    });

    receiveList();

  });

$(document).on('click', '#deleteItem', function(){
  var id = $(this).data("id");
  var objToSend = {
    "id": id
  };
  $.ajax({
    type: 'POST',
    url: '/deleteItem',
    data: objToSend
  });

  receiveList();
  console.log("We have sent to be deleted ID number: " + id);
});

$(document).on('click', '#completeItem', function(){
  var id = $(this).data("id");
  var objToSend = {
    "id": id
  };
  $.ajax({
    type: 'POST',
    url: '/completeItem',
    data: objToSend
  });

  receiveList();
  console.log("We have sent to be completed ID number: " + id);
});


var receiveList = function(){

      $.ajax({
        type: 'GET',
        url: '/getList',
        success: function(data){
          writeList(data);
          console.log(data);
        }



      });

      $.ajax({
        type: 'GET',
        url: '/getCompleted',
        success: function(data){
          writeComplete(data);
          console.log(data);
        }
      });

        var writeList = function(items){
          console.log("In writeList");
          $('#list').empty();
          for (var i = 0; i < items.length; i++){
            $('#list').append('<p>Item: '+ items[i].todo + '</p>');
            $('#list').append('<button data-id="' + items[i].id +'" id="completeItem" name="completeItem">Mark '+ items[i].todo +' as complete!</button>');
            $('#list').append('<button data-id="' + items[i].id +'" id="deleteItem" name="deleteItem">Delete '+ items[i].todo +'</button>');
          }

        };
        var writeComplete = function(itemsIn){
          console.log("In writeList");
          $('#completed').empty();
          for (var j = 0; j < itemsIn.length; j++){
            $('#completed').append('<p>Not Active Item: '+ itemsIn[j].todo + '</p>');
            $('#completed').append('<button data-id="' + itemsIn[j].id +'" id="completeItem" name="completeItem">Mark '+ itemsIn[j].todo +' as complete!</button>');
            $('#completed').append('<button data-id="' + itemsIn[j].id +'" id="deleteItem" name="deleteItem">Delete '+ itemsIn[j].todo +'</button>');
          }

        };

      };
      receiveList();

});
