<?php
	switch ($this->request->url) {
		case 'sharing':
		case 'timeline':	
			$page = 'i-need-this'; break;
			break;	
		default:
			$page = $this->request->url; 
			break;
	}
	$url = "http://thats-me.snaphappi.com/{$page}"; 
?> 
<!-- element/fb-open-graph  -->
<meta property="og:title" content="Snaphappi &middot; Curated Family Photos" />
<meta property="og:type" content="website" />
<meta property="og:url" content="<?php echo $url; ?>" />
<meta property="og:image" content="http://thats-me.snaphappi.com/img/logo/on%20black/logo-ios-sq.144.png" />
<meta property="og:description" content="<?php echo $description; ?>" />
<meta property="og:site_name" content="Snaphappi" />
<meta property="fb:admins" content="214157" />	