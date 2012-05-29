var _isDown, _points, _r, _g, _rc;
function onLoadEvent()
{
  document.onselectstart = function() { return false; }
  document.onmousedown = function() { return false; }
  _points = new Array();
  _r = new DollarRecognizer();

  var canvas = document.getElementById('contentId');
  _rc = getCanvasRect(canvas); // canvas rect on page
  _isDown = false;
}
function getCanvasRect(canvas)
{
  var w = canvas.width;
  var h = canvas.height;

  var cx = canvas.offsetLeft;
  var cy = canvas.offsetTop;
  while (canvas.offsetParent != null)
    {
      canvas = canvas.offsetParent;
      cx += canvas.offsetLeft;
      cy += canvas.offsetTop;
    }
    return {x: cx, y: cy, width: w, height: h};
}
function getScrollY()
{
  var scrollY = 0;
  if (typeof(document.body.parentElement) != 'undefined')
    {
      scrollY = document.body.parentElement.scrollTop; // IE
    }
    else if (typeof(window.pageYOffset) != 'undefined')
      {
        scrollY = window.pageYOffset; // FF
      }
      return scrollY;
}
//
// Mouse Events
//
function mouseDownEvent(x, y)
{
  x -= _rc.x;
  y -= _rc.y - getScrollY();
  if (_points.length > 0)
    {
      _g.clearRect(0, 0, _rc.width, _rc.height);
    }
    _points.length = 1;
    _points[0] = new Point(x, y);
    _g.fillRect(x - 4, y - 3, 9, 9);
    _isDown = true;
}
function mouseMoveEvent(x, y)
{
  if (_isDown)
    {
      x -= _rc.x;
      y -= _rc.y - getScrollY();
      _points[_points.length] = new Point(x, y); // append
    }
}
function mouseUpEvent(x, y)
{
  if (_isDown)
    {
      _isDown = false;
      if (_points.length >= 10)
        {
          var result = _r.Recognize(_points, document.getElementById('useProtractor').checked);
        }
        else // fewer than 10 points were inputted
          {
          }
    }
}
function round(n, d) // round 'n' to 'd' decimals
{
  d = Math.pow(10, d);
  return Math.round(n * d) / d
}
