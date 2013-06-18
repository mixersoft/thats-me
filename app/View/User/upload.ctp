<?php
$title = "Snaphappi &middot; Upload Photos";
$this -> set("title_for_layout", $title);
$this -> extend('/User/beachfront');
$this->start('css');
?>
<style type="text/css">
	.iframe-wrap {
		position:relative;
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
		var rowW = $('iframe').closest('.row').width();
		$('iframe').width(rowW);
		var iframeWin = $('iframe')[0].contentWindow;
		// var msg = JSON.stringify({key:'resize', value: {w: rowW});
		// iframeWin.postMessage(msg, '*');
		$(window).bind('message', function(e){
			var data = e.originalEvent.data,
				origin = e.originalEvent.origin;
			var o = JSON.parse(data);
			if (o.key == 'resize') _resizeIframe(o.value.h);  	
		});
		
		// $(window).bind('resize',function(e){
			// var rowW = $('iframe').closest('.row').width();
			// var msg = JSON.stringify({key:'resize', value: {w: rowW});
			// iframeWin.postMessage(msg, '*'); 	
		// });
	}
	_resizeIframe = function(h) {
		var MIN = 600;
		h = Math.max(h,MIN);
		$('iframe').height(h+7);
	}
	
</script>
<?php
$this -> end();
?>
<div id="uploader-wrap" class="featurette uploader track-page-view ">
	<div class="vcenter-wrap">
		<div class="vcenter-padding">
			<div class="fw-band vcenter-body alpha black a70 ">
				<div class="container">
					<div class="row">
						<h1 class='center'>Upload Photos to Snaphappi</h1>
					</div>
					<div class="row">
						<section class="span12 iframe-wrap">
							<noscript>
								Javascript is required to upload photos
							</noscript>
							<iframe src='http://snappi-dev/my/upload?min' frameborder="0" width='940' height='600' onload='_iframe_onLoad(this)'>
							</iframe>
							<div class='curtain center'>
								<i class="icon-spinner icon-spin icon-large"></i> loading...
							</div>
						</section>
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

