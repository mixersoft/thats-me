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
			} catch (ex) {		}
			success.call(this, json, status, o);
		},
	}).fail(function(json, status, o){
		console.error("getCC failed");
	});
}
Util.Auditions = null;
Util.parseCC = function(cc, force){
	cc = cc || PAGE.jsonData.castingCall;
	if (CFG['util'].Auditions && !force) return CFG['util'].Auditions;
	
	var onDuplicate = SNAPPI.Auditions.onDuplicate_REPLACE;
	var castingCall = PAGE.jsonData.castingCall;
	if (!castingCall.auditionSH) { 
		var auditionSH = SNAPPI.Auditions.parseCastingCall(
				castingCall, 
				'snappi', 
				null, 
				onDuplicate);
	}
	CFG['util'].Auditions = auditionSH;	// make global
	return auditionSH;
}

/*
 * global var, convenience
 */
var PM = null, 
	PMPlugin = null;

Util.loadYuiPagemaker = function(external_Y, cfg){
	try {
		var isLoaded, isInitialized;
		isLoaded = SNAPPI.PM.PageMakerPlugin.isLoaded;
		isInitialized = SNAPPI.PM.PageMakerPlugin.isInitialized;
	} catch (e){}
	
	if (!isLoaded) {
		/*
		 * lazyLoad PageMakerPlugin module
		 */
		var callback = function(Y, result){
			PM = SNAPPI.PM;
			if (SNAPPI.Y.Lang.isArray(PAGE.jsonData.montage)) {
				var i = 0;
				var done = SNAPPI.Y.on('snappi-pm:render', function(Pr, node){
					i++;
					if (i >= PAGE.jsonData.montage.length){
						done.detach();
						// SNAPPI.Y.one('.ipad').setStyles({
							// 'overflowX':'hidden',
							// 'overflowY':'scroll',
						// })						return;
					} 
					var cfg = Story.getConfig(PAGE.jsonData.montage[i]);
					SNAPPI.UIHelper.create.get_Montage(cfg);
				});
				var cfg = Story.getConfig(PAGE.jsonData.montage[0]);
				SNAPPI.UIHelper.create.get_Montage(cfg);
			} else {
				var cfg = Story.getConfig(PAGE.jsonData.montage);
				SNAPPI.UIHelper.create.get_Montage(cfg);
			}
		};
		
		SNAPPI.LazyLoad.extras({
			// module_group: 'pagemaker-plugin',			module_group: 'curated-stories',
			// before: function(){},			ready: callback,
		});
		return;
	}
}

CFG['util'] = $.extend(CFG['util'] || {}, Util);

/*
 * Curated Stories
 */
var Story = new function(){}
CFG['story'] = Story;		// make global

