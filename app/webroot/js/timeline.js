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
	CFG['carousel']['timeline'] = Timeline.carousel_cfg;
	$('#timeline').addClass('carousel');	CFG['carousel'].init.init();
	
	CFG['util'].getCC(PAGE.src, function(json){
		Timeline.render();
	});
	
	/*
	 * initialize popovers
	 */
	$('.timescale').popover({trigger:'hover',
		html: true,
		title: "<div style='padding-left:50px;'>Time Scale",
		content:'<div style="padding-left:50px;">selectable time scale allows for quick navigation (disabled)<div>', 
		placement:'bottom'});
	Timeline.movePopovers();
	if (1 || $('html.touch').length) Timeline.togglePopovers();
	
	// click handler for nav to Story
	$('.timeline').delegate('.item .feature img', 'click',function(){
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
	Timeline.popovers.push( $('.item:nth-child(3) .eventbar span.evt-label').popover({trigger:'hover',
		html: true,
		title: "<div style='margin-top:16px;'>Timeline Events</div>",
		content:'automatic event detection based on your shooting patterns', 
		placement:'left'})
	);
	Timeline.popovers.push( $('.item:nth-child(3) .eventbar div.circle').popover({trigger:'hover',
		content:'The number of photos in each event', 
		placement:'bottom'})
	);
	Timeline.popovers.push( $('.item:nth-child(3) .feature div.vcenter-body').popover({trigger:'hover',
		html: true,
		title: 'Featured Photos',
		content:'See featured photos to instantly connect with the moment.<br />Much better than thumbnails, right?', 
		placement:'left'})
	);
}
Timeline.togglePopovers = function(){
	$('.timescale').popover({'trigger': 'manual'}).popover('show');	for (var i in Timeline.popovers) {
		Timeline.popovers[i].popover({'trigger': 'manual'}).popover('show');
	}
}
Timeline.render = function(cc) {
	if (cc) CFG['util'].parseCC(cc, true);
	
	var baseurl = PAGE.jsonData.castingCall.CastingCall.Auditions.Baseurl,
		audition, src, j=0;
	var placeholders = $('.timeline .item .feature img.img-polaroid');
	for (var i in CFG['util'].Auditions) {
		audition = CFG['util'].Auditions[i];
		src = CFG['util'].getImgSrcBySize(baseurl + audition.rootSrc , 'bs');
		placeholders.eq(j++).attr('src', src);
	}
	
}
Timeline.carousel_cfg = {
		responsive: true,
		// circular: false,		width:  null,
		height: $('.ipad').hasClass('portrait') ? 1024 : 768,
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
				// $('#features .carousel-hint').addClass('disabled').removeClass('fadeIn-slow');				return !$(this).closest('.carousel').find('.carousel-pager div:first-child').hasClass('selected');
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
			pauseOnHover	: 'immediate',
		}
	};







$(document).ready( CFG['timeline'].documentReady );
	
})();  
// end module closure