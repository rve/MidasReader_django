var hammer,mousePos={x:0,y:0},LastMousePos={x:0,y:0},start_point,end_point;
function hammer_init()
{
  hammer=new Hammer(document.getElementById("container"));
  hammer.ondragstart=record;
  hammer.ondragend=judge;
  hammer.ontap=appear_comment;
}

function distance(a,b)
{
  return Math.sqrt((a.x-b.x)*(a.x-b.x)+(a.y-b.y)*(a.y-b.y));
}

function judge(ev)
{
  console.log(ev);
  mousePos={x:ev.touches[0].x,y:ev.touches[0].y};
  end_point=mousePos;
  alert("return");
  if (distance(start_point,end_point)<100) return ;
  if (end_point.x>start_point.x) 
    {
    alert("next");
    location.href = "/reader/{{book_id}}/{{next_page}}";
    alert("next");
    }



  else 
    {
    location.href = "/reader/{{book_id}}/{{prev_page}}"
    alert("prev");
    }
}

function record(ev)
{
  mousePos={x:ev.position.x,y:ev.position.y};
  //alert();
  start_point=mousePos;
}

function appear_comment(ev)
{
  console.log(ev);
  mousePos={x:ev.position[0].x,y:ev.position[0].y};
  LastMousePos=mousePos;
  $(".C_and_N").slideToggle("slow");
  document.getElementById("CNID").style.left=mousePos.x.toString(10)+"px";
  document.getElementById("CNID").style.top=mousePos.y.toString(10)+"px";
}
