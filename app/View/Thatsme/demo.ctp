<?php 
	$title = "Snaphappi &middot; Curated Timeline";
	$this->set("title_for_layout", $title);
	$this->append('css');
		$this->Less->css('demo');
	$this->end();	
	$this->Html->script('/js/vendor/holder-master/holder.js', array('block' => 'javascript_Bottom'));
?>	
<?php
	$this->start('body_header'); 
		echo $this->element('navbar', array('hash'=>false)); 
		echo $this->element('notify');
	$this->end(); 
?>
<a name='demo'></a>
<div id='demo' class="featurette">
	<div class='fw-band vcenter-body alpha rgba70b '>
		<div class='container'>
			<div class="featurette-heading ">
		        <h1>Curated Timeline</h1>
	       	</div>
	       	<div class='row'>
	       		<div class='span12 ipad portrait alpha rgba50b'>
	       	
<hr>		
<ul class='timeline inline unstyled'>
	<li>
		<div class='eventbar'>
			<div class='wrap evt-label'><span class='event evt-label'>February</span></div>
			<div class='wrap circle sm'><span class='circle'>12</span></div>
		</div>
		<div class='feature vcenter-wrap'>
			<div class="vcenter-padding">
			<div class='wrap cover vcenter-body'>
				<div><img class='top img-polaroid' data-src='holder.js/120x80'></div>
				<div><img class='mid img-polaroid' data-src='holder.js/120x80'></div>
				<div><img class='bot img-polaroid' data-src='holder.js/120x80'></div>
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
				<div><img class='top img-polaroid' data-src='holder.js/120x80'></div>
				<div><img class='mid img-polaroid' data-src='holder.js/120x80'></div>
				<div><img class='bot img-polaroid' data-src='holder.js/120x80'></div>
			</div>
			</div>
		</div>
	</li>
	<li class='active'>
		<div class='eventbar'>
			<div class='wrap evt-label'><span class='event evt-label'>April</span></div>
			<div class='wrap circle lg'><span class='circle'>100</span></div>
		</div>
		<div class='feature vcenter-wrap'>
			<div class="vcenter-padding">
			<div class='wrap cover vcenter-body'>
				<div><img class='top img-polaroid' data-src='holder.js/240x160'></div>
				<div><img class='mid img-polaroid' data-src='holder.js/240x160'></div>
				<div><img class='bot img-polaroid' data-src='holder.js/106x160'></div>
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
				<div><img class='top img-polaroid' data-src='holder.js/120x80'></div>
				<div><img class='mid img-polaroid' data-src='holder.js/54x80'></div>
				<div><img class='bot img-polaroid' data-src='holder.js/120x80'></div>
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
				<div><img class='top img-polaroid' data-src='holder.js/120x80'></div>
				<div><img class='mid img-polaroid' data-src='holder.js/120x80'></div>
				<div><img class='bot img-polaroid' data-src='holder.js/120x80'></div>
			</div>
			</div>
		</div>
	</li>
</ul>		
				</div>
			</div>		
		</div>
	</div>
</div>
<?php 
	$this->extend('/Thatsme/beachfront');  
?> 	
