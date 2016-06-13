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
