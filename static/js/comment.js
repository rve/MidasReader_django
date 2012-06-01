var commentArray;

function init2()
{
  scroll=document.getElementById("scrollId");
  agreeNum=new Array();
  againstNum=new Array();
  commentArray=new Array();
  nownum=0;
  lastScrollTop=0;
  $("#scrollId").val("");
}

var timer=0,scroll,sn=20,lastScrollTop=0;
function stop()
{
  lastScrollTop=scroll.scrollTop;
  clearInterval(timer);
  document.getElementById("wholeId").style.backgroundColor="#ccc";
}
function goon()
{
  timer=setInterval(scrollstart,100);
  scroll.scrollTop=lastScrollTop;
  document.getElementById("wholeId").style.backgroundColor="#F4F6F3";
}

function scrollstart()
{
  console.log(scroll.scrollTop);
  if (commentArray.length==0) return;
  if (scroll.scrollTop>=20*(commentArray.length-1))
    {
      if (sn<40)
        {
          sn++;
          return ;
        }
        scroll.scrollTop=0;
        nownum=0;
        sn=20;
        $(".agree").val("Agree("+agreeNum[nownum].toString(10)+")");
        $(".against").val("Against("+againstNum[nownum].toString(10)+")");
    }
    else
      if (sn < 20)
        {
          sn++;
          scroll.scrollTop++;
          if (scroll.scrollTop % 20 == 0)
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
  var addstr=document.getElementById("commentId").value;
  if (addstr.length==0)
    {
      return ;
    }
    console.log(addstr);
    commentArray.push(addstr);
    agreeNum.push(0);
    againstNum.push(0);
    scroll.innerHTML+=commentArray[commentArray.length-1]+"<br/>";
    document.getElementById("commentId").value="";
}


var a=0,agreeNum,againstNum,nownum;
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
                                              '-webkit-border-radius':'15px',
                                              '-moz-border-radius':'15px',
                                              background:"#D1D0D0",
                                            }
                                          });
                    $(".addCm").click($.unblockUI);
                    $(".blockOverlay").attr("title","Close").click($.unblockUI);
                                        });
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
