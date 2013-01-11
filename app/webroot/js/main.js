function notify(msg, type) {
	try {
		$('.alert-wrapper').removeClass('hide');
		$('.alert-wrapper .alert').html(msg);
		// console.log(msg);
		$('.alert-wrapper .fade-wrap').fadeIn(500).delay(1000).fadeOut("slow");
	} catch (e) {
	}
}
(function() {//Closure, to not leak to the scope

	/**
	 * Youtube API helper functions for tracking events
	 */
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
// This function will be called when the API is fully loaded
function onYouTubePlayerAPIReady() {
	YT_ready(true)
}

var YT_player;
//Define a YT_player object, to enable later function calls, without
// having to create a new class instance again.

// Add function to execute when the API is ready
YT_ready(function() {
	var frameID = getFrameID("yt-YT_player");
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
	if (!YT_player.mixpanel)
		YT_player.mixpanel = {};
	switch (event.data) {
		case YT.PlayerState.PLAYING:
			// play
			if (!YT_player.mixpanel['play']) {
				mixpanel.track('Video', {
					trigger : 'imagine',
					state : 'play'
				});
				YT_player.mixpanel['play'] = 1;
			}
			notify("video play");
			break;
		case YT.PlayerState.ENDED:
			// end
			if (!YT_player.mixpanel['end']) {
				mixpanel.track('Video', {
					trigger : 'imagine',
					state : 'end'
				});
				YT_player.mixpanel['end'] = 1;
			}
			notify("end of video");
			break;
	}
	// console.log("onStateChange has fired! New state:" + event.data);}


})();  
// end YouTube API closure

(function() {//Closure, to not leak to the scope

	/**
	 * mixpanel helper functions for tracking events
	 */
	

	// local scope
	var isLingeringTimer = {};
	// track setTimeout timers
	var event_properties = {}// page-level properties for mixpanel.track
	event_properties['Page View'] = {
		url : window.location.pathname,
		trigger : 'overwhelmed'
	};

	/*
	 * http://stackoverflow.com/questions/9097501/show-div-when-scroll-position
	 * see also: http://imakewebthings.com/jquery-waypoints/
	 */

	function isScrolledIntoView(elem) {
		var docViewTop = $(window).scrollTop();
		var docViewBottom = docViewTop + $(window).height();

		var elemTop = $(elem).offset().top;
		var elemBottom = elemTop + $(elem).height();

		var completelyInView = ((elemBottom >= docViewTop) && (elemTop <= docViewBottom) && (elemBottom <= docViewBottom) && (elemTop >= docViewTop) );
		var nearTop = ((elemBottom >= docViewTop) && (elemTop >= docViewTop) && (elemTop <= docViewTop + $(window).height() / 3) // top 1/3 of window
		)
		return completelyInView || nearTop;
	}
	
	/*
	 * waits DELAY ms before checking ScrolledIntoView, 
	 * once timer is set, ignores calls on successive scroll() until timer expires 
	 */
	function lingersInView(elem) {
		var DELAY = 1000,
			waypoint = $(elem).attr('id');

		if (isLingeringTimer[waypoint])
			return;
		isLingeringTimer[waypoint] = setTimeout(function() {
			isLingeringTimer[waypoint] = 0;
			if (isScrolledIntoView(elem)) {
				try {
					var event_name = 'Page View';
					mixpanel.track(event_name, $.extend({
						section : waypoint
					}, event_properties[event_name]));
					$(elem).removeClass('track-page-view');
					notify(waypoint);
					isLingeringTimer[waypoint] = 'tracked';
				} catch (e) {
					throw new Exception("ERROR: mixpanel not loaded?");
				}
			}
		}, DELAY);
	}

	/* Every time the window is scrolled ... */
	$(window).scroll(function(e) {

		/* Check the location of each desired element */
		$('.track-page-view').each(function(i) {
			/* If the object is completely visible in the window, fade it in */
			lingersInView(this);
		});

	});

	// track first section
	$(document).ready(
		function(){
			var hash = window.location.hash || '#help-me'
				waypoint = hash.substr(1), 
				event_name = 'Page View';
			if ($(hash).hasClass('track-page-view') && lingersInView($(hash).get())) {
				mixpanel.track(event_name, $.extend({
					section : waypoint
				}, event_properties[event_name]));
				notify(waypoint);
			}
		}
	)
	
	
})();
// end mixpanel helper closure