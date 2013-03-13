<?php 
	$title = "Snaphappi &middot; Curated Timeline Demo";
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
<div id='timeline' class="featurette track-page-view ">
	<div class='fw-band vcenter-body alpha rgba70b '>
		<div class='container'>
			<div class="featurette-heading ">
		        <h1 >Curated Timeline
		        	<div class='subhead'>This is a simple prototype to help illustrate the ideas mentioned in The Movie 
		        		<span class='pull-right'><a class="btn btn-primary hide" href="/see-the-movie">See the Movie</a></span>
		        	</div>
		        </h1>
		        	
	       	</div>
	       		<div class='ipad landscape alpha rgba50b'>
<div class='timescale'>
		<span class=' label focus'>Week</span>
		<span class=' label'>Month</span>
		<span class=' label'>Year</span>
</div>	       	
<div class='nav pull-right'>
	<i class="nav-timeline icon-circle-arrow-right" title="click to see matching story"></i>
	&nbsp;
	<i class='help icon-question-sign'  title="toggle popups"></i>
</div>	
<hr>		
<div class='carousel-inner'>
<ul class='timeline inline unstyled scroller'>
	<li class='padding'></li>
	<li class='padding'></li>
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

<div class='markup hide'>
	<li class='item' data-id=":id">
		<div class='eventbar'>
			<div class='wrap evt-label'><span class='event evt-label'>:label</span>
				<div class='date'><span class='event evt-from'>:from</span> &mdash; <span class='event evt-to'>:to</span>
				</div>
			</div>
			<div class='wrap circle :circle-size'><span class='circle evt-count'>:count</span></div>
		</div>
		<div class='feature vcenter-wrap'>
			<div class="vcenter-padding">
			<div class='wrap cover vcenter-body'>
				<div><img class='top img-polaroid' ></div>
				<div><img class='mid img-polaroid' ></div>
				<div><img class='bot img-polaroid' ></div>
			</div>
			</div>
		</div>
	</li>
	<div class='loading'>
		<i class="icon-spinner icon-spin" style="font-size:40px;"></i> 
		<div style="font-size:18px;font-family:GeoSansLightRegular;line-height:1.4;">
			<br />Please wait a moment
			<br />while we load this simple demo...
		</div>	
	</div>
</div>

