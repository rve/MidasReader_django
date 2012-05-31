var commentArray;

function init2()
{
  s=document.getElementById("scrollId");
  agreeNum=new Array();
  againstNum=new Array();
  commentArray=new Array();
  nownum=0;
  lastScrollTop=0;
  $("#scrollId").val("");
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
  document.getElementById("wholeId").style.backgroundColor="#F4F6F3";
}

function scrollstart()
{
  if (commentArray.length==0) return;
  if (s.scrollTop>=20*(commentArray.length-1))
    {
      if (sn<40)
        {
          sn++;
          return ;
        }
        s.scrollTop=0;
        nownum=0;
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

function addComment()
{
  var cm=document.getElementById("scrollId");
  var addstr=document.getElementById("commentId").value;
  if (addstr.length==0)
    {
      return ;
    }
  commentArray.push(addstr);
  agreeNum.push(0);
  againstNum.push(0);
  cm.innerHTML+=commentArray[commentArray.length-1]+"<br/>";
  document.getElementById("commentId").value="";
}


var a=0,s,agreeNum,againstNum,nownum;
$(document).ready(function()
                  {
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
                                          $.blockUI({
                                            message: $(".commentBlock"),
                                            css:
                                              {
                                              position:"absolute",
                                              background:"#EDECEB",
                                            }
                                          });
                                          $(".addCm").click($.unblockUI);
                                          $(".blockOverlay").attr("title","Close").click($.unblockUI);
                                          $(".addCm").click(function()
                                                            {
                                                              addComment();
                                                            })
                                          $(".exitComment").click($.unblockUI);
                                          $(".commentText").click(function()
                                                                  {
                                                                    document.getElementById("commentId").focus();
                                                                  })
                                        })
                    $("#txtid").click(function()
                                      {
                                        document.getElementById("txtid").focus();
                                      })
                    $("#addId").click(function()
                                      {
                                        document.getElementById("addId").focus();
                                      })
                  })
                                                                                        
