<?php
$title = "Snaphappi &middot; Preview";
$this -> set("title_for_layout", $title);
$this -> extend('/User/beachfront');
$this->start('css');
?>
<style type="text/css">
	.iframe-wrap {
		position:relative;
		min-height: 640px;
		margin-bottom: 60px;
	}
	.iframe-wrap .curtain {
		bottom: 0;
	    font-size: 2.2em;
	    left: 0;
	    line-height: 480px;
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
	CFG['users'].if_Message.bind('signin');
	_iframe_onLoad = function(e){
		CFG['users'].if_onload(e);
	}
	
	_iframe_auth = function(e){
		var auth = CFG['users'].if_auth(e);
		if (!auth) {
			$('.featurette iframe').attr('src', $('.featurette iframe').attr('qsrc') );
		} else {
			var user = $.cookie('user'),
				next = user.count===0 ? '/users/upload'
							: '/users/isotope/'+user.id; 	
			window.location.href = next;
		}
	}
	$('.featurette iframe').bind('load', _iframe_onLoad);
	$('iframe#auth').bind('load', _iframe_auth);
	$('iframe#auth').attr('src', $('iframe#auth').attr('qsrc') );
});
</script>
<?php
$this -> end();

// <!-- NAVBAR -->
$this->startIfEmpty('body_header'); 
	echo $this->element('navbar-member', array('authUSer'=>$authUser));
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
					<div class="row iframe-wrap center">
						<iframe 
							qsrc='http://<?php echo $uploadHost; ?>/users/signin/?min&optional' 
							class="offset3 span6"
							frameborder="0" 
							width='940' 
							height='400' ></iframe>
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
