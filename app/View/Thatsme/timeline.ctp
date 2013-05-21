<?php 
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
	$story = false;		
	$host = Configure::read('isLocal') ? 'snappi-dev' : 'preview.snaphappi.com';

	
	/*
	 * use event_group source when given UUID
	 * $DEFAULT_EVENT_GROUP_LIMIT = 999, set in /person/event_group
	 * ex: /person/event_group/5170506a-5300-4ab9-80ac-38f70afc6d44/coarse_spacing:1/fine_spacing:0.2/perpage:2000/sort:dateTaken/.json?forcexhr=1&debug=0
	 */
	if (strlen($userid) == 36) {
		$allowed = array('grlim', 'xxxtimescale', 'coarse_spacing', 'fine_spacing', 'day_quota', 'iterations', 
		'from','to'
		);
		$options = array_intersect_key($this->request->named, array_flip($allowed));
		if (isset($options['grlim'])) {
			$options['perpage'] = $options['grlim'];
			unset($options['grlim']);
		}
		$options['sort'] = 'dateTaken';
		$event_group_request = array('controller'=>'person', 'action'=>'event_group', 0=>$userid) + $options;
		$cc_src = "http://{$host}".Router::url($event_group_request)."/.json?forcexhr=1";
	} else {
		// just grab photos from /odesk_photos to put in static timeline
		$options['page'] = 1;
		$options['perpage'] = $perpage = 24;		// just need 5 events x3 photos for timeline
		$options['sort'] = 'score';
		$options['direction'] = 'desc';
		$options['montage'] = ($story ? 1 : 0);
		$static_timeline_request = array('controller'=>'person', 'action'=>'odesk_photos', 0=>$userid) + $options;
		$cc_src = "http://{$host}".Router::url($static_timeline_request)."/.json";
		// $cc_src = "http://{$host}/person/odesk_photos/".join('/',$options);
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
	<div class='fw-band footer alpha black a85'>
    	<div class="container center">
			<div class="pull-left"><a href='/home#i-want-it'><button class="btn btn-primary" title='Go to the next section to learn more about Snaphappi'>
		    	I Want It
		    </button></a></div>
<a title='see our Facebook page' target='_social' href='http://www.facebook.com/Snaphappi'><i class="icon-facebook-sign"></i></a>
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
				<div class='date'>
					<span class='event evt-from' data-time=':from'>:fromLabel</span> :dash <span class='event evt-to' data-time=':to'>:toLabel</span>
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

