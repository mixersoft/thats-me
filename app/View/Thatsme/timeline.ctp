<?php 
	$title = "Snaphappi &middot; Curated Timeline";
	$this->set("title_for_layout", $title);
	$this->append('css');
		$this->Less->css('demo');
	$this->end();
	
	$this->extend('/Thatsme/beachfront'); 
	 
	$this->append('javascript_Bottom');
		echo '<script src="/js/vendor/holder-master/holder.js"></script>';
		echo '<script src="/js/timeline.js"></script>';
	$this->end();	/**
	 * javascript HEAD for Timeline
	 */
	$userid = $userid ? $userid : 'paris';  // id or username ok for demo
	$perpage = 15;
	$story = false;		
	$host = Configure::read('isLocal') ? 'snappi-dev' : 'preview.snaphappi.com';
	$options[] = $userid;
	$options[] = "page:1";
	$options[] = "perpage:{$perpage}";
	$options[] = "sort:0.score/direction:desc";
	$options[] = "montage:".($story ? 1 : 0);
	$options[] = ".json";
	$cc_src = "http://{$host}/person/odesk_photos/".join('/',$options);
	$scriptBlock = array('PAGE = {};');
	$scriptBlock[] = "PAGE.snappi_comboHost = '{$host}';";
	$scriptBlock[] = "PAGE.src = '{$cc_src}';";
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
		        <h1  title="we'll be adding more features over time">Curated Timeline
		        	<div class='subhead'>A quick prototype of our Curated Timeline to demonstrate our ideas</div></h1>
	       	</div>
	       		<div class='ipad landscape alpha rgba50b'>
<div class='timescale'>
		<span class=' label focus'>Week</span>
		<span class=' label'>Month</span>
		<span class=' label'>Year</span>
</div>	       	
<hr>		
<div class='carousel-inner'>
<ul class='timeline inline unstyled scroller'>
	<li class='padding'></li>
	<li class='padding'></li>
	<li class='item'>
		<div class='eventbar'>
			<div class='wrap evt-label'><span class='event evt-label'>February</span></div>
			<div class='wrap circle sm'><span class='circle'>12</span></div>
		</div>
		<div class='feature vcenter-wrap'>
			<div class="vcenter-padding">
			<div class='wrap cover vcenter-body'>
				<div><img class='top img-polaroid' data-src='holder.js/240x160/auto'></div>
				<div><img class='mid img-polaroid' data-src='holder.js/240x160/auto'></div>
				<div><img class='bot img-polaroid' data-src='holder.js/240x160/auto'></div>
			</div>
			</div>
		</div>
	</li>
	<li class='item'>
		<div class='eventbar'>
			<div class='wrap evt-label'><span class='event evt-label'>March</span></div>
			<div class='wrap circle sm'><span class='circle'>12</span></div>
		</div>
		<div class='feature vcenter-wrap'>
			<div class="vcenter-padding">
			<div class='wrap cover vcenter-body'>
				<div><img class='top img-polaroid' data-src='holder.js/160x240/auto'></div>
				<div><img class='mid img-polaroid' data-src='holder.js/240x160/auto'></div>
				<div><img class='bot img-polaroid' data-src='holder.js/240x160/auto'></div>
			</div>
			</div>
		</div>
	</li>
	<li class='item'>
		<div class='eventbar'>
			<div class='wrap evt-label'><span class='event evt-label'>April</span></div>
			<div class='help wrap circle lg'><span class='circle'>100</span></div>
		</div>
		<div class='feature vcenter-wrap'>
			<div class="vcenter-padding">
			<div class='wrap cover vcenter-body'>
				<div><img class='top img-polaroid' data-src='holder.js/240x160/auto'></div>
				<div><img class='mid img-polaroid' data-src='holder.js/240x160/auto'></div>
				<div><img class='bot img-polaroid' data-src='holder.js/160x240/auto'></div>
			</div>	
			</div>
		</div>
	</li>
	<li class='item'>
		<div class='eventbar'>
			<div class='wrap evt-label'><span class='event evt-label'>May</span></div>
			<div class='help wrap circle med'><span class='circle'>75</span></div>
		</div>
		<div class='feature vcenter-wrap'>
			<div class="vcenter-padding">
			<div class='wrap cover vcenter-body'>
				<div><img class='top img-polaroid' data-src='holder.js/240x160/auto'></div>
				<div><img class='mid img-polaroid' data-src='holder.js/160x240/auto'></div>
				<div><img class='bot img-polaroid' data-src='holder.js/240x160/auto'></div>
			</div>
		</div>
	</li>
	<li class='item'>
		<div class='eventbar'>
			<div class='wrap evt-label'><span class='event evt-label'>June</span></div>
			<div class='help wrap circle sm'><span class='circle'>12</span></div>
		</div>
		<div class='feature vcenter-wrap'>
			<div class="vcenter-padding">
			<div class='wrap cover vcenter-body'>
				<div><img class='top img-polaroid' data-src='holder.js/240x160/auto'></div>
				<div><img class='mid img-polaroid' data-src='holder.js/240x160/auto'></div>
				<div><img class='bot img-polaroid' data-src='holder.js/240x160/auto'></div>
			</div>
			</div>
		</div>
	</li>
	<li class='padding'></li>
</ul></div>		
				</div>  <!-- /.carousel-inner  -->
			</div>		
		<div class="carousel-pager center"></div>  
<div class="carousel-control-wrap">
	<div class="left carousel-control-btn invisible" href="#how-it-works" direction="prev">&lsaquo;</div>
	<div class="right carousel-control-btn" href="#how-it-works" direction="next">&rsaquo;</div>
</div>
	</div>
</div>

