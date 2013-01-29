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
					var properties = $.extend({ state : 'play'}, mixpanel_event_properties[event_name]);
					mixpanel.track(event_name, properties);
					// mixpanel.track('Video', {
						// trigger : 'imagine',
						// state : 'play'
					// });					YT_player.mixpanel['play'] = 1;
				}
				CFG['util'].notify("video play");
				break;
			case YT.PlayerState.ENDED:
				// end
				if (!YT_player.mixpanel['end']) {
					var properties = $.extend({ state : 'end'}, mixpanel_event_properties[event_name]);
					mixpanel.track(event_name, properties);
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
		TRIGGER : 'i-need-this',
		FIRST_SECTION : '#home',
		VIDEO_NAME : 'imagine',
		DISABLED : true, 
		timers: {},
	}

	// local scope
	var isLingeringTimer = {};
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
						if (!CFG['mixpanel'].DISABLED) mixpanel.track(event_name, properties);
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
		var properties = {
			url : window.location.pathname,
			trigger : CFG['mixpanel'].TRIGGER,
			'click-action' : $(e.currentTarget).attr('track'),	
		}		
		if (!CFG['mixpanel'].DISABLED) mixpanel.track('click', properties);
	})

	// track first section
	$(document).ready(
		function(){
			mixpanel_event_properties['Page View'] = {
				url : window.location.pathname,
				trigger : CFG['mixpanel'].TRIGGER,
			};
			
			var hash = window.location.hash || CFG['mixpanel'].FIRST_SECTION,
				waypoint = hash.substr(1), 
				event_name = 'Page View',
				timers = CFG['mixpanel'].timers;
			if ($(hash).hasClass('track-page-view')){
				CFG['util'].isLingeringInView($(hash), timers, 0,
					function(){
						var properties = $.extend({ section : waypoint }, mixpanel_event_properties[event_name]);
						if (!CFG['mixpanel'].DISABLED) mixpanel.track(event_name, properties);
						CFG['util'].notify(waypoint);
						return "tracked";
				});
			}
		}
	)
	
	
})();
// end mixpanel helper closure