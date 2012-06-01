function comment_show()                        
{
  $("#comment_close").hide();
  $("#comment_open").show();
  $(".nearby_comment").show();
  var most_popular=0;
  for (var i=1;i<commentArray.length;i++)
  if (agreeNum[i]+againstNum[i]>agreeNum[most_popular]+againstNum[most_popular])
    most_popular=i;
  if (commentArray.length==0)
    $(".nearby_comment_content").html("Sorry,there isn't any comment now.");
  else
    $(".nearby_comment_content").html(commentArray[most_popular]);
  $(".nearby_comment_bg").height($(".nearby_comment_content").height()+4);
}
function comment_hide()
{
  $("#comment_open").hide();
  $(".nearby_comment").hide();
  $("#comment_close").show();
}

var comment_up_flag=0;
function comment_show_up()
{
  $(".whole").slideToggle("slow");
  if (comment_up_flag==0)
    {
      s.scrollTop=lastScrollTop;
      document.getElementById("wholeId").style.backgroundColor="#F4F6F3";
      timer=setInterval(scrollstart,100);
      $(".comment_show_up").css("left","-10px");
    }
    else
      {
        lastScrollTop=s.scrollTop;
        clearInterval(timer);
        $(".comment_show_up").css("left","0px");
      }
      comment_up_flag=(comment_up_flag+1) % 2;
}

$(function()
  {
    $(".tipTip").tipTip();
  });