Story.onRender = function() {
	SNAPPI.PM.PageMakerPlugin.startPlayer({page:1});
}
Story.onFirstRender = function() {
	$('#story .ipad, #story .montage-container').css('height','auto');
	setTimeout(function(){
		Story.initPopovers();
		// help listener
		$('.icon-question-sign').click(function(){
			Story.togglePopovers('toggle', 20000);
		})
	},1000);
	$('#curtain').remove(); 
	$('body').removeClass('wait');
}
Story.documentReady = function () {
	$('#curtain .wrapV').html( $('.markup .loading').html() ).addClass('fadeIn'); 
	
	CFG['util'].getCC(PAGE.src, function(json){		Util.loadYuiPagemaker();	});
	
		// click handler for nav to Story
	$('.ipad').delegate('.nav .nav-timeline', 'click',function(){
		var next = window.location.href.replace('story', 'timeline');
		window.location.href = next;
	});
	$('.nav-timeline').click(function(e){
		e.preventDefault();
		var next = window.location.href.replace('/story/','/timeline/');
		window.location.href = next;
		return false;
	});
	
	CFG['timing'].load_SocialSharing = 1000;
	CFG['util'].load_SocialSharing();

}
Story.initPopovers = function(){
	/*
	 * initialize popovers
	 */
	Story.popovers = Story.popovers || [];
	Story.popovers.push( $('.pageGallery:first').popover({trigger:'hover',
		html: true,
		title: "<div style='padding-left:50px;'>Curated Stories",
		content:'<div style="padding-left:50px;"><ul><li>see highlights for each event</li><li>top-rated photos are always the largest</li><li>thumbnails are just a click away (disabled)</li></ul>', 
		placement:'left'})
	);
	Story.popovers.push( $('.pageGallery .FigureBox.Montage:first img ').popover({trigger:'hover',
		content:'click on a photo to see full screen (disabled)', 
		placement:'bottom'})
	);
	Story.popovers.push( $('.share-story').popover({trigger:'hover',
		html: true,
		title: "Easy Sharing",
		content:'<div  style="padding-right:22px;">get links to share Stories on all your favorite places (disabled)</div>', 
		placement:'top'})
	);
	if (1 || $('html.touch').length) Story.togglePopovers();
}
Story.togglePopovers = function(state, hideDelay){
	state = state || 'show';
	if (state == 'toggle') state = Story.popoverState=='show' ? 'hide' : 'show';
	hideDelay = hideDelay || 10000;
	for (var i in Story.popovers) {
		Story.popovers[i].popover({'trigger': 'manual'}).popover(state);
	}
	Story.popoverState = state;
	if (state=='hide') return;
	setTimeout(function(){
		Story.togglePopovers('hide')
	}, hideDelay);
}
Story.getConfig = function(montage) {
	var cfg={};
	cfg.arrangement = montage || PAGE.jsonData.montage;
	if (SNAPPI.Y.Lang.isArray(cfg.arrangement)) cfg.arrangement = cfg.arrangement[0]; 
	cfg.stageType = 'montage';
	cfg.noHeader = true;
	cfg.getStage = SNAPPI.UIHelper.create.getStage_montage;
	cfg.thumbnailMarkup = '<article class="FigureBox Montage"><figure><img src="{src}" title="{title}" linkTo="{linkTo}" style="height:{height}px;width:{width}px;left:{left}px;top:{top}px;{borderWidth}"></figure></article>';
	cfg.isMontage = true;	// uses Pr.getThumbPrefix to get min thumb size by crop
	cfg.spacing = 1;		// border spacing
	cfg.margin = 0.0001;
	cfg.allowedRatios = {'h':'768:1024', 'v':'1024:768'}; 	
	cfg.scrollView = 1;
	cfg.MARGIN_W = 0;
	SNAPPI.UIHelper.create.MAX_HEIGHT = 768-40;	// used by getStage_modal
	SNAPPI.UIHelper.create.MAX_WIDTH = 1024-40;
// 1) first montage render, uses Roles.photo_id, do NOT slice auditionSH
	SNAPPI.namespace("SNAPPI.STATE.displayPage.page");
	SNAPPI.STATE.displayPage.page = 1;
	cfg.page = SNAPPI.STATE.displayPage.page;	// current page
	cfg.batch = CFG['util'].parseCC();			// do not slice	
	
	// LISTENERS
	var stage = cfg.getStage();
	stage.removeClass('container').removeClass('grid_16');
	if (!stage.listen) {
		stage.listen = {};
		var _setStageDim = function(node){
				try {
    				if (n.get('clientHeight') < node.origRect.H) {
    					SNAPPI.PM.Player.winResize(null);
    				}	
    			} catch(e){}
    	};
		/*
		 * on Story Render
		 */    	
		stage.listen['render'] = SNAPPI.Y.once('snappi-pm:render', function(Pr, node){
			Story.onFirstRender.call(this, Pr, node);
		});
		stage.listen['render'] = SNAPPI.Y.on('snappi-pm:render', function(Pr, node){
			Story.onRender.call(this, Pr, node);
		});
		stage.listen['resize'] = SNAPPI.Y.on('snappi-pm:resize', 
			function(player, containerH){
				var node = this.one('div.pageGallery');
				_setStageDim(node);
			}, stage);
	}
	return cfg;
}


$(document).ready( CFG['story'].documentReady );
	
})();  
// end module closure