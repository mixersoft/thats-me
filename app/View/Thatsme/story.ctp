<?php 
	$this->set("title_for_layout", $title);
	$this->append('css');
		$this->Less->css('demo');
	$this->end();
	
	$this->extend('/Thatsme/beachfront'); 
	 
	$this->append('javascript_Bottom');
		echo '<script src="/js/story.js"></script>';
		echo "<script src='http://snappi.snaphappi.com/svc/lib/alloy-1.5.0/build/aui/aui-min.js' type='text/javascript'></script>";
		echo "<script src='http://snappi.snaphappi.com/js/snappi/base_aui.js' type='text/javascript'></script>";
		echo "<meta id='css-start'>"; 
	$this->end();	/**
	 * javascript HEAD for Timeline
	 */
	$userid = $userid ? $userid : 'paris';  // id or username ok for demo
	/*
	 * perpage sets the number of photos in the story, 
	 * ???: where do we set the number of photos per story page????
	 */
	$DEFAULT_STORY_SNAP_COUNT = 17;
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
	
	 		
	$story = true;		
	$host = Configure::read('isLocal') ? 'snappi-dev' : 'preview.snaphappi.com';
	$options[] = $userid;
	$options[] = "page:1";
	$options[] = "perpage:{$perpage}";
	$options[] = "sort:0.score/direction:desc";
	if (!empty($this->passedArgs['from'])) $options[] = "from:{$this->passedArgs['from']}"; 
	if (!empty($this->passedArgs['to'])) $options[] = "to:{$this->passedArgs['to']}";
	$options[] = "montage:".($story ? 1 : 0);
	// montage role_count
	$options[] = ($story ? "role_count:".min($perpage, $MAX_ROLE_COUNT) : '');	
	$options[] = "w:984/h:728";		// ipad landscape, margin: 20px
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
<a name='story'></a>
<div id='story' class="featurette track-page-view ">
	<div class='fw-band vcenter-body alpha rgba70b '>
		<div class='container'>
			<div class="featurette-heading ">
		        <h1>Curated Stories
		        	<div class='subhead'>This is a simple prototype to help illustrate the ideas mentioned in The Movie
		        		<i class='help icon-question-sign'></i>
		        	<span class='more-stories'>
		    				<span class='label2'>Some other stories:</span> 
		    				<a href='/story/bali'><span class=' label alpha rgba80b'>Bali</span></a>
		    				<a href='/story/newyork'><span class=' label alpha rgba80b'>New York</span></a>
		    				<a href='/story/paris'><span class=' label alpha rgba80b'>Paris</span></a>
		    				<a href='/story/venice'><span class=' label alpha rgba80b'>Venice</span></a>
					</span>
					</div>
		        </h1>
	       	</div>
			<?php echo $this->element('story-body'); ?>
			<div class='row'>
	      		<div class="center" style='font-size:14px;'>
	      				Share the Curated Timeline demo with your friends <?php echo $this->element('social-button-row', array('like_page'=>'story')); ?> 
				</div>
				<br />
  			</div>	
		</div>
	</div>	
	<?php if (!$isIFrame) { ?>
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
			<br />while we load the Story...
			<br />(this one takes longer)
		</div>		
	</div>
</div>