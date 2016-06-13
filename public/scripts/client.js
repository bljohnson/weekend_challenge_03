// We are going to be building a calculator application using jQuery, Node, and Express, all hosted on Heroku!
//
// The logic for the calculator needs to be housed on the Server, where the client side will take in the values
// (in 2 input text fields) and the type of mathematical operation (selected using a button on the DOM).
// Each of the numerical values and type of mathematical operation will be bundled up in an object and then
// sent to the server via a POST. So when the object is sent, it should look something like this:
// { x: 3, y: 4, type: Add }
//
// Once the server receives it, build out logic to compute the numbers in 1 of 4 different ways.
// The server should be able to handle Addition, Subtraction, Multiplication, and Division. Once the
// calculation is complete, it should be sent back down to the client side app where it should be displayed
// on the DOM.
//
// Finally, build a 'clear' button that resets the whole experience.

// HARD MODE:
// Convert the input fields for the two values to Buttons. So the experience would allow the user to click
// on a numerical button, then a mathematical operation, then a numerical button again. Then have an equal
// button that sends all of the information to the server.
//
// PRO MODE:
// Style the whole experience using Bootstrap to resemble the design of a physical calculator. Then,
// include decimal points in your number logic. Finally, convert your logic to have the client side
// handle which mathematical operation is run. Once it determines this, it will use that to change the
// url or the post request to pair with a server side route that handles that type of mathematical
// operation. For example:
//
// $.ajax({
// type: POST,
// url: /division,
// success: function(data){
// //something here
// }
// });
//
// Would be on the Client side and the Server side would have something like:
//
// router.post('/division', function(req, res){
// //some code here
// });



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
    $('.math').prop('selectedIndex', 0); // resets select dropdown menu to "Select..."
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
   url: "http://localhost:3000/pathPost",
   type: "POST",
   data: inputObject,
   success: function(data){
          console.log(data);
  //         // if post is successful we've received back "data"
  //         // send "data" to processResponse to do something with it
          processResponse(data);
    },
    statusCode: {
      404: function(){
        alert('error connecting to server');
      } // end 404
    } // end statusCode
  }); // end AJAX request
} // end startServerSideOperation function
