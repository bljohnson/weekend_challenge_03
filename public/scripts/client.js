var doThis = '+'; // set doThis as global variable, set to 'add' to set a default operation in case user forgets to choose one


$(document).ready(function() {

  console.log("hello from jquery");

  setFirstNumberString();

  $('#equals').on('click', function(event) {
    event.preventDefault();
    startServerSideOperation();
  }); // end submit button function


  $('#clear').on('click', function(event) { // yay this works with the new operation buttons!!
    event.preventDefault();
    // $('#firstNum').val(''); // clears first input field
    // $('#secondNum').val(''); // clears second input field
    // $('.math').prop('selectedIndex', 0); // resets select dropdown menu to "Select..." which is the first index of the select menu
    $('#total').empty(); // clear div containing answer
  }); // end clear button function

}); // end doc ready function




// global functions/variables below

function setFirstNumberString () {
  $('.numbers').on('click', 'button', function () {
    // console.log('it lives');
    console.log($(this).attr('value')); // log out value of clicked number button (0-9)
    $('#total').append($(this).attr('value')); // appends value of clicked number button to empty p tag
    // console.log($('#screen').html()); // logs out contents of p tag
    // var firstNumString = $('#screen').html();
    var numberFirst = $('#total').text();
    // console.log(numberFirst);
  });
} // end setFirstNumberString

// testing operation Buttons
function operationButtons () {
$('#addItUp').on('click', function(){
  doThis = '+';
  $('#total').empty();
});
$('#subtractIt').on('click', function(){
  doThis = '-';
  $('#total').empty();
});
$('#multiplyIt').on('click', function(){
  doThis = '*';
  $('#total').empty();
});
$('#divideIt').on('click', function(){
  doThis = '/';
  $('#total').empty();
});
}  // end operationButtons function


function setSecondNumberString () {
  $('.numbers').on('click', 'button', function () {
    // console.log('it lives');
    // console.log($(this).attr('value')); // log out value of clicked number button (0-9)
    $('#total').append($(this).attr('value')); // appends value of clicked number button to empty p tag
    // console.log($('#screen').html()); // logs out contents of p tag
    // var numString = $('#screen').html();
    var numberSecond = $('#total').html();
    return numberSecond;
  });
} // end setSecondNumberString function


var processResponse = function (response) {
  console.log('in processResponse: ' + response);

  $('#total').text(response); // display answer on DOM in
}; // end processResponse function


// create object from form input and send request to server
function startServerSideOperation () { // this is a lot of stuff - best to extract into a function and call the function where you want all this to happen
  // console.log( 'in startServerSideOperation' );
  // assemble object from input. don't have to set as new vars, can put the stuff after the = in inputObject, but looks cleaner to do it this way

  var firstNumString = setFirstNumberString();
  var secondNumString = setSecondNumberString();
  var mathOperation = doThis;

  var inputObject = {
    "input1": firstNumString,
    "input2": secondNumString,
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
