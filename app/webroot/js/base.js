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
			$('.alert-wrapper').removeClass('hide');
			$('.alert-wrapper .alert').html(msg);
			// console.log(msg);
			$('.alert-wrapper .fade-wrap').fadeIn(500).delay(1000).fadeOut("slow");
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
				
				if (id=='sharing' && !CFG['socialSharing']){
					CFG['timing'].load_SocialSharing = 0;
					load_social_sharing();	// load immediately on scrollIntoView
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
	slideInNavBar: function(type){
		var navbar = $('.navbar-fixed-top');
		if (navbar.css('position')=='absolute') {
			var top = $(window).scrollTop();
			navbar.css('top', top);
			$('.alert-wrapper').css('top', navbar.css('height') );
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
var load_bootstrap_carousel = function($) {
	CFG['carousel'] = { 
		autoPaging: true,
		isLingeringTimer: {},
		find: {},
		init: function() {
			$('html.no-touch .carousel').each(function(i, elem) {
				CFG['carousel'].paging.dotPaging($(elem));
			});
		},
		paging : {
			/*
			 * dot paging for carousels
			 * @param o.hasClass(.carousel)
			 */
			dotPaging: function(o) {			
				if ($('html').hasClass('touch')) return;			// uses iscroll, instead
				
				CFG['carousel'].find[o.attr("id")] = o;				// back reference
				
				  // .carousel({ interval: 5000 }) 
				o.bind('slid', function(e) { 
					var pager = o.find(".carousel-pager"),
						dots = pager.find("div");
					var next = o.find('.item.active').index();
					dots.removeClass('active').eq(next).addClass('active'); 
					if (++next >= dots.length) next = 0; 
					pager.attr('next', next);
				  }); 
					
			    o.find(".carousel-pager div").click(function(e){ 
			      var index = $(this).index(); 
			      o.carousel({interval:false}).carousel(index);
			      var pager = o.find(".carousel-pager").attr('next', index);
			      e.preventDefault();
			    }); 
			}, 
			/*
			 * autoPaging for bootstrap carousels, 
			 * 	- initialize AFTER first scroll into view
			 */
			autoPaging: function(o, timers) {
				if ($('html').hasClass('touch')) return;			// uses iscroll, instead
				if (o.hasClass('activated')) return;
				if (CFG['carousel'].autoPaging == false) return;
				
				// isLingeringInView(o, timers, delay, success){
				CFG['util'].isLingeringInView(o, timers, CFG['timing']['lingering'], 
					function(o){
						// console.info("lingering for "+o.attr('id'));

						/**
						 * start carousel when .carousel lingers in view 
						 */
						var id = o.attr('id');
						if (!o.hasClass('activated')) {
							// bug: carousel does not pause:'hover' if it was started while hovering
							if (o.is(":hover")) {
								o.one("mouseleave", function(){
									o.addClass('activated').carousel({ interval: CFG['timing']['carousel'], pause: 'hover'});
								})
							} else 
								o.addClass('activated').carousel({ interval: CFG['timing']['carousel'], pause: 'hover'});
						}
						return 'activated';	// only start once.
					}
				);	
				return;
			},
		},
	};
	
	CFG['carousel'].init();
	
	$(window).scroll(function(e) {
		/* Check the location of each desired element */
		$('html.no-touch .carousel:not(.activated)').each(function(i, elem) {
			CFG['carousel'].paging.autoPaging($(elem), CFG['carousel'].isLingeringTimer);
		});
	});
	
}

/*
 * iscroll load/init for html.touch
 */
var load_iscroll = function($) {
	CFG['iscroll'] = {
		init : function(){
			$('html.touch .featurette.carousel').each(function(i, elem){
				var id = $(elem).attr('id');
				CFG['iscroll'][id].setWidths($(elem));
				CFG['iscroll'][id].iscroll.refresh();
				
// TODO: debug android chrome font-family bug, see: http://code.google.com/p/chromium/issues/detail?id=138257		
// CFG['util'].notify($(elem).find('.carousel-row p').first().css('font-family')+', '+$(elem).find('.carousel-row p').first().css('font-size'));
				// init dot paging
				$(elem).find(".carousel-pager div").click(function(e){ 
			      var index = $(this).index(); 
			      CFG['iscroll'][id].iscroll.scrollToPage(index);
			      e.preventDefault();
			    }); 
			});
		},
		fullWidth: function(o) {  // o.carousel
			var count = o.find('.carousel-inner > ul li').size();
			var fw = $(window).width();
			o.find(".carousel-inner > ul").css('width', (count*fw) +'px');
			o.find(".carousel-inner, .carousel-inner > ul li").css('width', fw +'px');
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
	CFG['iscroll']['features'].setWidths = CFG['iscroll'].fullWidth;
	CFG['iscroll']['features'].iscroll = new iScroll('features-iscroll',{
		snap: true,
		momentum: false,
		hScroll: true,
		vScroll: false,
		hScrollbar: false,
		vScrollbar: false,
		onScrollEnd: function () {
			document.querySelector('#features .carousel-pager > div.active').className = '';
			document.querySelector('#features .carousel-pager > div:nth-child(' + (this.currPageX+1) + ')').className = 'active';
		}
	});
	// #how-it-works-iscroll
	CFG['iscroll']['how-it-works'].setWidths = CFG['iscroll'].fullWidth;
	CFG['iscroll']['how-it-works'].iscroll = new iScroll('how-it-works-iscroll',{
		snap: true,
		momentum: false,
		hScroll: true,
		vScroll: false,
		hScrollbar: false,
		vScrollbar: false,
		onScrollEnd: function () {
			document.querySelector('#how-it-works .carousel-pager > div.active').className = '';
			document.querySelector('#how-it-works .carousel-pager > div:nth-child(' + (this.currPageX+1) + ')').className = 'active';
		}
	});
	$(window).resize(function() {
		$('html.touch .featurette.carousel').each(function(i, elem){
			var id = $(elem).attr('id');
	  		CFG['iscroll'][id].setWidths($(elem));
	  		CFG['iscroll'][id].iscroll.refresh();
	 	});
	 	
	 	
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

/*
 * jQuery ready
 */
! function($) {
	// console.info("jQuery loaded");	return;
}(window.jQuery);

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
				CFG['util'].slideInNavBar('touch');
			})
			
		} else {	// html.no-touch
			load_bootstrap_carousel($);
			$('#header .show-navbar').on('mouseenter', function(e){
				CFG['util'].slideInNavBar('no-touch');
			})
		}
		load_bg_slideshow();
		
		$(window).scroll(function(e) {
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
		
		load_social_sharing();
	}
)
