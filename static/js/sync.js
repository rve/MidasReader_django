function isIpad(){
  var ua = navigator.userAgent.toLowerCase();
  s = ua.match(/ipad/);
  if(s=="ipad")
    return true;
  else
    return false;
}
