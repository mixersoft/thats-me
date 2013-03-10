(function() {//Closure, to not leak to the scope
	
	
// static class for IDE outline browser
var Timeline = new function(){}
CFG['timeline'] = Timeline;		// make global

Timeline.documentReady = function () {
	CFG['carousel']['timeline'] = Timeline.carousel_cfg;
	$('#timeline').addClass('carousel');	CFG['carousel'].init.init();
}
Timeline.carousel_cfg = {
		responsive: true,
		// circular: false,		width:  null,
		height: $('.ipad').hasClass('portrait') ? 1024 : 768,
		align: 'center',
		onCreate: function(data){
			CFG['carousel'].autoPaging = false;
		},
		items		: {
			width		: 'variable',			// 3 visible on 1024x768			visible		: $('.ipad').hasClass('portrait') ? 3 : 5,
		},
		auto : {
			timeoutDuration: CFG['isTouch'] ? 10000 : 7000,
			pauseOnHover	: 'immediate',
			conditions: function(){ 
				return CFG['carousel'].autoPaging && CFG['util'].isScrolledIntoView($(this));
			},
		},
		scroll : {
			items			: 1,
			// easing			: "easeInOutCubic",
			duration		: 300,							
			pauseOnHover	: 'immediate',
			onAfter			: function(o) {
				var i = $(this).triggerHandler("currentPosition"),
					parent = $(this).closest('.carousel'),
					activeDots =  parent.find('.carousel-pager div:not(.hide)');
				if (i==0) parent.find('.left.carousel-control-btn').addClass('invisible');
				else parent.find('.left.carousel-control-btn').removeClass('invisible');
				if (activeDots.last().hasClass('selected')) parent.find('.right.carousel-control-btn').addClass('invisible');
				else parent.find('.right.carousel-control-btn').removeClass('invisible');
			},
			onEnd			: function(direction) {
				if (direction=='next') {
					CFG['carousel'].track_CarouselEnd($(this));
				}
			}
		},
		prev : {
			button		: "#timeline .carousel-control-btn.left",
			key			: "left",
			items		: 1,
			easing		: "linear",
			duration	: 300,
			conditions	: function(){
				// $('#features .carousel-hint').addClass('disabled').removeClass('fadeIn-slow');				return !$(this).closest('.carousel').find('.carousel-pager div:first-child').hasClass('selected');
			},
		},
		next : {
			button		: "#timeline .carousel-control-btn.right",
			key			: "right",
			items		: 1,
			easing		: "linear",
			duration	: 300,
			conditions	: function(){
				// $('#features .carousel-hint').addClass('disabled').removeClass('fadeIn-slow');				var activeDots = $(this).closest('.carousel').find('.carousel-pager div:not(.hide)');
				return !activeDots.last().hasClass('selected');
			}

		},		pagination : {
			container	: "#timeline  .carousel-pager",
			keys		: true,
			easing		: "linear",
			duration	: 300,
			anchorBuilder: function(nr) {
				// this == li.item
				var fred = $(this).closest('.carousel');
			    return markup = '<div href="#'+fred.attr('id')+'">'+nr+'</div>';
			},
		},
		swipe	: {
			onTouch: CFG['isTouch'],
			pauseOnHover	: 'immediate',
		}
	};







$(document).ready( CFG['timeline'].documentReady );

})();  
// end module closure