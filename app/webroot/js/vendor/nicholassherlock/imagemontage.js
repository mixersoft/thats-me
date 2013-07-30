/* 
 * In galleries using the Thumbnail style, and with a search keyword of "montage" added, replaces the thumbnails with an image montage.
 * 
 * This section is to be placed in your Bottom JavaScript.
 * 
 * This is version 1.2
 * 
 * By Nicholas Sherlock / Sherlock Photography 2013, http://dgrin.com/showthread.php?t=235991
 */

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

if (typeof SM.AllThumbsStretch !== 'undefined' && Sizzle("meta[name=keywords]").length > 0 && Sizzle("meta[name=keywords]")[0].content.indexOf("montage") > -1)
(function() {
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

	SM.AllThumbsStretch.View.prototype = {
	    init: function(config) {
	        /**
	         * "Private" Properties
	         */
	        var _defaultConfig = {
	            currentPage: 1,
           		navTopContainerID: '',
	            imageID: '000000',
	            siteUser: '',
	            guestPage: true,
	            customStartingImageID: '',
	            pageScope: '',
	            community: '',
	            pageDrawBy: '',
	            pageTypeDetails: '',
	            lightboxSize: 'Medium',
	            totalNumberOfThumbs: 1,
	            galleryStyle: 'allthumbs_stretch',
	            source: '',
	            forceViewer: false,
	            forceFileName: false,

	            // Image montage settings:
	            targetHeight: 280, // Each row of images will be at least this high
	            targetWidth: 2000, // Set large enough to accomodate the odd image that spans the entire screen width
	            thumbsPerFetch: 15, // How many images to fetch in a batch for endless scrolling pages
	            thumbsPerPage: 30, // How many images per page when pagination is turned on
	            showCaptions: true, // Should we overlay captions on top of images?
	            space : {
    				width: 15, // What spacing should we try to achieve between images
    				stretch: 35, // How many pixels should the gap between images grow by at most?
    				shrink: 50 // How many pixels should we allow that gap to shrink by (it can safely end up negative! images will have edges cropped) 
    			},
    			maxVertScale: 1.4 //What is the largest factor we should scale lines by vertically to fill gaps?
	        };
	        	        	        
	        var _viewConfig = YAHOO.lang.merge(_defaultConfig, config);
	        
	        if (typeof image_montage_config !== 'undefined') {
	        	_viewConfig = YAHOO.lang.merge(_viewConfig, image_montage_config);
	        }
	        
    	    var _paginated = _viewConfig.paginated;
     	    var _allowPaginatedToggle = _viewConfig.allowPaginatedToggle;
	        var _outerContainer = YD.get(_viewConfig.outerContainerID);
	        var _thumbsContainerID = _viewConfig.thumbsContainerID;
	        var _thumbsContainer = YD.get(_thumbsContainerID);
     	    var _napTopContainerID = _viewConfig.navTopContainerID;
    	    var _navTopContainer = _napTopContainerID.length > 0? YD.get(_napTopContainerID) : null;
	        var _thumbsMessageContainerID = _viewConfig.thumbsMessageContainerID;
	        var _thumbsMessageContainer = YD.get(_thumbsMessageContainerID);
	        var _navs;
    	    var _paginatedToggle;
	        var _thumbsOnCurrentPage = 0;
	        var _pageType = _viewConfig.pageType;
	        var _albumID = _viewConfig.albumID;
	        var _albumKey = _viewConfig.albumKey;
	        var _imageID = _viewConfig.imageID;
	        var _customStartingImageID = _viewConfig.customStartingImageID;
	        var _siteUser = _viewConfig.siteUser;
	        var _guestPage = _viewConfig.guestPage;
	        var _pageScope = _viewConfig.pageScope;
	        var _community = _viewConfig.community;
	        var _pageDrawBy = _viewConfig.pageDrawBy;
	        var _pageTypeDetails = _viewConfig.pageTypeDetails;
	        var _galleryStyle = _viewConfig.galleryStyle;
	        var _lightboxSize = _viewConfig.lightboxSize;
	        var _totalNumberOfThumbs = parseInt(_viewConfig.totalNumberOfThumbs);
	        var _totalNumberOfPages = 1;
	        var _currentPage = _paginated? parseInt(_viewConfig.currentPage) : 1;
	        var _imageIDs;
	        var _newPageRequested = false;
	        var _imageRequest;
	        var _requestInProgress = false;
	        var _constrainedWithinWindow = _viewConfig.constrainedWithinWindow;
	        var _allowArrange = _viewConfig.allowArrange;
	        var _photoClickFunction = _viewConfig.photoClickFunction;
	        var _resizeHandlerInitialized = false;
	        var _scrollHandlerInitialized = false;
	        var _scrolledToEnd = false;
	        var _source = _viewConfig.source;
	        var _newAlbum = false;
	        var _forceViewer = _viewConfig.forceViewer;
	        var _forceFileName = _viewConfig.forceFileName;
	        var _initialRequest = true;
	        var _firstShow = true;
	        
	        //IE < 9 does not support stretching backgrounds
	        var _supportsBackgroundStretch = ('backgroundSize' in document.documentElement.style);
	        
            var targetHeight = _viewConfig.targetHeight;
            var targetWidth = _viewConfig.targetWidth;
            var showCaptions = _viewConfig.showCaptions;
            var space = _viewConfig.space;
			var maxVertScale = _viewConfig.maxVertScale;
	
    		//Fetch higher resolution images for retina displays:
    		var _sourceWidth, _sourceHeight, _sourceSize;
			
    		var 
    			_thumb_regex1 = new RegExp("\\/Th\\/","g"),
    			_thumb_regex2 = new RegExp("-Th((-[0-9]+)?\\.[a-z]{3}\")","g");
	
    		var 
	    		_last_layout_container_width = 0,
				_layout_y = 0;
	        
	        
	        SM.AllThumbsStretch.photoClickFunction = _photoClickFunction;
	        
	        /***********************************
	         * "Public" Properties
	         ***********************************/
		    this.thumbsPerPage = _viewConfig.paginated ? _viewConfig.thumbsPerPage : _viewConfig.thumbsPerFetch;
	        this.totalNumberOfThumbs = _viewConfig.totalNumberOfThumbs;
    		this.totalNumberOfPages = 0;
	        
	        /***********************************
	         * "Private" Methods
	         ***********************************/

    		var _layoutThumbs = function(container, img_tags) {
	    		var 
	    			containerWidth = container.offsetWidth - 15,
	    			
	    			linebreak = Typeset.linebreak;
	    		
	    		var
	    			nodes = [],
	    			breaks = [],
	    			lines = [],
	    			images = [],
	    			i, point, r, lineStart = 0,
	    			x;
	    	
	    		for (i = 0; i < img_tags.length; i++) {
	    			var img_tag = img_tags[i];
	    			    			
	    			var image = {width: img_tag.getAttribute('data-orig-width') / img_tag.getAttribute('data-orig-height') * targetHeight, height: targetHeight, tag: img_tag};
	    			
	    			images.push(image);
	    			
	    			nodes.push(linebreak.box(image.width, image));
	    	
	    			if (i === img_tags.length - 1) {
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
		    					border = image.tag.parentNode,
		    					photoBox = image.tag.parentNode.parentNode.parentNode,
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
	    				
	    		container.style.height = _layout_y + "px";
	    	};
	    		    	
	        var _relayoutThumbs = function() {
	        	if (_thumbsContainer.offsetWidth !=_last_layout_container_width) {
	        		_last_layout_container_width = _thumbsContainer.offsetWidth;
		        	_layout_y = 0;
		    		_layoutThumbs(_thumbsContainer, YD.getElementsByClassName("imgBorder", "img", _thumbsContainerID));
	        	}
	        };
	        
	    	_relayoutThumbs = Cowboy.throttle(250, _relayoutThumbs);
    		
	        /**
	         * Calculates the total number of pages.
	         */
	        var _calculateNumberOfPages = function(numberPerPage) {
	            return Math.ceil(_totalNumberOfThumbs/numberPerPage);
	        };
	        
	        /**
	         * Makes a call to /rpc/gallery.mg to get the thumbnail data and html.
	         * @param Array postArray - Default post data
	         * @param object callback - Success and Failure callback functions
	         */
	        var _callGalleryRPC = function(postArray, callback, that) {
	            postArray.pageOn = _currentPage;
	            postArray.pageType = _pageType;
	            postArray.AlbumID = _albumID;
	            postArray.AlbumKey = _albumKey;
	            postArray.ImageID = _imageID;
	        
	            if (_siteUser.length > 0) {
	                postArray.siteUser = _siteUser;
	            }
	            
	            postArray.photoClickFunction = (typeof _photoClickFunction === 'function')? 'SM.AllThumbsStretch.handlePhotoClick' : '';
	            postArray.allowArrange = _allowArrange;
	            postArray.guestPage = _guestPage;
	            postArray.pageScope = _pageScope;
	            postArray.community = _community;
	            postArray.pageDrawBy = _pageDrawBy;
	            postArray.pageTypeDetails = _pageTypeDetails;
	            postArray.galleryStyle = _galleryStyle;
	            postArray.photosPerPage = that.thumbsPerPage;
	            postArray.photoSizes = 'all';
	            postArray.thumbSize = 'Thumb';
	            postArray.lightboxSize = _lightboxSize;
	            postArray.source = _source;
	            postArray.forceViewer = _forceViewer;
	            postArray.forceFileName = _forceFileName;
	        
	            var postData = "tool=allThumbsStretch";
	        
	            for (var i in postArray) {
	                postData += "&" + i + "=" + postArray[i];
	            }
	        
	            var url = "/rpc/gallery.mg";
	        
	            // cancel previous call if necessary
	            if (typeof _imageRequest === 'object') {
	                YAHOO.util.Connect.abort(_imageRequest);
	            }
	        
	            _imageRequest = YAHOO.util.Connect.asyncRequest('POST', url, callback, postData);
	        };
	        
	        // Clean up the tags which have been added to the DOM that SM returned for thumbnails, and enhance with information from the image data.
	        // Returns an array of enhanced <img> tags
	        var _prepSmugMugImageTags = function(returnedData) {
	        	var addedImageTags = [];
	        	
	            //Be sure to process the elements in document order, not the order in returnedData
				YD.getElementsByClassName("photo", "div", "photos", function(box) {
					var imageID = box.className.match(/photoBox_(\d+)/)[1];

					if (typeof returnedData.Images[imageID] !== 'undefined') {
						var image = returnedData.Images[imageID];
					
						var imageTags = box.getElementsByTagName("img");
						
						for (var i = 0; i < imageTags.length; i++) {
							var imageTag = imageTags[i];
							
							imageTag.setAttribute('data-orig-height', image.OriginalHeight);
							imageTag.setAttribute('data-orig-width', image.OriginalWidth);

							YD.addClass(imageTag.parentNode, "imgBorder");
							
							addedImageTags.push(imageTag);
						}
						
						//SmugMug returns tragically short captions in the HTML, beef them up a bit
						YD.getElementsByClassName("caption", "div", box, function(caption) {
							if (showCaptions && image.caption) {
								caption.innerHTML = image.caption;
							} else {
								//SmugMug generates empty caption elements for empty captions, which we do not want:
								caption.parentNode.removeChild(caption);
							}
						});
					}
				});
				
				return addedImageTags;
	        };

	        /**
	         * Sets up necessary variables and renders the paginated All Thumbs view.
	         */
	        var _renderPaginated = function(pageNumber, resize, that) {
	            var postArray = [];
	            
	            if (resize || _firstShow) {
	                _totalNumberOfPages = _calculateNumberOfPages(that.thumbsPerPage);
	            }
	            
	            _newPageRequested = false;
	                                   
	            if(pageNumber < 1) {
	                pageNumber = 1;
	            }
	            else if(pageNumber > _totalNumberOfPages) {
	                pageNumber = _totalNumberOfPages;
	            }
	
	            var handleSuccess = function(o){
	                if (o.responseText !== undefined){
	                    try {
	                        var returnedData = YAHOO.lang.JSON.parse(o.responseText);
	                    }
	                    catch (x) {
	                        alert("JSON Parse failed!");
	                        return;
	                    }
	                    
						returnedData.thumbHTML = returnedData.thumbHTML.replace(_thumb_regex1, "/" + _sourceSize + "/");
						returnedData.thumbHTML = returnedData.thumbHTML.replace(_thumb_regex2, "-" + _sourceSize + "$1");
	                            
	                    var pageDetails = returnedData.pageDetails;
	                    var newThumbsOnPage = 0;
	                    var tempImages = returnedData.Images;
	                    var newPage;
	                    
	                    _totalNumberOfThumbs = parseInt(pageDetails.totalNumberOfThumbs);
	                    newPage = parseInt(pageDetails.pageOn);
	                    pageOn = _currentPage;
	                    _imageIDs = pageDetails.imageIDs;
	                    _totalNumberOfPages = _calculateNumberOfPages(that.thumbsPerPage);
	                    newThumbsOnPage = parseInt(pageDetails.numberOfThumbsOnPage);
	                    
	                    // If this was a new page, or a new thumb size, or the number of thumbs on the page has changed
	                    if(newPage != _currentPage || _newPageRequested || _thumbsOnCurrentPage != newThumbsOnPage) {
	                        _newPageRequested = false;
	                        _thumbsOnCurrentPage = newThumbsOnPage;
	                        
	                        if(returnedData.thumbHTML && returnedData.thumbHTML != 'undefined' && returnedData.thumbHTML.length > 0) {
	                            _thumbsContainer.innerHTML = returnedData.thumbHTML;
	                        }
	                    }
	                    
	                    _currentPage = newPage;
	                    
	                    // Load up the photoInfo.  This is very important since many of the ajax gallery js functions rely on this array.
	                    //  I wish this there wasn't such a heavy reliance on this, but that's the way it is.
	                    for (var i in tempImages) {
	                        if (!photoInfo[i]) {
	                            photoInfo.size++;
	                        }
	        
	                        photoInfo[i] = tempImages[i];
	                    }
	                    
	                    // Draw the gallery navigation and pagination toggle.
	                    _drawGalleryNav(that);
	                    _drawPaginatedToggle();
	                    _updateFavorites();
	                    
	                    if(_totalNumberOfPages == 1) {
	                        YD.setStyle(_napTopContainerID, 'display', 'none');
	                        YD.setStyle("pageNavigation_bottom", 'display', 'none');
	                    }
	                    else {
	                        YD.setStyle(_napTopContainerID, 'display', 'block');
	                        YD.setStyle("pageNavigation_bottom", 'display', 'block');
	                    }
	                    
	                    var addedImageTags = _prepSmugMugImageTags(returnedData);
	                    
	                    /* Ensure there is a vertical scrollbar on the body, so that laying out images doesn't cause the image 
	                     * container to shrink horizontally, which would invalidate the layout immediately.
	                     */
	                    var originalOverflowY = document.body.style["overflow-y"];
	                    
	                    if (originalOverflowY != "scroll") {
	                    	document.body.style["overflow-y"] = "scroll";
	                    }
	                    
	                    //We're rendering from scratch each time:
	                    _layout_y = 0;
	                    
	                    _layoutThumbs(_thumbsContainer, addedImageTags);
	
	                    if (originalOverflowY != "scroll") {
	                    	document.body.style["overflow-y"] = originalOverflowY;
	                    }                    
	                }
	            };
	        
	            var handleFailure = function(o){
	                
	            };
	        
	            var callback = {
	                'success': handleSuccess,
	                'failure': handleFailure,
	                'scope': this
	            };
	            
	            // Only make the rpc call if this is a new page, or the number of thumbs per page has changed, or if we are starting on a custom image id.
	            if (_firstShow || _currentPage != pageNumber || _customStartingImageID.length > 0) {
	            	_firstShow = false;
	            	
	                if (_currentPage != pageNumber) {
	                    _newPageRequested = true;
	                }
	                
	                _currentPage = parseInt(pageNumber);
	                
	                that.totalNumberOfPages = _totalNumberOfPages;
	                
	                if (_totalNumberOfThumbs > 0) { 
	                    ajaxThrobber('on');
	                }
	            
	                var hashInfo = SM.navigation.getAjaxHashInfo(getHash());
	                if (hashInfo.page && hashInfo.photosPerPage != that.thumbsPerPage) {
	                    postArray.convertPosition = ((hashInfo.page - 1) * hashInfo.photosPerPage) + 1;
	                }
	            
	                if (pageNumber && pageNumber !== undefined && _customStartingImageID.length == 0) {
	                    _currentPage = parseInt(pageNumber);
	                    postArray.getNewPage = true;
	                }
	                else {
	                    if(_customStartingImageID.length > 0) {
	                        _imageID = _customStartingImageID;
	                        _customStartingImageID = '';
	                    }
	                    
	                    postArray.getNewPage = false;
	                }
	            
	                _callGalleryRPC(postArray, callback, that);
	            }
	        };
	        
	        var _renderAll = function(pageNumber, resize, that) {
	            var postArray = [];
	            
	            _customStartingImageID = '';
	            		            		            
	            var handleSuccess = function(o){
	                if (o.responseText !== undefined){
	                    try {
	                        var returnedData = YAHOO.lang.JSON.parse(o.responseText);
	                    }
	                    catch (x) {
	                        alert("JSON Parse failed!");
	                        return;
	                    }
	                    
						returnedData.thumbHTML = returnedData.thumbHTML.replace(_thumb_regex1, "/" + _sourceSize + "/");
						returnedData.thumbHTML = returnedData.thumbHTML.replace(_thumb_regex2, "-" + _sourceSize + "$1");
	        
	                    var pageDetails = returnedData.pageDetails;
	                    var tempImages = returnedData.Images;
	                    var photosRemaining = 0;
	                    
	                    _totalNumberOfThumbs = parseInt(pageDetails.totalNumberOfThumbs);
	                    _currentPage = parseInt(pageDetails.pageOn);
	                    _imageIDs = pageDetails.imageIDs;
	                    _totalNumberOfPages = _calculateNumberOfPages(that.thumbsPerPage);
	                    _thumbsOnCurrentPage += parseInt(pageDetails.numberOfThumbsOnPage);
	                    photosRemaining = _totalNumberOfThumbs-_thumbsOnCurrentPage;
	                    _requestInProgress = false;
	                    
	                    if(photosRemaining > 0) {
	                        _thumbsMessageContainer.innerHTML = photosRemaining + ' photos remaining.  Loading more thumbnails...';
	                    }
	                    else {
	                        _thumbsMessageContainer.innerHTML = '';
	                    }
	                    		                    
	                    if(returnedData.thumbHTML && returnedData.thumbHTML != 'undefined' && returnedData.thumbHTML.length > 0) {
	                        if(_newAlbum) {
	                            _thumbsContainer.innerHTML = returnedData.thumbHTML;
	                        }
	                        else {
	                            Sizzle.DOM(returnedData.thumbHTML).appendTo('#'+_thumbsContainerID);
	                        }
	                        
	                        var addedImageTags = _prepSmugMugImageTags(returnedData);
	                        
	                        /* Ensure there is a vertical scrollbar on the body, so that laying out images doesn't cause the image 
	                         * container to shrink horizontally, which would invalidate the layout immediately.
	                         */
	                        var originalOverflowY = document.body.style["overflow-y"];
	                        
	                        if (originalOverflowY != "scroll") {
	                        	document.body.style["overflow-y"] = "scroll";
	                        }
	                        
	                        _layoutThumbs(_thumbsContainer, addedImageTags);

	                        if (originalOverflowY != "scroll") {
	                        	document.body.style["overflow-y"] = originalOverflowY;
	                        }
	                    }
	                    else if(_totalNumberOfThumbs == 0) {
	                        YD.setStyle(_thumbsContainer, 'width', '100%');
	                        _thumbsContainer.innerHTML = 'This is an empty gallery.';
	                        _totalNumberOfPages = 1;
	                    }
	                    
	                    _newAlbum = false;
	                    
	                    // Load up the photoInfo.  This is very important since many of the ajax gallery js functions rely on this array.
	                    //  I wish this there wasn't such a heavy reliance on this, but that's the way it is.
	                    for (var i in tempImages) {
	                        if (!photoInfo[i]) {
	                            photoInfo.size++;
	                        }
	        
	                        photoInfo[i] = tempImages[i];
	                    }
	                    
                   		_drawPaginatedToggle();
	                    _initialRequest = false;
	                }
	            };
	        
	            var handleFailure = function(o){
	                _requestInProgress = false;
	            };
	            
	            if((!resize || _firstShow || pageNumber != _currentPage || _newAlbum) && pageNumber <= _totalNumberOfPages && !_requestInProgress) {
	            	_firstShow = false;
	                _currentPage = parseInt(pageNumber);
	                postArray.getNewPage = true;
	                
	                _requestInProgress = true;
	            
	                var callback = {
	                    'success': handleSuccess,
	                    'failure': handleFailure,
	                    'scope': this
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
	                var remainingThumbs = _totalNumberOfThumbs - _thumbsOnCurrentPage;
	                if ((_thumbsOnCurrentPage == 0 || _thumbsOnCurrentPage >= that.thumbsPerPage * 2) //If our hamstrung fetch could actually request more than 1 page worth of thumbs 
	                		&& remainingThumbs > that.thumbsPerPage && remainingThumbs < that.thumbsPerPage * 1.5 /* And a standard fetch would leave a small remainder */) {
	                	if (_thumbsOnCurrentPage == 0) {
	                		that.thumbsPerPage = _totalNumberOfThumbs;
	                	} else {
		                	// We start at the right place by just setting the page size to the index we want and then fetching the second page
		                	that.thumbsPerPage = _thumbsOnCurrentPage;
		                	_currentPage = 2;
	                	}
	                }
	                
	                _callGalleryRPC(postArray, callback, that);
	            }
	        };
	        
	        /**
	         * The main render method for this view.
	         * @param int pageNumber - the page number to render
	         * @param bool resize - whether or not the container has been resized
	         * @param object that - a reference to the intance of the current thumbnail view object.
	         */
	        var _render = function(pageNumber, resize, that) {
	            if(_paginated) {
	                _renderPaginated(pageNumber, resize, that);
	            }
	            else {
	                _renderAll(pageNumber, resize, that);
	            }
	        };
	        
	        /**
	         * Returns the container height
	         */
	        var _getContainerHeight = function() {
	            var height;
	            var containerHeight;
	            
	            if(_constrainedWithinWindow) {
	                height = _getWindowHeight();
	                containerHeight = height-(YD.getY(_outerContainer));
	            }
	            else {
	                containerHeight = _outerContainer.offsetHeight;
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
	         * Shows favorite icon if favorited
	         */
	        var _updateFavorites = function() {
	            if (SM.pageDetails.Album && SM.pageDetails.Album.FavoriteAlbum) {   
	                var count = 0;
	                for (var i in _imageIDs) {
	                    if(SM.util.in_array(_imageIDs[i],SM.pageDetails.Album.FavoriteAlbum.FavoriteImageIds)) {
	                        var favoriteContainer = YD.getElementsByClassName('photoBox_'+_imageIDs[i],'div','photos');
	                        if(favoriteContainer) {
	                            for(var i in favoriteContainer) {
	                                YD.addClass(YD.getFirstChild(favoriteContainer[i]),'photoFavorite');
	                            }
	                        }
	                    }
	                    count++;
	                }          
	            }
	        };

	        /**
	         * Intantiates or modifies the gallery nav widget.
	         */
	        var _drawGalleryNav = function(that) {
	            if (_navTopContainer) {                 
	                if (_navs) {
	                	for (var i = 0; i < _navs.length; i++) {
	                		var nav = _navs[i];
		                    nav.set('currentPage', _currentPage);
		                    nav.set('totalPages', _totalNumberOfPages);
		                    nav.set('photosPerPage', that.thumbsPerPage);
	                	}
	                } else {
	                	_navs = [];

	                	_navs.push(new SM.navigation.PageNav(_navTopContainer, {'totalPages': _totalNumberOfPages, 'currentPage': _currentPage, 'photosPerPage': that.thumbsPerPage}));
	                	
	                	if (_paginated) {
		                	//Add a second navigation bar to the bottom of the page
		                	Sizzle.DOM("<div class='albumNav_left'><div class='pageNav nav'><div id='pageNavigation_bottom'></div></div></div><div class='spacer'></div>").prependTo("#albumNav_bottom");
	
		                	_navs.push(new SM.navigation.PageNav(YD.get("pageNavigation_bottom"), {'totalPages': _totalNumberOfPages, 'currentPage': _currentPage, 'photosPerPage': that.thumbsPerPage}));
	                	}
	                }
	            }
	        };
	        
	        /**
	         * Draws the pagination toggle
	         */
	        var _drawPaginatedToggle = function() {
	            var html = [];
	            
	            if(_allowPaginatedToggle && !_paginatedToggle && _navTopContainer) {
	                var checkBoxID = 'allthumbs_pagination_toggle';
	                var extraSpace = '';
	                
	                if(_paginated) {
	                    extraSpace = '&nbsp;&nbsp;&nbsp;&nbsp;';
	                }
	                
	                html.push('<div class="pagination_toggle">' + extraSpace + '<input type="checkbox" id="' + checkBoxID + '" />&nbsp;');
	                
	                if(_paginated) {
	                    html.push('Show thumbnails in a single page');
	                }
	                else {
	                    html.push('Show many pages of thumbnails');
	                }
	                
	                html.push('</div>');
	                
	                Sizzle.DOM(html.join('')).appendTo('#'+_napTopContainerID);
	                _paginatedToggle = YD.get(checkBoxID);
	                _paginatedToggle.onclick = _handlePaginationToggle;
	            }
	        };
	        
	        // Called when the pagination toggle is clicked.  Sets the cookie and reloads the page.
	        var _handlePaginationToggle = function(e) {
	            if(_paginated) {
	                SM.util.setCookie('allthumbsPaginated', 0, 1);
	            }
	            else {
	                SM.util.setCookie('allthumbsPaginated', 1, 1);
	            }
	            
	            location.reload();
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
	                return _outerContainer.scrollTop;
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
	                _outerContainer.scrollTop = value;
	            }           
	        };	        
	        
	        /*****************************************
	         * "Public" Methods
	         *****************************************/
	        this.openLightBox = function(imageId, imageKey, lightboxSize) {
	            this.removeEventListeners();
	            
	            openLBOptions(imageId, imageKey, lightboxSize, null, {'fixedTop': true, 'allowDetails': true});
	        };
	        
	        this.closeLightBox = function() {
	            this.setupEventListeners();
	            closeLightBox('');
	        };
	        
	        this.removeEventListeners = function() {
	            if(!_paginated) {
	                if(_constrainedWithinWindow) {
	                    YE.removeListener(window, 'scroll', this.onContainerScroll);
	                }
	                else {
	                    YE.removeListener(_outerContainer, 'scroll', this.onContainerScroll);
	                }
	                
	                _scrollHandlerInitialized = false;
	            }
	        };
	        
	        this.setupEventListeners = function() {
	            if(_constrainedWithinWindow && !_resizeHandlerInitialized) {
	                YAHOO.util.Event.addListener(window, 'resize', this.onWindowResize, this);
	                _resizeHandlerInitialized = true;
	            }
	            
	            if(!_paginated && !_scrolledToEnd && !_scrollHandlerInitialized) {
	                if(_constrainedWithinWindow) {
	                    YAHOO.util.Event.addListener(window, 'scroll', this.onContainerScroll, this);
	                }
	                else {
	                    YAHOO.util.Event.addListener(_outerContainer, 'scroll', this.onContainerScroll, this);
	                }
	                
	                _scrollHandlerInitialized = true;
	            }
	        };
	         
	        /**
	         * Called on the scroll event of the container element.  Used only in the non-paginated mode.
	         * When the scroll threshold is reached a new page of thumbs is requested.
	         * @param event e - the scroll event object
	         * @param object that - an object reference to the allthumbs view instance.
	         */
	        this.onContainerScroll = function(e, that) {
	            var containerHeight = _thumbsContainer.offsetHeight;//_outerContainer.offsetHeight;
	            var outerContainerHeight = _constrainedWithinWindow? _getWindowHeight() : _outerContainer.offsetHeight;//_getWindowHeight()
	            var scrollTop = _getScrollTop();
	            
	            if((containerHeight-scrollTop) <= outerContainerHeight && (_currentPage+1) <= _totalNumberOfPages) {
	                that.changePage(_currentPage+1);
	            }
	            
	            if((_currentPage+1) > _totalNumberOfPages && !_initialRequest) {
	                if(_constrainedWithinWindow) {
	                    YE.removeListener(window, 'scroll', that.onContainerScroll);
	                }
	                else {
	                    YE.removeListener(_outerContainer, 'scroll', that.onContainerScroll);
	                }
	                
	                _scrollHandlerInitialized = false;
	                _scrolledToEnd = true;
	            }
	        };
	        
	        /**
	         * Called on resize of the container.
	         */
	        this.onWindowResize = function(e, that) {
	            that.resize();
	        };
	        
	        /**
	         * Returns the current page
	         */
	        this.getCurrentPage = function() {
	            return _currentPage;
	        };
	        
	        /**
	         * Returns the image ids
	         */
	        this.getImageIDs = function() {
	            return _imageIDs;
	        };
	        
	        /**
	         * Change gallery page based on finding an image id rather than
	         *  a specific page.
	         */
	        this.changePageWithImage = function(imageID) {
	            if(_paginated) {
	                _customStartingImageID = imageID;
	                _render(_currentPage, false, this);
	            }
	        };
	        
	        /**
	         * Change the gallery page.
	         */
	        this.changePage = function(page) {
	        	if (_paginated && _getScrollTop() > _getContainerHeight())
	        		_setScrollTop(0);
	            _render(page, false, this);
	        };
	        
	        /**
	         * Resize the container.
	         */
	        this.resize = function() {
	        	_relayoutThumbs();
	        	
	            _render(_currentPage, true, this);
	        };
	        
	        /**
	         * The method to show the view for the first time.
	         */
	        this.show = function() {
	            _render(_currentPage, true, this);
	        };
	        
	        this.changeAlbum = function(albumID, albumKey) {
	            _albumID = albumID;
	            _albumKey = albumKey;
	            _newAlbum = true;
	            _currentPage = 1;
	            _thumbsOnCurrentPage = 0;
	            _scrolledToEnd = false;
	            this.removeEventListeners();
	            
	            if(!_paginated) {
	                if(_constrainedWithinWindow) {
	                    window.scrollTo('', 0);
	                }
	                else {
	                    _outerContainer.scrollTop = 0;
	                }
	            }
	            
	            this.setupEventListeners();
	            
	            _render(1, false, this);
	        };
	 
    		YD.addClass(document.body, 'ss-montage'); /* All aboard! */	        
	        
    		if (typeof window.devicePixelRatio != 'undefined' && window.devicePixelRatio >= 2) {
    			/* Most images won't be stretched the full devicePixelRatio, so don't fetch the full devicePixelRatio * maxVertScale pixels */		
    			_sourceWidth = Math.round(targetWidth * Math.max(window.devicePixelRatio, maxVertScale * 1.5)); 
    	 		_sourceHeight = Math.round(targetHeight * Math.max(window.devicePixelRatio, maxVertScale * 1.5));
    		} else {
    			/* We need a bit of reserve past maxVertScale to support further horizontal scaling */
    			_sourceWidth = Math.round(targetWidth * maxVertScale * (maxVertScale > 1 ? 1.3 : 1));
    			_sourceHeight = Math.round(targetHeight * maxVertScale * (maxVertScale > 1 ? 1.3 : 1));
    		}
    		
    		//TODO choose SmugMug presized images instead when those are close enough to the resolution we want:
    		_sourceSize = _sourceWidth + "x" + _sourceHeight;    		
	        
	        // Set up event listeners   
	        this.setupEventListeners();
	    }
	};
})();