function init2()
{
  s=document.getElementById("scrollId");
  agreeNum=new Array(max+1);
  againstNum=new Array(max+1);
  lastScrollTop=0;
  for (var i=1;i<=max;i++)
  {
    agreeNum[i]=0;
    againstNum[i]=0;
  }
}

var timer=0,timer2=1,sn=20,lastScrollTop=0;
function stop()
{
  lastScrollTop=s.scrollTop;
  clearInterval(timer);
  document.getElementById("wholeId").style.backgroundColor="#ccc";
}
function goon()
{
  timer=setInterval(scrollstart,100);
  s.scrollTop=lastScrollTop;
  document.getElementById("wholeId").style.backgroundColor="#D9DEF0";
}

function scrollstart()
{
  if (s.scrollTop>=20*(max-1))
    {
      if (sn<40)
        {
          sn++;
          return ;
        }
        s.scrollTop=0;
        nownum=1;
        sn=20;
        clearInterval(timer2);
        $(".agree").val("Agree("+agreeNum[nownum].toString(10)+")");
        $(".against").val("Against("+againstNum[nownum].toString(10)+")");
    }
    else
      if (sn < 20)
        {
          sn++
            s.scrollTop++;
          if (s.scrollTop % 20 == 0)
            {
              nownum++;
              $(".agree").val("Agree("+agreeNum[nownum].toString(10)+")");
              $(".against").val("Against("+againstNum[nownum].toString(10)+")");
            }
        }
        else
          {
            sn++;
            if (sn>=40) sn=0;
          }
}

function getRandom(n)
{
  return Math.floor(Math.random()*n+1);
}

var mousePos;
document.onmousemove=mouseMove;

function mouseMove(ev) 
{ 
  ev= ev || window.event; 
  mousePos = mouseCoords(ev); 
}

function mouseCoords(ev)
{
  if (ev.pageX || ev.pageY)
    {
      return {x:ev.pageX-document.body.scrollLeft,y:ev.pageY-document.body.scrollTop};
    }
  else 
    return {x:ev.clientX+document.body.scrollLeft-document.body.clientLeft,y:ev.clientY+document.body.scrollTop-document.body.clientTop};
}

var a=0,s,agreeNum,againstNum,max=14,nownum=1;
$(document).ready(function()
                  {
                    init2();
                    $(".flip").click(function()
                                     {
                                       $(".scroll").slideToggle("slow");
                                       $(".agree").slideToggle("slow");
                                       $(".against").slideToggle("slow");
                                       if (a==0)
                                         {
                                           s.scrollTop=lastScrollTop;
                                           $(".flip").val("Hide comments");
                                           document.getElementById("wholeId").style.backgroundColor="#D9DEF0";
                                           timer=setInterval(scrollstart,100);
                                         }
                                         else
                                           {
                                             lastScrollTop=s.scrollTop;
                                             $(".flip").val("Show comments");
                                             clearInterval(timer);
                                           }
                                           a=(a+1) % 2;
                                     });
                                     $(".agree").click(function()
                                                       {
                                                         agreeNum[nownum]++;
                                                         $(".agree").val("Agree("+agreeNum[nownum].toString(10)+")");
                                                       });
                                                       $(".against").click(function()
                                                                           {
                                                                             againstNum[nownum]++;
                                                                             $(".against").val("Against("+againstNum[nownum].toString(10)+")");
                                                                           });
                                                                           $(".comment").click(function()
                                                                                               {
                                                                                                 $(".addCm").slideToggle();
                                                                                                 $(".commentTxt").slideToggle("slow");
                                                                                               })
                                                                           $(".accCm").click(function()
                                                                                             {
                                                                                               //add comment
                                                                                             })
                                                                                               $(".content").click(function()
                                                                                                                     {
                                                                                                                       $(".C_and_N").slideToggle("slow");
                                                                                                                       $(".commentTxt").hide();
                                                                                                                       $(".addCm").hide();
                                                                                                                       document.getElementById("CNID").style.left=mousePos.x.toString(10)+"px";
                                                                                                                       document.getElementById("CNID").style.top=mousePos.y+10+'px';
                                                                                                                     })
                  });
