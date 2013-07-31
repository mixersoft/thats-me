/*
 * jQuery throttle / debounce - v1.1 - 3/7/2010
 * http://benalman.com/projects/jquery-throttle-debounce-plugin/
 * 
 * Copyright (c) 2010 "Cowboy" Ben Alman
 * Dual licensed under the MIT and GPL licenses.
 * http://benalman.com/about/license/
 */
(function(b,c){var $=b.Cowboy||(b.Cowboy={}),a;$.throttle=a=function(e,f,j,i){var h,d=0;if(typeof f!=="boolean"){i=j;j=f;f=c}function g(){var o=this,m=+new Date()-d,n=arguments;function l(){d=+new Date();j.apply(o,n)}function k(){h=c}if(i&&!h){l()}h&&clearTimeout(h);if(i===c&&m>e){l()}else{if(f!==true){h=setTimeout(i?k:l,i===c?e-m:e)}}}if($.guid){g.guid=j.guid=j.guid||$.guid++}return g};$.debounce=function(d,e,f){return f===c?a(d,e,false):a(d,f,e!==false)}})(this);

// Production steps of ECMA-262, Edition 5, 15.4.4.18
// Reference: http://es5.github.com/#x15.4.4.18
if ( !Array.prototype.forEach ) {
  Array.prototype.forEach = function forEach( callback, thisArg ) {

    var T, k;

    if ( this == null ) {
      throw new TypeError( "this is null or not defined" );
    }

    // 1. Let O be the result of calling ToObject passing the |this| value as the argument.
    var O = Object(this);

    // 2. Let lenValue be the result of calling the Get internal method of O with the argument "length".
    // 3. Let len be ToUint32(lenValue).
    var len = O.length >>> 0; // Hack to convert O.length to a UInt32

    // 4. If IsCallable(callback) is false, throw a TypeError exception.
    // See: http://es5.github.com/#x9.11
    if ( {}.toString.call(callback) !== "[object Function]" ) {
      throw new TypeError( callback + " is not a function" );
    }

    // 5. If thisArg was supplied, let T be thisArg; else let T be undefined.
    if ( arguments.length >= 2 ) {
      T = thisArg;
    }

    // 6. Let k be 0
    k = 0;

    // 7. Repeat, while k < len
    while( k < len ) {

      var kValue;

      // a. Let Pk be ToString(k).
      //   This is implicit for LHS operands of the in operator
      // b. Let kPresent be the result of calling the HasProperty internal method of O with argument Pk.
      //   This step can be combined with c
      // c. If kPresent is true, then
      if ( k in O ) {

        // i. Let kValue be the result of calling the Get internal method of O with argument Pk.
        kValue = O[ k ];

        // ii. Call the Call internal method of callback with T as the this value and
        // argument list containing kValue, k, and O.
        callback.call( T, kValue, k, O );
      }
      // d. Increase k by 1.
      k++;
    }
    // 8. return undefined
  };
}

/**
 * @preserve Knuth and Plass line breaking algorithm in JavaScript
 * 
 * https://github.com/bramstein/typeset
 * 
 * Licensed under the new BSD License.
 * Copyright 2009-2010, Bram Stein
 * All rights reserved.
 */
