<?php 
	$this->set("title_for_layout", $title);
	$this->append('css');
		$this->Less->css('isotope');
	$this->end();
	
	$this->extend('/Thatsme/beachfront'); 
	 
	$this->append('javascript_Bottom');
		echo '<script src="/js/vendor/jquery.isotope.js"></script>';
		echo "<script src='http://snappi.snaphappi.com/svc/lib/alloy-1.5.0/build/aui/aui-min.js' type='text/javascript'></script>";
		echo "<script src='http://snappi.snaphappi.com/js/snappi/base_aui.js' type='text/javascript'></script>";
		echo '<script src="/js/isotope.js"></script>';		
		echo "<meta id='css-start'>"; 
	$this->end();	/**
	 * javascript HEAD for Timeline
	 */
	$userid = $userid ? $userid : 'paris';  // id or username ok for demo
	/*
	 * perpage sets the number of photos in the story, 
	 * ???: where do we set the number of photos per story page????
	 */
	$DEFAULT_STORY_SNAP_COUNT = 100;
	$MAX_STORY_SNAP_COUNT = 32;
	$TOP_RATED_PERCENT = 0.25;
	$MAX_ROLE_COUNT = 9;
	$perpage = $DEFAULT_STORY_SNAP_COUNT;
	if (!empty($this->passedArgs['size'])) {
		$snap_count = $this->passedArgs['size'];
		$top_rated_count = round($snap_count * $TOP_RATED_PERCENT);	// top 25%
		$perpage = max($DEFAULT_STORY_SNAP_COUNT, $top_rated_count );
		$perpage = min($perpage, $snap_count, $MAX_STORY_SNAP_COUNT );
	}
	
	 		
	$story = false;		
	$host = Configure::read('isLocal') ? 'snappi-dev' : 'preview.snaphappi.com';
	$options[] = $userid;
	$options[] = "page:1";
	$options[] = "perpage:{$perpage}";
	$options[] = "sort:score/direction:desc";
	if (!empty($this->passedArgs['from'])) $options[] = "from:{$this->passedArgs['from']}"; 
	if (!empty($this->passedArgs['to'])) $options[] = "to:{$this->passedArgs['to']}";
	$options[] = ".json";
	$cc_src = "http://{$host}/person/odesk_photos/".join('/',$options);
	$scriptBlock = array('PAGE = {};');
	$scriptBlock[] = "PAGE.snappi_comboHost = '{$host}';";
	$scriptBlock[] = "PAGE.src = '{$cc_src}';";
	$scriptBlock[] = "ALLOY_VERSION='alloy-1.5.0';";
	$this->Html->ScriptBlock(implode(' ', $scriptBlock), array('inline'=>false));
	// show simple view with no external links for $isIframe=1
	$isIFrame = !empty($this->request->named['iframe']);
	
?>	
<?php
	$this->start('body_header'); 
		$navbar = $isIFrame ? 'iframe-close' : 'navbar';
		echo $this->element($navbar, array('hash'=>'append')); 
		echo $this->element('notify');
	$this->end(); 
?>
<a name='isotope'></a>
<div id='isotope' class="featurette track-page-view ">
	<div class='fw-band vcenter-body alpha rgba70b '>
		<div class='container'>
			<div class="featurette-heading ">
		        <h1>All Your Photos
		        	<div class='subhead'>
		        	<span class='more-stories'>
		    				<span class='label2'>Some other albums:</span> 
		    				<a href='/isotope/bali'><span class=' label alpha rgba80b'>Bali</span></a>
		    				<a href='/isotope/newyork'><span class=' label alpha rgba80b'>New York</span></a>
		    				<a href='/isotope/paris'><span class=' label alpha rgba80b'>Paris</span></a>
		    				<a href='/isotope/venice'><span class=' label alpha rgba80b'>Venice</span></a>
					</span>
					</div>
		        </h1>
	       	</div>
			<div class='ipad landscape alpha rgba50b'>
				<div class='nav'>
					<div class='nav-btn timeline' >
						<i class="icon-circle-arrow-left"></i>
						Back to Timeline
					</div>
				</div>	       		
				<section class='stage-body'></section>
			</div>
		</div>
	</div>	
	<?php if (0 && !$isIFrame) { ?>
	<div class='fw-band footer alpha black a85'>
    	<div class="container center">
			<div class="pull-left"><a href='/home#i-want-it'><button class="btn btn-awesome" title='Go to the next section to learn more about Snaphappi'>
		    	I Want It
		    </button></a></div>	
<a title='see our Facebook page' target='_social' href='http://www.facebook.com/Snaphappi'><i class="icon-facebook-sign"></i></a>
&nbsp;<a title='see our Twitter feed' target='_social' href='https://twitter.com/snaphappi'><i class="icon-twitter-sign"></i></a>
&nbsp;<a title='see our Pinterest board' target='_social' href='http://pinterest.com/snaphappi/curated-family-photos/'><i class="icon-pinterest-sign"></i></a>
    		<div class="pull-right"><a href='/home#about' target='_parent'><button class="btn btn-awesome">
		    	Learn More
		    </button></a></div>        		
    	</div>
    </div>
    <?php } ?>
    <div class='alpha rgba70b' style='height:200px;'>&nbsp;</div>
	
</div>
<div class='markup hide'>
	<div class='loading'>
		<i class="icon-spinner icon-spin" style="font-size:40px;"></i> 
		<div style="font-size:18px;font-family:GeoSansLightRegular;line-height:1.4;">
			<br />Please wait a moment
			<br />while we load your Snaps...
			<br />(this one takes longer)
		</div>		
	</div>
</div>