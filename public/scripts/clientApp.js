var todo= [];
var completed= [];

$(document).ready(function(){
  console.log("the bling works!");

$(document).on('click', '#deleteItem', function(){
  var id = $(this).data("id");

  if(confirm("Are you sure you want to delete this? This option cannot be undone.")){
    console.log("that was true!");

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
            }
            else {
              console.log('that was not true!');
            }
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

        console.log("We have sent to be completed ID number: " + id);

        receiveList();

      });


$(document).on('click', '#restoreItem', function(){
        var id = $(this).data("id");
        var objToSend = {
          "id": id
        };
        $.ajax({
          type: 'POST',
          url: '/restoreItem',
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
            $('#list').append('<p>'+ items[i].todo + '</p>');
            $('#list').append('<button data-id="' + items[i].id +'" id="completeItem" name="completeItem">Complete '+ items[i].todo +'</button>');
            $('#list').append('<button data-id="' + items[i].id +'" id="deleteItem" name="deleteItem">Delete '+ items[i].todo +'</button>');
          }
        };
        var writeComplete = function(itemsIn){
          console.log("In writeList");
          $('#completed').empty();
          for (var j = 0; j < itemsIn.length; j++){
            $('#completed').append('<p>'+ itemsIn[j].todo + '</p>');
            $('#completed').append('<button data-id="' + itemsIn[j].id +'" id="restoreItem" name="completeItem">Oops, mark '+ itemsIn[j].todo +' as incomplete.</button>');
            $('#completed').append('<button data-id="' + itemsIn[j].id +'" id="deleteItem" name="deleteItem">Delete '+ itemsIn[j].todo +'</button>');
          }
        };
      };
      receiveList();

      $(document).on('click', '#subTask', function(){
        var inItem = $('#taskIn').val();
        console.log('button clicked! And now we have ' + inItem );

                  var validateText= function(validateThis){
                    var sendString=function(string){
                      var objToSend = {
                        "todo": inItem
                      };
                      $.ajax({
                        type: 'POST',
                        url: '/sendItem',
                        data: objToSend
                      });
                  receiveList();
                    };
                    validateThis = validateThis.toUpperCase();
                    for (var i=0; i<validateThis.length; i++){
                      if ('ABCDEFGHIJLKMNOPQRSTUVWXYZ '.indexOf(validateThis.charAt(i)) !==-1){
                        console.log("we are looking at " + validateThis.charAt(i));
                        console.log("This string is acceptable");
                    }
                        else {
                        console.log("we are looking at " + validateThis.charAt(i));
                        console.log("This string is NOT acceptable");
                        alert("Sorry, you cannot add any special characters in this field.");
                        $('#taskIn').val('');
                        return false;
                    }

                  }

                  sendString(inItem);

                };
                validateText(inItem);
                receiveList();

              });


});