if("undefined"===typeof Typeset){var Typeset={}}Typeset.LinkedList=(function(undefined){function LinkedList(){this.head=null;this.tail=null;this.listSize=0}LinkedList.Node=function(data){this.prev=null;this.next=null;this.data=data};LinkedList.Node.prototype.toString=function(){return this.data.toString()};LinkedList.prototype.isLinked=function(node){return !((node&&node.prev===null&&node.next===null&&this.tail!==node&&this.head!==node)||this.isEmpty())};LinkedList.prototype.size=function(){return this.listSize};LinkedList.prototype.isEmpty=function(){return this.listSize===0};LinkedList.prototype.first=function(){return this.head};LinkedList.prototype.last=function(){return this.last};LinkedList.prototype.toString=function(){return this.toArray().toString()};LinkedList.prototype.toArray=function(){var node=this.head,result=[];while(node!==null){result.push(node);node=node.next}return result};LinkedList.prototype.forEach=function(fun){var node=this.head;while(node!==null){fun(node);node=node.next}};LinkedList.prototype.contains=function(n){var node=this.head;if(!this.isLinked(n)){return false}while(node!==null){if(node===n){return true}node=node.next}return false};LinkedList.prototype.at=function(i){var node=this.head,index=0;if(i>=this.listLength||i<0){return null}while(node!==null){if(i===index){return node}node=node.next;index+=1}return null};LinkedList.prototype.insertAfter=function(node,newNode){if(!this.isLinked(node)){return this}newNode.prev=node;newNode.next=node.next;if(node.next===null){this.tail=newNode}else{node.next.prev=newNode}node.next=newNode;this.listSize+=1;return this};LinkedList.prototype.insertBefore=function(node,newNode){if(!this.isLinked(node)){return this}newNode.prev=node.prev;newNode.next=node;if(node.prev===null){this.head=newNode}else{node.prev.next=newNode}node.prev=newNode;this.listSize+=1;return this};LinkedList.prototype.push=function(node){if(this.head===null){this.unshift(node)}else{this.insertAfter(this.tail,node)}return this};LinkedList.prototype.unshift=function(node){if(this.head===null){this.head=node;this.tail=node;node.prev=null;node.next=null;this.listSize+=1}else{this.insertBefore(this.head,node)}return this};LinkedList.prototype.remove=function(node){if(!this.isLinked(node)){return this}if(node.prev===null){this.head=node.next}else{node.prev.next=node.next}if(node.next===null){this.tail=node.prev}else{node.next.prev=node.prev}this.listSize-=1;return this};LinkedList.prototype.pop=function(){var node=this.tail;this.tail.prev.next=null;this.tail=this.tail.prev;this.listSize-=1;node.prev=null;node.next=null;return node};LinkedList.prototype.shift=function(){var node=this.head;this.head.next.prev=null;this.head=this.head.next;this.listSize-=1;node.prev=null;node.next=null;return node};return LinkedList})();Typeset.linebreak=(function(){var linebreak=function(nodes,lines,settings){var options={demerits:{line:settings&&settings.demerits&&settings.demerits.line||10,flagged:settings&&settings.demerits&&settings.demerits.flagged||100,fitness:settings&&settings.demerits&&settings.demerits.fitness||3000},tolerance:settings&&settings.tolerance||2},activeNodes=new Typeset.LinkedList(),sum={width:0,stretch:0,shrink:0},lineLengths=lines,breaks=[],tmp={data:{demerits:Infinity}};function breakpoint(position,demerits,ratio,line,fitnessClass,totals,previous){return{position:position,demerits:demerits,ratio:ratio,line:line,fitnessClass:fitnessClass,totals:totals||{width:0,stretch:0,shrink:0},previous:previous}}function computeCost(start,end,active,currentLine){var width=sum.width-active.totals.width,stretch=0,shrink=0,lineLength=currentLine<lineLengths.length?lineLengths[currentLine-1]:lineLengths[lineLengths.length-1];if(nodes[end].type==="penalty"){width+=nodes[end].width}if(width<lineLength){stretch=sum.stretch-active.totals.stretch;if(stretch>0){return(lineLength-width)/stretch}else{return linebreak.infinity}}else{if(width>lineLength){shrink=sum.shrink-active.totals.shrink;if(shrink>0){return(lineLength-width)/shrink}else{return linebreak.infinity}}else{return 0}}}function computeSum(breakPointIndex){var result={width:sum.width,stretch:sum.stretch,shrink:sum.shrink},i=0;for(i=breakPointIndex;i<nodes.length;i+=1){if(nodes[i].type==="glue"){result.width+=nodes[i].width;result.stretch+=nodes[i].stretch;result.shrink+=nodes[i].shrink}else{if(nodes[i].type==="box"||(nodes[i].type==="penalty"&&nodes[i].penalty===-linebreak.infinity&&i>breakPointIndex)){break}}}return result}function mainLoop(node,index,nodes){var active=activeNodes.first(),next=null,ratio=0,demerits=0,candidates=[],badness,currentLine=0,tmpSum,currentClass=0,fitnessClass,candidate,newNode;while(active!==null){candidates=[{demerits:Infinity},{demerits:Infinity},{demerits:Infinity},{demerits:Infinity}];while(active!==null){next=active.next;currentLine=active.data.line+1;ratio=computeCost(active.data.position,index,active.data,currentLine);if(ratio<-1||(node.type==="penalty"&&node.penalty===-linebreak.infinity)){activeNodes.remove(active)}if(-1<=ratio&&ratio<=options.tolerance){badness=100*Math.pow(Math.abs(ratio),3);if(node.type==="penalty"&&node.penalty>=0){demerits=Math.pow(options.demerits.line+badness+node.penalty,2)}else{if(node.type==="penalty"&&node.penalty!==-linebreak.infinity){demerits=Math.pow(options.demerits.line+badness-node.penalty,2)}else{demerits=Math.pow(options.demerits.line+badness,2)}}if(node.type==="penalty"&&nodes[active.data.position].type==="penalty"){demerits+=options.demerits.flagged*node.flagged*nodes[active.data.position].flagged}if(ratio<-0.5){currentClass=0}else{if(ratio<=0.5){currentClass=1}else{if(ratio<=1){currentClass=2}else{currentClass=3}}}if(Math.abs(currentClass-active.data.fitnessClass)>1){demerits+=options.demerits.fitness}demerits+=active.data.demerits;if(demerits<candidates[currentClass].demerits){candidates[currentClass]={active:active,demerits:demerits,ratio:ratio}}}active=next;if(active!==null&&active.data.line>=currentLine){break}}tmpSum=computeSum(index);for(fitnessClass=0;fitnessClass<candidates.length;fitnessClass+=1){candidate=candidates[fitnessClass];if(candidate.demerits<Infinity){newNode=new Typeset.LinkedList.Node(breakpoint(index,candidate.demerits,candidate.ratio,candidate.active.data.line+1,fitnessClass,tmpSum,candidate.active));if(active!==null){activeNodes.insertBefore(active,newNode)}else{activeNodes.push(newNode)}}}}}activeNodes.push(new Typeset.LinkedList.Node(breakpoint(0,0,0,0,0,undefined,null)));nodes.forEach(function(node,index,nodes){if(node.type==="box"){sum.width+=node.width}else{if(node.type==="glue"){if(index>0&&nodes[index-1].type==="box"){mainLoop(node,index,nodes)}sum.width+=node.width;sum.stretch+=node.stretch;sum.shrink+=node.shrink}else{if(node.type==="penalty"&&node.penalty!==linebreak.infinity){mainLoop(node,index,nodes)}}}});if(activeNodes.size()!==0){activeNodes.forEach(function(node){if(node.data.demerits<tmp.data.demerits){tmp=node}});while(tmp!==null){breaks.push({position:tmp.data.position,ratio:tmp.data.ratio});tmp=tmp.data.previous}return breaks.reverse()}return[]};linebreak.infinity=10000;linebreak.glue=function(width,stretch,shrink){return{type:"glue",width:width,stretch:stretch,shrink:shrink}};linebreak.box=function(width,value){return{type:"box",width:width,value:value}};linebreak.penalty=function(width,penalty,flagged){return{type:"penalty",width:width,penalty:penalty,flagged:flagged}};return linebreak})();

	

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
			batchId: parseInt(auditions[i].Photo.BatchId),
			dateTaken: new Date(auditions[i].Photo.DateTaken.replace(' ', 'T')), 
			ts: auditions[i].Photo.TS,
			// orientationLabel: (auditions[i].Photo.H>auditions[i].Photo.W ? 'portrait' : ''),
			origW: auditions[i].Photo.W,
			origH: auditions[i].Photo.H,
		}, auditions[i].Photo.Img.Src);
		// fix bad data
		if (parsedAuditions[id].H > parsedAuditions[id].W
				&& parsedAuditions[id].origH < parsedAuditions[id].origW
				&& parsedAuditions[id].Orientation < 4 )
		{
			parsedAuditions[id].origW = auditions[i].Photo.H; 
			parsedAuditions[id].origH = auditions[i].Photo.W;
			console.warn("origW/H flipped for id="+id);
		}
	}
	CFG['util'].Auditions = parsedAuditions;	// make global
}
/*
 * for json by XHR instead of iframe, public photos only
 */
