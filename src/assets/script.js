console.log("scriptworks");
// heightPage();
$( document ).ready(function() {
    // var height = $(window).height()+20;
    // if(document.getElementById("myCarousel")){
    // document.getElementById("myCarousel").style.height = height+'px';}
});

$(window).scroll(function(){
    $("#myCarousel").css("opacity", 1 - $(window).scrollTop() / 1000);
  });
// window.onscroll = function(){
//    scrollFunction()
// }
function scrollFunction(){
   var sn = document.getElementById("sticky_nav");
      if(document.body.scrollTop > 100 || document.documentElement.scrollTop > 100){
         sn.style.top = "0"
      }
      else{
         sn.style.top = "-45px"
      }
      document.getElementById("slide").style.zIndex = 0;
      console.log("yaa");
}

function openList(x){
   var cL = document.getElementsByClassName("content_list");
   var i;
      for(i = 0; i < cL.length; i++){
         var OcL = cL[i];
            if(cL[i] != document.getElementById("thisList_" + x)){
               OcL.classList.remove("show_list")
            }
      }
   document.getElementById("thisList_" + x).classList.toggle("show_list")
}

function openSearch(){
   document.getElementById("thisSearch").classList.toggle("show_search");
   document.getElementById("btnSearch").getElementsByTagName("i")[0].classList.toggle("hidden");
   document.getElementById("btnSearch").getElementsByTagName("i")[1].classList.toggle("visible")
}

function openMenu(){
   document.getElementById("thisMenu").classList.toggle("show_menu");
   document.getElementById("btnMenu").getElementsByTagName("i")[0].classList.toggle("hidden");
   document.getElementById("btnMenu").getElementsByTagName("i")[1].classList.toggle("visible")
}


jQuery(function($) {
  
  // Function which adds the 'animated' class to any '.animatable' in view
  var doAnimations = function() {
    
    // Calc current offset and get all animatables
    var offset = $(window).scrollTop() + $(window).height(),
        $animatables = $('.animatable');
    
    // Unbind scroll handler if we have no animatables
    if ($animatables.length == 0) {
      $(window).off('scroll', doAnimations);
    }
    
    // Check all animatables and animate them if necessary
		$animatables.each(function(i) {
       var $animatable = $(this);
			if (($animatable.offset().top + $animatable.height() - 20) < offset) {
        $animatable.removeClass('animatable').addClass('animated');
			}
    });

	};
  
  // Hook doAnimations on scroll, and trigger a scroll
	$(window).on('scroll', doAnimations);
  $(window).trigger('scroll');

});



