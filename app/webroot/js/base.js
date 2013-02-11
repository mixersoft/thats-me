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
			// $('.alert-wrapper').removeClass('hide');			if (/snaphappi.com/.test(window.location.host)) return;
			$('.alert-wrapper .alert').html(msg);
			// console.log(msg);
			// $('.alert-wrapper .fade-wrap').fadeIn(500).delay(1000).fadeOut("slow");			$('.alert-wrapper').addClass('fadeIn');
			setTimeout(function(){
				$('.alert-wrapper').removeClass('fadeIn');
			}, 2000)
		} catch (e) {
		}
	},
	/*
	 * set the homepage to expand to the full window height
	 */
	setFullFrameHeight: function(){
		// offsetH:  581+:89 320+:41
		var offsetH = $('#home .fw-band.footer').height()==16 ? 41 : 89;
			perfectH = $(window).height()-offsetH,
			homeMinH = $('#home .fw-band.vcenter-body').css('min-height').split('px')[0];
		var activeH = Math.min(Math.max(homeMinH, perfectH ),1100);
		$('#home .fw-band.vcenter-body').css('min-height', activeH );
		// center copy
		var copy = $('#home .fw-band.vcenter-body > .container');
		copy.css('padding-top', (activeH-copy.height())/2 );
	},
	setNavbarCollapse: function(){
		var navbar = $('.navbar-inner .nav-collapse:not(.in)');
		if (navbar.size() == 0) return;
		
		var logo = $('.navbar a.brand');
		var left = logo.offset().left+logo.outerWidth(true),
			right = navbar.offset().left,
			gap = right-left;
		// reset movable
		var dropdown = navbar.find('.dropdown');
		dropdown.find('.dropdown-menu').prepend(navbar.find('.nav > .promote'));
		// promote movable
		var promote = dropdown.find('.promote').each(function(i,elem){
			// assume width of menu item about 120px
			if (gap-120 > 120) {			
				dropdown.before($(elem));
				gap -= 120;
			}
		});	
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
	postEmail: function(email, options, success) {
		options = options || {};
		success = success || function(json, status, o){
				console.log("post Email success");
			}
		var postData = $.extend({'data[Follower][email]':email}, options);
		$.ajax({
			type:"post",
			url:"/followers/signMeUp.json",
			data: postData,
			dataType: 'json',			success: success,
			
		}).fail(function(json, status, o){
			alert('There was a problem on the server.');
			console.error("post Email failed");
		});
		return false;
	},
	showDonateButtons: function() { 
		$('#call-to-action .donate-form-wrap').fadeIn({
			duration:400, 
			complete: function(){
				$('#call-to-action .donate a.btn').addClass('invisible');
			}
		});
		$('#call-to-action .donate-form-wrap .icon-remove-sign').one('click', function(){
			$('#call-to-action .donate-form-wrap').css('display', 'none');
		});
		return false;		// onclick return value
	},
	// o.hasAttr('hash'), $(<A>)
	animateScrollToHash: function(o) {
		var target = o.hash;
		if (target) {
	        // console.log(target);
	        var delta = $(target).offset().top - $(window).scrollTop();
	        if (delta < 0 || delta > 50) {
	        	setTimeout(function(){
	        		$.scrollTo(target, 500);
	        	}, 50);
	        } 
	    }
	    return target;
	},
	slideInNavBar: function(){
		var navbar = $('.navbar-fixed-top');
		// collapsed .navbar has position:absolute, otherwise fixed
		if (navbar.css('position')=='absolute') { 
			var top = $(window).scrollTop();
			// slide in .navbar to current scrollTop
			navbar.css('top', top); 		
			$('.alert-wrapper').css('top', navbar.css('height') );
			
			// slide out .navbar on timer or click
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
	slideshow: 10000,
	navbarSlideOut: 5000,
	load_SocialSharing: 5000,
	validation_popover: 2000,
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
		loaded: [],			// array of slides that have already been cached, but page index 
		init: function(){
			CFG['slideshow'].preloader = $('<img />')	
				.bind('load', function() {
				    // Background image has loaded.
				    var fade = $('#bg-slideshow .fading:first-child').addClass('fadeOut-slow');
				    CFG['slideshow'].loaded[fade.attr('name')]=1;
				    setTimeout(function(){
					    $('#bg-slideshow .fading').remove();
					}, 4000);
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
			if ($('#bg-slideshow .bg.fading').size()>1) return;
			var bg = $('#bg-slideshow .bg.fixed');
			
			var fade = bg.clone().addClass('fading');
			$('#bg-slideshow').append(fade);
			
			// next slide
			var i = parseInt(bg.attr('name'))+1;
			if (i > CFG['slideshow'].count) i=1;
			bg.attr('name', i );	
			
			// PRELOAD image
			var bkgSrc = bg.css('background-image').replace(/"/g,"").replace(/url\(|\)$/ig, "")
			if (CFG['slideshow'].loaded[i] == undefined) CFG['slideshow'].preloader.attr('src', bkgSrc);
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
				$('.carousel').each(function(i, elem) {
					var o = $(elem);
					var id = o.addClass('fred').attr('id');
					CFG['carousel'].init.fred(o);
					CFG['carousel'].paging.refresh_pageDots(o);
					o.find('.invisible').removeClass('invisible');				});
				
				$(window).resize(function() {
					// carousel resize on window.resize
					$('.carousel.fred').each(function(i, elem) {
						CFG['carousel'].paging.refresh_pageDots($(elem));					});
					// resize menubar items, 
					CFG['util'].setNavbarCollapse();
				});
				
				$('.carousel-pager > div, .carousel-control-btn').on('click', function(e){
					var hash = $(e.currentTarget).attr('href');
					if (hash) CFG['util'].animateScrollToHash({hash: hash});
				})
			},
			fred: function(o) {
					// http://caroufredsel.dev7studios.com/configuration.php
					// Using custom configuration
					var fred = o.find('.carousel-inner .scroller');
					var id = o.attr('id'),
						cfg =  CFG['carousel'][o.attr('id')];
					
					if (cfg.items.visible.max !== undefined && $(window).width() < 467 ) {
						cfg.items.visible.max == cfg.items.visible.min;		// force visible=1
					}
					fred.carouFredSel(  cfg );
			},
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
					o.find('.carousel-pager > div').eq(i).addClass('hide');					
				}
				o.find('.carousel-pager > div').eq(selected).addClass('selected');
			},
		},
	};
	CFG['carousel']['features'] = {
		responsive: true,
		circular: false,
		width: '90%',
		height: 'variable',		align: 'center',
		onCreate: function(data){
			var check;
		},
		items		: {
			width		: 280,			// 3 visible on 1024x768			visible		: {
				min			: 1,
				max			: 5,
				// variable	: true,
			}
		},
		auto : {
			timeoutDuration: 7000,
			conditions: function(){ 
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
			button		: "#features .carousel-control-btn.left",
			key			: "left",
			items		: 1,
			easing		: "cubic",			duration	: 750,

		},
		next : {
			button		: "#features .carousel-control-btn.right",
			key			: "right",
			items		: 1,
			easing		: "cubic",			duration	: 750,
		},
		pagination : {
			container	: "#features  .carousel-pager",
			keys		: true,
			easing		: "cubic",			duration	: 750,
			anchorBuilder: function(nr) {
				// this == li.item
				var fred = $(this).closest('.carousel.fred');			    return markup = '<div href="#'+fred.attr('id')+'">'+nr+'</div>';
			},
		},
		swipe	: {
			onTouch: CFG['isTouch'],
		}
	};
	CFG['carousel']['how-it-works'] = {
		responsive: true,
		circular: false,
		width: '86%',
		height: 'variable',		align: 'center',
		onCreate: function(data){
			var check;
		},
		items		: {
			width 		: 500,
			visible		: 1
		},
		auto : {
			timeoutDuration: 7000,
			conditions: function(){ 
				return CFG['util'].isScrolledIntoView($(this));			},
		},
		scroll : {
			items			: 1,
			easing			: "linear",
			duration		: 1000,							
			pauseOnHover	: 'immediate',
			onCreate 		: function(data) {	},
		},
		prev : {
			button		: "#how-it-works .carousel-control-btn.left",
			key			: "left",
			items		: 1,
			easing		: "cubic",
			duration	: 1000,

		},
		next : {
			button		: "#how-it-works .carousel-control-btn.right",
			key			: "right",
			items		: 1,
			easing		: "cubic",
			duration	: 1000,

		},
		pagination : {
			container	: "#how-it-works  .carousel-pager",
			keys		: true,
			easing		: "cubic",
			duration	: 1000,
			anchorBuilder: function(nr) {
				// this == li.item
				var fred = $(this).closest('.carousel.fred');
			    return markup = '<div href="#'+fred.attr('id')+'">'+nr+'</div>';
			}
		},
		swipe	: {
			onTouch: CFG['isTouch'],
		}
	}; 
	
	CFG['carousel'].init.init();
	
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
		 * set #Home section height
		 */
		CFG['util'].setFullFrameHeight();
		CFG['util'].setNavbarCollapse();
		/*
		 * animations
		 */
		switch (window.location.hash) {
			case '#thank-you': 	// donate success return 
				$('#sharing .thank-you').removeClass('hide');
			case '#sharing':				
				CFG['timing'].load_SocialSharing = 0;
				load_social_sharing();
				break;
			case '#not-yet': 	// donate cancel return 
				break;
		}
		/*
		 *     	touch device init
		 */
		if ($('html').hasClass('touch')) {
			$('.carousel-inner > ul > li.item.active').removeClass('active');
			load_carouFredSel($);			
			$('#header .show-navbar').on('click', function(e){
				e.preventDefault();
				CFG['util'].slideInNavBar();
			})
		
		/*
		 *		mouse/desktop init 
		 */	
		} else {	// html.no-touch
			load_carouFredSel($);			$('#header .show-navbar').on('mouseenter', function(e){
				CFG['util'].slideInNavBar();
			})
		} 	
		load_bg_slideshow();
		
		
		$(window).on('scroll.spy',function(e) {
			CFG['util'].scrollSpy();
		});
					
		// make global
		$('a').bind('click.hashscroll', function(e) {
			if (CFG['util'].animateScrollToHash(this)) {
				e.preventDefault();
			};
		});
		
		$('form.call-to-action button').on('click', function(e){
			var email=$('form.call-to-action input[type=email]'),
				address = email.attr('value');
			if (/[a-z\.]+@[a-z\.]+/.test(address)) {
				email.popover('hide');
				var formId = $(e.currentTarget).attr('id');
				switch (formId){
					case "cheer":
						CFG['util'].postEmail(address,{'data[Follower][cheer]':'1'},function(json, status, o){
							// on success
							if (json.success) {
								CFG['util'].showDonateButtons();	
							} else {
								alert('there was a problem saving your email.');
							}
						});
					break;
					case "invite":
					case "join":
						CFG['util'].postEmail(address,{'data[Follower][join]':'1'},function(json, status, o){
							// on success
							if (json.success) {
								CFG['util'].animateScrollToHash({hash:'#sharing' });
								$('#sharing .thank-you.hide ').removeClass('hide');
							} else {
								alert('there was a problem saving your email.');
							}
						});
					break;
				}
				// jQuery post in background
				e.preventDefault();
				e.stopImmediatePropagation();
				return false;
			} 
		}) 
		/**
		 *	fade in #home content 
		 */
		$('#home .invisible, .navbar.invisible').addClass('fadeIn-slow');
	}
)