Util.getCC = function(src, success){
	/*
	 * POST should include begin/end timestamps to filter photostream
	 */
	$('body').addClass('wait');
	var qs = {'debug':0};
	$.ajax({
		url: src,
		data: qs,
		dataType: 'json',
		success: function(json, status, o){
			$('body').removeClass('wait');
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
Util.tokenReplace = function(string, prefix, tokens) {
	for (var i in tokens) {
		string = string.replace(prefix+i,tokens[i]);
	}
	var empty=new RegExp('\\'+prefix+'\\w*\\s{0,1}','g');
	string = string.replace(empty, '' );
	return string;
}

CFG['util'] = $.extend(CFG['util'] || {}, Util);
Util = CFG['util'];

var ImageMontage = function(cfg){
	this.cfg = {};
	this.init(cfg);
	ImageMontage.instance = this;
	return this;
}

// static method
ImageMontage.instance = null;
ImageMontage.render = function(auditions, container){
	/*
	 * this is the entrypoint into the imagemontage render
	 * called by Util.documentReady.snaps
	 */
	var PERPAGE = 32; // set in Util.documentReady.snaps(?)
	if ($('iframe#json').length) {
		// called repeatedly, use iframe_fetch
		var url = $('iframe#json').attr('src');
		var named = Util.getNamedParams(url),
			cfg = {url:url, perpage:named.perpage || PERPAGE};
		if (!ImageMontage.instance) ImageMontage.instance = new ImageMontage(cfg);
		// call renderAll instead of show()
		ImageMontage.instance.setRequestComplete();
		ImageMontage.instance.renderAll(named.page || 1, true, ImageMontage.instance);
	} else {
		// called once, use xhr_fetch
		var cfg = {url:PAGE.src, perpage:PERPAGE};
		var named = Util.getNamedParams(cfg.url);
		if (named.page) cfg.page = named.page;
		if (named.perpage) cfg.perpage = named.perpage;
		if (named.size) cfg.targetHeight = named.size;
		ImageMontage.instance = new ImageMontage(cfg);
		ImageMontage.instance.show();
	}
}
ImageMontage.iframe_fetch = function(options){
	var src = $('iframe#json').attr('src');
	var named = {};
	if (options.page) named.page = options.page;
	if (options.perpage) named.perpage = options.perpage;
	src = Util.setNamedParams(src, named);
	$('iframe#json').attr('src', src);
}
ImageMontage.prototype = {
	init: function(cfg){
		/*
		 * p-code
		 * - call ImageMontage.render() 
		 * - call show()
		 * - call renderAll()
		 * - call xhr_fetch on new page
		 * - getCC/parseCC JSON reponse
		 * - auditions2objects()
		 * - _layoutThumbs()
		 * 
		 * onContainerScroll
		 * - changePage()
		 * - renderAll()
		 */
		var viewOptions = {
	        paginated: false,
	        // allowPaginatedToggle: false,
	        outerContainerSelector: '.gallery',
	        thumbsContainerSelector: '.stage-body',
	        thumbsMessageContainerSelector: '.gallery .paging_message',
	        constrainedWithinWindow: true,
	        // allowArrange: true,
	        // photoClickFunction: null,
	    };
	    var layoutOptions = {
			// Image montage settings:
            targetHeight: 100, // Each row of images will be at least this high
            targetWidth: 940, // Set large enough to accomodate the odd image that spans the entire screen width
            thumbsPerFetch: cfg.perpage || 15, // How many images to fetch in a batch for endless scrolling pages
            // thumbsPerPage: 30, // How many images per page when pagination is turned on
            showCaptions: true, // Should we overlay captions on top of images?
            space : {
				width: 15, // What spacing should we try to achieve between images
				stretch: 35, // How many pixels should the gap between images grow by at most?
				shrink: 50 // How many pixels should we allow that gap to shrink by (it can safely end up negative! images will have edges cropped) 
			},
			maxVertScale: 1.4 //What is the largest factor we should scale lines by vertically to fill gaps?
	    }
	    this.cfg = $.extend(viewOptions, layoutOptions, cfg);
	    if (PAGE.src) this.cfg.url = PAGE.src;
	    
       	var _paginated = false;
 	    // var _allowPaginatedToggle = this.cfg.allowPaginatedToggle;
        var _outerContainer = $(this.cfg.outerContainerSelector);
        var _thumbsContainer = $(this.cfg.thumbsContainerSelector);
        var _thumbsMessageContainer = $(this.cfg.thumbsMessageContainerSelector);
// 	        
        // var _thumbsContainerID = this.cfg.thumbsContainerSelector;
        // var _napTopContainerID = this.cfg.navTopContainerID;
	    // var _navTopContainer = _napTopContainerID.length > 0? $('#'+_napTopContainerID) : null;
        // var _thumbsMessageContainerID = this.cfg.thumbsMessageContainerID;
// 	        
        // var _navs;
	    // var _paginatedToggle;
        var _thumbsOnCurrentPage = 0;
        // var _pageType = this.cfg.pageType;
        // var _albumID = this.cfg.albumID;
        // var _albumKey = this.cfg.albumKey;
        // var _imageID = this.cfg.imageID;
        // var _customStartingImageID = this.cfg.customStartingImageID;
        // var _siteUser = this.cfg.siteUser;
        // var _guestPage = this.cfg.guestPage;
        // var _pageScope = this.cfg.pageScope;
        // var _community = this.cfg.community;
        // var _pageDrawBy = this.cfg.pageDrawBy;
        // var _pageTypeDetails = this.cfg.pageTypeDetails;
        // var _galleryStyle = this.cfg.galleryStyle;
        // var _lightboxSize = this.cfg.lightboxSize;
        var _totalNumberOfThumbs = parseInt(this.cfg.totalNumberOfThumbs);
        var _totalNumberOfPages = 1;
        var _currentPage = _paginated ? parseInt(this.cfg.currentPage) : 1;
        // var _imageIDs;
        // var _newPageRequested = false;
        // var _imageRequest;
        var _requestInProgress = false;
        var _constrainedWithinWindow = this.cfg.constrainedWithinWindow;
        // var _allowArrange = this.cfg.allowArrange;
        // var _photoClickFunction = this.cfg.photoClickFunction;
        var _resizeHandlerInitialized = false;
        var _scrollHandlerInitialized = false;
        var _scrolledToEnd = false;
        // var _source = this.cfg.source;
        var _newAlbum = false;
        // var _forceViewer = this.cfg.forceViewer;
        // var _forceFileName = this.cfg.forceFileName;
        var _initialRequest = true;
        var _firstShow = true;
	        
        // //IE < 9 does not support stretching backgrounds
        var _supportsBackgroundStretch = ('backgroundSize' in document.documentElement.style);
	        
        var targetHeight = this.cfg.targetHeight;
        var targetWidth = this.cfg.targetWidth;
        // var showCaptions = this.cfg.showCaptions;
        var space = this.cfg.space;
		var maxVertScale = this.cfg.maxVertScale;
	
		// //Fetch higher resolution images for retina displays:
		// var _sourceWidth, _sourceHeight, _sourceSize;
			
		var 
    		_last_layout_container_width = 0,
			_layout_y = 0;
		/**
		 * @param jquery container wrapper around images
		 * @param jquery images jquery array of img objects
		 */		
		var _layoutThumbs = function(container, layout_images) {
    		var 
    			containerWidth = container.outerWidth() - 15,
    			
    			linebreak = Typeset.linebreak;
    		
    		var
    			nodes = [],
    			breaks = [],
    			lines = [],
    			images = [],
    			i, point, r, lineStart = 0,
    			x;
    	
    		for (i = 0; i < layout_images.length; i++) {
    			var img_tag = layout_images.get(i);
    			    			
    			var image = {width: img_tag.getAttribute('data-orig-width') / img_tag.getAttribute('data-orig-height') * targetHeight, height: targetHeight, tag: img_tag};
    			
    			images.push(image);
    			
    			nodes.push(linebreak.box(image.width, image));
    	
    			if (i === layout_images.length - 1) {
    				nodes.push(linebreak.penalty(0, -linebreak.infinity, 1));
    			} else {
    				nodes.push(linebreak.glue(space.width, space.stretch, space.shrink));
    			}
    		};
    		
    		// Perform the line breaking
    		breaks = linebreak(nodes, [containerWidth], {tolerance: 100000});
    	
    		// Try again with a higher tolerance if the line breaking failed.
    		if (breaks.length === 0) {
    			breaks = linebreak(nodes, [containerWidth], {tolerance: 1000000});
    			// And again
    			if (breaks.length === 0) {
    				breaks = linebreak(nodes, [containerWidth], {tolerance: 10000000});
    			}
    		}

    		// Build lines from the line breaks found.
    		for (i = 1; i < breaks.length; i++) {
    			point = breaks[i].position,
    			r = breaks[i].ratio;
    	
    			for (var j = lineStart; j < nodes.length; j++) {
    				// After a line break, we skip any nodes unless they are boxes
    				if (nodes[j].type === 'box') {
    					lineStart = j;
    					break;
    				}
    			}
    			lines.push({ratio: r, nodes: nodes.slice(lineStart, point + 1), position: point});
    			lineStart = point;
    		}

    		lines.forEach(function (line) {
    			var	
    				lineImages = [],
    				imagesTotalWidth = 0,
    				lineHeight = 0;

    			// Filter out the spacers to just leave the images:
    			line.nodes.forEach(function (n, index, array) {
    				if (n.type === 'box') {
    					var image = n.value;
    					
    					imagesTotalWidth += image.width;
    					lineHeight = image.height > lineHeight ? image.height : lineHeight;
    					
    					lineImages.push(image);
    				}
    			});
    				
    			if (lineImages.length > 0) {
    				var 
    					spacing = lineImages.length <= 1 ? 0 : (containerWidth - imagesTotalWidth) / (lineImages.length - 1),
    					totalHorzCrop = 0, totalVertCrop = 0,
    					scale = 1;
    				
    				if (lineImages.length > 1) {
	    				// Do we have to crop images to fit on this line?
    					if (spacing < space.width) {
    						//Total up the crop so we can apply it proportionately to the images on the line
    						totalHorzCrop = (lineImages.length - 1) * (space.width - spacing);
    						
    						scale = 1;
    						
    						//We shrink enough that we can get perfect minimum spacing
    						spacing = space.width;
    					} else if (spacing > space.width) {
    						// We have to inflate the images to fit on the line
    						scale = (containerWidth - (lineImages.length - 1) * space.width) / imagesTotalWidth;
    							    						
    						spacing = (containerWidth - imagesTotalWidth * scale) / (lineImages.length - 1);
    					}
    				} else {
    					//Scale up or down (infinitely) to fill the line
    					scale = containerWidth / imagesTotalWidth;
    					spacing = 0;
    				}
    				
					//Do we have to overfill the line vertically in order to fill it horizontally?
					if (scale > maxVertScale) {
						totalVertCrop = lineHeight * scale - targetHeight * maxVertScale;
					}
    				
    				//Now lay out the images
    				x = 0;
    				
    				for (var i = 0; i < lineImages.length; i++) {
    					var 
    						image = lineImages[i],
	    					border = image.tag.parentNode,  // A or DIV
	    					photoBox = image.tag.parentNode.parentNode.parentNode, // LI
	    					imageHorzCrop = 0; 
    					
    					if (totalHorzCrop > 0) {
    						imageHorzCrop = (image.width / imagesTotalWidth) * totalHorzCrop;
    					} else if (scale != 1) {
    						image.width *= scale;
    						image.height *= scale;
    					}

    					image.tag.style.top = '0px';
    					photoBox.style.top = _layout_y + "px";

						if (i == lineImages.length - 1) {
	    					//The rightmost image should be flush with the right margin:
    						x = containerWidth - (image.width - imageHorzCrop);
    					}
							    					
    					photoBox.style.left = x + "px";

						if (!_supportsBackgroundStretch && image.tag.src.indexOf('/img/spacer.gif') > -1) {
							// On IE < 9 we will have to weaken the right click protection slightly by moving the image from the background to the src attribute
							image.tag.src = image.tag.style.backgroundImage.match(/url\((.+)\)/)[1];
							image.tag.style.backgroundImage = "none";
						}

    					if (image.tag.src.indexOf('/img/spacer.gif') > -1) {
	    					image.tag.style.backgroundSize = Math.round(image.width) + 'px ' + Math.round(image.height) + 'px';
	    					image.tag.style.backgroundPosition = -Math.floor(imageHorzCrop / 2) + "px " + -Math.floor(totalVertCrop / 2) + "px";
	    						
	    					image.tag.style.height = Math.round(image.height - totalVertCrop) + "px";
	    					image.tag.style.width = Math.round(image.width - imageHorzCrop) + "px";	    						
    					} else {
	    					image.tag.style.width = Math.round(image.width) + 'px';
	    					image.tag.style.height = Math.round(image.height) + 'px';
	    					
	    					// adjust img src prefix to actual dim
	    					var THUMB_SIZE, 
	    						maxDim = Math.max(image.width, image.height);
							if (maxDim <= 120) THUMB_SIZE='tn';
							else if (maxDim <= 240) THUMB_SIZE='bs';
							else if (maxDim <= 320) THUMB_SIZE='bm';
							else THUMB_SIZE='bp';
							image.tag.src = Util.getImgSrcBySize(image.tag.src,THUMB_SIZE);
		
    						border.style.height = Math.round(image.height - totalVertCrop) + "px";
    						border.style.width = Math.round(image.width - imageHorzCrop) + "px";
    						
    						image.tag.style.left = -Math.floor(imageHorzCrop / 2) + "px";
    						image.tag.style.top = -Math.floor(totalVertCrop / 2) + "px";
    					}
    					
    					x += image.width - imageHorzCrop + spacing;
    				}
    				
    				_layout_y += lineHeight * scale - totalVertCrop + space.width;
    			}
    		});
    				
    		container.css('height',_layout_y + "px");
    	};		
    	
    	
    	var _relayoutThumbs = function() {
        	if (_thumbsContainer.outerWidth() !=_last_layout_container_width) {
        		_last_layout_container_width = _thumbsContainer.outerWidth();
	        	_layout_y = 0;
	    		_layoutThumbs(_thumbsContainer, _thumbsContainer.find('img'));
        	}
        };
        
    	_relayoutThumbs = Cowboy.throttle(250, _relayoutThumbs);
		
	    /**
         * The main render method for this view.
         * @param int pageNumber - the page number to render
         * @param bool resize - whether or not the container has been resized
         * @param object that - a reference to the intance of the current thumbnail view object.
         */
	    var _renderAll = function(pageNumber, resize, that) {
            _customStartingImageID = '';
            		            		            
            if((!resize || _firstShow || pageNumber != _currentPage || _newAlbum) && pageNumber <= _totalNumberOfPages && !_requestInProgress) {
            	_firstShow = false;
                _currentPage = pageNumber ? parseInt(pageNumber) : 1;
                _requestInProgress = true;
            	
            	
	            /**
				 * @param jquery addedImages, jquery object array of addedImages from auditions2objects()
				 */		
				var prepareLayout = function(addedImages){
			        var photosRemaining = 0;
			        
			        _totalNumberOfThumbs = parseInt(PAGE.jsonData.castingCall.CastingCall.Auditions.Total);
			        _currentPage = parseInt(PAGE.jsonData.castingCall.CastingCall.Auditions.Page);
			        // _imageIDs = pageDetails.imageIDs;
			        _totalNumberOfPages = parseInt(PAGE.jsonData.castingCall.CastingCall.Auditions.Pages);
			        _thumbsOnCurrentPage += parseInt(PAGE.jsonData.castingCall.CastingCall.Auditions.Audition.length);
			        photosRemaining = _totalNumberOfThumbs-_thumbsOnCurrentPage;
			        _requestInProgress = false;
			        
			        if(photosRemaining > 0) {
			            _thumbsMessageContainer.html( photosRemaining + ' photos remaining.');
			        }
			        else {
			            _thumbsMessageContainer.html('');
			        }
			        
			        if(addedImages.length) {
			            if(_newAlbum) {
			                _thumbsContainer.html('');
			            }
			            addedImages.appendTo(_thumbsContainer);
			            
			            /* Ensure there is a vertical scrollbar on the body, so that laying out images doesn't cause the image 
			             * container to shrink horizontally, which would invalidate the layout immediately.
			             */
			            var originalOverflowY = document.body.style["overflow-y"];
			            
			            if (originalOverflowY != "scroll") {
			            	document.body.style["overflow-y"] = "scroll";
			            }
			            
			            _layoutThumbs(_thumbsContainer, addedImages.find('img'));
			
			            if (originalOverflowY != "scroll") {
			            	document.body.style["overflow-y"] = originalOverflowY;
			            }
			        }
			        else if(_totalNumberOfThumbs == 0) {
			            _thumbsContainer.css('width', '100%');
			            _thumbsContainer.html('This is an empty gallery.');
			            _totalNumberOfPages = 1;
			        }
			        _thumbsContainer.triggerHandler('render');
			        _newAlbum = false;
			        _initialRequest = false;
				}
				
			    var handleFailure = function(o){
			        _requestInProgress = false;
			    }			
            	
            	
                var callback = {
                    'success': prepareLayout,
                    'failure': handleFailure,
                    'scope': that
                };
                
                /* 
                 * If fetching this page would leave a small remainder behind, roll that remainder into this fetch instead.
                 * 
                 * This prevents poor layout of the final page of thumbs in a gallery.
                 * 
                 * The API for choosing a page is pageSize/pageIndex, instead of pageSize/photoIndex, so
                 * so we have to get a bit creative to have our fetch begin at the right photo index. As a consequence, we're
                 * unable to roll page 3 into page 2.
                 */
                // var remainingThumbs = _totalNumberOfThumbs - _thumbsOnCurrentPage;
                // if ((_thumbsOnCurrentPage == 0 || _thumbsOnCurrentPage >= that.thumbsPerPage * 2) //If our hamstrung fetch could actually request more than 1 page worth of thumbs 
                		// && remainingThumbs > that.thumbsPerPage && remainingThumbs < that.thumbsPerPage * 1.5 /* And a standard fetch would leave a small remainder */) {
                	// if (_thumbsOnCurrentPage == 0) {
                		// that.thumbsPerPage = _totalNumberOfThumbs;
                	// } else {
	                	// // We start at the right place by just setting the page size to the index we want and then fetching the second page
	                	// that.thumbsPerPage = _thumbsOnCurrentPage;
	                	// _currentPage = 2;
                	// }
                // }
                if (PAGE.jsonData && PAGE.jsonData.castingCall && _currentPage == parseInt(PAGE.jsonData.castingCall.CastingCall.Auditions.Page)) {
                	// first load, and iframe.onload()
                	var images = that.auditions2objects(CFG['util'].Auditions, that.cfg.targetHeight );
					callback.success.call(callback.scope, images);
                }
                else {
                	_thumbsMessageContainer.html( _thumbsMessageContainer.html() + ' Loading more thumbnails...');
                	that.xhr_fetch({page:_currentPage, perpage:that.cfg.thumbsPerFetch}, callback, that);
                }
            }
        }
        this.renderAll = _renderAll;	// expose this method so this.show() has access
        
        
        /**
         * Returns the container height
         */
        var _getContainerHeight = function() {
            var height;
            var containerHeight;
            
            if(_constrainedWithinWindow) {
                height = _getWindowHeight();
                containerHeight = height-(_outerContainer.outerHeight());
            }
            else {
                containerHeight = _outerContainer.outerHeight();
            }
            
            return containerHeight;
        };	
        /**
         * Returns the browser window height
         */
        var _getWindowHeight = function() {
            if (window.innerHeight) {
                return window.innerHeight;
            }
            else if (document.documentElement && document.documentElement.clientHeight) {
                return document.documentElement.clientHeight;
            }
            else if (document.body) {
                return document.body.clientHeight;
            }
            
            return 0;
        };
        /**
         * Returns the scrollTop of the container.
         */
        var _getScrollTop = function() {
            
            if(_constrainedWithinWindow) {
                if(window.pageYOffset) {
                    return window.pageYOffset;
                }
                
                if(document.documentElement) {
                    return document.documentElement.scrollTop;
                }
                
                if(document.body) {
                    return document.body.scrollTop;
                }
            }
            else {
                return _outerContainer.scrollTop();
            }           
        };
        var _setScrollTop = function(value) {
	        	
            if(_constrainedWithinWindow) {
                if(window.pageYOffset) {
                    window.pageYOffset = value;
                }
                
                if(document.documentElement) {
                    document.documentElement.scrollTop = value;
                }
                
                if(document.body) {
                    document.body.scrollTop = value;
                }
            }
            else {
                _outerContainer.scrollTop(value);
            }           
        };
        
        /*****************************************
	     * "Public" Methods
	     * 	declare here for access to private vars
	     *****************************************/
        this.removeEventListeners = function() {
	        if(!_paginated) {
	            if(_constrainedWithinWindow) {
	                // YE.removeListener(window, 'scroll', this.onContainerScroll);
	                $(window).off('scroll',this.onContainerScroll);
	            }
	            else {
	                // YE.removeListener(_outerContainer, 'scroll', this.onContainerScroll);
	                _outerContainer.off('scroll',this.onContainerScroll);
	            }
	            
	            _scrollHandlerInitialized = false;
	        }
	   };
	    
	   this.setupEventListeners = function() {
	        if(_constrainedWithinWindow && !_resizeHandlerInitialized) {
	            // YAHOO.util.Event.addListener(window, 'resize', this.onWindowResize, this);
	            $(window).on('resize',$.proxy(this.onWindowResize, this));
	            _resizeHandlerInitialized = true;
	        }
	        
	        if(!_paginated && !_scrolledToEnd && !_scrollHandlerInitialized) {
	            if(_constrainedWithinWindow) {
	                // YAHOO.util.Event.addListener(window, 'scroll', this.onContainerScroll, this);
	                $(window).on('scroll',$.proxy(this.onContainerScroll, this));
	            }
	            else {
	                // YAHOO.util.Event.addListener(_outerContainer, 'scroll', this.onContainerScroll, this);
	                _outerContainer.on('scroll',$.proxy(this.onContainerScroll, this));
	            }
	            
	            _scrollHandlerInitialized = true;
	        }
	        
	        _thumbsContainer.one('render', ImageMontage.onFirstRender);
	        _thumbsContainer.bind('render', ImageMontage.onRender);
		};
        
        
        /**
         * Called on the scroll event of the container element.  Used only in the non-paginated mode.
         * When the scroll threshold is reached a new page of thumbs is requested.
         * @param event e - the scroll event object
         * @param object that - an object reference to the allthumbs view instance.
         */
        this.onContainerScroll = function(e, that) {
        	that = that || this;		// using $.proxy()
            var containerHeight = _thumbsContainer.outerHeight();//_outerContainer.outerHeight;
            var outerContainerHeight = _constrainedWithinWindow? _getWindowHeight() : _outerContainer.outerHeight();//_getWindowHeight()
            var scrollTop = _getScrollTop();
            
            if((containerHeight-scrollTop) <= outerContainerHeight && (_currentPage+1) <= _totalNumberOfPages) {
                that.changePage(_currentPage+1);
            }
            
            if((_currentPage+1) > _totalNumberOfPages && !_initialRequest) {
                if(_constrainedWithinWindow) {
                    // YE.removeListener(window, 'scroll', that.onContainerScroll);
                    $(window).off('scroll',that.onContainerScroll);
                }
                else {
                    // YE.removeListener(_outerContainer, 'scroll', that.onContainerScroll);
                    _outerContainer.off('scroll',that.onContainerScroll);
                }
                
                _scrollHandlerInitialized = false;
                _scrolledToEnd = true;
            }
        };
        
        /**
         * Called on resize of the container.
         */
        this.onWindowResize = function(e, that) {
        	that = that || this;		// using $.proxy()
            that.resize.call(that);
        };
        
        /**
         * Returns the current page
         */
        this.getCurrentPage = function() {
            return _currentPage;
        };
        /**
         * set the request complete (from iframe_load)
         */
        this.setRequestComplete = function() {
             _requestInProgress = false;
        };
        /**
         * Change gallery page based on finding an image id rather than
         *  a specific page.
         */
        this.changePageWithImage = function(imageID) {
            if(_paginated) {
                _customStartingImageID = imageID;
                _renderAll(_currentPage, false, this);
            }
        };
	    
        /**
         * Change the gallery page.
         */
        this.changePage = function(page) {
        	if (_paginated && _getScrollTop() > _getContainerHeight())
        		_setScrollTop(0);
        	if ($('iframe#json').length) {
        		// fetch BEFORE renderAll()
        		ImageMontage.iframe_fetch({page:page});
        	}  
            else _renderAll(page, false, this);
        };    
        
        
        /**
         * Resize the container.
         */
        this.resize = function() {
        	_relayoutThumbs();
        	
            _renderAll(_currentPage, true, this);
        };
        
        // Set up event listeners   
        this.setupEventListeners();
	},  // end init()
	
	
	show: function() {
        this.renderAll(1, true, this);
    },
    
	/******************************
	 * snappi specific methods 
	 ******************************/
	/**
	 * @param string url
	 * @param object options
	 * @param callback {success:, failure:, scope:} 
	 * @param object that, self-reference
	 */
	xhr_fetch: function(options, callback, that){
		var named = {}
		if (options.page) named.page = options.page;
		if (options.perpage) named.perpage = options.perpage;
		url = Util.setNamedParams(that.cfg.url, named);
		CFG['util'].getCC(url, function(json){
			// json.success = true
			CFG['util'].parseCC(json.response.castingCall);
			var images = that.auditions2objects(CFG['util'].Auditions );
			callback.success.call(callback.scope, images);
		});				
	},
	/**
	 * create DOM from auditions
	 * @return jquery array of IMG objects  
	 */
	auditions2objects: function(auditions, targetHeight){
		/*
		 * p-code
		 * 1. add div.photo > div.photo_container_th > div.photoLink > img markup to container
		 * 
		 * <img  alt="" 
		 * src="http://www.sherlockphotography.org/photos/i-LRT2xP6/3/3640x510/i-LRT2xP6-3640x510.jpg" 
		 * title="" 
		 * style="margin-top: 0px;" 
		 * onmousedown="pickPhoto(this, event);" 
		 * data-orig-height="3840" 
		 * data-orig-width="5760">
		 */
		
		auditions = auditions || CFG['util'].Auditions;
		var audition, img, thumbnail, container,
			THUMB_SIZE = 'bs',
			addedImageTags = [];
		var markup = '',
			thumbnail_markup = '<div id=":id" class="photo"><div class="photo_container_th"><div class="photoLink">:img_markup</div></div></div>',
			img_markup = "<img class=':orientationLabel' src=':src' title=':title' width=':width' height=':height' data-dateTaken=':dateTaken' data-batchId=':batchId' data-score=':score' data-caption=':caption' data-orig-width=':origW'  data-orig-height=':origH'>";
			
		if (targetHeight){
			var targetWidth = 1.4*targetHeight;
			if (targetWidth <= 120) THUMB_SIZE='tn';
			else if (targetWidth <= 240) THUMB_SIZE='bs';
			else if (targetWidth <= 320) THUMB_SIZE='bm';
			else if (targetWidth <= 640) THUMB_SIZE='bp';
		}  
		
		var	max, 
			lookup_scale = {
				'tn':120,
				'bs':240,
				'bm':320,
				'bp':640,
			},
			scale=lookup_scale[THUMB_SIZE], 
			baseurl = PAGE.jsonData.castingCall.CastingCall.Auditions.Baseurl;
		
		for (var i in auditions) {
			audition = auditions[i];
			max = Math.max(audition.W, audition.H);
			audition.width = audition.W * (scale/max);
			audition.height = audition.H * (scale/max);
			audition.src = Util.getImgSrcBySize(baseurl + audition.rootSrc, THUMB_SIZE);
			audition.orientationLabel =  (audition.H > audition.W) ? 'portrait' : '';
			img = Util.tokenReplace(img_markup,':',audition);
			thumbnail = Util.tokenReplace(thumbnail_markup,':',{id:audition.id, img_markup: img} );
			markup += thumbnail;
		}
		return $(markup);
	},
		
}


ImageMontage.documentReady = function () {
}

ImageMontage.onRender = function() {
	// console.info("render");
}

ImageMontage.onFirstRender = function() {
	// console.info("first render");
	var MARGIN_PADDING = 80;
	$('.gallery').css('width','100%').css('max-width', $(window).width()-MARGIN_PADDING+'px');
			
	$('.gallery .curtain').remove(); 
	$('body').removeClass('wait');
}



CFG['flickr'] = ImageMontage;		// make global


})();  
// end module closure