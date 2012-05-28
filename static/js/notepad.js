var maxpage;
var pagestart;
//***************************setfocus****************************//
function setfocus(id)
{
  document.getElementById(id).focus();
}
//***************************changeVisual***********************//
function ShowIt()
{
  var txt=document.getElementById("divId");
  txt.style.display="inline";
  document.getElementById("VId").style.display="none";
}

function HideIt()
{
  var txt=document.getElementById("divId");
  txt.style.display="none";
  document.getElementById("VId").style.display="inline";
}
//***************************SetPos*****************************//
function SetPos(page)
{
  var num=parseInt(page,10);
  var txtarea=document.getElementById("txtid");
  var txt=txtarea.value;
  var pos=txt.length;
  if (page=="") return ;
  if (pagestart[num]!=-1)
    {
      pos=pagestart[num];
    }
    else
      {
        for (var i=num+1;i<maxpage;i++)
        if (pagestart[i]!=-1)
          {
            pos=pagestart[i];
            break;
          }
      }
      txtarea.focus();
      txtarea.setSelectionRange(pos,pos);
}
//***************************SetPage***************************//
function SetPage()//initialize
{
  var newvalue=document.getElementById("txtid").value;
  for (var i=0;i<maxpage;i++)
  {
    var str=new String();
    str+="Page "+i.toString()+":\n";
    pagestart[i]=kmp(newvalue,str);
  }
}
//***************************SetArray*************************//
function SetArray(num)
{
  maxpage=num;
  pagestart=new Array(maxpage);
  for (var i=0;i<maxpage;i++) pagestart[i]=-1;
}

//**************************AddText***********************//
function AddText(page,txt)//add sth to page xx
{
  if (txt.length==0) return ;
  var pagenum=parseInt(page,10);
  var origin=document.getElementById("txtid").value;
  var nowstart=origin.length;
  for (var i=pagenum+1;i<maxpage;i++)
  if (pagestart[i]!=-1) 
    {
      nowstart=pagestart[i];
      break;
    }
    var newtext=new String();
    var addleng=0;
    newtext+=origin.slice(0,nowstart);
    if (pagestart[pagenum]!=-1);
    else
      {
        addleng=newtext.length;
        pagestart[pagenum]=addleng;
        newtext+="Page "+page+":\n";
      }
      newtext+=txt;
      newtext+='\n';
      addleng=newtext.length-nowstart;
      var pos=newtext.length;

      newtext+=origin.slice(nowstart,origin.length);
      for (var i=pagenum+1;i<maxpage;i++)
      if (pagestart[i]!=-1) pagestart[i]+=addleng;
      document.getElementById("txtid").value=newtext;
      document.getElementById("txtid").focus();
      document.getElementById("txtid").setSelectionRange(pos,pos);
}

//**************************SelectAll**************************//
function Selectall()
{
  document.getElementById("txtid").select();
}
//************************kmp*****************************//
function kmp(str,pat)//find pat in str,return position
{
  var fail=new Array(pat.length);
  var i=0,j;
  fail[0]=-1;
  for (j=1;j<pat.length;j++)
  {
    for (i=fail[j-1];i>=0 && pat[i+1]!=pat[j];i=fail[i]);
    if (pat[i+1]==pat[j]) fail[j]=i+1;
    else fail[j]=-1;
  }

  for (i=j=0;i<str.length && j<pat.length;i++)
  {
    if (str[i]==pat[j]) j++;
    else
      if (j>0)
        {
          j=fail[j-1]+1;
          i--;
        }
  }
  return j==pat.length?(i-pat.length):-1;
}
