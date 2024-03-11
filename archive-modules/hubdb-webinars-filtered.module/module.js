function historyBackWFallback(fallbackUrl) {
  console.log("click");
  if (document.referrer.includes("/success-webinars")) {
//  console.log("came from webinar page");
  window.history.back();
} else {
//  console.log("came from somewhere else");
  window.location.href = fallbackUrl;
}
}
  
  
//    fallbackUrl = fallbackUrl || '/';
//    var prevPage = window.location.href;

//    window.history.go(-1);

//    setTimeout(function(){ 
//        if (window.location.href == prevPage) {
//            window.location.href = fallbackUrl; 
//        }
//    }, 500);