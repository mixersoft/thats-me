(function() {//Closure, to not leak to the scope

var Util = new function(){}
Util.getImgSrcBySize = function(src, size){
    size = size || 'tn';
    var parts = Util.parseSrcString(src);
    if (size && !parts.dirname.match(/.thumbs\/$/)) 
        parts.dirname += '.thumbs/';
    return parts.dirname + (size ? size + '~' : '') + parts.filename + (parts.crop ? '~' + parts.crop : '');
};
Util.parseSrcString = function(src){
    var i = src.lastIndexOf('/');
    var name = {
        dirname: '',
        size: '',
        filename: '',
        crop: ''
    };
    name.dirname = src.substring(0, i + 1);
    var parts = src.substring(i + 1).split('~');
        switch (parts.length) {
            case 3:
                name.size = parts[0];
                name.filename = parts[1];
                name.crop = parts[2];
                break;
            case 2:
                if (parts[0].length == 2) {
                    name.size = parts[0];
                    name.filename = parts[1];
                }
                else {
                    name.filename = parts[0];
                    name.crop = parts[1];
                }
                break;
            case 1:
                name.filename = parts[0];
                break;
            default:
                name.filename = src.substring(i + 1);
                break;
        }
        return name;
};
Util.getCC = function(src, success){
	$.ajax({
		url: src,
		data: {'debug':0},
		dataType: 'json',
		success: function(json, status, o){
			try {
				PAGE.jsonData = json.response;
				delete(PAGE.jsonData.lookups);
				delete(PAGE.jsonData.filter);
				delete(PAGE.jsonData.profile);
				Util.parseCC(PAGE.jsonData.castingCall);
			} catch (ex) {		}
			success.call(this, json, status, o);
		},
	}).fail(function(json, status, o){
		console.error("getCC failed");
	});
}
Util.Auditions = 'empty';
Util.parseCC = function(cc, force){
	cc = cc || PAGE.jsonData.CastingCall;
	if (CFG['util'].Auditions !== 'empty' && !force) return Util.Auditions;
	var i, oSrc, score, id, 
		parsedAuditions = {},
		auditions = cc.CastingCall.Auditions.Audition;
		
if (PAGE.jsonData.castingCall.CastingCall.Auditions.ShotType=='event_group'){
	auditions = PAGE.jsonData.shot_CastingCall.CastingCall.Auditions.Audition;
	// TODO: parse using SNAPPI.Auditions???
		
}	

	for (i in auditions) {
		id = auditions[i].Photo.id;
		parsedAuditions[id] = $.extend({
			id: id,
			score: parseInt(auditions[i].Photo.Fix.Score)
		}, auditions[i].Photo.Img.Src);
	}
	CFG['util'].Auditions = parsedAuditions;	// make global
}
/*
 * construct href for story, return to a.click handler
 * add begin/end timestamps as named params for filter 
 */

/*
 * recurse through PAGE.jsonData.eventGroups.Events to find focus event 
 */
Util.getFocusEvent = function(eventId, events) {
	events = events || PAGE.jsonData.eventGroups.Events;
	var found = false;
	if (events){  	
		for (var i in events){
			// iterate through Events to find clicked event data
			if (events[i].FirstPhotoID == eventId) {
				found = events[i];
			} else if (events[i].Children) {
				found = Util.getFocusEvent(eventId, events[i].Children);	// check recursively
			}
			if (found) break;
		}
	}
	return found;	
}

Util.getStoryHref = function(cfg){
	cfg = cfg || {};
	var uuid = cfg.uuid || window.location.href.split('/')[4],
		href = cfg.href || '/story/'+ uuid,
		eventId = cfg.eventId;

	
	if (uuid.length==36) {
		var focus_event = Util.getFocusEvent(eventId);
		if (!focus_event) 
				throw new Exception("Error: focus event not found. what event was clicked?, event id="+eventId);
	
		if (focus_event.FirstPhotoID) href += '/evt:'+focus_event.FirstPhotoID;	
		if (focus_event.BeginDate) href += '/from:'+focus_event.BeginDate;
		if (focus_event.EndDate) href += '/to:'+focus_event.EndDate;
		if (focus_event.PhotoCount) href += '/size:'+focus_event.PhotoCount;
	
	}
	if ((/\/iframe\:1/i).test(window.location.href)) {
		// preserve /frame:1
		href += '/iframe:1';
		
	}
	return href;
}

/**
 * @param focus_event object, from eventGroups.Events[i] 
 */
Util.renderChildEvent = function(focus_event) {
	// render child event
	var focus = focus_event.BeginDate, 		// TODO: should focus on first visible photo
		child_event = focus_event.Children || null;
	Timeline.setTimescale(focus, child_event);
	
	// update Timeline
	$('.nav .timescale .label').removeClass('focus');
	$('.nav .timescale .label[data-value=small]').addClass('focus');
	$('.nav .timescale .label[data-value=big]').one('click', function(e){
		$('.nav .timescale .label').removeClass('focus');
		$('.nav .timescale .label[data-value=big]').addClass('focus');
		Timeline.setTimescale(focus, null);
	});
}
/**
 * static stream of events for main Timeline demo 
 * 	DOES NOT use events from CastingCall, Util.getCC(), src=PAGE.src, /photos/event_group
 */
Util.getStaticEventstream = function(){
	return [
		{
			id:'newyork',
			label:'New York',
			count: 367,
			'circle-size':'med',
			from: '2009-08-27 08:01:52',
			to: '2009-08-30 14:38:14',
		},
		{
			id:'paris',
			label:'Paris',
			count: 228,
			'circle-size':'sm',
			from: '2009-08-31 13:09:39',
			to: '2009-09-03 17:27:27',
		},
		{
			id:'venice',
			label:'Venice',
			count: 249,
			'circle-size':'sm',
			from: '2009-09-09 15:23:59',
			to: '2009-09-11 20:02:27',
		},
		{
			id:'bali',
			label:'Bali',
			count: 492,
			'circle-size':'lg',
			from: '2011-10-01 18:12:17',
			to: '2011-10-09 13:06:27',
		},
		// {
			// id:'five',
			// label:'five',
			// count: 228,
			// 'circle-size':'sm',
			// from: '2009-08-31 13:09:39',
			// to: '2009-09-03 17:27:27',
		// },
		// {
			// id:'six',
			// label:'six',
			// count: 249,
			// 'circle-size':'sm',
			// from: '2009-09-09 15:23:59',
			// to: '2009-09-11 20:02:27',
		// },
		// {
			// id:'seven',
			// label:'seven',
			// count: 492,
			// 'circle-size':'lg',
			// from: '2011-10-01 18:12:17',
			// to: '2011-10-09 13:06:27',
		// },
	];
}
Util.tokenReplace = function(string, prefix, tokens) {
	for (var i in tokens) {
		string = string.replace(prefix+i,tokens[i]);
	}
	var empty=new RegExp('\\'+prefix+'\\w*\\s{0,1}','g');
	string = string.replace(empty, '' );
	return string;
}
Util.formatDate = function(string, dropyear) {
		var d;
		if (isNaN(string)) d = new Date(string.replace(' ', 'T'));
		else d = new Date (string*1000);		

		var curr_date = d.getDate()+1;
		var curr_month = d.getMonth()+1;
		var curr_year = d.getFullYear();
		if (dropyear) return curr_month+'/'+curr_date;
		else return curr_month+'/'+curr_date+'/'+curr_year;
	}	
Util.formatDuration = function(from, to) {
		var msMinute = 60*1000, 
			msHour = 60*60*1000,
    		msDay = 60*60*24*1000;
    	var seconds, datestring = to;
    	if (/\d{9}/.test(datestring)) seconds = datestring; 
    	else seconds = new Date(datestring.replace(' ', 'T')).getTime() / 1000;
    	datestring = from;
    	if (/\d{9}/.test(datestring)) seconds -= datestring; 
    	else seconds -= new Date(datestring.replace(' ', 'T')).getTime() / 1000;
    	var ms = seconds * 1000,
    		d = Math.floor( ms / msDay) ,
			h = Math.floor((ms % msDay) / msHour),
			m = Math.floor((ms % msHour) / msMinute),
			formatted = [];
    	if (d) formatted.push(d+'d'); 
    	if (h) formatted.push(h+'h');
    	if (m) formatted.push(m+'m')
    	formatted = formatted.slice(0,2);	// just take 2 biggest time chunks
    	if (formatted.length==0) formatted.push('1m');	// min value
    	return formatted.join(' ');
	}	
Util.sortByRating = function(auditions){
	auditions.sort(function(a,b){
			return b.Photo.Fix.Score - a.Photo.Fix.Score;
	});
	return auditions;
}
Util.sortByTime = function(auditions){
	auditions.sort(function(a,b){
		return a.Photo.TS - b.Photo.TS;
	});
	return auditions;
}
Util.randomize = function ( myArray ) {
//	fisherYates algo, http://stackoverflow.com/questions/2450954/how-to-randomize-a-javascript-array
  var i = myArray.length, j, temp;
  if ( i === 0 ) return false;
  while ( --i ) {
     j = Math.floor( Math.random() * ( i + 1 ) );
     temp = myArray[i];
     myArray[i] = myArray[j]; 
     myArray[j] = temp;
   }
   return myArray;
}

Util.randomizeByTopRated = function(auditions){
	auditions = Util.sortByRating(auditions);
	var equalRating, floor,
	 	randomized = equalRating = [], 
		rating = 5,
		RATING_STEP_SIZE = 0.5;
	for (var i=0;i<auditions.length;i++) {	
			floor = parseFloat(auditions[i].Photo.Fix.Score); 
			if ( floor >= rating) 
				equalRating.push(auditions[i]);
			else {	
				// process results
				if (equalRating.length>2) 
					randomized = randomized.concat(Util.randomize(equalRating));
				else randomized = randomized.concat(equalRating); 
				// next rating
				rating -= RATING_STEP_SIZE;		// use half-step rating bands
				i--;	// test again against new rating
				equalRating = [];
				if (randomized.length > 2 && rating==0) break;
			};
	}
	if (equalRating.length) randomized = randomized.concat(equalRating);
	return randomized;
}	
Util.pickHighlights = function(auditions, count, fnMethod ) {
	fnMethod = fnMethod || Util.sortByRating;
	auditions = fnMethod(auditions);
	return auditions.slice(0,count);
}
/**
 * @param parent node
 * @param featured, array of auditions
 * @param cfg object, {count:, baseurl:} 
 */
Util.render_3StackedEvent = function(parent, featured, cfg){
	var THUMB_SIZE = 'bs', 
		src, feature, tokens,
		feature_markup = "<div><img class=':slot img-polaroid' src=':src' title=':title'></div>",
		audition = featured.shift();
		parent.html('');
	while (cfg.count--) {
		if (audition && audition.Photo) {
			tokens = {
				src : Util.getImgSrcBySize(cfg.baseurl + audition.Photo.Img.Src.rootSrc , THUMB_SIZE),
				title: audition.Photo.Fix.Score,
				slot: (cfg.count%2)==1 ? 'mid' : 'top',
			}
		} else {
			tokens = {
				src: Util.getImgSrcBySize(cfg.baseurl + audition.rootSrc , THUMB_SIZE),
				title: audition.score,
				slot: (cfg.count%2)==1 ? 'mid' : 'top',
			}
		}
		feature = Util.tokenReplace(feature_markup,':',tokens);
		parent.append(feature);
		audition = featured.shift(); 
	}
}

Util.render_GridScrollH = function(parent, featured, cfg){
}
/*
 * make global
 */
CFG['util'] = $.extend(CFG['util'] || {}, Util);

	
// static class for IDE outline browser
var Timeline = new function(){}
CFG['timeline'] = Timeline;		// make global

Timeline.documentReady = function () {
	
	var iframe = window != window.parent; ;
	if (iframe) {
		$('#header ').on('click', function(e){
			// $('iframe#demo', top.document).addClass('hide');
			window.parent.CFG['util'].show_demo(false);
		})
		$('a').on('click', function(e){
			var $this = $(e.currentTarget),
				href = $this.attr('href');
			CFG['util'].touch_HoverEffect($this);	
			if (/^\/timeline/.test(href)) {
			} else if (/^\/story/.test(href)) {
				var eventId = $('.timeline li.item.active').attr('data-id');			
				href = Util.getStoryHref({ eventId : eventId });
				$this.attr('href', href);
				return true;
				// nav within demo letterbox	
			} else {
				// $('iframe#demo', top.document).addClass('hide');
				window.parent.CFG['util'].show_demo(false);
				if ((/^\/(i-need-this|home)/).test(window.parent.location.pathname)) {
					// scroll to hash
					var hash = href.replace('/', '#');
					if (hash=='#i-need-this') hash='#home';
					window.parent.CFG['util'].animateScrollToHash({hash:hash});
				} else if (window.parent.location.pathname !== href){
					window.parent.location.href = href;
				}
			}
		})
	}

	// use responsive @media queries instead	
	// if ($(window).attr('innerHeight') < 1024) {
		// $('.ipad').removeClass('landscape').addClass('portrait');
	// } else $('.ipad').removeClass('portrait').addClass('landscape');
	// $(window).resize(function(e) {
		// if ($(window).attr('innerHeight') < 1024) {
			// $('.ipad').removeClass('landscape').addClass('portrait');
		// } else $('.ipad').removeClass('portrait').addClass('landscape');
	// });
	
	$('#curtain .wrapV').html($('.markup .loading').html()).addClass('fadeIn'); 
	CFG['carousel']['timeline'] = Timeline.carousel_cfg;
	$('#timeline').addClass('carousel');	CFG['util'].getCC(PAGE.src, function(json){
		Timeline.render();
	});
	
	// reveal see-the-movie button if not already seen
	if (CFG['cracker'].Video.length==0) $('#timeline a[href$=see-the-movie]').removeClass('hide');
	// help listener
	$('.icon-question-sign').click(function(){
		Timeline.togglePopovers('toggle', 20000);
		$(this).popover('destroy');			// only show help hint once
	})
	
	
	CFG['timing'].load_SocialSharing = 1000;
	CFG['util'].load_SocialSharing();
	
	// click handler for changing timeline timescale. add .has-child class if clickable
	// once per render
	var click_EventCircle = function(e){
			// render child event
			var $this = $(this),
				eventId = $this.closest('li').attr('data-id'),
				focus_event,
				circle;
			circle =  $this.hasClass('.evt-count') ? $this : $this.find('.evt-count');			
			CFG['util'].touch_HoverEffect(circle);			
			if ($this.hasClass('has-child')) {
				// if the clicked event .has-child, open the child event
				focus_event = Util.getFocusEvent(eventId);
				if (!focus_event) 
					throw new Exception("Error: focus event not found. what event was clicked?, event id="+eventId);	
	
				Util.renderChildEvent(focus_event);		// render childEvent by js
			} else {
				// if the clicked event does NOT .has-child, open the story
				var cfg = {eventId : eventId};	
				if (eventId.length!=36) {		// legacy, eventIdd is acutually uuid
					cfg.uuid = eventId;
					delete cfg.eventId;
				}
				story_href = Util.getStoryHref(cfg);	// goto the correct story page
				window.location.href = story_href;
			}	
	};
	$('html.no-touch #timeline').delegate('.eventbar .circle.evt-count', 'click', click_EventCircle);
	// TODO: HACK!!! touch device is NOT getting the delegated click event 
	$('html.touch #timeline').delegate('.eventbar', 'touchstart', click_EventCircle);
	
	$('#timeline').delegate('.nav .nav-btn.story, html.no-touch .item .feature img', 'click',function(){
		var eventId = $('.timeline li.item.active').attr('data-id'),
			story_href;
		CFG['util'].touch_HoverEffect($(this));
		var cfg = {eventId : eventId};	
		if (eventId.length!=36) {		// legacy, eventIdd is acutually uuid
			cfg.uuid = eventId;
			delete cfg.eventId;
		}
		story_href = Util.getStoryHref(cfg);	// goto the correct story page
		window.location.href = story_href;
	});
}
Timeline.movePopovers = function(){
	Timeline.popovers = Timeline.popovers || [];
	var p;
	while (p = Timeline.popovers.shift()) {
		p.popover('destroy');
	}
	if (window.location.host == 'thats-me') {
		$('i.help').popover('destroy');
		return;	// turn off popoffs for localhost
	} else if (PAGE.src.indexOf('/event_group')>0) {
		$('i.help').popover('destroy');
		return;	// turn off popoffs for coarse event_group testing
	}
	Timeline.popovers.push( $('.item:nth-child(3) .eventbar span.evt-label').popover({trigger:'hover',
		html: true,
		title: "<div style='margin-top:36px;'>Timeline Events</div>",
		content:'automatic event detection based on your shooting patterns', 
		placement:'right'})
	);
	Timeline.popovers.push( $('.item:nth-child(3) .eventbar div.circle .circle').popover({trigger:'hover',
		html: true,
		content:'The number of photos<br />in this event.<br />Click to see the Curated Story', 
		placement:'bottom'})
	);
	Timeline.popovers.push( $('.item:nth-child(3) .feature div.vcenter-body').popover({trigger:'hover',
		html: true,
		title: 'Featured Photos',
		content:'See featured photos to instantly connect with the moment.<br />Much better than thumbnails, right?', 
		placement:'left'})
	);
}
Timeline.togglePopovers = function(state, hideDelay){
	state = state || 'show';
	if (state == 'toggle') state = Timeline.popoverState=='show' ? 'hide' : 'show';
	hideDelay = hideDelay || 3000;
	$('.timescale').popover({'trigger': 'manual'}).popover(state);	for (var i in Timeline.popovers) {
		Timeline.popovers[i].popover({'trigger': 'manual'}).popover(state);
	}
	Timeline.popoverState = state;
	if (state=='hide') return;
	setTimeout(function(){
		Timeline.togglePopovers('hide');
	}, hideDelay);
}
/*
 * render ul.timeline > li.item .eventbar
 */
Timeline.render_EventBar = function(parent, eventstream) {
	var k, ev, markup, tokens, 
		item_markup = $('.markup li.item')[0].outerHTML;
	for (k=0; k<eventstream.length; k++) {
		ev = eventstream[k];
		tokens = $.extend({}, ev);	
		if (/\d{9}/.test(ev.label)) {	// uuid
			tokens['label'] = Util.formatDate(ev.label, false);
		} else {
			tokens['fromLabel'] = Util.formatDate(ev.from, false);
			tokens['dash'] = '&mdash;';
		}
		tokens['toLabel'] = Util.formatDuration(ev.from, ev.to);
		tokens['has-child'] = ev.children ? 'has-child' : '' ;
		tokens['tooltip'] = ev.children ? 'title=\"contains '+ev.children+' events\"' : '' ;
		markup = Util.tokenReplace(item_markup, ':', tokens);	
		parent.append(markup);
	}
	
}


Timeline.render_Event = function(parent, featured, cfg){
	Util.render_3StackedEvent(parent, featured, cfg);
}

/**
 * render timeline with event_groups from castingCall
 * @param cc raw, unparsed castingCall, default = PAGE.jsonData.castingCall
 * @param focus mixed, unixtimestamp (int) or UUID (char36)
 * 	if unixtime (UTC), will set focus to event which includes this timestamp
 *  if UUID (char36), set focus by matching eventId
 * @param events object, default PAGE.jsonData.eventGroups.Events for COARSE events, or 
 * 		Events[i].Children for FINE events   
 */
Timeline.render = function(cc, focus, events) {
	if (cc) CFG['util'].parseCC(cc, true);
	event_focus = 0;
	try {
		var USE_LIVE_EVENTSTREAM = false;
		USE_LIVE_EVENTSTREAM = PAGE.jsonData.castingCall.CastingCall.Auditions.ShotType=='event_group';
	} catch (ex) {}
if (USE_LIVE_EVENTSTREAM){
	var h, eventId,
		eventstream = []
		events = events || PAGE.jsonData.eventGroups.Events;
	for (h=0;h<events.length;h++) {
		eventId = events[h].FirstPhotoID;
		eventstream.push({
			id: eventId,
			label: events[h].BeginDate,
			count: events[h].PhotoCount, 
			// TODO: need algo for circle-size, normalize all event PhotoCounts
			// for now, lg circles have children/fine events
			'circle-size': events[h].Children ? 'lg' : 'med',			
			from: events[h].BeginDate,
			to: events[h].EndDate,
			children: events[h].Children ? events[h].Children.length : 0
		});
		
		// init carousel to this index=event_focus
		if (events[h].BeginDate <= focus && focus <= events[h].EndDate) {
			event_focus = h;	
		}
		if (typeof focus === 'string' && focus == eventId) event_focus = h;
	}		
} else {
	// USE_LIVE_EVENTSTREAM == false	
	var eventstream = Util.getStaticEventstream();
	try {
		var story = window.location.href.split('/')[4] || 'venice';
		if (story.indexOf(':')>0) story = 'venice';
		for (var h=0;h<eventstream.length;h++) {
			if (eventstream[h].id == story) {
				event_focus = h;
				break;
			};
		}
	} catch (ex){}	
}

	var parent = $('ul.timeline').html('');	Timeline.render_EventBar(parent, eventstream);
	parent.append("<li class='padding'></li><li class='padding'></li>");	// extra padding on the end
	parent.find('li.item:first').addClass('active');
	
	var baseurl = PAGE.jsonData.castingCall.CastingCall.Auditions.Baseurl,
		audition, auditions, shots, src, j=0;
		
	var placeholders = $('.timeline .item .feature img.img-polaroid');
	var m=0, j=0;
	for (k=0; k<eventstream.length; k++) {	
		
		
if (USE_LIVE_EVENTSTREAM){
	
	auditions = auditions || PAGE.jsonData.shot_CastingCall.CastingCall.Auditions.Audition;
	shots = shots || PAGE.jsonData.castingCall.CastingCall.Auditions.Audition; 
	
	var shot = shots[k],
		audition = auditions[m],
		starttime = eventstream[k].from,
		endtime = eventstream[k].to,
		featured;
		
		if ('use-date-boundaries') {
			// TODO: use BeginDate/EndDate instead of count to allow filtering
			featured = [];
			for (m=0;m<auditions.length;m++){
				if (starttime <= auditions[m].Photo.TS && auditions[m].Photo.TS <= endtime) {
					featured.push(auditions[m]);
				}
				if (auditions[m].Photo.TS > endtime) break;
			}
		} else {
			// use Count to detect eventstream end
			featured = auditions.slice(m, m+shot.Shot.count);
			m += (shot.Shot.count);		
		}
		var container = parent.find('li.item .feature .vcenter-body').eq(k), 
			featured_count = 3; 
		featured = Util.pickHighlights(featured, featured_count, Util.randomizeByTopRated);
		featured = Util.sortByTime(featured.slice(0,featured_count));
		
		/*
		 * render Timeline Event
		 */
		Timeline.render_Event(container, featured, {count:featured_count,baseurl:baseurl});
	
} else {	
	// USE_LIVE_EVENTSTREAM == false
	var featured, 
		container = parent.find('li.item .feature .vcenter-body').eq(k), 
		featured_count = 3; 
	if (featured == undefined) {	// object to array
		featured = [];
		for (m in CFG['util'].Auditions){
			featured.push(CFG['util'].Auditions[m]);
		}
		featured = Util.pickHighlights(featured, 24, 
			function(auditions){	// simple auditions
				auditions.sort(function(a,b){
					return b.score - a.score;
				});
				return auditions;
			} 
		);
	}
	Util.render_3StackedEvent(container, featured, {count:featured_count, baseurl:baseurl});
	// audition = featured.shift();
	// while (featured_count--) {
		// src = CFG['util'].getImgSrcBySize(baseurl + audition.rootSrc , 'bs');
		// placeholders.eq(j++).attr('src', src).attr('title', 'score: '+audition.score);   // "fake" auditions. not parsed using YUI classes
		// audition = featured.shift(); 
	// }
	
}
	} // end for eventstream
	CFG['carousel'].init.init();
	// if (event_focus) $('.carousel-inner .scroller').trigger('slideTo',[event_focus, -2])	$('#curtain').remove(); 
	setTimeout(function(){
		$.scrollTo($('#timeline .ipad').offset().top-40, 1000);
	}, 50);
	/*
	 * initialize popovers
	 * TODO: move to documentReady?
	 */
	// static popovers
	$('.timescale').popover({trigger:'hover',
		html: true,
		title: "<div style='padding-left:50px;'>Time Scale",
		content:'<div style="padding-left:50px;">selectable time scale allows for quick navigation (disabled)<div>', 
		placement:'bottom'});
	$('i.help').popover({trigger:'click',
		html: true,
		title: "Timeline Hints <i class='icon-remove-sign pull-right'></i>",
		content:'<div>Click here to show/hide key<br />Timeline features</div>',
		delay: {hide:3000},
		placement:'bottom'}).popover('show');
	setTimeout(function(){$('i.help').popover('hide');},3000);	
		
	$('.popover-title .icon-remove-sign').one('click', function(){
		$(this).closest('.popover').addClass('hide');
	})
			
	// dynamic popovers	
	Timeline.movePopovers();
	// if (1 || $('html.touch').length) Timeline.togglePopovers();	

}
// change Timescale based on user action
/**
 * 
 * @param {Object} focus, unix timestamp or eventId UUID, set focus to event which contains timestamp
 * @param {Object} child_events, same default null, from PAGE.jsonData.eventGroups.Events[i].Children
 */
Timeline.setTimescale = function(focus, child_events) {
	if (PAGE.src.indexOf('timescale:')>0) {
		$('body').addClass('wait');
		// for event_group v1.0
		if (PAGE.src.indexOf('timescale:0.25')>0) PAGE.src = PAGE.src.replace('timescale:0.25','timescale:7');
		else if (PAGE.src.indexOf('timescale:0.5')>0) PAGE.src = PAGE.src.replace('timescale:0.5','timescale:0.25');
		else if (PAGE.src.indexOf('timescale:1')>0) PAGE.src = PAGE.src.replace('timescale:1','timescale:0.5');
		else if (PAGE.src.indexOf('timescale:7')>0) PAGE.src = PAGE.src.replace('timescale:7','timescale:1');
		CFG['util'].Auditions = 'empty';
		CFG['util'].getCC(PAGE.src, function(json){
			Timeline.render(null, focus);
			$('body').removeClass('wait');
		});
	} else if (PAGE.src.indexOf('/event_group')>0) {
		Timeline.render(null, focus, child_events);
	}
}
Timeline.carousel_cfg = {
		responsive: true,
		// circular: false,		width:  null,
		// height: $('.ipad').hasClass('portrait') ? 1024 : 768,		height: 'variable',
		align: 'center',
		onCreate: function(data){
			CFG['carousel'].autoPaging = false;
		},
		items		: {
			width		: 'variable',			// 3 visible on 1024x768			visible		: $('.ipad').hasClass('portrait') ? 3 : 5,		},
		auto : {
			timeoutDuration: CFG['isTouch'] ? 10000 : 7000,
			pauseOnHover	: 'immediate',
			conditions: function(){ 
				return CFG['carousel'].autoPaging && CFG['util'].isScrolledIntoView($(this));
			},
		},
		scroll : {
			items			: 1,
			// easing			: "easeInOutCubic",
			circular		: false,
			duration		: 300,							
			pauseOnHover	: 'immediate',
			conditions		: function(o) {
console.info("scroll conditions()")					
				// not working
				var i = $(this).triggerHandler("currentPosition"),
					end = $(this).find('li.item').length - 2
					scroll;
				if (i<2) { 	// just move active, show 'prev'
					$(this).find('li.item').removeClass('active').eq(i).addClass('active');
					scroll=false;
				} else if (i<end) {	// move carousel, do NOT move .active
					scroll=true;
				} else { // just move active, show 'prev'
					scroll=false;
					$(this).find('li.item').removeClass('active').eq(i).addClass('active');
				}
				return scroll;
			},
			onBefore			: function(o,force_p) {
console.log("scroll before() p="+$('#timeline .carousel-pager .selected').index());				
				var check;
			},
			onAfter			: function(o,force_p) {
console.log("scroll after() p="+$('#timeline .carousel-pager .selected').index());					
				var parent = $(this).closest('.carousel'),
					c = $(this).triggerHandler("currentPosition") || 0, 
					activeDots =  parent.find('.carousel-pager div:not(.hide)'),
				    p = force_p || (c>0 ? c+2 : activeDots.filter('.selected').index()); 
				if (o.scroll && o.scroll.direction=='prev' && c===0) 
					p = parent.find('li.item.active').index()-1;
				if (p==0) parent.find('.left.carousel-control-btn').addClass('invisible');
				else parent.find('.left.carousel-control-btn').removeClass('invisible');
				if (activeDots.last().hasClass('selected')) parent.find('.right.carousel-control-btn').addClass('invisible');
				else parent.find('.right.carousel-control-btn').removeClass('invisible');
				// var p = Math.min(i,2);  // carousel keeps only 2 li.item to the left of .active 
				if (p<2) {
					parent.find('li.item').removeClass('active').eq(p).addClass('active');
				} else if (p>=(activeDots.length-2)) {
					parent.find('li.item').removeClass('active').eq(p-c).addClass('active');
				} else {
					parent.find('li.item').removeClass('active').eq(2).addClass('active');
				}
				activeDots.removeClass('selected').eq(p).addClass('selected');				Timeline.movePopovers();
			},
			onEnd			: function(direction) {
				if (direction=='next') {
					CFG['carousel'].track_CarouselEnd($(this));
				}
			}
		},
		prev : {
			button		: "#timeline .carousel-control-btn.left",
			key			: "left",
			items		: 1,
			easing		: "linear",
			duration	: 300,
			conditions	: function(){
					
				// $('#features .carousel-hint').addClass('disabled').removeClass('fadeIn-slow');
				var carousel = $(this).closest('.carousel'),
					c = $(this).triggerHandler("currentPosition") || 0, 
					activeDots =  carousel.find('.carousel-pager div:not(.hide)'),
				    p = activeDots.filter('.selected').index() || 0; 
console.info("prev conditions() p0="+$('#timeline .carousel-pager .selected').index());					    
				if (p<=2 || (p>=activeDots.length-0-2)) { 	// just update li.active
					p--;
					// carousel.find('li.item').removeClass('active').eq(p-c).addClass('active');
					activeDots.removeClass('selected').eq(p).addClass('selected');
					// trigger scroll.onAfter
					Timeline.carousel_cfg.scroll.onAfter.call(this,{},p);
					return false;
				} else return true;
				// return !$(this).closest('.carousel').find('.carousel-pager div:first-child').hasClass('selected');			},
		},
		next : {
			button		: "#timeline .carousel-control-btn.right",
			key			: "right",
			items		: 1,
			easing		: "linear",
			duration	: 300,
			conditions	: function(){
console.info("next conditions()")	
				// $('#features .carousel-hint').addClass('disabled').removeClass('fadeIn-slow');				var carousel = $(this).closest('.carousel'),
					c = $(this).triggerHandler("currentPosition") || 0, 
					activeDots =  carousel.find('.carousel-pager div:not(.hide)'),
				    p = activeDots.filter('.selected').index() || 0; 
				if (p<2 || (p>=activeDots.length-1-2)) { 	// just update li.active
					p++;
					// carousel.find('li.item').removeClass('active').eq(p-c).addClass('active');					activeDots.removeClass('selected').eq(p).addClass('selected');
					// trigger scroll.onAfter
					Timeline.carousel_cfg.scroll.onAfter.call(this,{},p);
					return false;
				} else return true;
				// return !activeDots.last().hasClass('selected');			}

		},		pagination : {
			container	: "#timeline  .carousel-pager",
			keys		: true,
			easing		: "linear",
			duration	: 300,
			anchorBuilder: function(nr) {
				// this == li.item
				if ($(this).hasClass('padding')) return;
				var attr = '', 
					fred = $(this).closest('.carousel');
				// attr =  'href="#'+fred.attr('id')+'"';
			    return markup = '<div '+attr+'>'+nr+'</div>';
			},
			conditions: function(o){
				return false;
			},
			onBefore : function(o){
				var carousel = $(this).closest('.carousel'),
					activeDots =  carousel.find('.carousel-pager div:not(.hide)');				
				if (o.scroll.items < (activeDots.length-2)) o.scroll.items -= 2;
				if (o.scroll.items < 0) o.scroll.items = 0;
				return o;
			},			
			// onAfter: function(o){
// console.log("pagination onAfter()")				
				// var check;
			// }
		},
		swipe	: {
			onTouch: CFG['isTouch'],
			onMouse: false,
			pauseOnHover	: 'immediate',
		}
	};







$(document).ready( CFG['timeline'].documentReady );
	
})();  
// end module closure