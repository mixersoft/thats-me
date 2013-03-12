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
		echo "<script src='http://snappi-dev/js/snappi/base_aui.js' type='text/javascript'></script>";
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
	$scriptBlock[] = "PAGE.snappi_comboHost = 'snappi-dev';";
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
<a name='timeline'></a>
<div id='timeline' class="featurette">
	<div class='fw-band vcenter-body alpha rgba70b '>
		<div class='container'>
			<div class="featurette-heading ">
		        <h1>Curated Story</h1>
	       	</div>
	       	<div class='ipad landscape alpha rgba50b'>
<section class='montage-container container grid_16'><div class='stage-body'></div></section>	       	
			</div>		
	</div>
</div>

