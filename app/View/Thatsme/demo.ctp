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
	$this->end();
	
	
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
		        <h1>Curated Timeline</h1>
	       	</div>
	       	<div class='row'>
	       		<div class='span12 ipad portrait alpha rgba50b'>
	       	
<hr>		
<div class='carousel-inner'>
<ul class='timeline inline unstyled scroller'>
	<li>
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
	<li>
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
	<li class=''>
		<div class='eventbar'>
			<div class='wrap evt-label'><span class='event evt-label'>April</span></div>
			<div class='wrap circle lg'><span class='circle'>100</span></div>
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
	<li>
		<div class='eventbar'>
			<div class='wrap evt-label'><span class='event evt-label'>May</span></div>
			<div class='wrap circle med'><span class='circle'>75</span></div>
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
	<li>
		<div class='eventbar'>
			<div class='wrap evt-label'><span class='event evt-label'>June</span></div>
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
</ul></div>		
				</div>  <!-- /.carousel-inner  -->
			</div>		
		</div>
		<div class="carousel-pager center"></div>  
<div class="carousel-control-wrap">
	<div class="left carousel-control-btn invisible" href="#how-it-works" direction="prev">&lsaquo;</div>
	<div class="right carousel-control-btn" href="#how-it-works" direction="next">&rsaquo;</div>
</div>
	</div>
</div>

