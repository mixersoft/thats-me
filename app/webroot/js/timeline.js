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
			if (/^\/(timeline|story)/.test(href)) {
				// nav within demo letterbox	
				if ((/\/iframe\:1/i).test(href) == false) {
					// need to add named param to all internal links
					href += '/iframe:1';
					$this.attr('href', href);
					return true; 
				}
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
	$('#timeline').delegate('.eventbar .circle.evt-count.has-child', 'click',function(e){
		var eventId = $(this).closest('li').attr('data-id'),
			focus;
		// TODO: detect COARSE/FINE events
		for (var i in PAGE.jsonData.eventGroups.Events){
			if (PAGE.jsonData.eventGroups.Events[i].FirstPhotoID == eventId) {
				// TODO: should focus on first visible photo
				// COARSE event found
				focus = PAGE.jsonData.eventGroups.Events[i].BeginDate; 
				var fine_events = PAGE.jsonData.eventGroups.Events[i].Children || null;
				Timeline.setTimescale(focus, fine_events);
				break;
			}
		}
			// update Timeline
		$('.nav .timescale .label').removeClass('focus');
		$('.nav .timescale .label[data-value=small]').addClass('focus');
		$('.nav .timescale .label[data-value=big]').one('click', function(e){
			$('.nav .timescale .label').removeClass('focus');
			$('.nav .timescale .label[data-value=big]').addClass('focus');
			Timeline.setTimescale(focus, null);
		});

	});
	$('#timeline').delegate('html#no-touch .item .feature img, .nav .nav-btn.story', 'click',function(){
		var next = window.location.href.replace('timeline','story');
		window.location.href = next;
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
	} else if (PAGE.src.indexOf('coarse_spacing:')>0) {
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
	hideDelay = hideDelay || 5000;
	$('.timescale').popover({'trigger': 'manual'}).popover(state);	for (var i in Timeline.popovers) {
		Timeline.popovers[i].popover({'trigger': 'manual'}).popover(state);
	}
	Timeline.popoverState = state;
	if (state=='hide') return;
	setTimeout(function(){
		Timeline.togglePopovers('hide');
	}, hideDelay);
}
/**
 * render timeline with event_groups from castingCall
 * @param cc raw, unparsed castingCall, default = PAGE.jsonData.castingCall
 * @param focus unixtime (UTC), will set focus to event which includes this timestamp
 * @param events object, default PAGE.jsonData.eventGroups.Events for COARSE events, or 
 * 		Events[i].Children for FINE events   
 */
Timeline.render = function(cc, focus, events) {
	if (cc) CFG['util'].parseCC(cc, true);
	
if (PAGE.jsonData.castingCall.CastingCall.Auditions.ShotType=='event_group'){
	auditions = PAGE.jsonData.castingCall.CastingCall.Auditions.Audition;
	eventstream = []
	event_focus = 0;
	events = events || PAGE.jsonData.eventGroups.Events;
	for (var h=0;h<events.length;h++) {
		eventstream.push({
			id: events[h].FirstPhotoID,
			label: events[h].BeginDate,
			count: events[h].PhotoCount, 
			// TODO: need algo for circle-size, normalize all event PhotoCounts
			// for now, lg circles have children/fine events
			'circle-size': events[h].Children ? 'lg' : 'med',			
			from: events[h].BeginDate,
			to: events[h].EndDate,
			children: events[h].Children ? events[h].Children.length : 0
		});
		if (events[h].BeginDate <= focus && focus <= events[h].EndDate) {
			event_focus = h;	// init carousel to this index
		}
	}		
} else {
	var eventstream = [
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
	];	
}

	
	var k, ev, markup, 
		item_markup = $('.markup li.item')[0].outerHTML,
		parent = $('ul.timeline').html('');
	var formatDate = function(string, dropyear) {
		var d;
		if (isNaN(string)) d = new Date(string.replace(' ', 'T'));
		else d = new Date (string*1000);		

		var curr_date = d.getDate();
		var curr_month = d.getMonth();
		var curr_year = d.getFullYear();
		if (dropyear) return curr_month+'/'+curr_date;
		else return curr_month+'/'+curr_date+'/'+curr_year;
	}
	parent.append("<li class='padding'></li><li class='padding'></li>");
		
	
	for (k=0; k<eventstream.length; k++) {
		ev = eventstream[k];
		markup = item_markup;
		markup = markup.replace(':label', ev.label).replace(':id', ev.id)
			.replace(':count', ev.count).replace(':circle-size', ev['circle-size'])
			.replace(':from', formatDate(ev.from, true)).replace(':to', formatDate(ev.to))
			.replace(':has-child', ev.children ? 'has-child' : '' )
			.replace(':tooltip', ev.children ? 'title=\"contains '+ev.children+' events\"' : '' );
		parent.append(markup);
	}

	parent.find('li.item:first').addClass('active');
	parent.append("<li class='padding'></li><li class='padding'></li>");
	
	var baseurl = PAGE.jsonData.castingCall.CastingCall.Auditions.Baseurl,
		audition, src, j=0;
	var placeholders = $('.timeline .item .feature img.img-polaroid');
		
if (PAGE.jsonData.castingCall.CastingCall.Auditions.ShotType=='event_group'){
	var m=0, j=0,
		auditions=PAGE.jsonData.shot_CastingCall.CastingCall.Auditions.Audition,
		shots=PAGE.jsonData.castingCall.CastingCall.Auditions.Audition; 
	for (k=0; k<eventstream.length; k++) {
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
		featured = auditions.slice(m, m+shot.Shot.count);
		m += (shot.Shot.count);		
	}
		featured.sort(function(a,b){
				return b.Photo.Fix.Score - a.Photo.Fix.Score;
		});
		audition = featured.shift(); 
		var featured_count = 3; 
		while (featured_count--) {
			if (audition) {
				src = CFG['util'].getImgSrcBySize(baseurl + audition.Photo.Img.Src.rootSrc , 'bs');
				placeholders.eq(j++).attr('src', src).attr('title', 'score: '+ audition.Photo.Fix.Score);
			} else placeholders.eq(j++).remove();
			audition = featured.shift(); 
		}
	}	
} else {	
	for (var i in CFG['util'].Auditions) {
		audition = CFG['util'].Auditions[i];
		src = CFG['util'].getImgSrcBySize(baseurl + audition.rootSrc , 'bs');
		placeholders.eq(j++).attr('src', src).attr('title', 'score: '+audition.score);   // "fake" auditions. not parsed using YUI classes
	}
}

	CFG['carousel'].init.init();
	if (event_focus) $('.carousel-inner .scroller').trigger('slideTo',[event_focus])
	$('#curtain').remove(); 
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
		placement:'bottom'}).popover('show');
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
 * @param {Object} focus, unix timestamp, set focus to event which contains timestamp
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
	} else if (PAGE.src.indexOf('coarse_spacing:')>0) {
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
			duration		: 300,							
			pauseOnHover	: 'immediate',
			onAfter			: function(o) {
				var i = $(this).triggerHandler("currentPosition"),
					parent = $(this).closest('.carousel'),
					activeDots =  parent.find('.carousel-pager div:not(.hide)');
				if (i==0) parent.find('.left.carousel-control-btn').addClass('invisible');
				else parent.find('.left.carousel-control-btn').removeClass('invisible');
				if (activeDots.last().hasClass('selected')) parent.find('.right.carousel-control-btn').addClass('invisible');
				else parent.find('.right.carousel-control-btn').removeClass('invisible');
				var active_i = Math.min(i,2);  // carousel keeps only 2 li.item to the left of .active 
				$(this).find('li.item').removeClass('active').eq(active_i).addClass('active');
				Timeline.movePopovers();
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
				return !$(this).closest('.carousel').find('.carousel-pager div:first-child').hasClass('selected');
			},
		},
		next : {
			button		: "#timeline .carousel-control-btn.right",
			key			: "right",
			items		: 1,
			easing		: "linear",
			duration	: 300,
			conditions	: function(){
				// $('#features .carousel-hint').addClass('disabled').removeClass('fadeIn-slow');				var activeDots = $(this).closest('.carousel').find('.carousel-pager div:not(.hide)');
				return !activeDots.last().hasClass('selected');
			}

		},		pagination : {
			container	: "#timeline  .carousel-pager",
			keys		: true,
			easing		: "linear",
			duration	: 300,
			anchorBuilder: function(nr) {
				// this == li.item
				if ($(this).hasClass('padding')) return;
				var fred = $(this).closest('.carousel');
			    return markup = '<div href="#'+fred.attr('id')+'">'+nr+'</div>';
			},
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