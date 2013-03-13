<?php 
	$title = "Snaphappi &middot; Curated Story Demo";
	$this->set("title_for_layout", $title);
	$description = "See a quick demo of our Curated Stories as shown in the Movie. Only Snaphappi provides Trained Editors who find your Beautiful Photos and feature them on Curated Timelines.";
	$this->start('HEAD_bottom');
		echo $this->element('fb_open_graph', compact('description'));
	$this->end();
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
	$perpage = 15;
	$story = true;		
	$host = Configure::read('isLocal') ? 'snappi-dev' : 'preview.snaphappi.com';
	$options[] = $userid;
	$options[] = "page:1";
	$options[] = "perpage:{$perpage}";
	$options[] = "sort:0.score/direction:desc";
	$options[] = "montage:".($story ? 1 : 0);
	$options[] = ($story ? "role_count:".min($perpage,9) : '');	// montage count
	$options[] = "w:984/h:728";		// ipad landscape, margin: 20px
	$options[] = ".json";
	$cc_src = "http://{$host}/person/odesk_photos/".join('/',$options);
	$scriptBlock = array('PAGE = {};');
	$scriptBlock[] = "PAGE.snappi_comboHost = '{$host}';";
	$scriptBlock[] = "PAGE.src = '{$cc_src}';";
	$scriptBlock[] = "ALLOY_VERSION='alloy-1.5.0';";
	$this->Html->ScriptBlock(implode(' ', $scriptBlock), array('inline'=>false));
	
	
?>	
<?php
	$this->start('body_header'); 
		echo $this->element('navbar', array('hash'=>false)); 
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
		        	<span class='more-stories pull-right'>
		    				<span class='label2'>Some other stories:</span> 
		    				<a href='/story/bali'><span class=' label alpha rgba80b'>Bali</span></a>
		    				<a href='/story/newyork'><span class=' label alpha rgba80b'>New York</span></a>
		    				<a href='/story/paris'><span class=' label alpha rgba80b'>Paris</span></a>
		    				<a href='/story/venice'><span class=' label alpha rgba80b'>Venice</span></a>
					</span>
					</div>
		        </h1>
	       	</div>
	       	<div class='ipad landscape alpha rgba50b'>
<div class='nav pull-right'>
	<i class="nav-timeline icon-circle-arrow-left" title="back to timeline"></i>
	&nbsp;
	<i class='help icon-question-sign'  title="toggle popups"></i>
</div>	       		
<section class='montage-container container grid_16'>
	<div class='stage-body'></div>
</section>	
<div class='share-story'>
	<i class="icon-facebook-sign"></i>&nbsp;<i class="icon-twitter-sign"></i>&nbsp;<i class="icon-envelope-alt"></i>
</div>       	
			</div>
			
				<div class='row'>
		      		<div class="center" style='font-size:14px;'>
		      				Share the Curated Timeline demo with your friends <?php echo $this->element('social-button-row'); ?> 
					</div>
					<br />
      			</div>	
	</div>
	<div class='fw-band footer alpha rgba80b'>
    	<div class="container center">
			<div class="pull-left"><a href='/home#i-want-it'><button class="btn btn-primary" title='Go to the next section to learn more about Snaphappi'>
		    	I Want It
		    </button></a></div>	
<a title='see our Facebook page' target='_social' href='http://www.facebook.com/pages/Snaphappi/16486082015'><i class="icon-facebook-sign"></i></a>
&nbsp;<a title='see our Twitter feed' target='_social' href='https://twitter.com/snaphappi'><i class="icon-twitter-sign"></i></a>
&nbsp;<a title='see our Pinterest board' target='_social' href='http://pinterest.com/snaphappi/curated-family-photos/'><i class="icon-pinterest-sign"></i></a>
    		<div class="pull-right"><a href='/home#about' target='_parent'><button class="btn btn-warning" title='Go to the next section to learn more about Snaphappi'>
		    	Learn More
		    </button></a></div>        		
    	</div>
    </div>	
</div>

<div class='markup hide'>
	<div class='loading'>
		<i class="icon-spinner icon-spin" style="font-size:40px;"></i> 
		<div style="font-size:18px;font-family:GeoSansLightRegular;line-height:1.4;">
			<br />Please wait a moment
			<br />while we load this simple demo...
		</div>		
	</div>
</div>