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
    $(".nearby_comment").html("Sorry,there isn't any comment now.");
  else
    $(".nearby_comment").html(commentArray[most_popular]);
}
function comment_hide()
{
  $("#comment_open").hide();
  $(".nearby_comment").hide();
  $("#comment_close").show();
}
