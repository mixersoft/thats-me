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
					var properties = $.extend({ state : 'play'}, mixpanel_event_properties[event_name]);
					mixpanel.track(event_name, properties);
					try {
						_gaq.push(['_trackEvent', event_name, properties['state'], properties['trigger']]);
					} catch(e){ }
					// mixpanel.track('Video', {
						// trigger : 'imagine',
						// state : 'play'
					// });					YT_player.mixpanel['play'] = 1;
				}
				CFG['util'].notify("video play");
				break;
			case YT.PlayerState.ENDED:
				// end
				if (!CFG['mixpanel'].DISABLED && !YT_player.mixpanel['end']) {
					var properties = $.extend({ state : 'end'}, mixpanel_event_properties[event_name]);
					mixpanel.track(event_name, properties);
					try {
						_gaq.push(['_trackEvent', event_name, properties['state'], properties['trigger']]);
					} catch(e){ }
					// mixpanel.track('Video', {
						// trigger : 'imagine',
						// state : 'end'
					// });					YT_player.mixpanel['end'] = 1;
				}
				CFG['util'].notify("end of video");
				break;
		}
		// console.log("onStateChange has fired! New state:" + event.data);		}
	$(document).ready(
		function(){
			mixpanel_event_properties['Video'] = {
				video_name : CFG['mixpanel'].VIDEO_NAME,
			};
			var check;
		}
	)

})();  // end YouTube API closure





(function() {//Closure, to not leak to the scope

	/**
	 * mixpanel helper functions for tracking events
	 */
	// CONFIG, override in View File
	CFG['mixpanel'] = {
		instance: null,
		
		// super properties: use mixpanel.register() (global)
		TRIGGER : 'i-need-this',			// trigger: should be from the adwords campaign, or landing page
		VIDEO_NAME : 'Imagine-0',
		
		// for tracking initial page view
		FIRST_SECTION : '#home',
		DISABLED : !/snaphappi.com/.test(window.location.host), 
		timers: {},
		identify: function(email, created) {
			if (!CFG['mixpanel'].DISABLED && email) {
				var person = {
					"$email": email,
					"last_click_action": new Date(),
				}
				mixpanel.identify(email);
// console.log("mixpanel.identify(), email="+email+", mixpanel.toString()="+mixpanel.toString());								if (created) { 
					// alias mixpanel id if follower was created
					mixpanel.alias(email);
					person["$created"] = created;
// console.log("mixpanel.alias(), email="+email);									}
				mixpanel.people.set(person);
			}
		},
		track: function(o){			// global track method, called by track_CarouselEnd()
			// requires o.event_name, o.section
			var event_name = o.event_name; delete o.event_name;
			var section = o.section; delete o.section;
			var properties = $.extend({ section : section}, mixpanel_event_properties[event_name], o);
			if (!CFG['mixpanel'].DISABLED) {
				mixpanel.track(event_name, properties);
				try {
					_gaq.push(['_trackEvent', event_name, properties['section'], properties['trigger']]);
				} catch(e){ }
			}
		}
	}

	// track setTimeout timers, init in document.ready()
	var mixpanel_event_properties = {} // page-level properties for mixpanel.track


	/* Every time the window is scrolled ... */
	$(window).scroll(function(e, elem) {

		/* Check the location of each desired element */
		$('.track-page-view:not(.tracked)').each(function(i, elem) {
			/* If the object is completely visible in the window, fade it in */
			// isLingeringInView: function(o, timers, delay, success)
			var timers = CFG['mixpanel'].timers;			CFG['util'].isLingeringInView($(elem), timers, CFG['timing'].linger,
				function(o) {
					try {
						var event_name = 'Page View',
							waypoint = o.attr('id');
						var properties = $.extend({ section : waypoint }, mixpanel_event_properties[event_name]);
						if (!CFG['mixpanel'].DISABLED) {
							mixpanel.track(event_name, properties);
							try {
								_gaq.push(['_trackEvent', 'Page View', properties['section'], properties['trigger']]);
							} catch(e){
console.log('gaq error category=Page View, action='+properties['section']);									
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
		var track = $(e.currentTarget).attr('track'),
			properties = {
			url : window.location.pathname,
			trigger : CFG['mixpanel'].TRIGGER,
			'click-action' : track,	
		}
		if (!CFG['mixpanel'].DISABLED) {
			mixpanel.track('Click', properties);
			try {
				_gaq.push(['_trackEvent', 'Click', properties['click-action'], properties['trigger']]);
			} catch(e){
console.log('gaq error category=Click, action='+properties['click-action']);				
			}
		}
		$(e.currentTarget).removeClass('.track-click');
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
			// mixpanel.register() to register global/super properties
			
			mixpanel_event_properties['Page View'] = {
				url : window.location.pathname,
				trigger : CFG['mixpanel'].TRIGGER,
			};
			// CFG['mixpanel'].instance = mixpanel;		// not ready yet
			var hash = window.location.hash || CFG['mixpanel'].FIRST_SECTION,
				waypoint = hash.substr(1), 
				event_name = 'Page View',
				timers = CFG['mixpanel'].timers;
			if ($(hash).hasClass('track-page-view') && CFG['util'].isScrolledIntoView($(hash))){
				var properties = $.extend({ section : waypoint }, mixpanel_event_properties[event_name]);
				if (hash='#thank-you') {
					// post successful cheer, email should come from cookie
					CFG['util'].postEmail(null,{'data[Follower][cheer]':'4'},function(json, status, o){
						// on success
						if (json.success) {
							
						} else {
							console.log('there was a problem posting successful cheer by #thank-you');
						}
					});
				}
				if (!CFG['mixpanel'].DISABLED) {
					mixpanel.track(event_name, properties);
					switch(hash) {
						case '#thank-you':
						case '#not-yet':
							try {		// google analytic track these PageViews automatically onload
								_gaq.push(['_trackEvent', 'Page View', properties['section'], properties['trigger']]);
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
	
	
})();
// end mixpanel helper closure