var _isDown, _points, _g, _rc;
var SupportsTouches;
function onLoadEvent()
{
  _points = new Array();
  SupportsTouches=("createTouch" in document);
  _isDown = false;
  var goal=document.getElementById("container");
  goal.addEventListener("touchstart",touchStart,false);
  goal.addEventListener("touchmove",touchMove,false);
  goal.addEventListener("touchend",touchEnd,false);
  if (!SupportsTouches) $("#container").bind("click",function(event)
                                             {
                                               mousePos={x:event.clientX,y:event.clientY};
                                               comment_show();
                                             })
}

var startX,startY;

function touchStart(ev)
{
  ev.preventDefault();
  if (!ev.touches.length) return ;
  startX=ev.touches[0].pageX;
  startY=ev.touches[0].pageY;
  mousePos={x:startX,y:startY};
  _points.length=1;
  _points[0]=mousePos;
}

function touchMove(ev)
{
  ev.preventDefault();
  if (!ev.touches.length) return ;
  var touch=ev.touches[0];
  mousePos={x:touch.pageX,y:touch.pageY};
  _points.push(mousePos);
}

function touchEnd(ev)
{
  ev.preventDefault();
  if (_points.length>=10)
    {
      var result=judge_gesture();
      if (result=="Line" )
        {
          if (_points[0].x<_points[_points.length-1].x)
            {
              post_it();
              location.href="/reader/"+book_id.toString(10) + "/"+  next_page.toString(10)+"/";
            }
            else 
              {
                post_it_back();
                location.href='../reader/'+book_id.toString(10) + "/"+  prev_page.toString(10)+"/";
              }
        }
    }
    else comment_show();
}

function comment_show()
{
  LastMousePos=mousePos;
  $(".C_and_N").slideToggle("slow");
  document.getElementById("CNID").style.left=mousePos.x.toString(10)+"px";
  document.getElementById("CNID").style.top=mousePos.y.toString(10)+"px";
}

function Point(x,y)
{
  return {x:x,y:y};
}

function getMousePoint(ev)
{
  var x = y = 0,
  doc = document.documentElement,
  body = document.body;
  if(!ev) ev=window.event;
  if (window.pageYoffset) 
    {
      x = window.pageXOffset;
      y = window.pageYOffset;
    }
    else
      {
        x = (doc && doc.scrollLeft || body && body.scrollLeft || 0) - (doc && doc.clientLeft || body && body.clientLeft || 0);
        y = (doc && doc.scrollTop  || body && body.scrollTop  || 0) - (doc && doc.clientTop  || body && body.clientTop  || 0);
      }
      if(SupportsTouches)
        {
          var evt = ev.touches.item(0);//仅支持单点触摸,第一个触摸点
          x=evt.pageX;
          y=evt.pageY;
        }else{
          x += ev.clientX;
          y += ev.clientY;
        }
        return {'x' : x, 'y' : y};
};

function distance(a,b)
{
  return Math.sqrt((a.x-b.x)*(a.x-b.x)+(a.y-b.y)*(a.y-b.y));
}

var LastMousePos={x:0,y:0};

function judge_gesture()
{
  var maxDx=0,maxDy=0,n=_points.length;
  for (var i=1;i<n;i++)
  {
    if (Math.abs(_points[i].x-_points[i-1].x)>maxDx) maxDx=Math.abs(_points[i].x-_points[i-1].x);
    if (Math.abs(_points[i].y-_points[i-1].y)>maxDy) maxDy=Math.abs(_points[i].y-_points[i-1].y);
  }
  if (maxDy<10) return "Line";
  return "Others"
}
