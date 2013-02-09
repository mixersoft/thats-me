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
	        // console.log(target);	        $.scrollTo(target, 500);
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
					o.find('.invisible').removeClass('invisible');				});
				
				$(window).resize(function() {
					// carousel resize on window.resize
					$('html.no-touch .carousel.fred').each(function(i, elem) {
						CFG['carousel'].paging.refresh_pageDots($(elem));					});
					// resize menubar items, 
					CFG['util'].setNavbarCollapse();
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
					var id = o.attr('id'),
						cfg =  CFG['carousel'][o.attr('id')];
					
					if (cfg.items.visible.max !== undefined && $(window).width() < 467 ) {
						cfg.items.visible.max == cfg.items.visible.min;		// force visible=1
					}
					fred.carouFredSel(  cfg );
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

			    o.find('.invisible').removeClass('invisible');
			});
			// refresh widths on window resize
			$(window).resize(function() {
				$('html.touch .featurette.carousel.iscroll').each(function(i, elem){
					var o = $(elem),
						id = o.attr('id');
			  		CFG['iscroll'][id].setWidths(o);
			  		CFG['iscroll'][id].iscroll.refresh();
			  		CFG['iscroll'].refresh_pageDots(o, CFG['iscroll'][id].iscroll);
			 	});
			 	// resize menubar items, 
				CFG['util'].setNavbarCollapse();
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
			
			$('a.carousel-control').click(function(e){
				e.stopImmediatePropagation();
				return false;
			});
			// listen for a touchstart event
			$('.iscroll .carousel-inner').Hoverable({disableHover:true}).newHover(
				function(e, touch) {//hoverIN
					$(this).addClass('active');
					$(this).next('.carousel-control-wrap').removeClass('fadeOut-slow').addClass('fadeOut').addClass('fadeIn');
				}, 
				function(e, touch) {//hoverOut
					$(this).removeClass('active');
					$(this).next('.carousel-control-wrap').removeClass('fadeIn');
			}); 
			$('.iscroll .fw-band.vcenter-body').Hoverable({disableHover:true}).newHover(
				function(e, touch) {//hoverIN
					$(this).find('.carousel-inner').addClass('active');
					$(this).find('.carousel-control-wrap').removeClass('fadeOut-slow').addClass('fadeOut').addClass('fadeIn');
				}, 
				function(e, touch) {//hoverOut
					$(this).find('.carousel-inner').removeClass('active');
					$(this).find('.carousel-control-wrap').removeClass('fadeIn');
			});
 
		},
		refresh_pageDots: function(o, iScroll){
			var id = o.attr('id');
			var itemW = o.find('.carousel-inner > ul li.item').first().outerWidth();
			// var scrollerW = o.find('.carousel-inner > ul').outerWidth();			var viewportW = o.find(".carousel-inner").outerWidth();
			var visibleItems = Math.floor(viewportW/itemW + 0.1);
			var carouselItems = o.find('.item').size();
			var pages = carouselItems - visibleItems;		// 0 based
			var pager = o.find('.carousel-pager');
			var dots = pager.find('a');
			if (dots.size()==0) {
				for (var i=0; i<carouselItems; i++) {
					pager.append('<a href="#'+ id +'">'+i+'</a>')
				}
				dots = pager.find('a');
			}
			
			for (var j=0; j<carouselItems; j++) {
				if (j>pages || pages==0) {
					dots.eq(j).addClass('hide');					
				} else dots.eq(j).removeClass('hide');
			}
			iScroll = iScroll || CFG['iscroll'][id].iscroll;
			var selected = iScroll.pageX || 0;
			dots.removeClass('active').eq(selected).addClass('active');
		},
		fullWidth: function(o) {  // o.carousel
			var count = o.find('.carousel-inner > ul li').size();
			var fw = $(window).width()*0.85;	// add 10% extra room for finger scrolling
			fw = Math.min(fw, 940);
			o.find(".carousel-inner > ul").css('width', (count*fw) +'px');
			o.find(".carousel-inner, .carousel-inner > ul li").css('width', fw +'px');
		},
		/*
		 * #features.carousel.iscroll 
		 * show as many as can fit in .carousel-inner width
		 */
		packedWidth: function(o) {	
			var items = o.find('.carousel-inner > ul li.item figure.graphic');
			var count = items.size();
			var itemW = items.first().outerWidth(true);
			var fw = $(window).width() * 0.85;
			var visible = fw/itemW;
			visible = visible < 1.56 ? 1 : Math.min(Math.round(visible), count);
			itemW = Math.min(Math.max(fw/visible, 200), 260);	// min-width 200px, max-width=260px;
			o.find(".carousel-inner").css('width', itemW*visible + 'px');
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
		lockDirection: false,
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
			load_iscroll($);
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
			} else if ( 0 || $('html.touch').size() ){
				// ipad/mobile safari not validating form correctly
				email.popover('show');
				setTimeout(function(){
					email.popover('hide');
				}, CFG['timing'].validation_popover);
			} 
		}) 
		/**
		 *	fade in #home content 
		 */
		$('#home .invisible, .navbar.invisible').addClass('fadeIn-slow');
	}
)
