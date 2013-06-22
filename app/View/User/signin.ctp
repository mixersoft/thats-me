<?php
$title = "Snaphappi &middot; Preview";
$this -> set("title_for_layout", $title);
$this -> extend('/User/beachfront');
$this->start('css');
?>
<style type="text/css">
	.container h1, .container h2, .container h3  {
	    line-height: 1.4;
	}
	.iframe-wrap {
		position:relative;
	}
	.iframe-wrap .curtain {
	    font-size: 2.2em;
	    left: 0;
	    line-height: 1;
	    position: absolute;
	    right: 0;
	    top: 0;
	    z-index: 100;
	}
</style>
<?php
$this->end();

$this -> append('javascript_Bottom');
?>
<script type="text/javascript" src="/js/users.js"></script>
<script type="text/javascript">
$(function() {
	CFG['users'].documentReady.signin();
});
</script>
<?php
$this -> end();

// <!-- NAVBAR -->
$this->startIfEmpty('body_header'); 
	echo $this->element('navbar-member', array('action'=>'signin'));
    echo $this->element('notify');
$this->end(); 


?>

<div id="signin" class="featurette signin track-page-view ">
	<div class="vcenter-wrap">
		<div class="vcenter-padding">
			<div class="fw-band vcenter-body alpha black a70 ">
				<div class="container">
					<div class="row">
						<h1 class='center'>Welcome to the Snaphappi Preview</h1>
					</div>
					<div class="iframe-wrap center">
						<iframe 
							qsrc='http://<?php echo $uploadHost; ?>/users/signin/?min&optional' 
							class="invisible"
							frameborder="0" 
							width='560' 
							height='423' ></iframe>
						<div class='curtain center'>
							<i class="icon-spinner icon-spin icon-large"></i> loading...
						</div>
					</div>
				</div>
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
<iframe id='auth' class='hide' 
	qsrc='http://<?php echo $uploadHost; ?>/users/checkauth' 
	frameborder="0" >
</iframe>
