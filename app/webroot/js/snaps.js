

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
			batchId: parseInt(auditions[i].Photo.batchId),
			dateTaken: new Date(auditions[i].Photo.DateTaken.replace(' ', 'T')), 
			ts: auditions[i].Photo.TS,
		}, auditions[i].Photo.Img.Src);
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
Util.tokenReplace = function(string, prefix, tokens) {
	for (var i in tokens) {
		string = string.replace(prefix+i,tokens[i]);
	}
	var empty=new RegExp('\\'+prefix+'\\w*\\s{0,1}','g');
	string = string.replace(empty, '' );
	return string;
}


CFG['util'] = $.extend(CFG['util'] || {}, Util);

/*
 * All Snaps
 */
var Isotope = new function(){}
CFG['isotope'] = Isotope;		// make global
Isotope.initIsotopeObj = function(){
    
    var $container = $('.gallery .stage-body');
    
    
      // add randomish size classes
      $container.find('.isotope-item').each(function(){
      	
      	return;
      	
        var $this = $(this),
            number = parseInt( $this.find('.number').text(), 10 );
        if ( number % 7 % 2 === 1 ) {
          $this.addClass('width2');
        }
        if ( number % 3 === 0 ) {
          $this.addClass('height2');
        }
      });
      
	
    $container.isotope({
      itemSelector : '.isotope-item',
      masonry : {
        columnWidth : 180
      },
      masonryHorizontal : {
        rowHeight: 180
      },
      cellsByRow : {
        columnWidth : 240,
        rowHeight : 180
      },
      cellsByColumn : {
        columnWidth : 240,
        rowHeight : 180
      },
      getSortData : {
      	batchId: function($elem) {
	  		return $elem.attr('data-caption');
	  	},
	  	dateTaken: function($elem) {
	  		return $elem.attr('data-caption');
	  	},
        score: function($elem) {
	  		return parseFloat($elem.attr('data-score'));
	  	},
	  	caption: function($elem) {
	  		return $elem.attr('data-caption');
	  	},
      },
      sortBy: 'batchId',
	  sortAscending: false,
	  animationEngine : 'best-available',
	  layoutMode: 'fitRows',
	  onLayout: function( $elems, instance ) {
	    // `this` refers to jQuery object of the container element
	    // console.log( "container height="+ this.height() );
	    // callback provides jQuery object of laid-out item elements
	    // $elems.css({ background: 'blue' });
	    // instance is the Isotope instance
	    // console.log( instance.$filteredAtoms.length );
	  },
	  
	  
    });
    
    
      var $optionSets = $('#iso-menu .option-set'),
          $optionLinks = $optionSets.find('a');
          
      $('#iso-menu').delegate('.option-set a', 'click', function(e){
        var $this = $(this);
// console.info("menu option click: "+$this.attr('data-option-value'));        
        // don't proceed if already selected
        
        if ( $this.closest('li').hasClass('active') ) {
          return false;
        }
        var $optionSet = $this.parents('.option-set');
        $optionSet.find('.selected').removeClass('selected');
        $optionSet.find('.active').removeClass('active');
        $this.addClass('selected').closest('li').addClass('active');
  
        // make option object dynamically, i.e. { filter: '.my-filter-class' }
        var options = {},
            key = $optionSet.attr('data-option-key'),
            value = $this.attr('data-option-value');
        // parse 'false' as false boolean
        value = value === 'false' ? false : value;
        options[ key ] = value;
        if ( key === 'layoutMode' && typeof changeLayoutMode === 'function' ) {
          // changes in layout modes need extra logic
          changeLayoutMode( $this, options )
        } else {
          // otherwise, apply new options
          $container.isotope( options );
        }
        CFG['util'].animateScrollToHash({hash: this});
        
        return false;
      });    



    
      // change layout
      var isHorizontal = false;
      function changeLayoutMode( $link, options ) {
        var wasHorizontal = isHorizontal;
        isHorizontal = $link.hasClass('horizontal');

        if ( wasHorizontal !== isHorizontal ) {
          // orientation change
          // need to do some clean up for transitions and sizes
          var viewH = Math.max($(window).height()-300, 360); 
          var style = isHorizontal ? 
            { height: viewH+'px', width: $container.width() } : 
            { width: 'auto' };
          // stop any animation on container height / width
          $container.filter(':animated').stop();
          // disable transition, apply revised style
          $container.addClass('no-transition').css( style );
          setTimeout(function(){
            $container.removeClass('no-transition').isotope( options );
          }, 100 )
        } else {
          $container.isotope( options );
        }
        if (isHorizontal) $container.closest('.gallery').addClass('horizontal');
        else $container.closest('.gallery').removeClass('horizontal');
      }


    
      // change size of clicked element
      $container.delegate( '.isotope-item', 'click', function(e){
        // $(this).toggleClass('large');
        var $this = $(this), 
        	scale = ($this.hasClass('large')) ? 0.5 : 2;
        $this.height(scale*$this.height()).width(scale*$this.width());
        $container.isotope('reLayout');
      });

      // toggle variable sizes of all elements
      $('#toggle-sizes').find('a').click(function(){
        $container
          .toggleClass('variable-sizes')
          .isotope('reLayout');
        return false;
      });


    
      $('#insert a').click(function(){
        var $newEls = $( fakeElement.getGroup() );
        $container.isotope( 'insert', $newEls );

        return false;
      });

      $('#append a').click(function(){
        var $newEls = $( fakeElement.getGroup() );
        $container.append( $newEls ).isotope( 'appended', $newEls );

        return false;
      });


    var $sortBy = $('#sort-by');
    $('#shuffle a').click(function(){
      $container.isotope('shuffle');
      $sortBy.find('.selected').removeClass('selected');
      $sortBy.find('[data-option-value="random"]').addClass('selected').closest('li').addClass('active');
      return false;
    });


};

Isotope.render = function(auditions, container){
	container = container || $('.gallery .stage-body');
	var THUMB_SIZE = 'bs', scale=640, max = 0, baseurl, tokens,
		media_markup = "<img class='img-polaroid isotope-item :orientationLabel' src=':src' title=':title' width=':width' height=':height' data-dateTaken=':dateTaken' data-batchId=':batchId' data-score=':score' data-caption=':caption'>";
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
			orientation: (audition.H>audition.W ? 'portrait' : ''),
		}
		tokens.orientationLabel = audition.H > audition.W ? 'portrait' : '';
		container.append(Util.tokenReplace(media_markup,':',tokens))
	}
	Isotope.onFirstRender();
}

Isotope.onRender = function() {
}

_layout = function(layout) {
	$('.gallery .stage-body').isotope({
	  layoutMode : layout,
	});
}
_sort = function(key, asc) {
	if (typeof asc == 'undefined') asc = (key=='score') ? false : true; 
	$('.gallery .stage-body').isotope({
	  sortBy: key,
	  sortAscending: asc,
	});
}

Isotope.onFirstRender = function() {
	var MARGIN_PADDING = 80;
	Isotope.initIsotopeObj();
	$('.gallery').css('width','100%').css('max-width', $(window).width()-MARGIN_PADDING+'px');
			
	$('.gallery .curtain').remove(); 
	$('body').removeClass('wait');
	
}


Isotope.documentReady = function () {
	/*
	 * get CC and create/render Story on cache miss
	 */
	// CFG['timing'].load_SocialSharing = 1000;
	// CFG['util'].load_SocialSharing();
	
}

})();  
// end module closure