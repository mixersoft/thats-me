<?php
	$like_page = !empty($like_page) ? $like_page : 'i-need-this';  
	$like_url = Router::url(array('action'=>$like_page), true);
	// debug($like_url);?>
<div class="fb-like" data-href="<?php echo $like_url; ?>" data-send="true" data-layout="button_count" data-width="225" data-show-faces="true" data-font="arial"></div>
<a href="https://twitter.com/share" class="twitter-share-button" data-url="http://thats-me.snaphappi.com/timeline" 
		data-text="Checkout Snaphappi, it's a great new site for Curated Family Photos."></a>
<a target='_social' data-pin-config="beside" href="//pinterest.com/pin/create/button/?url=http%3A%2F%2Fthats-me.snaphappi.com%2Fi-need-this%3Fmtm_source%3Dpinterest&media=http%3A%2F%2Fthats-me.snaphappi.com%2Fimg%2Fbeachfront%2Fhome.jpg&description=I%20need%20Curated%20Family%20Photos%20from%20Snaphappi!" data-pin-do="buttonPin" ><img src="//assets.pinterest.com/images/pidgets/pin_it_button.png" /></a>