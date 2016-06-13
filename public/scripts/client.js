var doThis = '+'; // set doThis as global variable, set to 'add' to set a default operation in case user forgets to choose one

$(document).ready(function() {

  console.log("hello from jquery");

  // testing operation Buttons
  $('#addItUp').on('click', function(){
    doThis = '+';
  });
  $('#subtractIt').on('click', function(){
    doThis = '-';
  });
  $('#multiplyIt').on('click', function(){
    doThis = '*';
  });
  $('#divideIt').on('click', function(){
    doThis = '/';
  });
  // end testing buttons

  $('#submit').on('click', function(event) {
    event.preventDefault();
    startServerSideOperation();
  }); // end submit button function

  $('#clear').on('click', function(event) { // yay this works with the new operation buttons!!
    event.preventDefault();
    $('#firstNum').val(''); // clears first input field
    $('#secondNum').val(''); // clears second input field
    // $('.math').prop('selectedIndex', 0); // resets select dropdown menu to "Select..." which is the first index of the select menu
    $('#outputDiv').empty(); // clear div containing answer
  }); // end clear button function

}); // end doc ready function


// global functions/variables below

var processResponse = function (response) {
  console.log('in processResponse: ' + response);

  $('#outputDiv').text(response); // display answer on DOM in empty div
}; // end processResponse function


// create object from form input and send request to server
function startServerSideOperation () { // this is a lot of stuff - best to extract into a function and call the function where you want all this to happen
  // console.log( 'in startServerSideOperation' );
  // assemble object from input. don't have to set as new vars, can put the stuff after the = in inputObject, but looks cleaner to do it this way
  var firstNumber = $('#firstNum').val();
  var secondNumber = $('#secondNum').val();
  var mathOperation = doThis;

  var inputObject = {
    "input1": firstNumber,
    "input2": secondNumber,
    "oper": mathOperation
  }; // end inputObject

  // post to server with ajax;
  $.ajax({ // this is a method call to AJAX in jQuery that receives an object
   url: "/pathPost",
   type: "POST", // makes request to server, server posts this ajax call to above url using app.post. if type were GET, would make request to server, server would get this ajax call from above url.
   data: inputObject, // what gets sent to the server
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
