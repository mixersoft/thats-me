/*
 * GLOBAL SCOPE
 */

var onYouTubePlayerAPIReady; 	// MAKE GLOBAL FOR YOUTUBE

	

(function() {//Closure, to not leak to the scope	/**
	 * Youtube API helper functions for tracking events
	 */
	var mixpanel_event_properties = {} // page-level properties for mixpanel.track
	/**
	 * http://stackoverflow.com/questions/7988476/listening-for-youtube-event-in-javascript-or-jquery
	 */
	function getFrameID(id) {
		var elem = document.getElementById(id);
		if (elem) {
			if (/^iframe$/i.test(elem.tagName))
				return id;
			//Frame, OK
			// else: Look for frame
			var elems = elem.getElementsByTagName("iframe");
			if (!elems.length)
				return null;
			//No iframe found, FAILURE
			for (var i = 0; i < elems.length; i++) {
				if (/^https?:\/\/(?:www\.)?youtube(?:-nocookie)?\.com(\/|$)/i.test(elems[i].src))
					break;
			}
			elem = elems[i];
			//The only, or the best iFrame
			if (elem.id)
				return elem.id;
			//Existing ID, return it
			// else: Create a new ID
			do {//Keep postfixing `-frame` until the ID is unique
				id += "-frame";
			} while (document.getElementById(id));
			elem.id = id;
			return id;
		}
		// If no element, return null.
		return null;
	}
	
	// Define YT_ready function.
	var YT_ready = (function() {
		var onReady_funcs = [], api_isReady = false;
		/* @param func function     Function to execute on ready
		 * @param func Boolean      If true, all qeued functions are executed
		 * @param b_before Boolean  If true, the func will added to the first
		 position in the queue*/
		return function(func, b_before) {
			if (func === true) {
				api_isReady = true;
				for (var i = 0; i < onReady_funcs.length; i++) {
					// Removes the first func from the array, and execute func
					onReady_funcs.shift()();
				}
			} else if ( typeof func == "function") {
				if (api_isReady)
					func();
				else
					onReady_funcs[b_before?"unshift":"push"](func);
			}
		}
	})();
	
	// This function will be called when the API is fully loaded (GLOBAL)
	onYouTubePlayerAPIReady = function() {
		YT_ready(true);
	}
	
	var YT_player;
	//Define a YT_player object, to enable later function calls, without
	// having to create a new class instance again.
	
	// Add function to execute when the API is ready
	YT_ready(function() {
		var frameID = getFrameID("yt-player");
		if (frameID) {//If the frame exists
			YT_player = new YT.Player(frameID, {
				events : {
					"onStateChange" : YT_StateChange
				}
			});
		}
	});
	
	// Example: function stopCycle, bound to onStateChange
	function YT_StateChange(event) {
		var event_name = 'Video';
		if (!YT_player.mixpanel)
			YT_player.mixpanel = {};
		switch (event.data) {
			case YT.PlayerState.PLAYING:
				// play
				if (!YT_player.mixpanel['play']) {
					CFG['mixpanel'].track_Video('play');
					YT_player.mixpanel['play'] = 1;		// suppress tracking on repeated play for this page load
				}
				CFG['util'].notify("video play");
				break;
			case YT.PlayerState.ENDED:
				// end
				if (!YT_player.mixpanel['end']) {
					CFG['mixpanel'].track_Video('end');					YT_player.mixpanel['end'] = 1;
				}
				CFG['util'].notify("end of video");
				break;
		}
		// console.log("onStateChange has fired! New state:" + event.data);		}
})();  // end YouTube API closure



/*
 * load cookie 'cracker'
 */
if (typeof ($.cookie) != 'undefined') {
	$.cookie.json = true;
	$.cookie.defaults = {expires : 30, path : '/'};
	CFG['cracker']= $.cookie("cracker") || {'Page View':[], 'Click':[], 'Video':[], 'gaq':[]};
}



(function() {//Closure, to not leak to the scope
	var GoogleAdWordsHelper = function() {
		// empty class def for outline view
	};
	/**
	 * trigger AdWords conversion
	 * @param label String, maps to AdWords conversion label
	 * @param value int, conversion value
	 */
	GoogleAdWordsHelper.conversion = function(name) {
		if (CFG['cracker']['gaq'].indexOf(name) > -1) return;
		var events = {
		 'features': {
		  	label: "xqCgCIztrAUQyvCg8AM",
		  	value: 0.1,
		  },
		  "how-it-works:CAROUSEL-END": {
		  	label: "7OZkCPzurAUQyvCg8AM",
		  	value: 0.2,
		  },
		  'video:end': {
		  	label: "YwP1CPTvrAUQyvCg8AM",
		  	value: 0.2,
		  },
		  'invite': {
		  	label: "-6PXCOzwrAUQyvCg8AM",
		  	value: 0.5,
		  },
		  'cheer': {
		  	label: "8NgbCOTxrAUQyvCg8AM",
		  	value: 2,
		  },
		  'fb-like': {							// TODO: create new Adword conversion, for now override cheer with fb-like
		  	label: "8NgbCOTxrAUQyvCg8AM",
		  	value: 2,
		  },
		  'thank-you': {
		  	label: "0dXsCNzyrAUQyvCg8AM",
		  	value: 7,
		  }
		};

		var google_conversion_id = 1040726090;
		var google_conversion_language = "en";
		var google_conversion_format = "3";
		var google_conversion_color = "ffffff";
		var google_conversion_label =  "";
		var google_conversion_value = 0;
		
		if (events[name]) {
			google_conversion_label = events[name].label;
			google_conversion_value = events[name].value;
		}
		
		/*
		 * use javscript conversion tracking in iframe
		 */
		// remove all prior conversion iframes 
		$('iframe.ga-conversion').remove();	
		if (1) {	// use querystring params to trigger iframe conversion
			var conversion_src = window.location.pathname+'?conversion&label='+google_conversion_label+'&value='+google_conversion_value;
		} else {	// use action+named params to trigger iframe conversion
			var conversion_src = '/thatsme/conversion/label:'+google_conversion_label+'/value:'+google_conversion_value;
		}
		$('<iframe id="iframe-'+name+'" class="ga-conversion" src="'+conversion_src+'" width="0px" height="0px"></iframe>').appendTo($('body'));  
		CFG['cracker']['gaq'].push(name);	// mark as tracked in cookie		
	}
	/*
	 * track section view as virtual page view in google analytics
	 */
	GoogleAdWordsHelper.trackPageview = function(opt_pageURL) {
		var here = window.location.pathname;
		if (here == '/i-need-this') here = '/home';		// adjust for routing
		if (!opt_pageURL || (opt_pageURL == here) ) {
			// don't track first section, same as CFG['mixpanel'].FIRST_SECTION
			return;	
		} else {
			try {
				_gaq.push(['_trackPageview', opt_pageURL]);
			} catch(ex){
				console.error('Error: GoogleAdWordsHelper.trackPageview()');
			}
		}
	}
	/**
	 * called by Mixpanel.track_PageView, track_Click, track_Video 
	 */
	GoogleAdWordsHelper.trackEvent = function(category, action, opt_label, opt_value, opt_noninteraction){
		opt_label = opt_label || '';
		opt_noninteraction = opt_noninteraction || false;
		var value_lookup = {
			'Page View:features': 1,					// opt_value Int
			'Page View:how-it-works:CAROUSEL-END': 1,
			'Page View:call-to-action': 1,
			'Video:play': 1,	// video end
			'Video:end': 2,	// video end
			// 'Click:invite': 2,			'Click:fb-like-home': 4,		// like home page
			'Click:fb-like-fb-page': 6,		// like snaphappi fb page
			// 'Click:cheer': 5,			'Click:fb-comment': 10,
			// 'Page View:thank-you': 10,
		}
		opt_value = opt_value || value_lookup[category + ':' + action] || 0;
		
		try {
			// for tracking only virtual PageViews, use: if (category == 'Page View' && /\:/.test(action)) {
			// track all PageViews, including virtual PageViews, i.e. :CAROUSEL-END
			if (category == 'Page View') GoogleAdWordsHelper.trackPageview('/'+action);
			// console.warn('ga TrackPageView '+category+':'+action);							
			// also track Event for any event with value
			if (opt_value) {
				_gaq.push(['_trackEvent', category, action, opt_label, opt_value, opt_noninteraction]);	
			}

			// track Adwords conversions
			switch (category + ':' + action) {
				case 'Page View:thank-you':
				case 'Page View:features':
				case 'Page View:how-it-works:CAROUSEL-END':
					GoogleAdWordsHelper.conversion(action);	
					break;
				case 'Click:fb-like-home':
				case 'Click:fb-like-fb-page':
					GoogleAdWordsHelper.conversion('fb-like');	// 2 point					
					break;
				case 'Click:invite':
				case 'Click:cheer':
					GoogleAdWordsHelper.conversion('invite');	// 1 point
					break;
				case 'Click:donate-PayPal':
				case 'Click:donate-Amazon':
					GoogleAdWordsHelper.conversion('cheer');	// 4 points
				case 'Video:start':	
				case 'Video:end':
					// simulate PageView for ga experiments
					GoogleAdWordsHelper.trackPageview('/see-the-movie/'+category + ':' + action);
				break;
			}
		} catch(ex){ 
			console.error('Error: GoogleAdWordsHelper.trackEvent()');
		}
		try {
			GoogleAdWordsHelper.trackConversion_facebook(category + ':' + action);
		} catch(ex) {
			console.error('Error: GoogleAdWordsHelper.trackConversion_facebook()');
		}
	}
	
	/*
	 * facebook conversion tracking for different events
	 * @param event = category + ':' + action, i.e. 'Video:start'
	 */
	GoogleAdWordsHelper.trackConversion_facebook = function(event){
		var fb_param = {};
		fb_param.pixel_id = '6007696914783';	// i-need-this PageView
		fb_param.value = '0.00';
		switch(event) {
			case 'Video:start':
			// case 'Video:end':
				fb_param.pixel_id = '6007697127183';	// Video:play
				fb_param.value = '0.20';				// same as adwords conversion				break;
			case 'Page View:how-it-works:CAROUSEL-END':				
				fb_param.pixel_id = '6007697244983';
				fb_param.value = '0.10';
				break;
			default:
				return;		//default is no action
		}
		var a = 'https://www.facebook.com/offsite_event.php',
			b = a+'?id='+fb_param.pixel_id;
		b+='&value='+encodeURIComponent(fb_param.value);
		var c = new Image();
		c.src = b;
	};
	
	// make global
	CFG['ga'] = GoogleAdWordsHelper; 

})();
// end google analytics helper closure




(function() {//Closure, to not leak to the scope

	/**
	 * mixpanel helper functions for tracking events
	 */
	var MixpanelHelper = function() {
		// empty class def for outline view
	};
	// // make global
	CFG['mixpanel'] = MixpanelHelper;

	
	// private properties
	// track setTimeout timers, init in document.ready()
	var mixpanel_event_properties = {} // page-level properties for mixpanel.track, initialized in init
	
	// static properties
	MixpanelHelper.instance = null;	// mixpanel instance
		
	// super properties: use mixpanel.register() (global)
	// CONFIG, override in View File
	MixpanelHelper.TRIGGER = 'i-need-this';			// trigger: should be from the adwords campaign, or landing page
	MixpanelHelper.VIDEO_NAME = 'CuratedFamilyPhotos';
	
	// for tracking initial page view
	MixpanelHelper.FIRST_SECTION = '#' + ($('.featurette').first().attr('id') || 'home');
	MixpanelHelper.DISABLED = !/snaphappi.com/.test(window.location.host); 
	MixpanelHelper.timers = {};		// for lingerIntoView timings
	
	MixpanelHelper.identify = function(email, created) {
			if (!CFG['mixpanel'].DISABLED && email) {
				var person = {
					"$email": email,
					"last_click_action": new Date(),
				}
				mixpanel.identify(email);
// console.log("mixpanel.identify(), email="+email+", mixpanel.toString()="+mixpanel.toString());				
				if (created) { 
					// alias mixpanel id if follower was created
					mixpanel.alias(email);
					person["$created"] = created;
// console.log("mixpanel.alias(), email="+email);					
				}
				mixpanel.people.set(person);
			}
	};
	
	MixpanelHelper.listenFB = function(e){
		FB.Event.subscribe('auth.authResponseChange', function(response) {
		  console.info('The status of the session is: ' + response.status);
		});
		FB.Event.subscribe('edge.create',
		    function(response) {
		        // console.info('You liked the URL: ' + response);
		        var event = 'fb-like';
		        if (/\/pages\/snaphappi/i.test(response)) event += '-fb-page'; 
		        else if (/\/(home|i-need-this)/i.test(response)) event += '-home';		        MixpanelHelper.track_Click({'click-event':event, 'fb-target': response.substr(29)});
		    }
		);
		FB.Event.subscribe('edge.remove',
		    function(response) {
		        // console.info('You unliked the URL: ' + response);				var event = 'fb-unlike';
		        if (/\/pages\/snaphappi/i.test(response)) event += '-fb-page'; 
		        else if (/\/(home|i-need-this)/i.test(response)) event += '-home';
		        MixpanelHelper.track_Click({'click-event':event, 'fb-target': response.substr(29)});
		    }
		);
		FB.Event.subscribe('comment.create',
		    function(response) {
		        console.info('You commented on URL: ' + response);
		        MixpanelHelper.track_Click({'click-event':'fb-comment', 'fb-target': response.href.substr(29)});
		    }
		);
		FB.Event.subscribe('comment.remove',
		    function(response) {
		        // console.info('You removed comment on URL: ' + response);
		        MixpanelHelper.track_Click({'click-event':'fb-uncomment', 'fb-target': response.href.substr(29)});
		    }
		);
		FB.Event.subscribe('message.send',
		    function(response) {
		        console.info('You sent the URL: ' + response);
		        MixpanelHelper.track_Click({'click-event':'fb-send', 'fb-target': response.substr(29)});
		    }
		);
	}
	/**
	 *	external mixpanel track method for manually tracking virtual Page Views
	 *	@params o object, o.event_name, o.section, plus additional properties
	 * 	
	 * 	called by CFG['carousel'].track_CarouselEnd()
	 *  
	 */
	MixpanelHelper.track_PageView = function(o, cfg){	// global track method, called by track_CarouselEnd()
			// requires o.event_name, o.section
			var event_name = 'Page View';
			var section = o.attr('id');
			var properties = $.extend({ section : section}, mixpanel_event_properties[event_name], cfg);
			
			if (!CFG['mixpanel'].DISABLED && (CFG['cracker'][event_name].indexOf(properties['section']) == -1)) {
				mixpanel.track(event_name, properties);
				try {
					CFG['ga'].trackEvent( event_name, properties['section'], MixpanelHelper.TRIGGER);
				} catch(ex){ }
			}
			if ( CFG['cracker'][event_name].indexOf(properties['section']) == -1 ) {
				CFG['cracker'][event_name].push(properties['section']);
				$.cookie('cracker', CFG['cracker']);
			}
			o.addClass('tracked');
			/*
			 * these actions also apply to isLocal = true
			 */
			switch(section) {
				case 'thank-you':
					// post successful cheer, email should come from cookie
					CFG['util'].postEmail(null,{'data[Follower][cheer]':'4'},function(json, status, o){
						// on success
						if (json.success) {
							
						} else {
							console.log('there was a problem posting successful cheer by #thank-you');
						}
					});
					break;
				default:	
					/* 
					 * MANUAL DEBUG adwords conversion, use $isLocal override
					 */ 
					var _gaq_DEBUG = typeof(_gaq) != 'undefined';
					if (CFG['mixpanel'].DISABLED && _gaq_DEBUG) CFG['ga'].trackEvent( event_name, properties['section'], "DEBUG");
					break;	
			}
	};
	/**
	 * @param o o.is(.track-click) or o={click-event:[click-event]}
	 * @param e jquery Event object, required to call e.preventDefault() defer form.submit until 
	 * 		after postEmail is complete  
	 */
	MixpanelHelper.track_Click = function(o, e){
		// track Clicks
			var track,
				event_name = 'Click',
				properties = mixpanel_event_properties[event_name];
				
			try {
				track = o.attr('track');
			} catch (ex) {
				track = o['click-event'];
				delete o['click-event'];
				properties = $.extend(properties, o);
			}
			properties['click-action'] = track;
			
			if (!MixpanelHelper.DISABLED && (CFG['cracker'][event_name].indexOf(properties['click-action']) == -1) ){
				mixpanel.track('Click', properties);
				try {
					CFG['ga'].trackEvent( 'Click', properties['click-action'], MixpanelHelper.TRIGGER);
				} catch(ex){
				}
			}
			if ( CFG['cracker'][event_name].indexOf(properties['click-action']) == -1 ) {
				CFG['cracker'][event_name].push(properties['click-action']);
				$.cookie('cracker', CFG['cracker']);
			}
			if (o.addClass) o.addClass('tracked');
			
			// additional click processing, including posting to DB
			switch(track) {
				case 'donate-PayPal':
				case 'donate-Amazon':
					// post data[Follower][cheer]=2 to DB
					var email=$('form.call-to-action input[type=email]'),
						address = email.attr('value');
					var form = o.closest('form');
					form.css('cursor','wait');	
					e.preventDefault();		// wait until XHR completes before submit/leaving page
					CFG['util'].postEmail(address,{'data[Follower][cheer]':'2'},function(json, status, o){
						// on success
						if (json.success) {
							// wait extra 1 sec for mixpanel
							setTimeout(function(){
								form.trigger('submit');
							}
							, 1000);
						} else {
							console.log('There was a problem posting data[Follower][cheer]=2');
						}
					});
				break;
			}		
	}
	MixpanelHelper.track_Video = function(state){		
		state = state || 'play';
		var event_name = 'Video' 
		var properties = $.extend({ 'state' : state}, mixpanel_event_properties[event_name]);
		if (!CFG['mixpanel'].DISABLED && (CFG['cracker'][event_name].indexOf(properties['state']) == -1)) {
			mixpanel.track(event_name, properties);
			try {
				CFG['ga'].trackEvent( event_name, properties['state'], MixpanelHelper.TRIGGER);
			} catch(ex){ }
		}
		if ( CFG['cracker'][event_name].indexOf(properties['state']) == -1 ) {
			CFG['cracker'][event_name].push(properties['state']);
			$.cookie('cracker', CFG['cracker']);
		}
		if (state=='end') {
			CFG['util'].setButtonIcons();
		}
	}

	MixpanelHelper.init = function(o){
		/* 
		 * 	start listeners
		 */
		$(window).scroll(function(e, onload) {
			// track sections as Page View
			if (onload=='onload') {		// from $(window).trigger('scroll',['onload']);
				var hash = window.location.hash || MixpanelHelper.FIRST_SECTION;
				$(hash).removeClass('track-requires-hash'); 
			}
			$('.track-page-view').not('.tracked,.track-requires-hash').each(function(i, elem) {
				/* If the object is completely visible in the window, fade it in */
				// isLingeringInView: function(o, timers, delay, success)
				CFG['util'].isLingeringInView($(elem), MixpanelHelper.timers, CFG['timing'].linger,
					function(o) {
						try {
							MixpanelHelper.track_PageView(o);
							CFG['util'].notify(o.attr('id'));
							return "tracked";
						} catch (e) {
							throw new Exception("ERROR: mixpanel not loaded?");
						}
						return 'error';			// lingering timer
					}
				);
				return true;
			});
		});
		
		$('body').delegate('.track-click', 'click.mixpanel', function(e){
			if ($(e.currentTarget).not('.tracked').not('.track-disabled')) 
				MixpanelHelper.track_Click($(e.currentTarget), e);
		})
		$(window).one('fb-init', function(e){
			MixpanelHelper.listenFB(e);
		});
		// track first section
		$(document).ready(
			function(){
				if (!MixpanelHelper.DISABLED) {
					// mixpanel.register() to register global/super properties
					var super_properties = {
						trigger: MixpanelHelper.TRIGGER,  // same as mtm_content???
					};
					var qs = CFG['util'].parseQueryString();
					// translate mtm -> utm and save as super_properties 
					if (qs.mtm_source) super_properties['utm_source']=qs.mtm_source;
					if (qs.mtm_medium) super_properties['utm_medium']=qs.mtm_medium;
					if (qs.mtm_campaign) super_properties['utm_campaign']=qs.mtm_campaign;
					if (qs.mtm_content) super_properties['utm_content']=qs.mtm_content;
					if (qs.mtm_term) super_properties['utm_term']=qs.mtm_term;
					if (qs['var']) super_properties['variation']=qs['var'];
					mixpanel.register(super_properties);
				}
				
				// set default event properites
				mixpanel_event_properties['Page View'] = {
					url : window.location.pathname,
				};
				mixpanel_event_properties['Video'] = {
					video_name : MixpanelHelper.VIDEO_NAME,
				};
				mixpanel_event_properties['Click'] = {
					url : window.location.pathname,
				}
				/**
				 * .track-page-view on first load by triggering scroll  
				 */	
				$(window).trigger('scroll',['onload']);
			}
		)
	}	
	MixpanelHelper.init();
})();
// end mixpanel helper closure