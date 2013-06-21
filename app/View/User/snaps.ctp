<?php
$title = "Snaphappi &middot; My Photos";
$this -> set("title_for_layout", $title);
$this -> extend('/User/beachfront');
$this->append('css');
	$this->Less->css('snaps');
$this->end();
$this->start('css');
?>
<?php
$this->end();
$this -> append('javascript_Bottom');
		echo '<script src="/js/vendor/jquery.isotope.js"></script>';
		echo '<script type="text/javascript" src="/js/snaps.js"></script>';	
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
						<h1 class='center'>Your Photos</h1>
						<?php echo $this->element('isotope/display-options'); ?>
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
	qsrc='http://<?php echo $uploadHost; ?>/my/photos/perpage:50?min' 
	frameborder="0" >
</iframe>
