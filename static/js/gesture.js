var hammer,mousePos={x:0,y:0},LastMousePos={x:0,y:0},start_point,end_point;
function hammer_init()
{
  hammer=new Hammer(document.getElementById("container"));
  hammer.ondragstart=record
  hammer.ondragend=judge;
  hammer.ontap=appear_comment;
}

function distance(a,b)
{
  return Math.sqrt((a.x-b.x)*(a.x-b.x)+(a.y-b.y)*(a.y-b.y));
}

function judge(ev)
{
  end_point=mousePos;
  if (distance(start_point,end_point)<100) return ;
  if (end_point.x>start_point.x) document.getElementById("next_page").click();
  else document.getElementById("prev_page").click();
}

function record(ev)
{
  start_point=mousePos;
}

function appear_comment(ev)
{
  LastMousePos=mousePos;
  $(".C_and_N").slideToggle("slow");
  document.getElementById("CNID").style.left=mousePos.x.toString(10)+"px";
  document.getElementById("CNID").style.top=mousePos.y.toString(10)+"px";
}

function mousePosition(ev)
{
  if(ev.pageX || ev.pageY){
    mousePos={x:ev.pageX, y:ev.pageY};
  }
  else
    mousePos={
      x:ev.clientX + document.body.scrollLeft - document.body.clientLeft,
      y:ev.clientY + document.body.scrollTop  - document.body.clientTop
    };

    if (distance(mousePos,LastMousePos)>50 && (!$(".C_and_N").is("hidden")))
      {
        $(".C_and_N").hide();
      }
}
