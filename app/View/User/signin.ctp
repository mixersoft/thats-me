<?php
$title = "Snaphappi &middot; Preview";
$this -> set("title_for_layout", $title);
$this -> extend('/User/beachfront');
$this->start('css');
?>
<style type="text/css">
	.iframe-wrap {
		position:relative;
		margin-bottom: 60px;
	}
	.iframe-wrap .curtain {
		bottom: 0;
	    font-size: 2.2em;
	    left: 0;
	    line-height: 600px;
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
<script type="text/javascript">
	_iframe_onLoad = function(e){
		$('.iframe-wrap .curtain').remove();
		
		$(window).bind('message', function(e){
			var json = e.originalEvent.data,
				origin = e.originalEvent.origin;
			try {
				if (json.success){
					if (json.response.User.id) window.location.href = '/users/upload';
				} else {
					// twBootstrap flash json.message
					$('form #UserPassword').val('');
				};  	
			} catch (ex) {
				alert('bad msg from json response');
			}
		});
	}
</script>
<?php
$this -> end();
?>

<div id="signin" class="featurette preview track-page-view ">
	<div class="vcenter-wrap">
		<div class="vcenter-padding">
			<div class="fw-band vcenter-body alpha black a70 ">
				<div class="container">
					<div class="row">
						<h1 class='center'>Welcome to the Snaphappi Preview</h1>
					</div>
					<div class="row iframe-wrap center">
						<iframe src='http://snappi-dev/users/signin/?min&optional' 
							frameborder="0" 
							width='940' 
							height='400' onload='_iframe_onLoad(this)'></iframe>
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

