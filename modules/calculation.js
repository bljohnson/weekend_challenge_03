var doMath = function (value1, value2, mathOp) {
  if (mathOp == "+") {
    var add = value1 + value2;
    return add;
  } else if (mathOp == "-") {
    var sub = value1 - value2;
    return sub;
  } else if (mathOp == "*") {
    var mult = value1 * value2;
    return mult;
  } else if (mathOp == "/") {
    var divide = value1 / value2;
    return divide;
  }
};

doMath();

module.exports = doMath;




// var first = req.body.firstNumber;
// var second = req.body.secondNumber;
// var ops = req.body.mathOperation;
// var result;
//
// var calculator = function() {
//
//   if (ops == '+') {
//     result = first + second;
//     console.log(result);
//   } else if (ops == '-') {
//     result = first - second;
//     console.log(result);
//   } else if (ops == '*') {
//     result = first * second;
//     console.log(result);
//   } else if (ops == '/') {
//     result = first / second;
//     console.log(result);
//   }
// };
//
// //
// // var whatToDo = function() {
// //   alert ('req.body.firstNumber + req.body.secondNumber + req.body.mathOperation');
// // };
//
// calculator();
//
// module.exports = calculator;
