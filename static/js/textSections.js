function nextPage(a){
  var next=document.getElementById(a);
  var b=new String();
  b= a-1;
  var prev=document.getElementById(b);
  if(!next)return true;
  if(next.style.display=="none"){
    next.style.display="block"
    prev.style.display="none"
    window.scrollTo(0,0);
  } else {
    next.style.display="none"
  }
  return true;
}
function prevPage(a){
	 var prev=document.getElementById(a);
	 var b = new String();
	 b = (parseInt(a)+1).toString();
	 var cur = document.getElementById(b);
	 if ( ! cur) alert("cur is null");
	 if ( ! prev ) return true;
	 if ( prev.style.display == "none" ) {
		  prev.style.display = "block";
		  cur.style.display = "none";
		  window.scrollTo(0,0);
	 }
	 else {
		  document.write("debug");
	 }
	 return true;
}
