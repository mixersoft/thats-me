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
				if (!CFG['mixpanel'].DISABLED && !YT_player.mixpanel['play']) {
					CFG['mixpanel'].track_Video('play');
					YT_player.mixpanel['play'] = 1;		// suppress tracking on repeated play for this page load
				}
				CFG['util'].notify("video play");
				break;
			case YT.PlayerState.ENDED:
				// end
				if (!CFG['mixpanel'].DISABLED && !YT_player.mixpanel['end']) {
					CFG['mixpanel'].track_Video('end');					YT_player.mixpanel['end'] = 1;
				}
				CFG['util'].notify("end of video");
				break;
		}
		// console.log("onStateChange has fired! New state:" + event.data);		}
})();  // end YouTube API closure


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
		var events = {
		 'features': {
		  	label: "iKqqCM3qlwUQg76I1wM",
		  	value: 0.5,
		  },
		  'how-it-works:END': {
		  	label: "Wv8OCNXilgUQg76I1wM",
		  	value: 1,
		  },
		  'video:END': {
		  	label: "svEDCM3jlgUQg76I1wM",
		  	value: 2,
		  },
		  'invite': {
		  	label: "kSD2CJ2hkAUQg76I1wM",
		  	value: 4,
		  },
		  'cheer': {
		  	label: "ntDkCJWikAUQg76I1wM",
		  	value: 8,
		  },
		  'thank-you': {
		  	label: "lf9jCP2kkAUQg76I1wM",
		  	value: 16,
		  }
		};

		var google_conversion_id = 987897603;
		var google_conversion_language = "en";
		var google_conversion_format = "3";
		var google_conversion_color = "ffffff";
		var google_conversion_label =  events['invite'].label;
		var google_conversion_value = events['invite'].value;
		
		if (events[name]) {
			google_conversion_label = events[name].label;
			google_conversion_value = events[name].value;
		}
		
		/*
		 * use javscript conversion tracking in iframe
		 */
		var conversion_src = '/thatsme/adwords_conversion/label:'+google_conversion_label+'/value:'+google_conversion_value;
		$('<iframe src="'+conversion_src+'" width="0px" height="0px"></iframe>').appendTo($('body'));  
		
		/*
		 * use javascript method for reporting conversion
		 * TODO: doesn't work
		 */
		// document.write = function(node) {
			// $('body').append(node);
		// };
		// $.getScript('https://www.googleadservices.com/pagead/conversion.js').done(function() {
			// console.log("google adwords conversion script loaded");
		// });
	}
	/*
	 * track section view as virtual page view in google analytics
	 */
	GoogleAdWordsHelper.trackPageview = function(opt_pageURL) {
		if (!opt_pageURL) return;
		try {
			_gaq.push(['_trackPageview', opt_pageURL]);
		} catch(e){
			console.error('Error: GoogleAdWordsHelper.trackPageview()');
		}
	}
	GoogleAdWordsHelper.trackEvent = function(category, action, opt_label, opt_value, opt_noninteraction){
		opt_label = opt_label || '';
		opt_noninteraction = opt_noninteraction || false;
		
		var value_lookup = {
			'Page View:features': 1,					// opt_value Int
			'Page View:how-it-works:CAROUSEL-END': 1,
			'Video:end': 2,	// video end
			'Click:invite': 4,
			'Click:cheer': 8,
			'Page View:thank-you': 16,
		}
		opt_value = opt_value || value_lookup[category + ':' + action] || 0;
		try {
			if (category == 'Page View' && /\:/.test(action)) {
				GoogleAdWordsHelper.trackPageview('/'+action);
				if (action=='features') GoogleAdWordsHelper.conversion('features');	// 0.5 point for Adwords conversion
			} 
			// also track Event for now
			_gaq.push(['_trackEvent', category, action, opt_label, opt_value, opt_noninteraction]);	
			
		} catch(e){ 
			console.error('Error: GoogleAdWordsHelper.trackEvent()');
		}
	}
	
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
	MixpanelHelper.VIDEO_NAME = 'Imagine-0';
	
	// for tracking initial page view
	MixpanelHelper.FIRST_SECTION = '#home';
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
	/**
	 *	external mixpanel track method for manually tracking virtual Page Views
	 *	@params o object, o.event_name, o.section, plus additional properties
	 * 	
	 * 	called by CFG['carousel'].track_CarouselEnd()
	 *  
	 */
	MixpanelHelper.track_PageView = function(o){	// global track method, called by track_CarouselEnd()
			// requires o.event_name, o.section
			var event_name = 'Page View';
			var section = o.section; delete o.section;
			var properties = $.extend({ section : section}, mixpanel_event_properties[event_name], o);
			if (!CFG['mixpanel'].DISABLED) {
				mixpanel.track(event_name, properties);
				try {
					CFG['ga'].trackEvent( event_name, properties['section'], MixpanelHelper.TRIGGER);
					switch(section) {
						case 'thank-you':
							CFG['ga'].conversion('thank-you');		// adWords conversion, 16 points
							break;
						default: break;	
					}					
				} catch(e){ }
			}
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
				case 'features':
					// MANUAL DEBUG adwords conversion
					CFG['ga'].conversion('features');		// adWords conversion, 16 points
					break;
				default: break;	
			}
	};
	MixpanelHelper.track_Click = function(o){
		// track Clicks
			var track = o.attr('track'),
				event_name = 'Click',
				properties = $.extend({ 'click-action' : track }, mixpanel_event_properties[event_name]);
			if (!MixpanelHelper.DISABLED) {
				mixpanel.track('Click', properties);
				try {
					CFG['ga'].trackEvent( 'Click', properties['click-action'], MixpanelHelper.TRIGGER);
					switch(properties['click-action']){
						case "invite":
						case "cheer":
							CFG['ga'].conversion('invite');	// 1 point
							break;
						case "donate-PayPal":
						case "donate-Amazon":
							CFG['ga'].conversion('cheer');	// 4 points
							break;
					}
				} catch(e){
				}
			}
			o.addClass('tracked');
			
			// additional click processing, including posting to DB
			switch(track) {
				case 'donate-PayPal':
				case 'donate-Amazon':
					// post data[Follower][cheer]=2 to DB
					var email=$('form.call-to-action input[type=email]'),
						address = email.attr('value');
					var form = o.closest('form');
					form.css('cursor','wait');	
					e.preventDefault();		// wait until XHR completes before submit
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
		mixpanel.track(event_name, properties);
		try {
			CFG['ga'].trackEvent( event_name, properties['state'], MixpanelHelper.TRIGGER);
		} catch(e){ }
	}

	MixpanelHelper.init = function(o){
		/* 
		 * 	start listeners
		 */
		$(window).scroll(function(e, onload) {
			// track sections as Page View
			if (onload=='onload') {		// triggered by init()
				var hash = window.location.hash || MixpanelHelper.FIRST_SECTION;
				$(hash).removeClass('track-requires-hash'); 
			}
			$('.track-page-view').not('.tracked,.track-requires-hash').each(function(i, elem) {
				/* If the object is completely visible in the window, fade it in */
				// isLingeringInView: function(o, timers, delay, success)
				CFG['util'].isLingeringInView($(elem), MixpanelHelper.timers, CFG['timing'].linger,
					function(o) {
						try {
							var section = o.attr('id');
							if (o.hasClass('track-requires-hash')) {
console.error("jquery not('.tracked,.track-requires-hash') not working");								
								// for #thank-you and #not-yet return from payment vendors
								if (window.location.hash !== '#'+section) return 0; // lingering timer
							}
							MixpanelHelper.track_PageView({
								section: section
							});
							o.addClass('tracked');
							CFG['util'].notify(section);
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
		
		$('.track-click:not(.tracked)').one('click', function(e){
			MixpanelHelper.track_Click($(e.currentTarget));
		})
	
		// track first section
		$(document).ready(
			function(){
				if (!MixpanelHelper.DISABLED) {
					// mixpanel.register() to register global/super properties
					mixpanel.register({
						trigger: MixpanelHelper.TRIGGER,		// can override in View 
					})
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