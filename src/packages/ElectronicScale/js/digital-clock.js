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
  [],
]

var setAllNumber = function (num1,num2,num3, num4, num5, num6,name) {
  var segments = document.getElementById("pane-" + name).getElementsByClassName('segment');
  if (document.getElementById("pane-"+name).getElementsByClassName('on').length != 0) {
    for (var i = 0; i < segments.length; i++) {
      segments[i].classList.remove('on')
    }
  }
  var _small = document.getElementById("pane-" + name).querySelectorAll('.small');
  var _big = document.getElementById("pane-" + name).querySelectorAll('.big');
  var _g = document.getElementById("pane-" + name).querySelectorAll('.g');
  setNumber(_big[0], num1, 1);
  setNumber(_big[1], num2, 1);
  setNumber(_big[2], num3, 1);

  setNumber(_small[0], num4, 1);
  setNumber(_small[1], num5, 1);
  setNumber(_small[2], num6, 1);

  setNumber(_g[0], 10, 1);
}

var setNumber = function (digit, number) {
  if(number ==null) number =11;
  var segments = digit.querySelectorAll('.segment');
  setTimeout(function () {
    digitSegments[number].forEach(function (digitSegment, index) {
      setTimeout(function () {
        segments[digitSegment - 1].classList.add('on');
      }, index * 45)
    });
  }, 250);
  digit.setAttribute('data-value', number);
  
}

export{
  setAllNumber
}