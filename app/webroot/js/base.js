/*
 * includes Global CFG attributes & methods used by main.js
 * 		must be AFTER bootstrap.js and BEFORE main.js, etc.
 */
CFG['timing'] = {
	linger: 1000,
	carousel: 5000,
	slideshow: 10000,
	navbarSlideOut: 5000,
	load_ytapi: 5000,
	load_SocialSharing: 6000,
	validation_popover: 2000,
	carousel_hint_in: 2000,
	carousel_hint_out: 8000,
	vscroll_hint_in: 8000,
	vscroll_hint_out: 12000,
};


(function() {//Closure, to not leak to the scope
	
	
// static class for IDE outline browser
var Util = new function(){}
CFG['util'] = Util;		// make global
Util.parseQueryString = function(a) {
	a = a || (window.location.search.substr(1).split('&'));
    if (a == "") return {};
    var b = {};
    for (var i = 0; i < a.length; ++i)
    {
        var p=a[i].split('=');
        if (p.length != 2) continue;
        b[p[0]] = decodeURIComponent(p[1].replace(/\+/g, " "));
    }
    return b;
};

/*
 * http://stackoverflow.com/questions/9097501/show-div-when-scroll-position
 * see also: http://imakewebthings.com/jquery-waypoints/
 */
Util.isScrolledIntoView = function (o) {
	if (o.length !== 1) return false;
	var docViewTop = $(window).scrollTop();
	var docViewBottom = docViewTop + $(window).height();

	var elemTop = o.offset().top;
	if (elemTop < 0) elemTop = 0;		// adjust for #home;
	var elemBottom = elemTop + o.height();

	var completelyInView = ((elemBottom >= docViewTop) && (elemTop <= docViewBottom) && (elemBottom <= docViewBottom) && (elemTop >= docViewTop) );
	var nearTop = ((elemBottom >= docViewTop) && (elemTop >= docViewTop) && (elemTop <= docViewTop + $(window).height() / 3) // top 1/3 of window
	)
	return completelyInView || nearTop;
};
Util.isLingeringInView = function(o, lingering_timers, delay, success){
	var id = o.attr('id');
	if (lingering_timers[id]) return;
	lingering_timers[id] = setTimeout(function(){
		lingering_timers[id] = 0;
		if (CFG['util'].isScrolledIntoView(o)) {
			lingering_timers[id] = success(o);
			// show any hints when scrolled into View
			Util.fadeIn_hints(o);		
		}
	}, delay);
};
Util.notify = function notify(msg, type) {
	try {
		// $('.alert-wrapper').removeClass('hide');		if (/snaphappi.com/.test(window.location.host)) return;
		$('.alert-wrapper .alert').html(msg);
		// console.log(msg);
		// $('.alert-wrapper .fade-wrap').fadeIn(500).delay(1000).fadeOut("slow");		$('.alert-wrapper').addClass('fadeIn');
		setTimeout(function(){
			$('.alert-wrapper').removeClass('fadeIn');
		}, 2000)
	} catch (e) {
	}
};
/*
 * set the homepage to expand to the full window height
 */
Util.setFullFrameHeight = function(peek){
	peek = peek || 80;	// peek ahead, show pixels from next section		
	// offsetH:  581+:89 320+:41
	var offsetH = $('#home .fw-band.footer').height()==16 ? 41 : 89,
		perfectH = $(window).attr('innerHeight')-offsetH,
		homeMinH = $('#home .fw-band.vcenter-body').css('height', 'auto').height();
	var activeH = Math.min(Math.max(homeMinH, perfectH ),1100);
	$('#home .fw-band.vcenter-body').css('height', activeH-peek );
	// center copy
	var copy = $('#home .fw-band.vcenter-body > .container');
	copy.css('padding-top', (activeH-copy.height())/2 - 40 );
};
Util.setNavbarCollapse = function(){
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
};
Util.scrollSpy = function(){
	// manually implemented ScrollSpy
	var current = $('.navbar .nav li.active'),
		href = current.first().find('a').attr('href'),
		visibleId;
	if (window.location.pathname == '/i-want-it' && !CFG['socialSharing']) {
		CFG['timing'].load_SocialSharing = 0;
		Util.load_SocialSharing();	// load immediately on scrollIntoView
	}	
	$('.featurette:not(.hide)').each(function(i, elem) {
		if (CFG['util'].isScrolledIntoView($(elem))) {
			visibleId = $(elem).attr('id');
			if (href && href.indexOf(visibleId)!=-1) {
				// current active is still visible, skip
				return true;
			}

			var prefix = ($('.navbar.use-hash').length) ? '#' : '/';
			var li = $('.navbar .nav li a[href^="'+prefix+visibleId+'"]').parent().addClass('active');
			current.removeClass('active');
			if (!CFG['ytapi']){
				switch(visibleId) {
					case 'features':
					case 'how-it-works':
						Util.load_ytapi();	// load immediately on scrollIntoView
						break;
					case 'see-the-movie':
						CFG['timing'].load_ytapi = 0;
						Util.load_ytapi();	// load immediately on scrollIntoView
						break;
				}
			}
			if (!CFG['socialSharing']){
				switch(visibleId) {
					case 'call-to-action':
						Util.load_SocialSharing();	// load immediately on scrollIntoView
						break;
					case 'sharing':
					case 'see-the-movie':
					case 'call-to-action':
					case 'i-want-it':
						CFG['timing'].load_SocialSharing = 0;
						Util.load_SocialSharing();	// load immediately on scrollIntoView
						break;
				}
			}
			return false;					
		}
	});
	if (CFG['util'].isScrolledIntoView($('.fb-spinner'))) {
		CFG['timing'].load_SocialSharing = 0;
		Util.load_SocialSharing();	// load immediately on scrollIntoView
	}
};
Util.postEmail = function(email, options, success) {
	options = options || {};
	success = success || function(json, status, o){
			console.log("post Email success");
		}
	var postData = $.extend({'data[Follower][email]':email}, options);
	$.ajax({
		type:"post",
		url:"/followers/signMeUp.json",
		data: postData,
		dataType: 'json',		success: function(json, status, o){
			try {
				var email = json.response.email,
					created = json.response.created || null;
					CFG['mixpanel'].identify(email, created);
			} catch (ex) {		}
			success.call(this, json, status, o);
		},
	}).fail(function(json, status, o){
		console.error("post Email failed");
	});
	return false;
};
Util.showDonateButtons = function() { 
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
};
/*
 * @param el HTMLElement, o.hasAttr('hash'), $(<A>)
 */
Util.animateScrollToHash = function(el) {
	var top, next, target;
	if ($(el).attr('data-next')=='.featurette') {
		// just scan for the next valid .featurette in the page
		top = $(el).closest('.featurette');
		if (top.attr('id') === 'home') next = $('#deferred .featurette:first');
		else next = top.nextAll('.featurette:not(.hide):first');
		target = (next.length) ? next :  $(el.hash);
	} else target = $(el.hash);
	
	if (!target.length) return false;
	
	if (target.hasClass('carousel') && $('html.touch')) {
		// scrolling on carousel scroll causes flashes
		if (CFG['util'].isScrolledIntoView(target)) {
			return target;
		}
	}
	if (target) {
        // console.log(e.hash);
        var delta = target.offset().top - $(window).scrollTop();
        if (delta < 0 || delta > 50) {
        	setTimeout(function(){
        		$.scrollTo(target, 1000);
        	}, 50);
        } 
    }
    target.addClass('viewed');
    return target;
};
/*
 * cycle through sequence of sections on each click of home page icons, 
 * 		after all is viewed, just go to #features
 */
Util.home_clickHandler = function(e) {
	var sequence = $('.featurette').not('#home').not('.hide').not('.viewed');
	var visited = CFG['cracker']['Page View'] || [];
	var next;
	for (var i=0; i<sequence.length; i++) {
		if (visited.indexOf(sequence[i].id) === -1) {
			next = sequence[i];
			break;
		}
	}
	if (!next) next = $('#features')[0];
	Util.animateScrollToHash({hash:'#'+next.id});
}
Util.slideInNavBar = function(){
	var navbar = $('.navbar-fixed-top');
	// collapsed .navbar has position:absolute, otherwise fixed
	if (navbar.length && navbar.css('position')=='absolute') { 
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
};
Util.fadeIn_hints = function(o) {
	switch(o.attr('id')){
		case 'home':
			// fade in Vscroll hint
			setTimeout(function() {
				var hint = $('#home .vscroll-hint:not(.disabled)'); 
				if (hint.length==0) return;
				
				hint.addClass('fadeIn-slow').on('click', function(e){
					hint.removeClass('fadeIn-slow').addClass('disabled');
				});
				setTimeout(function() {
					hint.removeClass('fadeIn-slow');
				}, CFG['timing'].vscroll_hint_out);
			}, CFG['timing'].vscroll_hint_in);			
		break;
		case 'features':
		case 'how-it-works':
			// fade in Vscroll hint
			setTimeout(function() {
				var hint = $('#'+o.attr('id')+' .carousel-hint:not(.disabled)'); 
				if (hint.length==0) return;
				
				if ($('html.touch').length) hint.find('.swipe').removeClass('hide');
				else hint.find('.click').removeClass('hide');
				
				hint.addClass('fadeIn-slow').on('click', function(e){
					hint.removeClass('fadeIn-slow').addClass('disabled');
				});
				setTimeout(function() {
					hint.removeClass('fadeIn-slow');
				}, CFG['timing'].carousel_hint_out);
			}, CFG['timing'].carousel_hint_in);
		break;
	}
}
Util.setButtonIcons = function() {
	if (CFG['cracker']['Video'].indexOf('end') !== -1) {
		// add checkmark on Video end
		$('a.btn[href*=see-the-movie]').html("See the Movie <i class='icon-ok' style='color:lightgreen;'></i>");
		$('a.btn[target*=snappi-demo]').removeClass('hide').removeClass('disabled');
	}
}
Util.load_SocialSharing = function() {
	$(window).one('fb-init', function(e){
		$('.fb-spinner').remove();
		// FB.Event.subscribe('auth.login', function(response) {
		  // console.info('The status of login is: ' + response.status);
		// });
		// FB.Event.subscribe('auth.authResponseChange', function(response) {
		  // console.info('The status of authResponseChange is: ' + response.status);
		// });
		// FB.Event.subscribe('auth.statusChange', function(response) {
		  // console.info('The status of statusChange is: ' + response.status);
		// });	});
	setTimeout(function(){
		if (CFG['socialSharing']) return;
		CFG['socialSharing'] = 1;
		(function() {  //Closure, to not leak to the scope
			// facebook javascript jdk 		
			  window.fbAsyncInit = function() {
// console.info('window.fbAsyncInit called');			  				    // init the FB JS SDK
			    FB.init({
			      // appId      : 'YOUR_APP_ID', // App ID from the App Dashboard			      channelUrl : '//'+window.location.host+'/pages/fb-channel-file', // Channel File for x-domain communication
			      status     : false, // check the login status upon init?
			      cookie     : true, // set sessions cookies to allow your server to access the session?
			      xfbml      : true  // parse XFBML tags on this page?
			    });
				$(window).trigger('fb-init');
			    // Additional initialization code such as adding Event Listeners goes here
			  };
			
			// Load the SDK's source Asynchronously
			  // Note that the debug version is being actively developed and might 
			  // contain some type checks that are overly strict. 
			  // Please report such bugs using the bugs tool.
			  (!function(d, debug){
			     var js, id = 'facebook-jssdk', ref = d.getElementsByTagName('script')[0];
			     if (d.getElementById(id)) {return;}
			     js = d.createElement('script'); js.id = id; js.async = true;
			     js.src = "//connect.facebook.net/en_US/all" + (debug ? "/debug" : "") + ".js";
			     ref.parentNode.insertBefore(js, ref);
			   }(document, /*debug*/ false));
   
			// twitter
			!function(d,s,id){
				var js,fjs=d.getElementsByTagName(s)[0];if(!d.getElementById(id)){js=d.createElement(s);js.id=id;js.src="//platform.twitter.com/widgets.js";fjs.parentNode.insertBefore(js,fjs);}
			}(document,"script","twitter-wjs");
			
			// pinterest
			(function (w, d, load) {
				 var script, first = d.getElementsByTagName('SCRIPT')[0], n = load.length, i = 0, go = function () {   for (i = 0; i < n; i = i + 1) {     script = d.createElement('SCRIPT');     script.type = 'text/javascript';     script.async = true;     script.src = load[i];     first.parentNode.insertBefore(script, first);   } }; if (w.attachEvent) { w.attachEvent('onload', go); } else { w.addEventListener('load', go, false); }
			}(window, document, ['//assets.pinterest.com/js/pinit.js']));    
		})();		
	}
	, CFG['timing'].load_SocialSharing);
}
Util.load_ytapi = function() {
	setTimeout(function(){
		if (CFG['ytapi']) return;
		CFG['ytapi'] = 1;
		(function() {  //Closure, to not leak to the scope
			$.getScript('http://www.youtube.com/iframe_api').done(function() {
				// console.log("google adwords conversion script loaded");
			});
		})();		
	}
	, CFG['timing'].load_ytapi);
}
Util.show_demo = function(show){
	if (show == undefined) show=true;
	if (show){
		$('body').css('overflow','hidden');
		$('iframe#demo').removeClass('hide');
	} else {
		$('iframe#demo').addClass('hide');
		$('body').css('overflow','visible');
	}
}
Util.load_demo = function(e, popup){
	if (CFG['cracker']['Video'].indexOf('end') === -1) {
		var target = $( (e && e.currentTarget) || '#see-the-movie a.btn[target*=snappi-demo]');
		if (target.next('.popover').length == 0) {
			target.popover({
				trigger: 'manual',
				content: 'The Demo works better after you see the movie. But click again to continue',
				placement: 'top'
			}).popover('show');
			setTimeout(function(){ target.popover('hide');}, 8000);
			return false;
		} else {
			target.popover('hide');
		}
	}
	popup = popup || ($('html.touch').length); // ipad uses popup, not iframe, to allow Vscroll
	if (popup) return true;
	else if ($('iframe#demo').length) {
		Util.show_demo(true);
	} else {
		// load in iframe
		var src = "/timeline/iframe:1";
		var iframe_markup = '<iframe id="demo" class="alpha rgba80b" type="text/html" src=":src" frameborder="0" allowfullscreen></iframe>';
		iframe_markup = iframe_markup.replace(':src', src);
		var iframe_border = '<div class="demo-border">:iframe_markup</div>';
		iframe_border = iframe_border.replace(':iframe_markup', iframe_markup);
		$('body').append(iframe_border);
		Util.show_demo(true);
	}
	return false;
	
}
Util.setVariant = function(qs){
	qs = qs || {};
	// show overlay variation
	var variant = qs['home'];
	switch (variant) {
		default:
			// winning variant: peek ahead, movie in section 2
			Util.setFullFrameHeight(80);
			break;			
	}
	return variant;
}


/*
 * init code for deferred markup
 */
Util.deferredMarkupReady = function() {
		/*
		 * load section from hash. i.e. #thank-you
		 */
		var hash = window.location.hash, 
			qs = CFG['util'].parseQueryString();
		switch (hash) {
			case '#thank-you': 	// donate success return 
				$('#sharing .thank-you').removeClass('hide');
			case '#call-to-action':	
			case '#i-want-this':				
			case '#sharing':	
			case '#social': 	// just the social part of #i-want-this
				CFG['timing'].load_SocialSharing = 0;
				Util.load_SocialSharing();
				break;
			case '#see-the-movie':				
				CFG['timing'].load_ytapi = 0;
				Util.load_ytapi();
				break;
			case '#not-yet': 	// donate cancel return 
				break;
		}
		if (!hash && qs.hash === 'see-the-movie') {
			hash = '#'+qs.hash;
		}
		Util.animateScrollToHash({hash: hash});

		load_carouFredSel($);
		
		
		/*
		 * navbar init
		 * 		convert hash -> link for individual pages
		 *  TODO: move to Util.deferredMarkupReady
		 */
		if ($('.navbar.use-hash').length==0){
			$('a[href^="#"]').each(function(i,elem){
				var href = $(elem).attr('href');
				if (href.length == 1) return;		// skip for '#'
				switch (href) {
					// manual lookups
					case "#call-to-action":
						href = '#i-want-it';
					break;
					case "#features":
					case "#how-it-works":
					case "#i-want-it":
					case "#call-to-action":
					case "#about":
					case "#faq":
					case "#about":
					case "#sharing":
					case "#see-the-movie":
						break;
					// keep these hash/anchors	
					case "#about-now":  	
					case "#about-mission":
					case "#about-team":	
					default:
						return true;	// skip everything else
				}
				href = href.substr(1);
				$(elem).attr('href', href);
			});	
		}
		Util.setNavbarCollapse();
		Util.scrollSpy(); 
		
		/**********************************************************************
		 * start page listeners 
		 ************************************************************************/
		if ($('html').hasClass('touch')) {
			// html.touch .navbar for .visible-mobile
			$('#header .show-navbar').on('click', function(e){
				e.preventDefault();
				CFG['util'].slideInNavBar();
			})
		
		/*
		 *		mouse/desktop init 
		 */	
		} else {	
			// html.no-touch .navbar for .visible-mobile
			$('#header').on('mouseenter', function(e){
				CFG['util'].slideInNavBar();
			})
		} 	
		
		$(window).on('scroll.spy',function(e) {
			CFG['util'].scrollSpy();
		});
					
		// make global
		$('a').bind('click.hashscroll', function(e) {
			if (CFG['util'].animateScrollToHash(this)) {
				e.preventDefault();
			};
		});
		
		$('#home figure.graphic').on('click',function(e){
			Util.home_clickHandler(e); 
		})
		
		// update data[Follower][cheer] when a paypal/amazon button was clicked
		$('form.call-to-action button.btn').on('click.submit', function(e){
			var email=$('form.call-to-action input[type=email]'),
				button = $(e.currentTarget),
				address = email.attr('value');
			if (/^[\w.+-]+@[\w.-]+\.[a-zA-Z]{2,4}$/.test(address)) {
				email.popover('hide');
				button.button('loading');
				var formId = button.attr('id');
				switch (formId){
					case "cheer":
						CFG['util'].postEmail(address,{'data[Follower][cheer]':'1'},function(json, status, o){
							// on success
							if (json.success) {
								button.button('complete');
								CFG['util'].showDonateButtons();	
							} else {
								button.button('error');
								alert('there was a problem saving your email.');
							}
						});
					break;
					case "invite":
					case "join":
						CFG['util'].postEmail(address,{'data[Follower][join]':'1'},function(json, status, o){
							// on success
							if (json.success) {
								button.button('complete');
								CFG['util'].animateScrollToHash({hash:'#sharing' });								$('#sharing .thank-you.hide ').removeClass('hide');
							} else {
								button.button('error');
								alert('there was a problem saving your email.');
							}
						});
					break;
				}
				$(e.currentTarget).removeClass('track-disabled');
				if ($(e.currentTarget).is(':not(.tracked)')) {
					$(e.currentTarget).trigger('click.mixpanel');				}
				// jQuery post in background, do not submit
				e.preventDefault();
				e.stopImmediatePropagation();
				return false;
			} else if ( /^[\w.+-]+@[\w]/.test(address) || $('html.touch').length ){
				// ipad/mobile safari not validating form correctly
				email.popover('show');
				
				setTimeout(function(){
					email.popover('hide');
				}, CFG['timing'].validation_popover);

			}
			return true;		// allows for field validation downstream
		}) 	
}
/*
 * just minimum code necessary to show first section,
 * 	remaining sections, if any, will be loaded by XHR, and 
 * 	initialized via Util.deferredMarkupReady() 
 */
Util.documentReady = function() {
		// console.info("document ready");
		if ($('html').hasClass('ie8') && document.documentMode==8) $('html').addClass('doc-mode-ie8');
		/*
		 * check @font-family load
		 */		
		$('.checkfont').fontChecker({
			onLoadClass: 'fontLoading',
    	    onFailClass: 'fontFail',
    	    onLoad: function(o){
    	    	$('#curtain .wrapV').addClass('fadeIn'); // fade in #curtain .logo 
    	    },
    	    onFail: function(o){
    	    	$('.navbar .brand').html('<img src="/img/beachfront/snaphappi-logo-v2.png">');
    	    	$('#curtain').remove();
    	    },
		});

		/*
		 * debug touch/no-touch
		 */
		if (CFG.isTouch) $('html').removeClass('no-touch').addClass('touch');
		else $('html').removeClass('touch').addClass('no-touch');
		
		/*
		 * set #Home section height
		 */
		if ($('#home').length) {
			/*
			 * show variation, BEFORE setFullFrameHeight()
			 * overlay_variation = [who-has-time|curator]
			 */
			var qs = CFG['util'].parseQueryString();
			var variant = Util.setVariant(qs);
		}
		
		var deferred = $('#deferred');
		if (deferred.length == 1) {
			setTimeout( function() {
				deferred.load(deferred.attr('data-href-deferred'), function(){
					Util.deferredMarkupReady();
				});
			}, 50);	
		} else {
			Util.deferredMarkupReady();
			// set footer height if necessary to fill window
			var check;
			var contentBottom = $('#content').height(),
				windowH = $(window).attr('innerHeight');
			var paddingH = windowH - contentBottom;
			var footer = $('#footer');
			footer.css('height',footer.height() + paddingH + 'px');
		}
		
		
		/*
		 * FAQ/accordion listener for show-all
		 */
		$(document).on('click.accordion-show-all', '[data-action=show-all]', function (e) {
			var parent = $(e.currentTarget).attr('data-parent');
			if ($(e.currentTarget).html()==='show all') {
				$(e.currentTarget).html('hide all');
				$(parent).find('.accordion-body').collapse('show');
			} else {
				$(e.currentTarget).html('show all');
				$(parent).find('.accordion-body').collapse('hide');
			}
			
		})
		

		/***********************************************************
		 *	remove curtain and fade in #home content 
		 *************************************************************/
		if ($('.ipad').length==0) $('#curtain').remove();
		$('#home .invisible:not(.fadeIn), .navbar.invisible').addClass('fadeIn');
		// fade in Vscroll hint
		setTimeout(function() {
			var hint = $('#home .vscroll-hint'); 
			hint.addClass('fadeIn-slow').on('click', function(e){
				hint.removeClass('fadeIn-slow');
			});
			setTimeout(function() {
				hint.removeClass('fadeIn-slow');
			}, CFG['timing'].vscroll_hint_out);
		}, CFG['timing'].vscroll_hint_in);	
		
		/*
		 * start slideshow
		 */
		CFG['slideshow'].init();
}




// static class for IDE outline browser
var Slideshow = new function(){}
CFG['slideshow'] = Slideshow;		// make global


/*****************************************************************
 * initialization methods
 *****************************************************************/
/**
 * background slideshow
 */
Slideshow.timer = null;
Slideshow.next = null;			// next slide, function
Slideshow.count = 5;			// count of bg images, bg.pix[name='N'] defined in CSS
Slideshow.preloader = null;	// IMG object for binding onload
Slideshow.loaded = [];			// array of slides that have already been cached, but page index 
Slideshow.init = function(){
	Slideshow.preloader = $('<img />')	
		.bind('load', function() {
		    // Background image has loaded.
		    var fadeOut = $('#bg-slideshow .active'); 
		    var i = $('#bg-slideshow .loading').removeClass('loading').addClass('active').attr('name');
		    Slideshow.loaded[i]=true;
		    fadeOut.addClass('fadeOut').removeClass('active');
		});
	// start the slideshow timer	
	Slideshow.timer = setInterval(
		Slideshow.next,
		CFG['timing']['slideshow']
	);
};
// slideshow timer
Slideshow.next = function(){
	// if ($('#bg-slideshow .bg.fading').size()>1) return;
	var bg = $('#bg-slideshow .bg.fixed.active');
	if (bg.size()==0) bg = $('#bg-slideshow .bg.fixed:first').addClass('active');
	
	// next slide
	var i = parseInt( bg.attr('name') || 1 ) +1;
	if (i > Slideshow.count) i=1;
	var nextBg = $('#bg-slideshow .bg.fixed[name='+i+']'); 
	if (nextBg.size()==0) {
		// create nextBg by cloning active
		nextBg = bg.clone().attr('name', i ).removeClass('active').removeClass('fadeOut').addClass('loading');
		// add bg.addClass('fadeOut'); in onload
		$('#bg-slideshow').prepend(nextBg);				// should be "below" face
		
					// PRELOAD image
		var bkgSrc = bg.css('background-image').replace(/"/g,"").replace(/url\(|\)$/ig, "");
		if (CFG['slideshow'].loaded[i] == undefined) Slideshow.preloader.attr('src', bkgSrc);
		
	} else {
		$('#bg-slideshow > .active').removeClass('active').addClass('fadeOut');
		nextBg.addClass('active').removeClass('fadeOut');
	}
};



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
					CFG['carousel'].init.fred(o);
					CFG['carousel'].paging.refresh_pageDots(o);
					o.find('.invisible:not(.left)').removeClass('invisible');				});
				
				$(window).resize(function() {
					// carousel resize on window.resize
					$('.carousel.fred').each(function(i, elem) {
						CFG['carousel'].paging.refresh_pageDots($(elem));					});
					// resize menubar items, 
					CFG['util'].setNavbarCollapse();
				});
				
				$('.carousel-pager > div, .carousel-control-btn').on('click', function(e){
					var hash = $(e.currentTarget).attr('href');
					if (hash) CFG['util'].animateScrollToHash({hash: hash, source:'carousel'});
				})
			},
			fred: function(o) {
					// http://caroufredsel.dev7studios.com/configuration.php
					// Using custom configuration
					var fred = o.find('.carousel-inner .scroller');
					var id = o.attr('id'),
						cfg =  CFG['carousel'][o.attr('id')] || null;
					
					if (!cfg) return;
					
					if (cfg.items.visible.max !== undefined && $(window).width() < 467 ) {
						cfg.items.visible.max = cfg.items.visible.min;		// force visible=1
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
				try {
					var visibleItems = fred.triggerHandler("currentVisible").size();
					var carouselItems = fred.find('.item').size();
					var pages = carouselItems - visibleItems;
					var selected = fred.triggerHandler("currentPosition");
					var dots = o.find('.carousel-pager > div');
					for (var i=pages+1; i<carouselItems; i++) {
						if (i==carouselItems) break;		// why do I need this?
						dots.eq(i).addClass('hide');					
					}
					o.find('.carousel-pager > div').eq(selected).addClass('selected');
					
					if (pages==0) {
						o.find('.carousel-hint').addClass('disabled');
					}
				} catch (ex){
					// carousel not yet initialized
				}
			},
		},
		track_CarouselEnd: function(o){
			var carousel = o.closest('.carousel');
			if (Util.isScrolledIntoView(carousel) && carousel.hasClass('track-carousel-end')) {
				carousel.removeClass('track-carousel-end');
				CFG['mixpanel'].track_PageView(carousel, {
					section: carousel.attr('id')+":CAROUSEL-END",
				});
				// CFG['util'].notify('end of carousel');			}	// end if
		}
	};
	CFG['carousel']['features'] = {
		responsive: true,
		circular: false,
		width:  "90%",				/* set .caroufredsel_wrapper margin-left= 10%/2 = 5% */
		height: 'variable',		align: 'center',
		onCreate: function(data){
		},
		items		: {
			width		: 280,			// 3 visible on 1024x768			visible		: {
				min			: 1,
				max			: 5,
				// variable	: true,
			}
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
			// easing			: "easeInOutCubic",			duration		: 300,							
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
			button		: "#features .carousel-control-btn.left",
			key			: "left",
			items		: 1,
			easing		: "linear",			duration	: 300,
			conditions	: function(){
				$('#features .carousel-hint').addClass('disabled').removeClass('fadeIn-slow');
				return !$(this).closest('.carousel').find('.carousel-pager div:first-child').hasClass('selected');
			},
		},
		next : {
			button		: "#features .carousel-control-btn.right",
			key			: "right",
			items		: 1,
			easing		: "linear",			duration	: 300,
			conditions	: function(){
				$('#features .carousel-hint').addClass('disabled').removeClass('fadeIn-slow');
				var activeDots = $(this).closest('.carousel').find('.carousel-pager div:not(.hide)');
				return !activeDots.last().hasClass('selected');
			}

		},
		pagination : {
			container	: "#features  .carousel-pager",
			keys		: true,
			easing		: "linear",			duration	: 300,
			anchorBuilder: function(nr) {
				// this == li.item
				var fred = $(this).closest('.carousel.fred');			    return markup = '<div href="#'+fred.attr('id')+'">'+nr+'</div>';
			},
		},
		swipe	: {
			onTouch: CFG['isTouch'],
			pauseOnHover	: 'immediate',
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
			width		: 500, 
			visible		: 1
		},
		auto : {
			timeoutDuration: 7000,
			pauseOnHover	: 'immediate',
			conditions: function(){ 
				return CFG['carousel'].autoPaging && CFG['util'].isScrolledIntoView($(this));			},
		},
		scroll : {
			items			: 1,
			easing			: "linear",
			duration		: 1000,							
			pauseOnHover	: 'immediate',
			onCreate 		: function(data) {	},
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
			button		: "#how-it-works .carousel-control-btn.left",
			key			: "left",
			items		: 1,
			easing		: "cubic",
			duration	: 1000,
			conditions	: function(){
				$('#how-it-works .carousel-hint').addClass('disabled').removeClass('fadeIn-slow');
				return true;
			},
		},
		next : {
			button		: "#how-it-works .carousel-control-btn.right",
			key			: "right",
			items		: 1,
			easing		: "cubic",
			duration	: 1000,
			conditions	: function(){
				$('#how-it-works .carousel-hint').addClass('disabled').removeClass('fadeIn-slow');
				return true;
			},
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
			pauseOnHover	: 'immediate',
		}
	}; 
	
	CFG['carousel'].init.init();
	
}


$(document).ready( CFG['util'].documentReady );

})();  
// end module closure
