<?php 
	$title = "Snaphappi &middot; Curated Timeline";
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
<div id='story' class="featurette">
	<div class='fw-band vcenter-body alpha rgba70b '>
		<div class='container'>
			<div class="featurette-heading ">
		        <h1>Curated Story
		        	<div class='subhead'>A simple prototype to help illustrate our ideas
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
<section class='montage-container container grid_16'>
	<div class='stage-body'></div>
</section>	
<div class='nav-timeline' title="back to timeline">
	<a href=''><i class="icon-circle-arrow-left"></i></a>
</div>
<div class='share-story'>
	<i class="icon-facebook-sign"></i>&nbsp;<i class="icon-twitter-sign"></i>&nbsp;<i class="icon-envelope-alt"></i>
</div>       	
			</div>
	</div>
</div>

