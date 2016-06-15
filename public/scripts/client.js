// global vars
var doThis = '';
var numberString = '';
var newNumberString = '';
// var totalDiv = $('#total');
var totalDivString = '';


$(document).ready(function() {
  // console.log("hello from jquery");
  setNumberString();
  operationButtons();

  $('#equals').on('click', function(event) {
    event.preventDefault();
    crunchTheNumbers();
  }); // end equals button function

  $('#clear').on('click', function(event) {
    event.preventDefault();
    $('#total').empty(); // clear div containing answer
    numberString = ''; // reset var for next calculation
    newNumberString = ''; // reset var for next calculation
  }); // end clear button function
}); // end doc ready function



// global functions

function setNumberString () { // what happens when click a number button
  $('#numbers').on('click', 'button', function () {
    $('#total').append($(this).attr('value')); // appends value of clicked number button to total div
    numberString = $('#total').text(); // sets contents of total div as the first input
  });
} // end setFirstNumberString

function setUpForNextNumber (){
  newNumberString = numberString; // transfer first input value to new variable
  numberString = ''; // empty so it can be used to store second input
  $('#total').empty(); // empty the total div so it can display next input
} // end setUpForNextNumber function

function operationButtons () { // what happens when click on operation buttons
$('#addItUp').on('click', function(){
  doThis = '+';
  setUpForNextNumber();
});
$('#subtractIt').on('click', function(){
  doThis = '-';
  setUpForNextNumber();
});
$('#multiplyIt').on('click', function(){
  doThis = 'x';
  setUpForNextNumber();
});
$('#divideIt').on('click', function(){
  doThis = '÷';
  setUpForNextNumber();
});
} // end operationButtons function

function displayString () { // final result displayed in total div, cut off at 9 characters
  totalDivString = totalDiv.toString();
  if (totalDivString.length > 9) {
    totalDivString = totalDivString.substring(0,9);
  }
  newString = Number.parseFloat(totalDivString);
  // console.log('in newString: ' + newString);
  $('#total').text(newString);
} // end displayString function

function crunchTheNumbers () { // when user clicks = button, this function does given math operation
  if (doThis == "+") {
    totalDiv = Number.parseFloat(newNumberString) + Number.parseFloat(numberString);
    displayString();
  } else if (doThis == "-") {
    totalDiv = Number.parseFloat(newNumberString) - Number.parseFloat(numberString);
    displayString();
  } else if (doThis == "x") {
    totalDiv = Number.parseFloat(newNumberString) * Number.parseFloat(numberString);
    displayString();
  } else if (doThis == "÷") {
    totalDiv = Number.parseFloat(newNumberString) / Number.parseFloat(numberString);
    displayString();
  }
} // end crunchTheNumbers function



// CODE FOR BASIC MODE AND POSSIBLE PRO MODE

// var processResponse = function (response) {
//   console.log('in processResponse: ' + response);
//
//   $('#total').text(response); // display answer on DOM in
// }; // end processResponse function


// create object from form input and send request to server
// function startServerSideOperation () { // this is a lot of stuff - best to extract into a function and call the function where you want all this to happen
//   // console.log( 'in startServerSideOperation' );
//   // assemble object from input. don't have to set as new vars, can put the stuff after the = in inputObject, but looks cleaner to do it this way
//
//   var firstNumString = setFirstNumberString();
//   var secondNumString = setSecondNumberString();
//   var mathOperation = doThis;
//
//   var inputObject = {
//     "input1": firstNumString,
//     "input2": secondNumString,
//     "oper": mathOperation
//   }; // end inputObject
//
//   // post to server with ajax;
//   $.ajax({ // this is a method call to AJAX in jQuery that receives an object
//    url: "/pathPost",
//    type: "POST", // makes request to server, server posts this ajax call to above url using app.post. if type were GET, would make request to server, server would get this ajax call from above url.
//    data: inputObject, // what gets sent to the server
//    success: function(newData){ // represents response from server (calculation completed in server node module that gets passed in app.post as res.write or res.send)
//           console.log(newData);
//   //         // if post is successful we've received back "newData"
//   //         // send "newData" to processResponse to do something with it (display to DOM)
//           processResponse(newData);
//     },
//     statusCode: {
//       404: function(){
//         alert('error connecting to server');
//       } // end 404
//     } // end statusCode
//   }); // end AJAX request
// } // end startServerSideOperation function
