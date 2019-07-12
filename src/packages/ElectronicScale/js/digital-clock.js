var digitSegments = [
  [1, 2, 3, 4, 5, 6],
  [2, 3],
  [1, 2, 7, 5, 4],
  [1, 2, 7, 3, 4],
  [6, 7, 2, 3],
  [1, 6, 7, 3, 4],
  [1, 6, 5, 4, 3, 7],
  [1, 2, 3],
  [1, 2, 3, 4, 5, 6, 7],
  [1, 2, 7, 3, 6],
  [1, 2, 7, 3, 6, 4],
]

document.addEventListener('DOMContentLoaded', function () {
  setAllNumber(0, 0, 0, 0);
});

var setAllNumber = function (num1, num2, num3, num4) {
  var _big = document.querySelectorAll('.big');
  var _small = document.querySelectorAll('.small');
  var _g = document.querySelectorAll('.g');
  setNumber(_big[0], num1, 1);

  setNumber(_small[0], num2, 1);
  setNumber(_small[1], num3, 1);
  setNumber(_small[2], num4, 1);

  setNumber(_g[0], 10, 1);
}

var setNumber = function (digit, number, on) {
  var segments = digit.querySelectorAll('.segment');
  var current = parseInt(digit.getAttribute('data-value'));

  //only switch if number has changed or wasn't set


  if (isNaN(current) || current != number) {
    //set new number after
    setTimeout(function () {
      digitSegments[number].forEach(function (digitSegment, index) {
        setTimeout(function () {
          segments[digitSegment - 1].classList.add('on');
        }, index * 45)
      });
    }, 250);
    digit.setAttribute('data-value', number);
  }
}

export{
  setAllNumber
}