<?php

// init paging for iframe.src castingCall JSON request
$default_paging = array('perpage'=>50, 'page'=>1, 'sort'=>'created', 'direction'=>'desc');
$paging = array_intersect_key($this->passedArgs, $default_paging);
$paging = array_merge($default_paging, $paging );
$iframe_request = array_merge(array('controller'=>'my','action'=>'photos','?'=>array('min'=>1)), $paging);
$iframe_src = "http://{$uploadHost}".Router::url($iframe_request);

$title_for_layout = "Snaphappi Preview &middot; My Photos";
$fb_images[] = "/img/beachfront/icon-sm-04.png";
$fb_images[] = "/img/beachfront/icon-sm-06.png";
$this -> set(compact("title_for_layout",'fb_images'));
$this -> extend('/User/beachfront');
$this->append('css');
	$this->Less->css('snaps');
	$this->Html->css('vendor/nicholassherlock/imagemontage', null, array('inline' => false));
$this->end();
$this->start('css');
?>
<?php
$this->end();
$this -> append('javascript_Bottom');
		echo '<script src="/js/vendor/nicholassherlock/imagemontage.js"></script>';
		echo '<script type="text/javascript" src="/js/flickr.js"></script>';	
		echo '<script type="text/javascript" src="/js/users.js"></script>';
		// echo "<script src='http://snappi.snaphappi.com/svc/lib/alloy-1.5.0/build/aui/aui-min.js' type='text/javascript'></script>";
		// echo "<script src='http://snappi.snaphappi.com/js/snappi/base_aui.js' type='text/javascript'></script>";
		// echo "<meta id='css-start'>"; 
?>
<script type="text/javascript">
$(function() {
	CFG['users'].documentReady.snaps();
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
				<div class="gallery center alpha black a50 ">
					<section class="stage-body clearfix clickable">
					</section>
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
