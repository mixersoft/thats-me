<?php

// init paging for iframe.src castingCall JSON request
$default_paging = array('perpage'=>32, 'page'=>1, 'sort'=>'dateTaken', 'direction'=>'desc');
$paging = array_intersect_key($this->passedArgs, $default_paging);
$paging = array_merge($default_paging, $paging );
if ($ownerid) {
	$iframe_request = array();
	// user id or username provided, try to get JSON using permissions
	$iframe_request = array_merge(array('controller'=>'person','action'=>'photos', 0=>$ownerid,'?'=>array('min'=>1)), $paging);
	if (isset($this->request->query['type'])) {
		switch($this->request->query['type']) {
			case 'TasksWorkorder':
			case 'tw': $iframe_request['controller'] = 'tasks_workorders'; break;
			case 'Workorder':	
			case 'wo': $iframe_request['controller'] = 'workorders'; break;
		}
	}
	if (in_array($ownerid, array('venice', 'sardinia', 'paris', 'newyork', 'bali'))) {
		$iframe_request['action'] = 'odesk_photos';
	}
	$paging['sort'] = 'score';
	$iframe_request = array_merge($iframe_request, $paging);
	$iframe_src = "http://{$uploadHost}".Router::url($iframe_request);
} else {
	$iframe_request = array_merge(array('controller'=>'my','action'=>'photos','?'=>array('min'=>1)), $paging);
	$iframe_src = "http://{$uploadHost}".Router::url($iframe_request);
};


$title_for_layout = "Snaphappi Preview &middot; My Photos";
$fb_images[] = "/img/beachfront/icon-sm-04.png";
$fb_images[] = "/img/beachfront/icon-sm-06.png";
$this -> set(compact("title_for_layout",'fb_images'));
$this -> extend('/User/beachfront');
$this->append('css');
	$this->Less->css('snaps');
$this->end();
$this->start('css');
?>
<style type="text/css">
.stage-body {
	position:relative;
}
.stage-body .photo_container_th, 
.stage-body .photo {
	width:auto;
	height:auto;
}
.stage-body .photo {
	position:absolute;
	float:none;
	margin:0;
}
.stage-body .photo .caption {
	position:absolute;
	bottom:1px;
	left:1px;
	right:1px;
	background-color:rgba(0,0,0,0.3);
	padding:5px;
	
	white-space:nowrap;
	overflow:hidden;
	text-overflow:ellipsis;
}
.stage-body .photo .photoLink {
	display:block;
	position:relative;
	overflow:hidden;
}
.stage-body .photo img {
	display:block;
	position:relative;
	margin: 0 !important;
	/* reset */
	max-width: none;
}
.stage-body {
	overflow:hidden; /* Stretch to fit floated content */
}
.gallery .paging_message {
	clear:left;
}
</style>
<?php
$this->end();
$this -> append('javascript_Bottom');
		echo '<script type="text/javascript" src="/js/flickr.js"></script>';	
		echo '<script type="text/javascript" src="/js/users.js"></script>';
?>
<script type="text/javascript">
$(function() {
	CFG['users'].documentReady.snaps('flickr');
});
</script>
<?php
$this -> end();

// <!-- NAVBAR -->
$this->startIfEmpty('body_header'); 
	echo $this->element('navbar-member', array('action'=>'snaps'));
    echo $this->element('notify');
$this->end(); 
?>
<div id="snaps" class="featurette snaps track-page-view ">
	<div class="vcenter-wrap">
		<div class="vcenter-padding">
			<div class="fw-band vcenter-body alpha black a70 ">
				<div class="container">
					<div class="row">
						<h1 class='center'>My Photos</h1>
					</div>
				</div>
				<div id='gallery' class="gallery center alpha black a50 ">
					<section id='stage_body' class="stage-body clearfix clickable">
					</section>
					<div class='paging_message center'></div>
					<div class='curtain center'>
						<i class="icon-spinner icon-spin icon-large"></i> loading...
					</div>
				</div>
			</div>
			<div class='fw-band footer alpha black a85'>
				<div class="container center">
					<a  class='pull-left' href='/users/reset'><button class="btn btn-awesome" title='REMOVE all photos from Snaphappi'>
						Reset Account
						</button></a>
					<a title='see our Facebook page' target='_social' href='http://www.facebook.com/Snaphappi'><i class="icon-facebook-sign"></i></a>
					&nbsp;<a title='see our Twitter feed' target='_social' href='https://twitter.com/snaphappi'><i class="icon-twitter-sign"></i></a>
					&nbsp;<a title='see our Pinterest board' target='_social' href='http://pinterest.com/snaphappi/curated-family-photos/'><i class="icon-pinterest-sign"></i></a>
				</div>
			</div>
		</div>
	</div>
</div>
<iframe id='auth' class='hide' 
	qsrc='http://<?php echo $uploadHost; ?>/users/checkauth' 
	frameborder="0" >
</iframe>
<iframe id='json' class='hide' 
	qsrc='<?php echo $iframe_src ?>' 
	frameborder="0" >
</iframe>
