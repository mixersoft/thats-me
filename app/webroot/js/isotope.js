(function() {//Closure, to not leak to the scope

var Util = new function(){}
Util.Auditions = 'empty';
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
	/*
	 * POST should include begin/end timestamps to filter photostream
	 */
	var qs = {'debug':0};
	$.ajax({
		url: src,
		data: qs,
		dataType: 'json',
		success: function(json, status, o){
			try {
				PAGE.jsonData = json.response;
				delete(PAGE.jsonData.lookups);
				delete(PAGE.jsonData.filter);
				delete(PAGE.jsonData.profile);
			} catch (ex) {		}
			success.call(this, json, status, o);
		},
	}).fail(function(json, status, o){
		console.error("getCC failed");
	});
}
Util.parseCC = function(cc, force){
	cc = cc || PAGE.jsonData.CastingCall;
	if (CFG['util'].Auditions !== 'empty' && !force) return Util.Auditions;
	var i, oSrc, score, id, 
		parsedAuditions = {},
		auditions = cc.CastingCall.Auditions.Audition;
		
	if (PAGE.jsonData.castingCall.CastingCall.Auditions.ShotType=='event_group'){
		auditions = PAGE.jsonData.shot_CastingCall.CastingCall.Auditions.Audition;
	}	

	for (i in auditions) {
		id = auditions[i].Photo.id;
		parsedAuditions[id] = $.extend({
			id: id,
			score: parseInt(auditions[i].Photo.Fix.Score),
			caption: auditions[i].Photo.Caption,
			dateTaken: auditions[i].Photo.DateTaken, 
			ts: auditions[i].Photo.TS,
		}, auditions[i].Photo.Img.Src);
	}
	CFG['util'].Auditions = parsedAuditions;	// make global
}

Util.tokenReplace = function(string, prefix, tokens) {
	for (var i in tokens) {
		string = string.replace(prefix+i,tokens[i]);
	}
	var empty=new RegExp('\\'+prefix+'\\w*\\s{0,1}','g');
	string = string.replace(empty, '' );
	return string;
}

/*
 * global var, convenience
 */

Util.getTimelineHref = function(cfg){
	cfg = cfg || {};
	var href, 
		eventStr = window.location.href.match(/\/evt\:(.{36})/g), 
		uuid = cfg.uuid || window.location.href.split('/')[4];
		
		eventStr = cfg.evt ? '/evt:'+cfg.evt : (eventStr || '');
		href = cfg.href || '/timeline/'+ uuid + eventStr;
	
	if ((/\/iframe\:1/i).test(window.location.href)) {
		// preserve /frame:1
		href += '/iframe:1';
		
	}
	return href;
}

CFG['util'] = $.extend(CFG['util'] || {}, Util);

/*
 * All Snaps
 */
var Isotope = new function(){}
CFG['isotope'] = Isotope;		// make global

Isotope.render = function(auditions, container){
	container = container || $('.ipad .stage-body');
	var THUMB_SIZE = 'bs', scale=640, max = 0, baseurl, tokens,
		media_markup = "<img class='img-polaroid' src=':src' title=':title' width=':width' height=':height' data-score=':score' data-caption=':caption'>";
	switch (THUMB_SIZE) {
		case 'bs': scale=240; 
			break;
		case 'bm': scale=320; 
			break;
		case 'tn': scale=120; 
			break;
	}
	baseurl = PAGE.jsonData.castingCall.CastingCall.Auditions.Baseurl;
	for (var i in auditions) {
		audition = auditions[i];
		max = Math.max(audition.W, audition.H);
		tokens = {
			src: Util.getImgSrcBySize(baseurl + audition.rootSrc, THUMB_SIZE),
			title: audition.caption+' ('+audition.score+')',
			width: audition.W * (scale/max),
			height: audition.H * (scale/max), 
			score: audition.score,
			caption: audition.caption,
		}
		container.append(Util.tokenReplace(media_markup,':',tokens))
	}
	Isotope.onFirstRender();
}

Isotope.onRender = function() {
}

_layout = function(layout) {
	$('#isotope .stage-body').isotope({
	  layoutMode : layout,
	});
}
_sort = function(key, asc) {
	if (typeof asc == 'undefined') asc = (key=='score') ? false : true; 
	$('#isotope .stage-body').isotope({
	  sortBy: key,
	  sortAscending: asc,
	});
}

Isotope.onFirstRender = function() {
	
	$('#isotope .stage-body').css('height','1080px');
	$('#curtain').remove(); 
	$('body').removeClass('wait');
	
	$('#isotope .stage-body').isotope({
	  // options
	  itemSelector : '.img-polaroid',
	  layoutMode : 'masonryHorizontal',
	  masonryHorizontal: {
	    rowHeight: 100
	  },
	  sortBy: 'score',
	  sortAscending: false,
	  animation: 'css',
	  getSortData : {
	  	score: function($elem) {
	  		return parseFloat($elem.attr('data-score'));
	  	},
	  	caption: function($elem) {
	  		return $elem.attr('data-caption');
	  	},
	  },
	});
}


Isotope.documentReady = function () {
	var iframe = window != window.parent; ;
	if (iframe) {
		$('#header ').on('click', function(e){
			// $('iframe#demo', top.document).addClass('hide');			window.parent.CFG['util'].show_demo(false);
		})
		$('a').on('click', function(e){
			var $this = $(e.currentTarget),
				href = $this.attr('href');
			CFG['util'].touch_HoverEffect($this);	
			if (/^\/(timeline|)/.test(href)) {	
				if ((/\/iframe\:1/i).test(href) == false) {
					// need to add named param to all internal links
					href += '/iframe:1';
					$this.attr('href', href);
					return true; 
				}
			} else {
				//$('iframe#demo', top.document).addClass('hide');
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
	/*
	 * get CC and create/render Story on cache miss
	 */
	CFG['util'].getCC(PAGE.src, function(json){
		// json.success = true
		Util.parseCC(json.response.castingCall);
		Isotope.render(CFG['util'].Auditions);
	});	
	
	$('#curtain .wrapV').html( $('.markup .loading').html() ).addClass('fadeIn'); 
	
	// click handler for nav to Story
	$('.ipad').delegate('.nav .nav-timeline', 'click',function(){
		CFG['util'].touch_HoverEffect($(this));
		window.location.href = Util.getTimelineHref();
	});
	$('.nav .nav-btn.timeline').click(function(e){
		CFG['util'].touch_HoverEffect($(this));
		e.preventDefault();
		window.location.href = Util.getTimelineHref();
		return false;
	});
	
	CFG['timing'].load_SocialSharing = 1000;
	CFG['util'].load_SocialSharing();

}


$(document).ready( CFG['isotope'].documentReady );
	
})();  
// end module closure