/*
 * includes Global CFG attributes & methods used by main.js
 * 		must be AFTER bootstrap.js and BEFORE main.js, etc.
 */

CFG['util'] = {
	/*
	 * http://stackoverflow.com/questions/9097501/show-div-when-scroll-position
	 * see also: http://imakewebthings.com/jquery-waypoints/
	 */
	isScrolledIntoView: function (o) {
		var docViewTop = $(window).scrollTop();
		var docViewBottom = docViewTop + $(window).height();

		var elemTop = o.offset().top;
		if (elemTop < 0) elemTop = 0;		// adjust for #home;
		var elemBottom = elemTop + o.height();

		var completelyInView = ((elemBottom >= docViewTop) && (elemTop <= docViewBottom) && (elemBottom <= docViewBottom) && (elemTop >= docViewTop) );
		var nearTop = ((elemBottom >= docViewTop) && (elemTop >= docViewTop) && (elemTop <= docViewTop + $(window).height() / 3) // top 1/3 of window
		)
		return completelyInView || nearTop;
	},
	isLingeringInView: function(o, lingering_timers, delay, success){
		var id = o.attr('id');
		if (lingering_timers[id]) return;
		lingering_timers[id] = setTimeout(function(){
			lingering_timers[id] = 0;
			if (CFG['util'].isScrolledIntoView(o)) {
				lingering_timers[id] = success(o);
			}
		}, delay);
	},
	notify: function notify(msg, type) {
		try {
			// $('.alert-wrapper').removeClass('hide');
			$('.alert-wrapper .alert').html(msg);
			// console.log(msg);
			// $('.alert-wrapper .fade-wrap').fadeIn(500).delay(1000).fadeOut("slow");			$('.alert-wrapper').addClass('fadeIn');
			setTimeout(function(){
				$('.alert-wrapper').removeClass('fadeIn');
			}, 2000)
		} catch (e) {
		}
	},
	scrollSpy: function(){
		// manually implemented ScrollSpy
		$('.featurette').each(function(i, elem) {
			if (CFG['util'].isScrolledIntoView($(elem))) {
				var id = $(elem).attr('id');
				$('.navbar .nav li').removeClass('active');
				var a = $('.navbar .nav li a[href$="#'+id+'"]').parent().addClass('active');
				
				if (!CFG['socialSharing']){
					switch(id) {
						case 'sharing':
							CFG['timing'].load_SocialSharing = 0;
							load_social_sharing();	// load immediately on scrollIntoView
						break;
						case 'call-to-action':
							load_social_sharing();	// load immediately on scrollIntoView
						break;
					}
				}
				return false;					
			}
		});
	},
	showDonateButtons: function() { 
		$('#call-to-action .donate-form-wrap').fadeIn({
				duration:400, 
				complete: function(){
						$('#call-to-action .donate a.btn').animate({opacity:0});
					}
				});
		return false;		// onclick return value
	},
	// o.hasAttr('hash'), $(<A>)
	animateScrollToHash: function(o) {
		var target = o.hash;
		if (target) {
	        console.log(target);
	        $.scrollTo(target, 500);
	    }
	    return target;
	},
	slideInNavBar: function(){
		var navbar = $('.navbar-fixed-top');
		if (navbar.css('position')=='absolute') {
			var top = $(window).scrollTop();
			navbar.css('top', top);
			$('.alert-wrapper').css('top', navbar.css('height') );
			var type = $('html').hasClass('touch') ? 'touch' : 'no-touch';
			switch (type) {
				case 'touch':
					navbar.on('click', function(e){
						var target = $(e.target);
						if (target.hasClass('navbar-inner') 
							|| target.hasClass('navbar-fixed-top')
							|| target.is('a:not(.dropdown-toggle)')
						) {
							navbar.css('top', 0);
							$('.alert-wrapper').css('top', 0 );
							navbar.off('click');
						}
					});	
				break;
				case 'no-touch':
					navbar.one('mouseleave', function(){
						setTimeout(function(){
								navbar.css('top', 0);
								$('.alert-wrapper').css('top', 0 );
							}
							, CFG['timing'].navbarSlideOut
						);
					});	
				break;
			}
		}
	}
};

CFG['timing'] = {
	linger: 1000,
	carousel: 5000,
	slideshow: 7000,
	navbarSlideOut: 5000,
	load_SocialSharing: 5000,
}







