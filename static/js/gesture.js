var _isDown, _points, _g, _rc;
function onLoadEvent()
{
  document.onselectstart = function() { return false; }
  document.onmousedown = function() { return false; }
  _points = new Array();

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
var mousePos;

function mouseDownEvent(x, y)
{
  x -= _rc.x;
  y -= _rc.y - getScrollY();
  _points.length = 1;
  _points[0] = new Point(x, y);
  _isDown = true;
}

function distance(a,b)
{
  return Math.sqrt((a.x-b.x)*(a.x-b.x)+(a.y-b.y)*(a.y-b.y));
}

function mouseMoveEvent(x, y)
{
  mousePos={x:x,y:y};
  if (distance(mousePos,LastMousePos)>50 && (!$(".C_and_N").is("hidden")))
    {
      $(".C_and_N").hide();
    }
  if (_isDown)
    {
      x -= _rc.x;
      y -= _rc.y - getScrollY();
      _points[_points.length] = new Point(x, y); // append
    }
}

var LastMousePos={x:0,y:0};

function mouseUpEvent(x, y)
{
  if (_isDown)
    {
      _isDown = false;
      if (_points.length >= 10)
        {
          var result=judge_gesture();
          console.log(result);
          if (result=="Line" && 
              distance(_points[0],_points[_points.length-1])>150)
            {
              if (_points[0].x<_points[_points.length-1].x)
                {
                  document.getElementById("next_page").click();
                }
              else document.getElementById("prev_page").click();
            }
        }
        else // fewer than 10 points were inputted
          {
            LastMousePos=mousePos;
            $(".C_and_N").slideToggle("slow");
            document.getElementById("CNID").style.left=mousePos.x.toString(10)+"px";
            document.getElementById("CNID").style.top=mousePos.y.toString(10)+"px";
          }
    }
}
function round(n, d) // round 'n' to 'd' decimals
{
  d = Math.pow(10, d);
  return Math.round(n * d) / d
}

function judge_gesture()
{
  var maxDx=0,maxDy=0,n=_points.length;
  for (var i=1;i<n;i++)
  {
    if (Math.abs(_points[i].x-_points[i-1].x)>maxDx) maxDx=Math.abs(_points[i].x-_points[i-1].x);
    if (Math.abs(_points[i].y-_points[i-1].y)>maxDy) maxDy=Math.abs(_points[i].y-_points[i-1].y);
  }
  if (maxDy<10) return "Line";
  if (maxDy<10) return "Col";
  if (_points[n-1].x>_points[0].x)
    {
      if (_points[n-1].y>_points[0].y) return "LU_RD";
      else return "LD_RU";
    }
  else
    {
      if (_points[n-1].y>_points[0].y) return "RU_LD";
      else return "RD_LU";
    }
}
