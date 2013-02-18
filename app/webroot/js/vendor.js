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
		var conversion = {
		  'invite': {
		  	label: "kSD2CJ2hkAUQg76I1wM",
		  	value: 1,
		  },
		  'cheer': {
		  	label: "ntDkCJWikAUQg76I1wM",
		  	value: 4,
		  },
		  'thank-you': {
		  	label: "lf9jCP2kkAUQg76I1wM",
		  	value: 10,
		  }
		};

		var google_conversion_id = 987897603;
		var google_conversion_language = "en";
		var google_conversion_format = "3";
		var google_conversion_color = "ffffff";
		var google_conversion_label =  conversion['invite'].label;
		var google_conversion_value = conversion['invite'].value;
		
		if (conversion[name]) {
			google_conversion_label = conversion[name].label;
			google_conversion_value = conversion[name].value;
		}
		
		document.write = function(node) {
			$('body').append(node);
		};
		$.getScript('https://www.googleadservices.com/pagead/conversion.js').done(function() {
			// console.log("google adwords conversion script loaded");		});
	}
	GoogleAdWordsHelper.trackEvent = function(category, action, opt_label, opt_value, opt_noninteraction){
		try {
			_gaq.push(['_trackEvent', category, action, opt_label, opt_value, opt_noninteraction]);
		} catch(e){ }
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
	 *	mixpanel track for Page Views 
	 *	@params o object, o.event_name, o.section, plus additional properties 
	 */
	MixpanelHelper.track_PageView = function(o){	// global track method, called by track_CarouselEnd()
			// requires o.event_name, o.section
			var event_name = 'Page View';
			var section = o.section; delete o.section;
			var properties = $.extend({ section : section}, mixpanel_event_properties[event_name], o);
			if (!CFG['mixpanel'].DISABLED) {
				mixpanel.track(event_name, properties);
				try {
					_gaq.push(['_trackEvent', event_name, properties['section'], MixpanelHelper.TRIGGER]);
				} catch(e){ }
			}
	};
	MixpanelHelper.track_Video= function(state){		
		state = state || 'play';
		var event_name = 'Video' 
		var properties = $.extend({ 'state' : state}, mixpanel_event_properties[event_name]);
		mixpanel.track(event_name, properties);
		try {
			_gaq.push(['_trackEvent', event_name, properties['state'], MixpanelHelper.TRIGGER]);
		} catch(e){ }
	}

	MixpanelHelper.init = function(o){
		/* 
		 * 	start listeners
		 */
		$(window).scroll(function(e, elem) {
			// track sections as Page View
			$('.track-page-view:not(.tracked)').each(function(i, elem) {
				/* If the object is completely visible in the window, fade it in */
				// isLingeringInView: function(o, timers, delay, success)
				var timers = MixpanelHelper.timers;				CFG['util'].isLingeringInView($(elem), timers, CFG['timing'].linger,
					function(o) {
						try {
							var event_name = 'Page View',
								waypoint = o.attr('id');
							var properties = $.extend({ section : waypoint }, mixpanel_event_properties[event_name]);
							if (!MixpanelHelper.DISABLED) {
								mixpanel.track(event_name, properties);
								try {
									_gaq.push(['_trackEvent', 'Page View', properties['section'], MixpanelHelper.TRIGGER]);
								} catch(e){
								}
							}
							o.addClass('tracked');
							CFG['util'].notify(waypoint);
							return "tracked";
						} catch (e) {
							throw new Exception("ERROR: mixpanel not loaded?");
						}
						return "error";
					}
				);
			});
	
		});
		
		
		$('.track-click').one('click', function(e, elem){
			// track Clicks
			var track = $(e.currentTarget).attr('track'),
				event_name = 'Click',
				properties = $.extend({ 'click-action' : track }, mixpanel_event_properties[event_name]);
			if (!MixpanelHelper.DISABLED) {
				mixpanel.track('Click', properties);
				try {
					_gaq.push(['_trackEvent', 'Click', properties['click-action'], MixpanelHelper.TRIGGER]);
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
			$(e.currentTarget).removeClass('.track-click');
			
			// additional click processing, including posting to DB
			switch(track) {
				case 'donate-PayPal':
				case 'donate-Amazon':
					// post data[Follower][cheer]=2 to DB
					var email=$('form.call-to-action input[type=email]'),
						address = email.attr('value');
					var form = $(e.currentTarget).closest('form');
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
				// MixpanelHelper.instance = mixpanel;		// not ready yet				
				// track page load first section as Page View
				var hash = window.location.hash || MixpanelHelper.FIRST_SECTION,
					waypoint = hash.substr(1), 
					event_name = 'Page View',
					timers = MixpanelHelper.timers;
				if ($(hash).hasClass('track-page-view') && CFG['util'].isScrolledIntoView($(hash))){
					var properties = $.extend({ section : waypoint }, mixpanel_event_properties[event_name]);
					if (hash=='#thank-you') {
						// post successful cheer, email should come from cookie
						CFG['util'].postEmail(null,{'data[Follower][cheer]':'4'},function(json, status, o){
							// on success
							if (json.success) {
								
							} else {
								console.log('there was a problem posting successful cheer by #thank-you');
							}
						});
					}
					if (!MixpanelHelper.DISABLED) {
						mixpanel.track(event_name, properties);
						switch(hash) {
							case '#thank-you':
								CFG['ga'].conversion('thank-you');		// adWords conversion, 10 points
							case '#not-yet':
								try {		// google analytic track these PageViews automatically onload
									_gaq.push(['_trackEvent', 'Page View', properties['section'], MixpanelHelper.TRIGGER]);
								} catch(e){
								}
							break;
						}
						// do NOT track initial page load as event in google analytic, _gaq
					}
					CFG['util'].notify(waypoint);
				}
			}
		)
	}	
	MixpanelHelper.init();
})();
// end mixpanel helper closure