/*****************************************************************
 * initialization methods
 *****************************************************************/
/**
 * background slideshow
 */
var load_bg_slideshow = function() {
	CFG['slideshow'] = {
		timer: null,
		next: null,			// next slide, function
		count: 5,			// count of bg images, bg.pix[name='N'] defined in CSS
		preloader: null,	// IMG object for binding onload
		loaded: {},
		init: function(){
			CFG['slideshow'].preloader = $('<img />')	
				.bind('load', function() {
				    // Background image has loaded.
				    var fade = $('#bg-slideshow .fading').addClass('fade-slow');
				    CFG['slideshow'].loaded[fade.attr('name')]=1;
				    setTimeout(function(){
				    	fade.remove();
				    	delete fade;
					}, 600);
				});
			// start the slideshow timer	
			CFG['slideshow'].next();	
		},
		// slideshow timer
		next: function(){
			if (CFG['slideshow'].timer == null) {
				CFG['slideshow'].timer = setInterval(
					CFG['slideshow'].next,
					CFG['timing']['slideshow']
				);
			} 
			var bg = $('#bg-slideshow .bg.fixed');
			if (bg.size()>1) return;
			
			var fade = bg.clone().addClass('fading');
			$('#bg-slideshow').append(fade);
			
			// next slide
			var i = parseInt(bg.attr('name'))+1;
			if (i > CFG['slideshow'].count) i=1;
			bg.attr('name', i );	
			
			// PRELOAD image
			var bkgSrc = bg.css('background-image').replace(/"/g,"").replace(/url\(|\)$/ig, "")
			if (!CFG['slideshow'].loaded[i]) CFG['slideshow'].preloader.attr('src', bkgSrc);
			else {
				fade.addClass('fade-slow');
				setTimeout(function(){
				    	fade.remove();
				    	delete fade;
				}, 600);
			}
		}
	}
	// init
	CFG['slideshow'].init();
}

/*
 * bootstrap carousel load/init for html.no-touch
 */
var load_carouFredSel = function($) {
	CFG['carousel'] = { 
		autoPaging: true,
		isLingeringTimer: {},
		find: {},
		init:{ 
			init: function(){
				$('html.no-touch .carousel').each(function(i, elem) {
					var o = $(elem);
					var id = o.addClass('fred').attr('id');
					CFG['carousel'].init.fred(o);
					CFG['carousel'].paging.refresh_pageDots(o);
					// No .activated required for carouFredSel
					// CFG['carousel'].paging.autoPaging(o, CFG['carousel'].isLingeringTimer);
					// o.one('click', function(e){
						// $(e.currentTarget).addClass('activated');
					// })
					o.removeClass('invisible');				});
				
				$(window).resize(function() {
					// carousel resize on window.resize
					$('html.no-touch .carousel.fred').each(function(i, elem) {
						CFG['carousel'].paging.refresh_pageDots($(elem));					});
				});
				
				// add .activated when lingers into view
				// NOTE: not required for carouFredSel	
				$(window).on('scroll.activate',function(e) {
					/* Check the location of each desired element */
					var inactive = $('html.no-touch .carousel:not(.fred.activated)');
					if (inactive.size()==0) {
						$(window).off('scroll.activate');
					} else {
						inactive.each(function(i, elem) {
							// start autoPaging on linger
							CFG['carousel'].paging.autoPaging($(elem), CFG['carousel'].isLingeringTimer);
						});
					}
				});
			},
			fred: function(o) {
					// http://caroufredsel.dev7studios.com/configuration.php
					// Using custom configuration
					var fred = o.find('.carousel-inner .scroller');
					fred.carouFredSel(  CFG['carousel'][o.attr('id')] );
			},
			bootstrap: function(o){
				CFG['carousel'].paging.dotPaging_bootstrap(o);
			}
		},
		paging : {
			/*
			 * dot paging for carouFredSel
			 */
			refresh_pageDots: function(o, fred){
				fred = fred || o.find('.carousel-inner .scroller');
				var visibleItems = fred.triggerHandler("currentVisible").size();
				var carouselItems = fred.find('.item').size();
				var pages = carouselItems - visibleItems;
				var selected = fred.triggerHandler("currentPosition");
				for (var i=pages+1; i<carouselItems; i++) {
					o.find('.carousel-pager a').eq(i).addClass('hide');					
				}
				o.find('.carousel-pager a').eq(selected).addClass('selected');
			},
			/*
			 * @deprecate if using only carouFredSel
			 * NOTE: carouFredSel DOES NOT check activated, only scrollIntoView
			 *  
			 * autoPaging for bootstrap,iscroll carousels, 
			 * 	- initialize AFTER first scroll into view
			 * 
			 */
			autoPaging: function(o, timers) {
				if ($('html').hasClass('touch')) return;			// uses iscroll, instead
				if (o.hasClass('activated')) return;
				if (CFG['carousel'].autoPaging == false) return;
				
				// isLingeringInView(o, timers, delay, success){
				CFG['util'].isLingeringInView(o, timers, CFG['timing']['lingering'], 
					function(o){
						/**
						 * start .carousel when .carousel lingers in view 
						 */
						var id = o.attr('id');
						if (!o.hasClass('activated')) o.addClass('activated');
						return 'activated';	// only start once.
					}
				);	
				return;
			},
		},
	};
	CFG['carousel']['features'] = {
		responsive: true,
		circular: false,
		width: '90%',
		// height: 'auto',		align: 'center',
		onCreate: function(data){
			var check;
		},
		items		: {
			width		: 340,			visible		: {
				min			: 1,
				max			: 5,
				// variable	: true,
			}
		},
		auto : {
			timeoutDuration: 7000,
			conditions: function(){ 
				// return $(this).closest('.carousel.fred').hasClass('activated'); 
				return CFG['util'].isScrolledIntoView($(this));
			},
		},
		scroll : {
			items			: 1,
			// easing			: "easeInOutCubic",
			duration		: 500,							
			pauseOnHover	: 'immediate',
			onCreate 		: function(data){
				
			},
			// onAfter 		: function() {	},		},
		prev : {
			button		: "#features .carousel-control.left",
			key			: "left",
			items		: 1,
			easing		: "cubic",			duration	: 750,
		},
		next : {
			button		: "#features .carousel-control.right",
			key			: "right",
			items		: 1,
			easing		: "cubic",			duration	: 750,		},
		pagination : {
			container	: "#features  .carousel-pager",
			keys		: true,
			easing		: "cubic",			duration	: 750,
			anchorBuilder: function(nr) {
				// this == li.item
				var fred = $(this).closest('.carousel.fred');			    return markup = '<a href="#'+fred.attr('id')+'">'+nr+'</a>';
			}
		},
		swipe : {
			onTouch: CFG.isTouch,
			onMouse: !CFG.isTouch,
		}		
	};
	CFG['carousel']['how-it-works'] = {
		responsive: true,
		circular: false,
		width: '86%',
		// height: 'auto',		align: 'center',
		onCreate: function(data){
			var check;
		},
		items		: {
			visible		: 1
		},
		auto : {
			timeoutDuration: 7000,
			conditions: function(){ 
				// return $(this).closest('.carousel.fred').hasClass('activated'); 
				return CFG['util'].isScrolledIntoView($(this));			},
		},
		scroll : {
			items			: 1,
			easing			: "linear",
			duration		: 500,							
			pauseOnHover	: 'immediate',
			onCreate 		: function(data) {	},
			// onAfter 		: function() {	},		},
		prev : {
			button		: "#how-it-works .carousel-control.left",
			key			: "left",
			items		: 1,
			easing		: "cubic",
			duration	: 750,

		},
		next : {
			button		: "#how-it-works .carousel-control.right",
			key			: "right",
			items		: 1,
			easing		: "cubic",
			duration	: 750,

		},
		pagination : {
			container	: "#how-it-works  .carousel-pager",
			keys		: true,
			easing		: "cubic",
			duration	: 750,
			anchorBuilder: function(nr) {
				// this == li.item
				var fred = $(this).closest('.carousel.fred');
			    return markup = '<a href="#'+fred.attr('id')+'">'+nr+'</a>';
			}
		},
		swipe : {
			onTouch: CFG.isTouch,
			onMouse: !CFG.isTouch,
		}			
	}; 
	
	CFG['carousel'].init.init();
	
}

/*
 * iscroll load/init for html.touch
 */
var load_iscroll = function($) {
	CFG['iscroll'] = {
		timers: {}, 			// for isLingeringInView
		init : function(){
			$('html.touch .featurette.carousel').each(function(i, elem){
				var o = $(elem);
				var id = o.addClass('iscroll').attr('id');
				o.find('.carousel-control-wrap').addClass('fadeOut-slow');
				CFG['iscroll'][id].setWidths(o);
				CFG['iscroll'][id].iscroll.refresh();
				CFG['iscroll'].refresh_pageDots(o, CFG['iscroll'][id].iscroll);
// TODO: debug android chrome font-family bug, see: http://code.google.com/p/chromium/issues/detail?id=138257		
// CFG['util'].notify(o.find('.carousel-row p').first().css('font-family')+', '+o.find('.carousel-row p').first().css('font-size'));
				// init dot paging
				// o.find(".carousel-pager a").click(function(e){ 
			      // var index = $(this).index(); 
			      // CFG['iscroll'][id].iscroll.scrollToPage(index);
			      // e.preventDefault();
			    // }); 
			    o.removeClass('invisible');
			});
			// refresh widths on window resize
			$(window).resize(function() {
				$('html.touch .featurette.carousel.iscroll').each(function(i, elem){
					var id = o.attr('id');
			  		CFG['iscroll'][id].setWidths(o);
			  		CFG['iscroll'][id].iscroll.refresh();
			  		CFG['iscroll'].refresh_pageDots(o, CFG['iscroll'][id].iscroll);
			 	});
			});
			
			$(window).on('scroll.swipe',function(e) {
				$('html.touch .featurette.carousel.iscroll').each(function(i, elem){
					var o = $(elem);
					CFG['util'].isLingeringInView(o, CFG['iscroll'].timers, CFG['timing'].linger,
						function(o){
							o.find('.carousel-control-wrap').addClass('fadeIn');		
							setTimeout(function(){
								o.find('.carousel-control-wrap').removeClass('fadeIn');
							},1000);
						}
					);
				});
			});
			
			
		},
		refresh_pageDots: function(o, iScroll){
			var id = o.attr('id');
			var itemW = o.find('.carousel-inner > ul li.item').first().outerWidth();
			// var scrollerW = o.find('.carousel-inner > ul').outerWidth();			var viewportW = o.find(".carousel-inner").outerWidth();
			var visibleItems = Math.floor(viewportW/itemW);
			var carouselItems = o.find('.item').size();
			var pages = carouselItems - visibleItems;
			var pager = o.find('.carousel-pager');
			var dots = pager.find('a');
			if (dots.size()==0) {
				for (var i=0; i<carouselItems; i++) {
					pager.append('<a href="#'+ id +'">'+i+'</a>')
				}
				dots = pager.find('a');
			}
			
			for (var i=0; i<carouselItems; i++) {
				if (i>pages) {
					dots.eq(i).addClass('hide');					
				} else dots.eq(i).removeClass('hide');
			}
			iScroll = iScroll || CFG['iscroll'][id].iscroll;
			var selected = iScroll.pageX || 0;
			dots.removeClass('active').eq(selected).addClass('active');
		},
		fullWidth: function(o) {  // o.carousel
			var count = o.find('.carousel-inner > ul li').size();
			var fw = $(window).width()*0.8;	// add 10% extra room for finger scrolling
			o.find(".carousel-inner > ul").css('width', (count*fw) +'px');
			o.find(".carousel-inner, .carousel-inner > ul li").css('width', fw +'px');
		},
		packedWidth: function(o) {	// show as many as can fit in .carousel-inner width
			var items = o.find('.carousel-inner > ul li.item figure.graphic');
			var count = items.size();
			var itemW = items.first().outerWidth(true);
			var fw = $(window).width(); // * 0.9;
			fw = Math.floor(fw/itemW)* itemW;
			
			o.find(".carousel-inner").css('width', fw + 'px');
			o.find(".carousel-inner > ul").css('width', (count*itemW) +'px');
			o.find('.carousel-inner > ul li.item').css('width', itemW +'px');
		},
		// add one for each iscroll
		'features': {
			iscroll : null, 
			setWidths : null,
		},
		'how-it-works': {
			iscroll : null, 
			setWidths : null,
		},
	}
	
	// #features iscroll
	// NOTE: call constructor with id of .carousel-inner, i.e. #features-iscroll.carousel-inner
	CFG['iscroll']['features'].setWidths = CFG['iscroll'].packedWidth;
	CFG['iscroll']['features'].iscroll = new iScroll('features-iscroll',{
		snap: 'li.item',
		momentum: false,
		hScroll: true,
		vScroll: false,
		hScrollbar: false,
		vScrollbar: false,
		onScrollEnd: function () {
			// for packedWidth iscroll
			var pages = $('#features .carousel-pager > a:not(.hide)').size();
			var selected = (this.currPageX >= pages-1 ) ? pages-1 : this.currPageX; 
			$('#features .carousel-pager a').removeClass('active').eq(selected).addClass('active');
			// document.querySelector('#features .carousel-pager > a.active').className = '';
			// document.querySelector('#features .carousel-pager > a:nth-child(' + (page) + ')').className = 'active';
		}
	});
	// #how-it-works-iscroll
	CFG['iscroll']['how-it-works'].setWidths = CFG['iscroll'].fullWidth;
	CFG['iscroll']['how-it-works'].iscroll = new iScroll('how-it-works-iscroll',{
		snap: 'li.item',
		momentum: false,
		hScroll: true,
		vScroll: false,
		hScrollbar: false,
		vScrollbar: false,
		onScrollEnd: function () {
			document.querySelector('#how-it-works .carousel-pager > a.active').className = '';
			document.querySelector('#how-it-works .carousel-pager > a:nth-child(' + (this.currPageX+1) + ')').className = 'active';
		}
	});
	
	/*
	 * init all iscrolls
	 */
	CFG['iscroll'].init();
	
}

var load_social_sharing = function() {
	setTimeout(function(){
		if (CFG['socialSharing']) return;
		CFG['socialSharing'] = 1;
		(function() {  //Closure, to not leak to the scope
			// facebook javascript jdk 		
			!function(d, s, id) {
				  var js, fjs = d.getElementsByTagName(s)[0];
				  if (d.getElementById(id)) return;
				  js = d.createElement(s); js.id = id;
				  // js.src = "//connect.facebook.net/en_US/all.js#xfbml=1&appId=16753672679";
				  js.src = "//connect.facebook.net/en_US/all.js#xfbml=1";
				  fjs.parentNode.insertBefore(js, fjs);
			}(document, 'script', 'facebook-jssdk');
			
			// twitter
			!function(d,s,id){
				var js,fjs=d.getElementsByTagName(s)[0];if(!d.getElementById(id)){js=d.createElement(s);js.id=id;js.src="//platform.twitter.com/widgets.js";fjs.parentNode.insertBefore(js,fjs);}
			}(document,"script","twitter-wjs");
		})();		
	}
	, CFG['timing'].load_SocialSharing);
}


$(document).ready(
	function(){
		// console.info("document ready");		
		/*
		 * debug touch/no-touch
		 */
		if (CFG.isTouch) $('html').removeClass('no-touch').addClass('touch');
		else $('html').removeClass('touch').addClass('no-touch');
		
		/*
		 * animations
		 */
		switch (window.location.hash) {
			case '#thank-you': 	// donate success return 
				$('#sharing .thank-you').removeClass('hide');
				CFG['timing'].load_SocialSharing = 0;
				break;
			case '#not-yet': 	// donate cancel return 
				break;
		}
		
		if ($('html').hasClass('touch')) {
			$('.carousel-inner > ul > li.item.active').removeClass('active');			load_iscroll($);
			$('#header .show-navbar').on('click', function(e){
				e.preventDefault();
				CFG['util'].slideInNavBar();
			})
			
		} else {	// html.no-touch
			load_carouFredSel($);
			$('#header .show-navbar').on('mouseenter', function(e){
				CFG['util'].slideInNavBar();
			})
		}
		load_bg_slideshow();
		
		
		$(window).on('scroll.spy',function(e) {
			CFG['util'].scrollSpy();
		});
					
		// make global
		$('a').bind('click', function(e) {
			if (CFG['util'].animateScrollToHash(this)) {
				e.preventDefault();
			};
		});
		$('a#donate').one('click', function(e){
			CFG.util.showDonateButtons();
		})   
		
		$('#home').addClass('fadeIn');
	}
)
