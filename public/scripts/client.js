$(document).ready(function() {

  console.log("hello from jquery");

  $('#submit').on('click', function(event) {
    event.preventDefault();
    startServerSideOperation();
  }); // end submit button function

  $('#clear').on('click', function(event) {
    event.preventDefault();
    $('#firstNum').val(''); // clears first input field
    $('#secondNum').val(''); // clears second input field
    $('.math').prop('selectedIndex', 0); // resets select dropdown menu to "Select..." which is the first index of the select menu
    $('#outputDiv').empty(); // clear div containing answer
  }); // end clear button function

}); // end doc ready function


var processResponse = function (response) {
  console.log('in processResponse: ' + response);

  $('#outputDiv').text(response); // display answer on DOM in empty div
}; // end processResponse function


// create object from form input and send request to server
function startServerSideOperation () {
  // console.log( 'in startServerSideOperation' );
  // assemble object from input
  var firstNumber = $('#firstNum').val();
  var secondNumber = $('#secondNum').val();
  var mathOperation = $('.math option:selected').text();

  var inputObject = {
    "input1": firstNumber,
    "input2": secondNumber,
    "doThis": mathOperation
  }; // end inputObject

  // post to server with ajax;
  $.ajax({
   url: "/pathPost",
   type: "POST",
   data: inputObject,
   success: function(newData){ // represents response from server (calculation completed in server node module that gets passed in app.post as res.write or res.send)
          console.log(newData);
  //         // if post is successful we've received back "newData"
  //         // send "newData" to processResponse to do something with it (display to DOM)
          processResponse(newData);
    },
    statusCode: {
      404: function(){
        alert('error connecting to server');
      } // end 404
    } // end statusCode
  }); // end AJAX request
} // end startServerSideOperation function
