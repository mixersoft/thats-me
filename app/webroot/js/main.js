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

var player;
//Define a player object, to enable later function calls, without
// having to create a new class instance again.

// Add function to execute when the API is ready
YT_ready(function() {
	var frameID = getFrameID("yt-player");
	if (frameID) {//If the frame exists
		player = new YT.Player(frameID, {
			events : {
				"onStateChange" : YT_StateChange
			}
		});
	}
});

// Example: function stopCycle, bound to onStateChange
function YT_StateChange(event) {
	if (!player.mixpanel)
		player.mixpanel = {};
	switch (event.data) {
		case YT.PlayerState.PLAYING:
			// play
			if (!player.mixpanel['play']) {
				mixpanel.track('Video', {
					trigger : 'imagine',
					state : 'play'
				});
				player.mixpanel['play'] = 1;
			}
			break;
		case YT.PlayerState.ENDED:
			// end
			if (!player.mixpanel['end']) {
				mixpanel.track('Video', {
					trigger : 'imagine',
					state : 'end'
				});
				player.mixpanel['end'] = 1;
			}
	}
	console.log("onStateChange has fired! New state:" + event.data);

}

(function() {//Closure, to not leak to the scope

	/**
	 * mixpanel
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

	function lingersInView(elem) {
		var waypoint = $(elem).attr('id');

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
					console.log(waypoint);
					isLingeringTimer[waypoint] = 'tracked';
				} catch (e) {
					throw new Exception("ERROR: mixpanel not loaded?");
				}
			}
		}, 1000);
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
	var waypoint = 'help-me', event_name = 'Page View';
	mixpanel.track(event_name, $.extend({
		section : waypoint
	}, event_properties[event_name]));
	console.log(waypoint);

})();
