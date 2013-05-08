<?php 
	$title = "Snaphappi &middot; Curated Timeline Demo";
	$this->set("title_for_layout", $title);
	$description = "See a quick demo of our Curated Timeline as shown in the Movie. Only Snaphappi provides Trained Editors who find your Beautiful Photos and feature them on Curated Timelines.";
	$this->start('HEAD_bottom');
		echo $this->element('fb_open_graph', compact('description'));
	$this->end();
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
	
	/*
	 * use event_group source
	 */
	if (strlen($userid) == 36) {
		$allowed = array('grlim', 'xxxtimescale', 'coarse_spacing', 'fine_spacing', 'day', 'iterations');
		$options = array_intersect_key($this->request->named, array_flip($allowed));
		if (isset($options['grlim'])) {
			$options['perpage'] = $options['grlim'];
			unset($options['grlim']);
		} else $options['perpage'] = 199;
		$options['sort'] = 'dateTaken';
		$event_group_request = array('controller'=>'person', 'action'=>'event_group', 0=>$userid) + $options;
		$cc_src = "http://{$host}".Router::url($event_group_request)."/.json?forcexhr=1";
	}
	
	$scriptBlock = array('PAGE = {};');
	$scriptBlock[] = "PAGE.snappi_comboHost = '{$host}';";
	$scriptBlock[] = "PAGE.src = '{$cc_src}';";
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
<a name='timeline'></a>
<div id='timeline' class="featurette track-page-view ">
	<div class='fw-band vcenter-body alpha rgba70b '>
		<div class='container'>
			<?php echo $this->element('timeline-body'); ?>
			<div class='row'>
	      		<div class="center">
	      				Share the Curated Timeline demo with your friends <?php echo $this->element('social-button-row', array('like_page'=>'timeline')); ?>  
				</div>
  			</div>				
		</div>
	</div>
	<?php if (!$isIFrame) { ?>
	<div class='fw-band footer alpha rgba80b'>
    	<div class="container center">
			<div class="pull-left"><a href='/home#i-want-it'><button class="btn btn-primary" title='Go to the next section to learn more about Snaphappi'>
		    	I Want It
		    </button></a></div>
<a title='see our Facebook page' target='_social' href='http://www.facebook.com/pages/Snaphappi/16486082015'><i class="icon-facebook-sign"></i></a>
&nbsp;<a title='see our Twitter feed' target='_social' href='https://twitter.com/snaphappi'><i class="icon-twitter-sign"></i></a>
&nbsp;<a title='see our Pinterest board' target='_social' href='http://pinterest.com/snaphappi/curated-family-photos/'><i class="icon-pinterest-sign"></i></a>
    		<div class="pull-right"><a href='/home#about' target='_parent'><button class="btn btn-warning" >
		    	Learn More
		    </button></a></div>        		
    	</div>
    </div>	
    <?php } ?>
    <div class='alpha rgba70b' style='height:200px;'>&nbsp;</div>
</div>

<div class='markup hide'>
	<li class='item' data-id=":id">
		<div class='eventbar'>
			<div class='wrap evt-label'><span class='event evt-label'>:label</span>
				<div class='date'><span class='event evt-from'>:from</span> &mdash; <span class='event evt-to'>:to</span>
				</div>
			</div>
			<div class='wrap circle :circle-size'><span class='circle evt-count :has-child' :tooltip >:count</span></div>
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
			<br />while we load the Timeline...
		</div>	
	</div>
</div>

