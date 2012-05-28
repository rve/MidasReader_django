function init()
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

var timer=0,timer2=1,sn=20,lastScrollTop;
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

var a=0,s,agreeNum,againstNum,max=14,nownum=1;
$(document).ready(function(){
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
	});
